import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import ClearTermsNavbar from "./components/ClearTermsNavbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import ResourcesPage from "./pages/ResourcesPage.jsx";
import HowItWorksPage from "./pages/HowItWorksPage.jsx";
import { KEYWORD_SETS } from "./config/keywordSets.js";

/**
 * Pure in-app analysis function.
 * Counts keyword hits, then computes a bounded 0–100 trust score.
 */
export function analyzePolicy(text) {
  const lower = text.toLowerCase();
  const categories = {
    dataCollection: 0,
    thirdPartySharing: 0,
    dataRetention: 0,
    userRights: 0,
  };

  const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  Object.entries(KEYWORD_SETS).forEach(([category, keywords]) => {
    let total = 0;
    keywords.forEach((kw) => {
      const pattern = new RegExp("\\b" + escape(kw.toLowerCase()) + "\\b", "gi");
      const matches = lower.match(pattern);
      if (matches) total += matches.length;
    });
    categories[category] = total;
  });

  const riskScore =
    categories.dataCollection +
    categories.thirdPartySharing +
    categories.dataRetention;
  const positiveScore = categories.userRights;

  // Cap extremely long policies so they don't always drop to 0.
  const cappedRisk = Math.min(riskScore, 30);
  const cappedPositives = Math.min(positiveScore, 15);

  // Base trust higher, subtract for risk, add for positives.
  let trustScore = 85 - cappedRisk * 2 + cappedPositives * 1.5;
  trustScore = Math.max(0, Math.min(100, Math.round(trustScore)));

  // 0–40 Low, 41–79 Mixed, 80–100 High.
  let trustLabel = "Mixed";
  if (trustScore <= 40) trustLabel = "Low";
  else if (trustScore >= 80) trustLabel = "High";

  return {
    categories,
    riskScore,
    positiveScore,
    trustScore,
    trustLabel,
  };
}

export default function App() {
  const [policyInputText, setPolicyInputText] = useState("");

  // Restore last analyzed policy + analysis + history from THIS TAB only.
  const [policyText, setPolicyText] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return window.sessionStorage.getItem("clearterms-policy-text") || "";
    } catch {
      return "";
    }
  });

  const [analysis, setAnalysis] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = window.sessionStorage.getItem("clearterms-analysis");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [history, setHistory] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = window.sessionStorage.getItem("clearterms-history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist current dashboard + history in sessionStorage (per-tab).
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem("clearterms-policy-text", policyText);

      if (analysis) {
        window.sessionStorage.setItem(
          "clearterms-analysis",
          JSON.stringify(analysis)
        );
      } else {
        window.sessionStorage.removeItem("clearterms-analysis");
      }

      window.sessionStorage.setItem(
        "clearterms-history",
        JSON.stringify(history)
      );
    } catch {
      // ignore storage errors
    }
  }, [policyText, analysis, history]);

  const handleAnalyze = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const result = analyzePolicy(trimmed);
    setPolicyText(trimmed);
    setAnalysis(result);

    const entry = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      text: trimmed,
      snippet: trimmed.slice(0, 160) + (trimmed.length > 160 ? "..." : ""),
      analysis: result,
    };

    setHistory((prev) => [entry, ...prev].slice(0, 20));
  };

  const handleSelectHistory = (entry) => {
    setPolicyText(entry.text);
    setAnalysis(entry.analysis);
  };

  const handleDeleteHistoryEntry = (id) => {
    setHistory((prev) => prev.filter((e) => e.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
    setPolicyText("");
    setAnalysis(null);
  };

  return (
    <>
      <ClearTermsNavbar />
      <main>
        <Container>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  policyText={policyInputText}
                  onPolicyTextChange={setPolicyInputText}
                  onAnalyze={(text) => {
                    handleAnalyze(text);
                    // Home textarea is always cleared after a run.
                    setPolicyInputText("");
                  }}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  analysis={analysis}
                  policyText={policyText}
                  keywordSets={KEYWORD_SETS}
                />
              }
            />
            <Route
              path="/history"
              element={
                <HistoryPage
                  history={history}
                  onSelectHistory={handleSelectHistory}
                  onDeleteHistoryEntry={handleDeleteHistoryEntry}
                  onClearHistory={handleClearHistory}
                />
              }
            />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
          </Routes>
        </Container>
      </main>
    </>
  );
}

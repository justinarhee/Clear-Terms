import React from "react";
import { Row, Col, Alert } from "react-bootstrap";
import SummaryPanel from "../components/SummaryPanel.jsx";
import TrustMeter from "../components/TrustMeter.jsx";
import HighlightsView from "../components/HighlightsView.jsx";
import ExplanationPanel from "../components/ExplanationPanel.jsx";

export default function DashboardPage({ analysis, policyText, keywordSets }) {
    // If nothing has been analyzed yet, show the info alert.
    if (!analysis || !policyText.trim()) {
        return (
            <Alert variant="info" className="mt-4">
                No analysis to display yet. Paste a policy on the{" "}
                <strong>Home</strong> page and click <strong>Analyze Policy</strong>.
            </Alert>
        );
    }

    const { trustScore, trustLabel } = analysis;

    return (
        <section className="mt-4">
            {/* Summary + Trust meter */}
            <Row className="mb-3">
                <Col md={6}>
                    <SummaryPanel analysis={analysis} />
                </Col>
                <Col md={6}>
                    <TrustMeter trustScore={trustScore} trustLabel={trustLabel} />
                </Col>
            </Row>

            {/* Deeper explanation */}
            <Row className="mb-3">
                <Col md={12}>
                    <ExplanationPanel analysis={analysis} />
                </Col>
            </Row>

            {/* Highlights view */}
            <Row>
                <Col md={12}>
                    <HighlightsView text={policyText} keywordSets={keywordSets} />
                </Col>
            </Row>
        </section>
    );
}

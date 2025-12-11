import React from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PolicyInput from "../components/PolicyInput.jsx";
import PdfUpload from "../components/PdfUpload.jsx";

export default function HomePage({
    policyText,
    onPolicyTextChange,
    onAnalyze,
}) {
    const navigate = useNavigate();

    const handleAnalyze = (text) => {
        onAnalyze(text);
        navigate("/dashboard");
    };

    const handlePdfTextExtracted = (text) => {
        // When a PDF is uploaded, fill the textarea, analyze, and go to dashboard.
        onPolicyTextChange(text);
        handleAnalyze(text);
    };

    return (
        <section className="clearterms-hero">
            <Row className="mb-4">
                <Col md={7}>
                    <h1>ClearTerms</h1>
                    <p className="lead">
                        A friendly way to skim long privacy policies. Paste text or upload a
                        PDF, and we’ll surface key risks and user rights using simple visual
                        cues.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <PolicyInput
                        policyText={policyText}
                        onPolicyTextChange={onPolicyTextChange}
                        onAnalyze={handleAnalyze}
                    />
                    <PdfUpload onTextExtracted={handlePdfTextExtracted} />
                </Col>
            </Row>
        </section>
    );
}

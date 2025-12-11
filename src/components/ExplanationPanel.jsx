import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";

export default function ExplanationPanel({ analysis }) {
    if (!analysis) return null;

    const { categories, riskScore, positiveScore, trustScore, trustLabel } = analysis;

    const notes = [];

    // Data collection
    if (categories.dataCollection >= 40) {
        notes.push({
            title: "Heavy tracking & data collection",
            body:
                "This policy mentions tracking, analytics, or data collection quite often. Expect cookies, usage logs, and device data to be collected whenever you use the service.",
            variant: "danger",
        });
    } else if (categories.dataCollection >= 15) {
        notes.push({
            title: "Moderate data collection",
            body:
                "The policy talks about collecting usage data and device information. This is common, but you may want to limit tracking where possible.",
            variant: "warning",
        });
    } else if (categories.dataCollection > 0) {
        notes.push({
            title: "Limited data collection language",
            body:
                "Data collection is mentioned, but not heavily. It still happens, but the policy doesn’t lean on tracking language.",
            variant: "success",
        });
    }

    // Third-party sharing
    if (categories.thirdPartySharing >= 40) {
        notes.push({
            title: "Lots of third-party sharing",
            body:
                "There are many references to partners, vendors, or advertisers. Your data is likely shared widely with other companies.",
            variant: "danger",
        });
    } else if (categories.thirdPartySharing >= 15) {
        notes.push({
            title: "Some third-party sharing",
            body:
                "The service relies on partners or service providers and may share your data with them. Check whether this includes advertisers or just operational vendors.",
            variant: "warning",
        });
    } else if (categories.thirdPartySharing > 0) {
        notes.push({
            title: "Limited third-party sharing language",
            body:
                "The policy mentions third parties, but not constantly. Sharing might be limited to essential providers.",
            variant: "success",
        });
    }

    // Data retention
    if (categories.dataRetention >= 15) {
        notes.push({
            title: "Long or vague data retention",
            body:
                "The policy frequently mentions retention or storage. Watch for phrases like “for as long as necessary” without clear limits, which can mean data is kept for a long time.",
            variant: "warning",
        });
    } else if (categories.dataRetention > 0) {
        notes.push({
            title: "Some details on how long data is kept",
            body:
                "Retention is discussed, which is good. Check whether they give specific time frames or only general statements.",
            variant: "success",
        });
    }

    // User rights
    if (categories.userRights === 0) {
        notes.push({
            title: "Few explicit user rights mentioned",
            body:
                "We didn’t detect clear references to rights like accessing, deleting, or exporting your data. Those rights might still exist under law, but they aren’t highlighted in this policy.",
            variant: "danger",
        });
    } else if (categories.userRights < 5) {
        notes.push({
            title: "Some user rights mentioned",
            body:
                "The policy mentions at least a few rights (like access or deletion). Make sure you understand how to actually exercise them.",
            variant: "warning",
        });
    } else {
        notes.push({
            title: "User rights are emphasized",
            body:
                "There are many references to your rights (access, deletion, objection, etc.). That’s a good sign—look for clear instructions on how to submit requests.",
            variant: "success",
        });
    }

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Card.Title>What this policy seems to say</Card.Title>
                <Card.Subtitle className="mb-2 text-muted small">
                    Based on simple keyword counts – use this as a conversation starter, not legal advice.
                </Card.Subtitle>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <div className="d-flex align-items-center">
                            <span className="fw-semibold me-2">Overall trust score:</span>
                            <Badge
                                bg={
                                    trustScore <= 40 ? "danger" : trustScore >= 80 ? "success" : "warning"
                                }
                            >
                                {trustScore}/100 · {trustLabel} trust
                            </Badge>
                        </div>
                        <div className="text-muted small mt-1">
                            Higher scores suggest more user-friendly language and more references to your
                            rights.
                        </div>
                    </ListGroup.Item>

                    {notes.map((n, idx) => (
                        <ListGroup.Item key={idx}>
                            <div className="d-flex align-items-start">
                                <Badge bg={n.variant} className="me-2 mt-1">
                                    Note
                                </Badge>
                                <div>
                                    <div className="fw-semibold">{n.title}</div>
                                    <div className="small text-muted">{n.body}</div>
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

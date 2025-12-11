import React from "react";
import { Card, ListGroup, Badge } from "react-bootstrap";

export default function SummaryPanel({ analysis }) {
    const { categories, riskScore, positiveScore } = analysis;

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Card.Title>Quick Summary</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    Combined keyword check (not legal advice!)
                </Card.Subtitle>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <span className="fw-semibold">Data collection </span>
                        <Badge bg="secondary" className="me-1">
                            {categories.dataCollection}
                        </Badge>
                        <span className="text-muted small">
                            mentions of tracking, cookies, analytics, device info, etc.
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="fw-semibold">Third-party sharing </span>
                        <Badge bg="secondary" className="me-1">
                            {categories.thirdPartySharing}
                        </Badge>
                        <span className="text-muted small">
                            references to partners, advertisers, or “service providers”.
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="fw-semibold">Data retention </span>
                        <Badge bg="secondary" className="me-1">
                            {categories.dataRetention}
                        </Badge>
                        <span className="text-muted small">
                            how long they say they keep your data.
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="fw-semibold">User rights mentioned </span>
                        <Badge bg="success" className="me-1">
                            {categories.userRights}
                        </Badge>
                        <span className="text-muted small">
                            delete / access / opt-out and similar rights.
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <span className="fw-semibold">Total risk signals </span>
                        <Badge bg="danger" className="me-1">
                            {riskScore}
                        </Badge>
                        <span className="fw-semibold">· Positive protections </span>
                        <Badge bg="success" className="me-1">
                            {positiveScore}
                        </Badge>
                        <div className="text-muted small mt-1">
                            Higher red numbers usually mean more potential risky areas; higher
                            green numbers mean the policy talks more about your rights.
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

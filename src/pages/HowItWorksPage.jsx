import React from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";

export default function HowItWorksPage() {
    return (
        <section className="mt-4">
            <Row className="mb-4">
                <Col md={8}>
                    <h2>How ClearTerms works</h2>
                    <p className="text-muted">
                        ClearTerms gives you a quick, visual read on privacy policies. It doesn&apos;t
                        replace legal advice, but it helps you spot patterns and decide how comfortable
                        you feel using a service.
                    </p>
                </Col>
            </Row>

            <Row className="g-3 mb-3 how-grid">
                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title>1. Keyword scan</Card.Title>
                            <Card.Text>
                                We scan the policy text for keywords in four buckets:
                            </Card.Text>
                            <ListGroup variant="flush" className="small">
                                <ListGroup.Item>
                                    Data collection (cookies, analytics, device info)
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Third-party sharing (ads, partners, selling)
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Data retention (how long they keep things)
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    User rights (access, delete, opt-out, etc.)
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title>2. Trust score</Card.Title>
                            <Card.Text>
                                We start from a baseline of 85 and adjust based on what we find:
                            </Card.Text>
                            <ListGroup variant="flush" className="small">
                                <ListGroup.Item>-2 points for each risk signal (collect / share / retain)</ListGroup.Item>
                                <ListGroup.Item>+1.5 points for each user-right mention</ListGroup.Item>
                                <ListGroup.Item>Score is clamped between 0 and 100</ListGroup.Item>
                            </ListGroup>
                            <Card.Text className="small mt-2 mb-0">
                                0–39 = Low trust, 40–69 = Mixed, 70–100 = High.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title>3. Visual overview</Card.Title>
                            <Card.Text className="small">
                                The dashboard combines:
                            </Card.Text>
                            <ListGroup variant="flush" className="small">
                                <ListGroup.Item>
                                    <strong>Quick Summary</strong>: category counts
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Trust Meter</strong>: a single 0–100 score
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Highlights View</strong>: original text with color-coded terms
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Explanation notes</strong>: plain-language hints about risks and rights
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={8}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Important note</Card.Title>
                            <Card.Text className="small mb-0">
                                ClearTerms is a research/learning tool. It doesn&apos;t read every nuance of a
                                legal document, and a low or high score isn&apos;t a guarantee of safety or risk.
                                Use it to ask better questions, compare services, and decide what you&apos;re
                                comfortable with.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </section>
    );
}

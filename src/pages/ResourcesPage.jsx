import React from "react";
import { Row, Col, Card, ListGroup, Badge } from "react-bootstrap";

export default function ResourcesPage() {
    return (
        <section className="mt-4">
            <Row className="mb-4">
                <Col md={8}>
                    <h2>Privacy resources</h2>
                    <p className="text-muted">
                        ClearTerms is a quick first pass. Use these guides, tools, and organizations to go
                        deeper and make informed choices.
                    </p>
                </Col>
            </Row>

            <Row className="g-3 mb-4 resources-grid">
                {/* Rights & laws */}
                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <span role="img" aria-label="document">
                                    📜
                                </span>{" "}
                                Know your rights
                            </Card.Title>
                            <ListGroup variant="flush" className="small">
                                <ListGroup.Item>
                                    <strong>GDPR (EU)</strong> – Explains rights like access, deletion, and data
                                    portability.
                                    <br />
                                    <Card.Link
                                        href="https://gdpr.eu/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Visit gdpr.eu
                                    </Card.Link>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>US FTC privacy &amp; security</strong> – Practical tips and complaints
                                    process.
                                    <br />
                                    <Card.Link
                                        href="https://www.ftc.gov/business-guidance/privacy-security"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        FTC resources
                                    </Card.Link>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>CCPA / CPRA (California)</strong> – State-level rules for Californians.
                                    <br />
                                    <Card.Link
                                        href="https://oag.ca.gov/privacy/ccpa"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        CA privacy portal
                                    </Card.Link>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Tools */}
                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <span role="img" aria-label="shield">
                                    🛡️
                                </span>{" "}
                                Tools &amp; settings
                            </Card.Title>
                            <ListGroup variant="flush" className="small">
                                <ListGroup.Item>
                                    Browser extensions like{" "}
                                    <span className="fw-semibold">uBlock Origin</span> or{" "}
                                    <span className="fw-semibold">Privacy Badger</span> can block trackers on many
                                    sites.
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Visit your account&apos;s{" "}
                                    <span className="fw-semibold">privacy / security</span> page to control:
                                    <ul className="mb-0">
                                        <li>Ad personalization and analytics</li>
                                        <li>Location history</li>
                                        <li>Download / delete your data</li>
                                    </ul>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    On your phone, review app permissions (camera, mic, location) and revoke anything
                                    that doesn&apos;t make sense.
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Organizations & learning */}
                <Col md={4}>
                    <Card className="h-100 shadow-sm">
                        <Card.Body>
                            <Card.Title>
                                <span role="img" aria-label="books">
                                    📚
                                </span>{" "}
                                Learn &amp; get help
                            </Card.Title>
                            <ListGroup variant="flush" className="small">
                                <ListGroup.Item>
                                    <strong>Electronic Frontier Foundation (EFF)</strong> – Deep dives on
                                    surveillance, tracking, and digital rights.
                                    <br />
                                    <Card.Link
                                        href="https://www.eff.org/issues/privacy"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        EFF privacy page
                                    </Card.Link>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Local consumer protection agencies</strong> – Many countries and states
                                    have offices that handle privacy complaints and questions.
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Look for books and talks on{" "}
                                    <span className="fw-semibold">
                                        data justice, algorithmic bias, and dark patterns
                                    </span>{" "}
                                    to understand the bigger picture behind privacy policies.
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
                            <Card.Title>Using ClearTerms in your routine</Card.Title>
                            <Card.Text className="small mb-0">
                                When you try a new service, run its policy through ClearTerms, skim the
                                dashboard, and pay attention to the notes under{" "}
                                <strong>What this policy seems to say</strong>. Save a few policies in{" "}
                                <Badge bg="secondary">History</Badge> so you can compare services over time.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </section>
    );
}

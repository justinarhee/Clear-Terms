import React from "react";
import { Card, ListGroup, Badge, Button } from "react-bootstrap";

export default function HistoryList({ history, onSelect, onDelete }) {
    return (
        <Card className="shadow-sm">
            <Card.Body>
                <Card.Title>Analysis History</Card.Title>
                <Card.Text>
                    Click a previous analysis to reload its text and summary.
                </Card.Text>
                {history.length === 0 ? (
                    <Card.Text className="text-muted mb-0">
                        No analyses saved yet. Run your first analysis on the Home page!
                    </Card.Text>
                ) : (
                    <ListGroup variant="flush">
                        {history.map((entry) => {
                            const dateLabel = new Date(entry.createdAt).toLocaleString("en-US", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                            });

                            const risk = entry.analysis.riskScore;
                            let riskVariant = "success";
                            if (risk >= 120) riskVariant = "danger";
                            else if (risk >= 60) riskVariant = "warning";

                            return (
                                <ListGroup.Item
                                    key={entry.id}
                                    as="div"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <button
                                        type="button"
                                        className="btn btn-link p-0 text-start flex-grow-1"
                                        onClick={() => onSelect(entry)}
                                    >
                                        <div className="fw-semibold">{dateLabel}</div>
                                        <div className="text-muted small">{entry.snippet}</div>
                                    </button>
                                    <div className="ms-2 d-flex flex-column align-items-end">
                                        <Badge bg={riskVariant} className="mb-1">
                                            Risk {risk}
                                        </Badge>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onDelete(entry.id);
                                            }}
                                            aria-label="Delete this analysis from history"
                                        >
                                            ✕
                                        </Button>
                                    </div>
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                )}
            </Card.Body>
        </Card>
    );
}

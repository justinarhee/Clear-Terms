import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import HistoryList from "../components/HistoryList.jsx";

export default function HistoryPage({
    history,
    onSelectHistory,
    onDeleteHistoryEntry,
    onClearHistory,
}) {
    const navigate = useNavigate();

    const handleSelect = (entry) => {
        onSelectHistory(entry);
        navigate("/dashboard");
    };

    return (
        <section className="mt-4">
            <Row className="mb-3">
                <Col className="d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">History</h2>
                    {history.length > 0 && (
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={onClearHistory}
                        >
                            Clear all
                        </Button>
                    )}
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <HistoryList
                        history={history}
                        onSelect={handleSelect}
                        onDelete={onDeleteHistoryEntry}
                    />
                </Col>
            </Row>
        </section>
    );
}

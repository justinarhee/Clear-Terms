import React, { useMemo, useState } from "react";
import { Card, Button } from "react-bootstrap";

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function HighlightsView({ text, keywordSets }) {
    const [isOpen, setIsOpen] = useState(false);

    const html = useMemo(() => {
        if (!text) return "";

        const riskyKeywords = [
            ...keywordSets.dataCollection,
            ...keywordSets.thirdPartySharing,
            ...keywordSets.dataRetention,
        ].map((k) => k.toLowerCase());

        const positiveKeywords = keywordSets.userRights.map((k) =>
            k.toLowerCase()
        );

        const allKeywords = [...new Set([...riskyKeywords, ...positiveKeywords])];

        if (allKeywords.length === 0) return text;

        const pattern = new RegExp(
            `(${allKeywords.map(escapeRegExp).join("|")})`,
            "gi"
        );

        return text.replace(pattern, (match) => {
            const lower = match.toLowerCase();
            if (positiveKeywords.includes(lower)) {
                return `<mark class="positive-term">${match}</mark>`;
            }
            if (riskyKeywords.includes(lower)) {
                return `<mark class="risky-term">${match}</mark>`;
            }
            return match;
        });
    }, [text, keywordSets]);

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <Card.Title className="mb-0">Highlights View</Card.Title>
                        <Card.Text className="mb-0 small text-muted">
                            Risky terms are highlighted in red; user rights in green.
                        </Card.Text>
                    </div>
                    <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setIsOpen((o) => !o)}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? "Hide full text" : "Show full text"}
                    </Button>
                </div>

                {isOpen ? (
                    <div
                        className="highlighted-text mt-2"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                ) : (
                    <Card.Text className="text-muted mb-0">
                        Click &ldquo;Show full text&rdquo; to view the policy with
                        highlighted phrases.
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
}

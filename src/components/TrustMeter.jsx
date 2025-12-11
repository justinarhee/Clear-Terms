import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

export default function TrustMeter({ trustScore, trustLabel }) {
    let description = "";
    if (trustLabel === "Low") {
        description =
            "Many potential risk areas. Consider limiting what data you share or looking for alternatives.";
    } else if (trustLabel === "High") {
        description =
            "Relatively fewer risk signals and more user rights referenced. Still read carefully.";
    } else {
        description =
            "Some risk areas and some protections. Pay attention to tracking, sharing, and your rights.";
    }

    // Pick a color based on score
    let variant = "secondary";
    if (trustScore <= 40) variant = "danger";      // red
    else if (trustScore <= 79) variant = "warning"; // yellow
    else variant = "success";                      // green

    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Card.Title>Trust Meter</Card.Title>
                <Card.Text className="mb-1">
                    Overall privacy-friendliness score based on detected keywords.
                </Card.Text>
                <ProgressBar now={trustScore} variant={variant} className="mb-1" />
                <Card.Text className="mb-1 fw-semibold">
                    Score: {trustScore}/100 ({trustLabel} trust)
                </Card.Text>
                <Card.Text className="mb-0">
                    {description}
                </Card.Text>
                <Card.Text className="text-muted small mt-1">
                    0–40: more concerning · 41–79: mixed · 80–100: more user-friendly language.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
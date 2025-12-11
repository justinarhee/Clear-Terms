import React, { useState } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import pdfToText from "react-pdftotext";

export default function PdfUpload({ onTextExtracted }) {
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setError("");
        setIsLoading(true);

        try {
            const text = await pdfToText(file);
            if (!text.trim()) {
                setError("We couldn't find any text in that PDF.");
            } else {
                onTextExtracted(text);
            }
        } catch (err) {
            console.error(err);
            setError("We couldn't read that PDF. Try another file?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="shadow-sm mt-3">
            <Card.Body>
                <Card.Title>Or upload a privacy policy PDF</Card.Title>
                <Card.Text>
                    Upload a PDF version of a privacy policy. ClearTerms will extract the
                    text directly in your browser and analyze it just like pasted text.
                </Card.Text>
                <Form.Group controlId="policyPdf">
                    <Form.Label>PDF file</Form.Label>
                    <Form.Control
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                    />
                    {fileName && (
                        <Form.Text className="text-muted d-block mt-1">
                            Selected file: {fileName}
                        </Form.Text>
                    )}
                </Form.Group>
                {isLoading && (
                    <p className="mt-2 mb-0">Extracting text from PDF…</p>
                )}
                {error && (
                    <Alert variant="danger" className="mt-2 mb-0">
                        {error}
                    </Alert>
                )}
            </Card.Body>
        </Card>
    );
}

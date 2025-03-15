"use client";

import { useTicketStore } from "../store";
import { useState } from "react";
import { useRouter } from "next/router";
// import "../styles.css"; // Import your custom CSS file


export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("Click here or drag file to upload")
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const setJobId = useTicketStore((state) => state.setJobId);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "application/json") {
            setFile(selectedFile);
            setMessage(selectedFile.name)
            setError("");
        } else {
            setError("Please upload a valid JSON file.");
        }
    };

    const uploadFile = async () => {
        if (!file) {
        setError("Please select a JSON file first.");
        return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log(process.env.NEXT_LOCAL_API_BASE_URL)
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/classify_tickets`, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setUploading(false);
                const data = await response.json();

                // Save classified tickets to Zustand store
                setJobId(data.job_id);
                router.push("/classification");
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            setError("Upload error: " + error.message);
            setUploading(false);
        }
    };


    return (
        <div className="upload-container">
            <label htmlFor="file-upload" className="upload-label">
                {message}
            </label>
            <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
            />
            <button className="upload-btn" onClick={uploadFile}>
                {uploading==true?"Uploading":"Upload"}
            </button>
            <label className="error-msg">{error}</label>
        </div>
    );
}

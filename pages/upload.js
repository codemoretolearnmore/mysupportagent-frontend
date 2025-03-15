import { useState } from "react";
import { useRouter } from "next/router";
import TicketUpload from "../components/TicketUpload";

/**
 * Upload Page
 * Contains the TicketUpload component for uploading JSON ticket files.
 */
export default function UploadPage() {

  return (
    <div className="p-6 container">
      <TicketUpload />
    </div>
  );
}

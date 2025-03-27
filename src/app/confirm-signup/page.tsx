"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

// import { redirect } from "next/navigation";

export default function ConfirmSignup() {
  const navigation = useRouter();
  const seachParams = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [confirmationUrl, setConfirmationUrl] = useState("");

  useEffect(() => {
    const confirmation_url = seachParams.get("confirmation_url");

    if (confirmation_url) {
      setConfirmationUrl(decodeURIComponent(confirmation_url));
      setStatus("ready");
    } else {
      setStatus("error");
    }
  }, [seachParams]);

  const handleConfirmation = async () => {
    try {
      setStatus("confirming");

      window.location.href = confirmationUrl;
      navigation.push("/login");
    } catch (error) {
      console.error("Confirmation error:", error);
      setStatus("error");
    }
  };

  if (status === "loading") {
    return (
      <div className="container mx-auto p-4">Loading confirmation page...</div>
    );
  }

  if (status === "error") {
    return (
      <div className="container mx-auto p-4">
        Invalid or missing confirmation link.
      </div>
    );
  }

  if (status === "confirming") {
    return (
      <div className="container mx-auto p-4">
        Processing your confirmation...
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-36 p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Confirm Your Signup</h1>
      <p className="mb-6">
        Please click the button below to complete your signup process:
      </p>
      <button
        onClick={handleConfirmation}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Confirm Signup
      </button>
    </div>
  );
}

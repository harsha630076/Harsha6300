import { useState, useEffect } from "react";
import { authAPI } from "@/api/auth";

export default function LoginStatus() {
  const [status, setStatus] = useState<string>("Checking...");
  const [lastError, setLastError] = useState<string>("");

  const testLogin = async () => {
    setStatus("Testing login...");
    setLastError("");

    try {
      const result = await authAPI.login({
        email: "test@example.com",
        password: "password123",
      });
      setStatus(
        `✅ Login successful! Token: ${result.token.substring(0, 20)}...`,
      );
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      setStatus("❌ Login failed");
      setLastError(errorMsg);
    }
  };

  useEffect(() => {
    // Auto-test on component mount
    testLogin();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-w-sm z-50">
      <h3 className="font-semibold text-sm mb-2">Auth Debug</h3>
      <p className="text-xs text-gray-600 mb-2">{status}</p>
      {lastError && (
        <p className="text-xs text-red-600 mb-2">Error: {lastError}</p>
      )}
      <button
        onClick={testLogin}
        className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
      >
        Test Again
      </button>
    </div>
  );
}

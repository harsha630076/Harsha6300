import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function PhoneOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [phoneNumber] = useState("+1 (555) 123-4567"); // Mock phone number
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    console.log("Resending OTP code");
    setTimeLeft(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      console.log("Verifying OTP:", otpCode);
      // Simulate successful verification
      window.location.href = "/signup-details";
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/signup" className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-semibold">Verify Phone Number</h1>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl">📱</span>
          </div>

          {/* Title and Description */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Enter verification code
          </h2>
          <p className="text-gray-600 mb-8">
            We've sent a 6-digit code to
            <br />
            <span className="font-medium text-gray-900">{phoneNumber}</span>
          </p>

          {/* OTP Input */}
          <div className="flex gap-3 justify-center mb-8">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-gray-200 focus:border-primary"
              />
            ))}
          </div>

          {/* Timer */}
          <div className="mb-6">
            {!canResend ? (
              <p className="text-sm text-gray-600">
                Resend code in{" "}
                <span className="font-medium text-primary">{timeLeft}s</span>
              </p>
            ) : (
              <button
                onClick={handleResendCode}
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                Resend verification code
              </button>
            )}
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={!isComplete}
            className="w-full h-14 bg-primary hover:bg-primary/90 disabled:bg-gray-300 text-white rounded-2xl text-lg font-medium mb-4"
          >
            Verify & Continue
          </Button>

          {/* Change Number */}
          <Link
            to="/signup"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Wrong number?{" "}
            <span className="text-primary font-medium">
              Change phone number
            </span>
          </Link>
        </div>
      </div>

      {/* Help */}
      <div className="px-6 pb-8">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 text-sm">ℹ️</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Having trouble?
              </h4>
              <p className="text-sm text-gray-600">
                Make sure your phone can receive SMS messages. If you don't
                receive the code, try requesting a new one.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

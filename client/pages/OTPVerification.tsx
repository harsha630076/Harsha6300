import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Clock } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { authAPI } from "@/api/auth";

export default function OTPVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email = "user@example.com", phone = "+1 (555) 123-4567", type = 'email' } = location.state || {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6);
    
    const newOtp = [...otp];
    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
    }
    setOtp(newOtp);
    
    // Focus on the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex(digit => !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      await authAPI.verifyOTP(email, otpCode);
      navigate('/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Invalid OTP. Please try again.');
      // Clear OTP inputs on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setTimeLeft(60);
    setError("");

    try {
      await authAPI.sendOTP(email);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Link to="/login" className="p-2 hover:bg-gray-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        <div className="w-full max-w-sm">
          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              {type === 'email' ? (
                <Mail className="w-8 h-8 text-primary" />
              ) : (
                <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              )}
            </div>
          </div>

          {/* Title and Description */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Verify your {type === 'email' ? 'email' : 'phone'}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              We've sent a 6-digit verification code to{' '}
              <span className="font-medium text-gray-900">
                {type === 'email' ? email : phone}
              </span>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-600 text-sm text-center">{error}</p>
            </div>
          )}

          {/* OTP Input */}
          <div className="mb-8">
            <div className="flex justify-center gap-3 mb-4">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:border-primary ${
                    error ? 'border-red-300' : ''
                  }`}
                  autoComplete="one-time-code"
                  disabled={isVerifying}
                />
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            disabled={!isOtpComplete || isVerifying}
            className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl text-lg font-medium mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </div>
            ) : (
              'Verify Code'
            )}
          </Button>

          {/* Resend Section */}
          <div className="text-center">
            {timeLeft > 0 ? (
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Resend code in {timeLeft}s</span>
              </div>
            ) : (
              <Button
                variant="ghost"
                onClick={handleResendOtp}
                disabled={isResending}
                className="text-primary hover:text-primary/80 text-sm font-medium"
              >
                {isResending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </div>
                ) : (
                  'Resend verification code'
                )}
              </Button>
            )}
          </div>

          {/* Help Text */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Didn't receive the code? Check your spam folder or{' '}
              <Link to="/login" className="text-primary hover:underline">
                try a different {type === 'email' ? 'email' : 'phone number'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

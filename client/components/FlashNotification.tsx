import { useState, useEffect } from "react";
import { CheckCircle, Info, AlertCircle, XCircle, X } from "lucide-react";

interface FlashNotificationProps {
  type: "success" | "info" | "warning" | "error";
  message: string;
  duration?: number;
  onClose?: () => void;
  isVisible: boolean;
}

export default function FlashNotification({
  type,
  message,
  duration = 3000,
  onClose,
  isVisible,
}: FlashNotificationProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => onClose?.(), 300); // Wait for exit animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "info":
        return <Info className="w-5 h-5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5" />;
      case "error":
        return <XCircle className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white border-green-600";
      case "info":
        return "bg-blue-500 text-white border-blue-600";
      case "warning":
        return "bg-orange-500 text-white border-orange-600";
      case "error":
        return "bg-red-500 text-white border-red-600";
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex justify-center">
      <div
        className={`
          ${getStyles()}
          flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border-2
          transform transition-all duration-300 ease-out max-w-sm w-full
          ${
            show
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-2 opacity-0 scale-95"
          }
        `}
      >
        <div className="flex-shrink-0">{getIcon()}</div>
        <p className="text-sm font-medium flex-1">{message}</p>
        {onClose && (
          <button
            onClick={() => {
              setShow(false);
              setTimeout(() => onClose(), 300);
            }}
            className="flex-shrink-0 hover:opacity-75 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

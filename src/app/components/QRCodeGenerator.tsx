"use client";
import { useState, useEffect } from "react";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
    url?: string;
    size?: number;
    className?: string;
}

export default function QRCodeGenerator({
    url = "https://your-restaurant-store.com",
    size = 200,
    className = ""
}: QRCodeGeneratorProps) {
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const generateQRCode = async () => {
            try {
                setIsLoading(true);
                setError("");

                const dataUrl = await QRCode.toDataURL(url, {
                    width: size,
                    margin: 2,
                    color: {
                        dark: "#000000",
                        light: "#FFFFFF"
                    }
                });

                setQrCodeDataUrl(dataUrl);
            } catch (err) {
                setError("Failed to generate QR code");
                console.error("QR Code generation error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        generateQRCode();
    }, [url, size]);

    if (isLoading) {
        return (
            <div className={`flex items-center justify-center bg-white rounded-lg ${className}`} style={{ width: size, height: size }}>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff9900]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`flex items-center justify-center bg-red-100 text-red-600 rounded-lg ${className}`} style={{ width: size, height: size }}>
                <span className="text-sm">Error generating QR code</span>
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center ${className}`}>
            <img
                src={qrCodeDataUrl}
                alt="QR Code for Restaurant Store"
                className="rounded-lg shadow-lg"
                style={{ width: size, height: size }}
            />
            <p className="text-sm text-gray-400 mt-2 text-center max-w-xs">
                Scan to visit our menu
            </p>
        </div>
    );
}

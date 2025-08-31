"use client";
import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeProps {
    url: string;
    size?: number;
    className?: string;
}

export default function QRCodeComponent({ url, size = 200, className = "" }: QRCodeProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            QRCode.toCanvas(canvasRef.current, url, {
                width: size,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            }, (error) => {
                if (error) {
                    console.error('Error generating QR code:', error);
                }
            });
        }
    }, [url, size]);

    return (
        <div className={`qr-code-container ${className}`}>
            <canvas
                ref={canvasRef}
                className="qr-canvas"
                style={{
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    background: 'white',
                    padding: '16px'
                }}
            />
        </div>
    );
}

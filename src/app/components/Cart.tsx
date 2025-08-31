"use client";
import { useState } from 'react';

interface CartItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    photoUrl?: string;
}

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemoveItem: (id: string) => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }: CartProps) {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Cart Modal */}
            <div className="relative bg-gray-900/95 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">سلة الطلبات</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto max-h-[50vh] mb-6">
                    {items.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-4xl mb-4">🛒</div>
                            <p className="text-gray-400">السلة فارغة</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl">
                                    {item.photoUrl && (
                                        <img
                                            src={item.photoUrl}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-white">{item.title}</h3>
                                        <p className="text-orange-500 font-bold">TL {item.price}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-full flex items-center justify-center text-white transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center text-white font-semibold">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-black font-bold transition-colors"
                                        >
                                            +
                                        </button>
                                        <button
                                            onClick={() => onRemoveItem(item.id)}
                                            className="w-8 h-8 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-colors"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Total and Actions */}
                {items.length > 0 && (
                    <div className="border-t border-gray-700 pt-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold text-white">المجموع:</span>
                            <span className="text-2xl font-bold text-orange-500">TL {total}</span>
                        </div>
                        <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-black font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105">
                            إتمام الطلب
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

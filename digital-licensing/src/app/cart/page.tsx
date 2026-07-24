"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobal } from '../../context/GlobalContext';
import { 
  Trash2, ShoppingBag, ShieldCheck, Ticket, 
  CreditCard, Sparkles, ArrowRight, DollarSign 
} from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, clearCart, downloadAsset } = useGlobal();

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [activeGateway, setActiveGateway] = useState<'stripe' | 'paypal' | 'momo' | 'vnpay'>('stripe');

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const total = Math.max(0, subtotal - discount);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'DESENIO2026') {
      setDiscount(subtotal * 0.2); // 20% discount
      alert('Đã áp dụng mã giảm giá 20% thành công!');
    } else {
      alert('Mã giảm giá không hợp lệ.');
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    // Add all cart assets to user's downloads dynamically
    cart.forEach(item => {
      downloadAsset(item.asset.id);
    });
    
    alert(`Thanh toán thành công qua cổng ${activeGateway.toUpperCase()}! Số tiền: $${total}. Các tài nguyên đã được kích hoạt giấy phép tải xuống.`);
    clearCart();
    router.push('/dashboard');
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Page Header */}
      <div className="mb-10 text-left">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
          <ShoppingBag className="w-7 h-7 text-[var(--color-primary-neon)]" /> Shopping Cart
        </h1>
        <p className="text-xs text-gray-500 font-semibold mt-1 uppercase tracking-wider">
          Review your creative asset license keys
        </p>
      </div>

      {cart.length > 0 ? (
        /* Cart Grid Layout: Items Left + Checkout Summary Right */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Items List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {cart.map((item) => (
              <div 
                key={item.asset.id} 
                className="glass-card rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                {/* Visual Thumbnail + Name */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-950 shrink-0 border border-white/5">
                    <img src={item.asset.thumbnailUrl} alt={item.asset.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white leading-tight truncate">{item.asset.title}</h3>
                    <span className="inline-block bg-[var(--color-primary-neon)]/10 text-[9px] font-bold text-[var(--color-primary-neon)] uppercase tracking-wider px-2 py-0.5 rounded-full mt-1.5 border border-[var(--color-primary-neon)]/20">
                      {item.licenseType.toUpperCase()} LICENSE
                    </span>
                  </div>
                </div>

                {/* Pricing + Deletion */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-900/60">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 font-semibold block uppercase">PRICE</span>
                    <strong className="text-base font-extrabold text-white">${item.price}</strong>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.asset.id)}
                    className="w-9 h-9 rounded-full bg-transparent hover:bg-rose-950/20 text-gray-500 hover:text-[var(--color-rose-neon)] flex items-center justify-center border border-gray-900 hover:border-[var(--color-rose-neon)]/20 transition-all"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Back to explore link */}
            <div className="text-left mt-2">
              <Link href="/search" className="text-xs font-bold text-gray-400 hover:text-white transition-colors">
                ← Continue shopping
              </Link>
            </div>
          </div>

          {/* Right: Checkout Summary */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Summary Card */}
            <div className="glass-card rounded-3xl p-6 flex flex-col gap-5">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> Order Summary
              </h3>

              <div className="flex flex-col gap-3.5 text-xs text-gray-400 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <strong className="text-gray-200">${subtotal}</strong>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[var(--color-rose-neon)]">
                    <span>Discount (20%):</span>
                    <strong>-${discount.toFixed(2)}</strong>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax (Included):</span>
                  <strong className="text-gray-200">$0.00</strong>
                </div>
                <hr className="border-gray-900" />
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total:</span>
                  <strong className="text-xl font-extrabold text-[var(--color-primary-neon)]">${total.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Coupons Card */}
            <div className="glass-card rounded-3xl p-6">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-purple-400" /> Promo Code
              </h3>
              <form onSubmit={applyCoupon} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter 'DESENIO2026'" 
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 bg-gray-950 border border-gray-900 focus:border-purple-500/50 rounded-xl text-xs text-white px-3.5 py-2.5 outline-none"
                />
                <button type="submit" className="px-4 py-2.5 bg-gray-900 border border-gray-800 hover:border-purple-500 text-xs font-bold text-white rounded-xl transition-all">
                  Apply
                </button>
              </form>
            </div>

            {/* Gateways and Payment */}
            <div className="glass-card rounded-3xl p-6 flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider pb-2 border-b border-gray-900 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[var(--color-primary-neon)]" /> Secure Checkout
              </h3>

              {/* Gateways Tab Selector */}
              <div className="grid grid-cols-4 gap-2">
                {(['stripe', 'paypal', 'momo', 'vnpay'] as const).map(gw => (
                  <button 
                    key={gw} 
                    onClick={() => setActiveGateway(gw)}
                    className={`py-2 text-[9px] font-extrabold text-white uppercase border rounded-xl transition-all ${
                      activeGateway === gw 
                        ? 'border-[var(--color-primary-neon)] bg-[var(--color-primary-neon)]/5 text-[var(--color-primary-neon)]' 
                        : 'border-gray-900 hover:border-gray-800 bg-transparent'
                    }`}
                  >
                    {gw}
                  </button>
                ))}
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full mt-2 py-3.5 btn-neon-gradient rounded-xl font-extrabold text-xs flex items-center justify-center gap-2"
              >
                Pay With {activeGateway.toUpperCase()} <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      ) : (
        /* Empty Cart State */
        <div className="text-center py-24 bg-gray-950/20 border border-gray-900/50 rounded-3xl p-8 max-w-lg mx-auto">
          <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center text-gray-500 mx-auto mb-4">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Your cart is empty</h3>
          <p className="text-xs text-gray-500 font-medium mb-6">You have no asset licenses currently in your cart.</p>
          <Link href="/search" className="px-6 py-2.5 btn-neon-gradient rounded-full text-xs font-bold text-black inline-block">
            Start Exploring
          </Link>
        </div>
      )}

    </div>
  );
}

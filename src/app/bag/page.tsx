'use client';

import { useCart } from '@/components/CartContext';
import Navbarcomponent from '@/components/navbar/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { CONTAINER_CLASS } from '@/lib/layout';

export default function BagPage() {
    const { items, updateQuantity, removeFromCart, totalPrice, totalItems, clearCart } = useCart();

    const checkIsLoggedIn = () => {
        if (typeof window === 'undefined') return false;
        return document.cookie.split('; ').some(c => c === 'showcase-logged-in=true');
    };

    const handleCheckout = () => {
        const loggedIn = checkIsLoggedIn();

        if (!loggedIn) {
            toast.error('Vui lòng đăng nhập trước khi tiến hành thanh toán!');
            
            const event = new CustomEvent('showcase-trigger-login');
            window.dispatchEvent(event);
            return;
        }
        toast.success('Đang chuyển đến trang thanh toán...');
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#F4EDDD', color: '#2A2118' }}>
            <Navbarcomponent />

            <div className={`${CONTAINER_CLASS} pt-[100px] pb-16`}>
                {/* Breadcrumb */}
                <div className="flex items-center gap-1.5 text-xs text-[#666157] mb-4">
                    <Link href="/" className="hover:text-[#843C2B] transition-colors no-underline">Home</Link>
                    <span>/</span>
                    <span className="text-[#2B2B2B] font-medium">Bag</span>
                </div>

                <h1 className="text-4xl font-bold text-[#2A2118] mb-8 mt-0">Your bag</h1>

                {items.length === 0 ? (
                    /* Empty state */
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="text-6xl opacity-30">🛍️</div>
                        <p className="text-lg font-semibold text-[#666157]">Giỏ hàng trống</p>
                        <p className="text-sm text-[#969083]">Hãy thêm sản phẩm để bắt đầu mua sắm.</p>
                        <Link
                            href="/products"
                            className="mt-2 px-6 py-3 rounded-full text-sm font-semibold text-white no-underline transition-all hover:scale-105"
                            style={{ background: '#843C2B' }}
                        >
                            Khám phá sản phẩm →
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        {/* LEFT: Cart items */}
                        <div className="flex-1 flex flex-col gap-3">
                            {items.map(({ product, quantity }) => (
                                <div
                                    key={product.id}
                                    className="flex items-center gap-4 bg-white/70 border border-black/5 rounded-2xl p-4 transition-shadow hover:shadow-md"
                                >
                                    {/* Product image */}
                                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#ece3d0]">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="64px"
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-[#2A2118] leading-snug line-clamp-1 m-0">
                                            {product.name}
                                        </p>
                                        <p className="text-xs text-[#969083] mt-0.5 m-0">{product.category}</p>
                                        <button
                                            onClick={() => {
                                                removeFromCart(product.id);
                                                toast.info(`Đã xóa "${product.name}" khỏi giỏ.`);
                                            }}
                                            className="text-xs text-[#843C2B] hover:underline mt-1 bg-transparent border-none cursor-pointer p-0 font-medium"
                                        >
                                            Remove
                                        </button>
                                    </div>

                                    {/* Quantity controls */}
                                    <div className="flex items-center gap-0 border border-[#2A2118]/20 rounded-full overflow-hidden flex-shrink-0">
                                        <button
                                            onClick={() => updateQuantity(product.id, quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center text-[#2A2118] hover:bg-[#ece3d0] transition-colors text-base font-light"
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center text-sm font-semibold text-[#2A2118]">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => updateQuantity(product.id, quantity + 1)}
                                            disabled={quantity >= product.stock}
                                            className="w-8 h-8 flex items-center justify-center text-[#2A2118] hover:bg-[#ece3d0] disabled:opacity-30 transition-colors text-base font-light"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Price */}
                                    <span className="text-sm font-bold flex-shrink-0 ml-2" style={{ color: '#8B4513' }}>
                                        ${(product.price * quantity).toLocaleString()}
                                    </span>
                                </div>
                            ))}

                            {/* Clear all */}
                            <button
                                onClick={() => {
                                    clearCart();
                                    toast.info('Đã xóa toàn bộ giỏ hàng.');
                                }}
                                className="self-start text-xs text-[#969083] hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer p-0 mt-1"
                            >
                                Xóa tất cả
                            </button>
                        </div>

                        {/* RIGHT: Order summary */}
                        <div className="w-full lg:w-[320px] flex-shrink-0 bg-white/70 border border-black/5 rounded-2xl p-6 sticky top-[100px]">
                            <h2 className="text-base font-bold text-[#2A2118] mb-5 mt-0">Order summary</h2>

                            <div className="flex flex-col gap-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[#666157]">Subtotal ({totalItems} item{totalItems > 1 ? 's' : ''})</span>
                                    <span className="font-semibold text-[#2A2118]">${totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#666157]">Shipping</span>
                                    <span className="font-semibold text-green-700">Free</span>
                                </div>
                            </div>

                            <div className="border-t border-black/10 mt-4 pt-4 flex justify-between items-center">
                                <span className="font-bold text-base text-[#2A2118]">Total</span>
                                <span className="font-extrabold text-lg" style={{ color: '#8B4513' }}>
                                    ${totalPrice.toLocaleString()}
                                </span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full mt-5 py-3.5 rounded-full font-bold text-sm text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                                style={{ background: '#843C2B' }}
                            >
                                Checkout
                            </button>

                            <p className="text-center text-[11px] text-[#969083] mt-3 mb-0">
                                You'll be asked to sign in to complete your order.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
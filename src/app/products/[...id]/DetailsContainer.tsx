'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Product } from '@/lib/types';
import { useCart } from '@/components/CartContext';

interface DetailsContainerProps {
    product: Product;
}

function StarIcon({ className = 'w-4 h-4', color = '#C2922E' }: { className?: string; color?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={color} className={className}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.538 1.118l-3.367-2.448a1 1 0 00-1.176 0l-3.367 2.448c-.783.57-1.838-.196-1.538-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.285-3.957z" />
        </svg>
    );
}

function DetailsContainer({ product }: DetailsContainerProps) {
    const [wishlisted, setWishlisted] = useState(false);
    const [qty, setQty] = useState(1);
    const outOfStock = product.stock <= 0;
    const { addToCart } = useCart();

    const handleAddToBag = () => {
        addToCart(product, qty);
        toast.success(`Đã thêm ${qty}x "${product.name}" vào giỏ hàng.`);
    };

    const handleWishlist = () => {
        setWishlisted((w) => !w);
        toast.success(wishlisted ? 'Đã bỏ khỏi danh sách yêu thích.' : 'Đã thêm vào danh sách yêu thích.');
    };

    const decreaseQty = () => setQty(q => Math.max(1, q - 1));
    const increaseQty = () => setQty(q => Math.min(product.stock, q + 1));

    return (
        <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs text-[#666157] mb-6 flex-wrap">
                <Link href="/" className="hover:text-[#843C2B] transition-colors no-underline">Home</Link>
                <span>/</span>
                <Link
                    href={`/products?category=${encodeURIComponent(product.category)}`}
                    className="hover:text-[#843C2B] transition-colors no-underline"
                >
                    {product.category}
                </Link>
                <span>/</span>
                <span className="text-[#2B2B2B] font-medium">{product.name}</span>
            </div>

            <div className="flex flex-col md:flex-row gap-10 items-start">
                {/* CỘT TRÁI: Ảnh sản phẩm */}
                <div className="w-full md:w-[440px] flex-shrink-0">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#ece3d0]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 440px"
                            priority
                            className="object-cover"
                        />
                        <span className="absolute top-3 left-3 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#8B4513]">
                            {product.category}
                        </span>
                        <div className="absolute inset-x-0 bottom-0 p-5 pt-16 bg-gradient-to-t from-black/75 via-black/15 to-transparent">
                            <p className="text-white text-lg font-bold leading-snug">{product.name}</p>
                        </div>
                    </div>
                </div>

                {/* CỘT PHẢI: Thông tin sản phẩm */}
                <div className="w-full flex-1">
                    <h1 className="text-3xl sm:text-4xl font-bold text-[#2B2B2B] mb-2 mt-0 leading-tight">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-3 flex-wrap text-sm mb-5">
                        <span className="flex items-center gap-1 font-semibold text-[#2B2B2B]">
                            <StarIcon className="w-4 h-4" />
                            {product.rating}
                        </span>
                        <span className="text-[#DED6C4]">·</span>
                        <span className={`font-medium ${outOfStock ? 'text-red-600' : 'text-green-700'}`}>
                            {outOfStock ? 'Hết hàng' : `Còn ${product.stock} sản phẩm`}
                        </span>
                    </div>

                    <p className="text-3xl font-extrabold mb-5 mt-0" style={{ color: '#8B4513' }}>
                        ${product.price.toLocaleString()}
                    </p>

                    <p className="text-sm leading-relaxed text-[#4A453E] mb-7 max-w-[520px]">
                        {product.description}
                    </p>

                    {/* Quantity selector */}
                    {!outOfStock && (
                        <div className="flex items-center gap-3 mb-5">
                            <span className="text-sm font-medium text-[#666157]">Số lượng</span>
                            <div className="flex items-center gap-0 border border-[#2B2B2B]/20 rounded-full overflow-hidden">
                                <button
                                    onClick={decreaseQty}
                                    disabled={qty <= 1}
                                    className="w-9 h-9 flex items-center justify-center text-[#2B2B2B] hover:bg-[#ece3d0] disabled:opacity-30 transition-colors text-lg font-light"
                                >
                                    −
                                </button>
                                <span className="w-9 text-center text-sm font-semibold text-[#2B2B2B]">
                                    {qty}
                                </span>
                                <button
                                    onClick={increaseQty}
                                    disabled={qty >= product.stock}
                                    className="w-9 h-9 flex items-center justify-center text-[#2B2B2B] hover:bg-[#ece3d0] disabled:opacity-30 transition-colors text-lg font-light"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    )}

                    {/* CTA buttons */}
                    <div className="flex items-center gap-3 mb-8 flex-wrap">
                        <button
                            onClick={handleAddToBag}
                            disabled={outOfStock}
                            className="px-6 py-3 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            style={{ background: '#843C2B' }}
                        >
                            {outOfStock ? 'Hết hàng' : `Thêm vào giỏ — $${(product.price * qty).toLocaleString()}`}
                        </button>
                        <button
                            onClick={handleWishlist}
                            className="px-5 py-3 rounded-full font-semibold text-sm border transition-colors"
                            style={{
                                borderColor: '#262220',
                                color: wishlisted ? '#843C2B' : '#2B2B2B',
                            }}
                        >
                            {wishlisted ? '♥ Đã yêu thích' : '♡ Yêu thích'}
                        </button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 pt-6 border-t border-black/10 max-w-[520px]">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969083] mb-1">Danh mục</p>
                            <p className="text-sm font-medium text-[#2B2B2B] m-0">{product.category}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969083] mb-1">Đánh giá</p>
                            <p className="text-sm font-medium text-[#2B2B2B] m-0">{product.rating} / 5</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969083] mb-1">Tình trạng</p>
                            <p className="text-sm font-medium text-[#2B2B2B] m-0">{outOfStock ? 'Hết hàng' : 'Còn hàng'}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#969083] mb-1">Mã sản phẩm</p>
                            <p className="text-sm font-medium text-[#2B2B2B] m-0">#{String(product.id).padStart(6, '0')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsContainer;
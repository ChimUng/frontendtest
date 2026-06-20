'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link
            href={`/products/${product.id}`}
            className="no-underline flex-shrink-0 block rounded-[15px] overflow-hidden focus:outline-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className={`w-[175px] bg-[#FBF7EE] border border-black/5 rounded-[15px] overflow-hidden transition-all duration-300 transform
                ${hovered ? '-translate-y-2 shadow-[0_8px_28px_rgba(0,0,0,0.12)]' : 'translate-y-0 shadow-[0_2px_8px_rgba(0,0,0,0.06)]'}`}
            >
                {/* Khu vực chứa Image — chừa lề 3 cạnh để lộ nền card (~90%) */}
                <div className="p-2 pb-0">
                    <div className="relative h-[210px] w-full overflow-hidden rounded-[10px]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="175px"
                            loading="lazy"
                            className={`object-cover transition-transform duration-500 ease-out ${hovered ? 'scale-105' : 'scale-100'}`}
                        />

                        {/* Badge phân loại giữ nguyên góc trái trên ảnh */}
                        <span className="absolute top-2 left-2 text-white text-[9px] font-semibold px-2 py-0.5 rounded-md bg-[#8B4513]">
                            {product.category}
                        </span>

                        {/* Overlay tên sản phẩm — ĐÈ LÊN ẢNH (Giữ nguyên từ bản update của bạn) */}
                        <div className="absolute inset-x-0 bottom-0 p-2.5 pt-8 bg-gradient-to-t from-black/75 via-black/25 to-transparent">
                            <p className="text-white text-[12px] font-semibold leading-snug line-clamp-2">
                                {product.name}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Phần thông tin chữ bên dưới: Bao gồm cả Tên sản phẩm, Giá và Đánh giá */}
                <div className="px-2.5 py-2.5">
                    {/* Tên sản phẩm xuất hiện thêm ở dưới (Giữ lại info dưới) */}
                    <p className="text-[#2A2118] text-[12px] font-semibold leading-snug line-clamp-2 mb-2">
                        {product.name}
                    </p>

                    {/* Hàng chứa Giá và Badge Rate ở bên phải */}
                    <div className="flex items-center justify-between">
                        {/* Giá */}
                        <span className="text-sm font-bold" style={{ color: '#8B4513' }}>
                            ${product.price.toLocaleString()}
                        </span>

                        {/* Badge đánh giá chuyển từ trên ảnh xuống nằm bên phải giá */}
                        <div className="flex items-center gap-0.5 text-[#2A2118] text-[11px] font-bold">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3" style={{ color: '#C2922E' }}>
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.538 1.118l-3.367-2.448a1 1 0 00-1.176 0l-3.367 2.448c-.783.57-1.838-.196-1.538-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.285-3.957z" />
                            </svg>
                            {product.rating}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface AdBannerProps {
    data: Product[];
}

function AdBanner({ data }: AdBannerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fading, setFading] = useState(false);

    const goToNext = () => {
        setFading(true);
        setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % data.length);
            setFading(false);
        }, 250);
    };

    // Tự động nhảy ảnh sau mỗi 5 giây
    useEffect(() => {
        if (data.length <= 1) return;
        const t = setInterval(goToNext, 5000);
        return () => clearInterval(t);
    }, [data.length]);

    if (!data || data.length === 0) return null;

    const item = data[currentIndex];

    return (
        <div className="relative w-full h-[200px] sm:h-[200px] rounded-[20px] overflow-hidden bg-[#1a1a24] select-none shadow-sm">
            
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${fading ? 'opacity-0' : 'opacity-100'}`}>
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority
                    sizes="(max-width: 1200px) 100vw, 1200px"
                    className="object-cover object-center"
                />
                {/* Lớp phủ gradient từ trái qua phải để làm nổi bật chữ bên trái */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>

            {/* HÀNG CHỨA NỘI DUNG: CHỮ BÊN TRÁI - NÚT BÊN PHẢI */}
            <div className="absolute inset-0 z-10 flex items-center justify-between px-6 sm:px-12 md:px-16">
                
                {/* Khối Thông tin bên trái */}
                <div className={`max-w-[60%] transition-all duration-300 transform ${fading ? 'opacity-0 -translate-x-2' : 'opacity-100 translate-x-0'}`}>
                    <span className="inline-block px-2.5 py-0.5 mb-2 text-[10px] font-bold text-white uppercase tracking-wider rounded-full bg-[#C2922E]">
                        Chương trình ưu đãi
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight line-clamp-1">
                        {item.name}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-gray-300 line-clamp-2 max-w-[450px]">
                        {item.description || 'Cơ hội sở hữu sản phẩm cao cấp với mức giá ưu đãi tốt nhất trong tháng này. Số lượng có hạn!'}
                    </p>
                </div>

                {/* Khối Nút bấm bên phải */}
                <div className={`transition-all duration-300 transform ${fading ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}`}>
                    <Link href={`/products/${item.id}`}>
                        <button 
                            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap shadow-md"
                            style={{
                                background: '#C2922E',
                                boxShadow: '0 4px 14px rgba(194,146,46,0.3)',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#ab7e24')}
                            onMouseLeave={e => (e.currentTarget.style.background = '#C2922E')}
                        >
                            Mua ngay
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default AdBanner;
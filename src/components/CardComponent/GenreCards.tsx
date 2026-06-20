'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';
import { genreOptions } from '@/lib/mockData'; 

interface GenreCardsProps {
    data: Product[];
    cardid: string;
    eyebrow?: string;    
    viewAllHref?: string;
}

function GenreCards({ data, cardid, eyebrow = 'Khám phá ngay', viewAllHref }: GenreCardsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { events } = useDraggable(containerRef as React.MutableRefObject<HTMLDivElement>);
    
    const [leftActive, setLeftActive] = useState(false);
    const [rightActive, setRightActive] = useState(false);

    // Hàm kiểm tra và cập nhật trạng thái ẩn/hiện nút mũi tên
    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            const scrollPos = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            setLeftActive(scrollPos > 10);
            setRightActive(scrollPos < maxScroll - 10);
        }
    };

    useEffect(() => {
        handleScroll();
        // Thêm listener phòng trường hợp resize màn hình
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, [data]);

    const scroll = (amount: number) => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({ left: amount, behavior: 'smooth' });
            setTimeout(() => handleScroll(), 350);
        }
    };

    // Hàm đếm số lượng sản phẩm dựa trên category
    const getProductCount = (categoryValue: string) => {
        if (!data) return 0;
        return data.filter(p => p.category.toLowerCase() === categoryValue.toLowerCase()).length;
    };

    return (
        <div className="relative w-full my-8">
            
            {/* HEADER COMPONENT (Eyebrow, Title, View All) */}
            <div className="flex items-end justify-between mb-4 px-1">
                <div>
                    {eyebrow && (
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#8B4513]/70 mb-0.5">
                            {eyebrow}
                        </p>
                    )}
                    <h2 className="text-xl md:text-2xl font-bold text-[#2A2118]">
                        {cardid}
                    </h2>
                </div>
                
                {viewAllHref && (
                    <Link href={viewAllHref} className="text-xs font-bold text-[#8B4513] hover:underline transition-colors flex items-center gap-1">
                        Xem tất cả
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </Link>
                )}
            </div>

            {/* MŨI TÊN TRÁI */}
            <button
                onClick={() => scroll(-400)}
                className={`absolute left-[-15px] top-[60%] z-20 -translate-y-1/2 bg-white/90 hover:bg-white border border-black/5 text-[#2A2118] p-2 rounded-full transition-all duration-300 shadow-md
                    ${leftActive ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* MŨI TÊN PHẢI */}
            <button
                onClick={() => scroll(400)}
                className={`absolute right-[-15px] top-[60%] z-20 -translate-y-1/2 bg-white/90 hover:bg-white border border-black/5 text-[#2A2118] p-2 rounded-full transition-all duration-300 shadow-md
                    ${rightActive ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-2'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* DANH SÁCH HÀNG NGANG (Scroll Row) */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                {...events}
                className="flex gap-4 overflow-x-auto pb-3 select-none scrollbar-none scroll-smooth"
                style={{ cursor: 'grab' }}
            >
                {genreOptions.map((genre) => {
                    const count = getProductCount(genre.value);
                    
                    return (
                        <Link 
                            href={`/products?category=${genre.value}`} 
                            key={genre.value} 
                            className="flex-shrink-0 block focus:outline-none"
                        >
                            <div className="relative group w-[180px] h-[105px] rounded-[10px] overflow-hidden border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] bg-[#FBF7EE]">
                                {/* Ảnh nền mờ nhẹ phía sau */}
                                <Image
                                    src={genre.cover}
                                    alt={genre.name}
                                    fill
                                    sizes="180px"
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                                />
                                
                                {/* Lớp phủ (Overlay) Nâu Cam thay vì Đen hoàn toàn */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2A2118]/90 via-[#8B4513]/40 to-[#8B4513]/10 transition-opacity duration-300 group-hover:opacity-95" />
                                
                                {/* Phần text hiển thị thông tin đè lên ảnh */}
                                <div className="absolute inset-x-0 bottom-0 p-3 z-10 flex flex-col justify-end h-full">
                                    <p className="text-white text-[13px] font-bold leading-tight tracking-wide mb-0.5">
                                        {genre.name}
                                    </p>
                                    <p className="text-white/70 text-[10px] font-medium">
                                        {count} sản phẩm
                                    </p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default GenreCards;
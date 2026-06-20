'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface HerosectionProps {
    data: Product[];
}

function Herosection({ data }: HerosectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fading, setFading] = useState(false);

    const goTo = (idx: number) => {
        if (idx === currentIndex) return;
        setFading(true);
        setTimeout(() => { setCurrentIndex(idx); setFading(false); }, 250);
    };

    const goToNext = () => {
        setFading(true);
        setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % data.length);
            setFading(false);
        }, 250);
    };

    const goToPrev = () => {
        setFading(true);
        setTimeout(() => {
            setCurrentIndex(prev => (prev - 1 + data.length) % data.length);
            setFading(false);
        }, 250);
    };

    useEffect(() => {
        if (data.length <= 1) return;
        const t = setInterval(goToNext, 6000);
        return () => clearInterval(t);
    }, [data.length]);

    if (!data || data.length === 0) return null;

    const item = data[currentIndex];

    return (
        <div className="relative w-full overflow-hidden rounded-[10px] bg-[#0a0a0f]
            h-[62vh] sm:h-[55vh] md:h-[50vh]
            min-h-[480px] sm:min-h-[420px] md:min-h-[380px]">

            {/* Background image */}
            <div
                className="absolute inset-0 transition-opacity duration-400"
                style={{ opacity: fading ? 0 : 1 }}
            >
                <Image
                    src={item.image}
                    alt={item.name || "Product Image"}
                    priority={true}
                    loading="eager"
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
            </div>

            {/* Gradient overlay — 3 layers */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: `
                    linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%),
                    linear-gradient(180deg, rgba(0,0,0,0) 40%, #0a0a0f 100%),
                    linear-gradient(270deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 80%)
                `,
            }} />

            {/* MŨI TÊN TRÁI */}
            {data.length > 1 && (
                <button
                    onClick={goToPrev}
                    aria-label="Slide trước"
                    className="absolute left-3 sm:left-4 top-1/2 z-20 -translate-y-1/2 bg-white hover:bg-white/90 text-black p-2.5 rounded-full transition-all duration-300 shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                </button>
            )}

            {/* MŨI TÊN PHẢI */}
            {data.length > 1 && (
                <button
                    onClick={goToNext}
                    aria-label="Slide kế tiếp"
                    className="absolute right-3 sm:right-4 top-1/2 z-20 -translate-y-1/2 bg-white hover:bg-white/90 text-black p-2.5 rounded-full transition-all duration-300 shadow-lg"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            )}

            {/* Info panel — căn giữa theo chiều dọc của Herosection */}
            <div
                className="absolute top-1/2 left-[6%] sm:left-[7%] w-[85%] sm:w-[65%] md:w-[45%] z-[2]"
                style={{
                    opacity: fading ? 0 : 1,
                    transform: fading ? 'translateY(calc(-50% + 8px))' : 'translateY(-50%)',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}
            >
                {/* Eyebrow */}
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#ADB7AB' }}>
                    #{currentIndex + 1} · {item.category}
                </p>

                {/* Title */}
                <h1 className="font-bold text-white mb-3 leading-tight line-clamp-2" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.6rem)' }}>
                    {item.name}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-4 flex-wrap mb-3">
                    <span className={`text-sm font-medium flex items-center gap-1.5 ${item.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25M9 12.25v4.5m3-4.75v4.5m3-5.25v4.5" />
                        </svg>
                        {item.stock > 0 ? `Còn ${item.stock} sản phẩm` : 'Hết hàng'}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-6 line-clamp-2 sm:line-clamp-3" style={{ color: '#b0b0c0' }}>
                    {item.description}
                </p>

                {/* Price + CTA */}
                <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-3xl font-extrabold" style={{ color: '#8B4513' }}>
                        ${item.price.toLocaleString()}
                    </span>

                    <Link href={`/products/${item.id}`}>
                        <button
                            className="px-6 py-2.5 rounded-full font-semibold text-sm text-white transition-all duration-300 transform hover:scale-105"
                            style={{
                                background: '#C2922E',
                                boxShadow: '0 4px 16px rgba(194,146,46,0.4)',
                                border: 'none',
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#ab7e24')}
                            onMouseLeave={e => (e.currentTarget.style.background = '#C2922E')}
                        >
                            Xem chi tiết
                        </button>
                    </Link>
                </div>
            </div>

            {/* Dots */}
            {data.length > 1 && (
                <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-[3] flex gap-2">
                    {data.map((_, i) => (
                        <span
                            key={i}
                            onClick={() => goTo(i)}
                            className="block h-[10px] rounded-full cursor-pointer transition-all duration-300"
                            style={{
                                width: i === currentIndex ? '28px' : '10px',
                                background: i === currentIndex ? '#C2922E' : 'rgba(255,255,255,0.4)',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Herosection;
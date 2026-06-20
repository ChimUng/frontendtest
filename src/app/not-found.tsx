'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
            style={{ backgroundColor: '#F4EDDD', color: '#2A2118', fontFamily: 'Inter, sans-serif' }}
        >
            {/* Background decorative circles */}
            <div
                className="absolute top-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #C2922E, transparent)' }}
            />
            <div
                className="absolute bottom-[-60px] left-[-60px] w-[240px] h-[240px] rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #8B4513, transparent)' }}
            />

            {/* Big 404 */}
            <div className="relative mb-2 select-none">
                <span
                    className="text-[140px] sm:text-[200px] font-black leading-none tracking-tighter"
                    style={{
                        color: 'transparent',
                        WebkitTextStroke: '2px #C2922E',
                        opacity: 0.18,
                    }}
                >
                    404
                </span>
                {/* Floating label on top */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.25em] mb-2" style={{ color: '#8B4513' }}>
                            Lạc đường rồi
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-bold m-0 text-[#2A2118] leading-snug">
                            Trang không tồn tại
                        </h1>
                    </div>
                </div>
            </div>

            {/* Subtitle */}
            <p className="text-sm text-[#969083] text-center max-w-[340px] mt-2 mb-8 leading-relaxed">
                Có vẻ trang bạn tìm đã bị di chuyển, xóa, hoặc chưa bao giờ tồn tại. Hãy thử tìm kiếm hoặc quay về trang chủ nhé.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                    href="/"
                    className="px-6 py-3 rounded-full text-sm font-semibold text-white no-underline transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ background: '#843C2B' }}
                >
                    ← Về trang chủ
                </Link>
                <Link
                    href="/products"
                    className="px-6 py-3 rounded-full text-sm font-semibold border no-underline transition-all duration-300 hover:bg-[#ece3d0]"
                    style={{ borderColor: '#2A2118', color: '#2A2118' }}
                >
                    Xem sản phẩm
                </Link>
            </div>
        </div>
    );
}
'use client';

import React from 'react';
import Link from 'next/link';
import Container from '@/components/Container';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{ background: '#261E1A', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '60px' }}>

            {/* Main content (Chia làm 4 cột lớn) */}
            <Container className="pt-12 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">

                    {/* CỘT 1: Brand + Mô tả + Social Icons */}
                    <div className="lg:col-span-1.5 flex flex-col justify-between">
                        <div>
                            <Link href="/" className="flex items-center gap-2 no-underline text-[#F4EDDD]">
                                <div className="w-8 h-8 rounded-full bg-[#DFA837] flex items-center justify-center text-[#261E1A] font-bold text-sm">
                                    P
                                </div>
                                <span className="font-serif font-black text-sm tracking-tight">
                                    Pages & Co.
                                </span>
                            </Link>
                            <p className="text-[0.8rem] text-[#DED6C4] opacity-80 mt-4 leading-relaxed max-w-[240px]">
                                An independent bookshop for readers who like to take their time. Open since 1998.
                            </p>
                        </div>

                        {/* Di chuyển Social Icons lên đây */}
                        <div className="flex items-center gap-3 mt-6">
                            <Link href="https://linkedin.com" target="_blank" className="w-7 h-7 rounded-full border border-[#DED6C4] opacity-70 hover:opacity-100 flex items-center justify-center text-[#F4EDDD] text-xs transition-opacity">
                                In
                            </Link>
                            <Link href="https://x.com" target="_blank" className="w-7 h-7 rounded-full border border-[#DED6C4] opacity-70 hover:opacity-100 flex items-center justify-center text-[#F4EDDD] text-xs transition-opacity">
                                X
                            </Link>
                            <Link href="https://facebook.com" target="_blank" className="w-7 h-7 rounded-full border border-[#DED6C4] opacity-70 hover:opacity-100 flex items-center justify-center text-[#F4EDDD] text-xs transition-opacity">
                                f
                            </Link>
                        </div>
                    </div>

                    {/* CỘT 2: SHOP */}
                    <div>
                        <h3 className="font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: '#C2922E' }}>
                            Shop
                        </h3>
                        <ul className="flex flex-col gap-2.5 text-[0.8rem] text-[#DED6C4] opacity-80 list-none p-0">
                            <li><Link href="/shop/new" className="hover:text-white transition-colors no-underline">New arrivals</Link></li>
                            <li><Link href="/shop/bestsellers" className="hover:text-white transition-colors no-underline">Bestsellers</Link></li>
                            <li><Link href="/fiction" className="hover:text-white transition-colors no-underline">Fiction</Link></li>
                            <li><Link href="/children" className="hover:text-white transition-colors no-underline">Children</Link></li>
                            <li><Link href="/gift-cards" className="hover:text-white transition-colors no-underline">Gift cards</Link></li>
                        </ul>
                    </div>

                    {/* CỘT 3: ABOUT */}
                    <div>
                        <h3 className="font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: '#C2922E' }}>
                            About
                        </h3>
                        <ul className="flex flex-col gap-2.5 text-[0.8rem] text-[#DED6C4] opacity-80 list-none p-0">
                            <li><Link href="/our-story" className="hover:text-white transition-colors no-underline">Our story</Link></li>
                            <li><Link href="/events" className="hover:text-white transition-colors no-underline">Events</Link></li>
                            <li><Link href="/visit" className="hover:text-white transition-colors no-underline">Visit the shop</Link></li>
                            <li><Link href="/journal" className="hover:text-white transition-colors no-underline">Journal</Link></li>
                        </ul>
                    </div>

                    {/* CỘT 4: HELP */}
                    <div>
                        <h3 className="font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: '#C2922E' }}>
                            Help
                        </h3>
                        <ul className="flex flex-col gap-2.5 text-[0.8rem] text-[#DED6C4] opacity-80 list-none p-0">
                            <li><Link href="/shipping" className="hover:text-white transition-colors no-underline">Shipping</Link></li>
                            <li><Link href="/returns" className="hover:text-white transition-colors no-underline">Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors no-underline">FAQ</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors no-underline">Contact</Link></li>
                        </ul>
                    </div>

                    {/* CỘT 5: THE READING ROOM (Form Newsletter) */}
                    <div className="lg:col-span-1">
                        <h3 className="font-semibold text-xs uppercase tracking-wider mb-4" style={{ color: '#C2922E' }}>
                            The Reading Room
                        </h3>
                        <p className="text-[0.8rem] text-[#DED6C4] opacity-80 mb-4 leading-relaxed">
                            One handpicked recommendation in your inbox each week.
                        </p>
                        <div className="flex items-center gap-2 w-full max-w-xs">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 bg-transparent border border-[rgba(255,255,255,0.15)] text-xs text-white placeholder-[#969083] px-3 py-2 rounded outline-none focus:border-[#C2922E] transition-all"
                            />
                            <button className="bg-[#C2922E] hover:bg-[#A67B24] text-[#261E1A] font-semibold text-xs px-4 py-2 rounded transition-colors whitespace-nowrap">
                                Join
                            </button>
                        </div>
                    </div>

                </div>
            </Container>

            {/* Đường gạch ngang nhỏ mờ phân chia */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

            {/* Bottom bar tầng dưới cùng */}
            <Container className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Bản quyền bên trái */}
                <span className="text-[0.75rem] text-[#DED6C4] opacity-50">
                    © {year} Pages & Co. · <Link href="/privacy" className="hover:text-white transition-colors no-underline">Privacy</Link> · <Link href="/terms" className="hover:text-white transition-colors no-underline">Terms</Link>
                </span>

                {/* Dòng chữ vận chuyển miễn phí thay thế vị trí social cũ */}
                <span className="text-[0.75rem] text-[#DED6C4] opacity-60 font-medium tracking-wide">
                    Free shipping on orders over $35
                </span>
            </Container>
        </footer>
    );
}

export default Footer;
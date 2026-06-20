'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
} from '@nextui-org/react';
import { useAuthAction } from '@/hooks/useAuthAction';
import Container from '@/components/Container';
import LoginModal from '@/components/LoginModal';
import CartBadge from './CartBadge';

function Navbar() {
    const router = useRouter();
    const { logout, loading } = useAuthAction();
    const [isScrolled, setIsScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const check = () => {
            const loggedIn = document.cookie
                .split('; ')
                .some(c => c === 'showcase-logged-in=true');
            setIsLoggedIn(loggedIn);
        };
        
        const handleTriggerLogin = () => {
            setIsLoginOpen(true);
        };

        check();
        window.addEventListener('showcase-auth-changed', check);
        
        window.addEventListener('showcase-trigger-login', handleTriggerLogin);

        return () => {
            window.removeEventListener('showcase-auth-changed', check);
            window.removeEventListener('showcase-trigger-login', handleTriggerLogin);
        };
    }, []);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious();
        if (previous !== undefined && latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setIsScrolled(latest > 50);
    });

    const handleLogout = async () => {
        await logout();
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        if (searchValue.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchValue.trim())}`);
        } else {
            router.push('/products');
        }
    };

    return (
        <>
            <motion.nav
                variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
                animate={hidden ? 'hidden' : 'visible'}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="fixed top-0 left-0 right-0 z-50 h-14 transition-colors duration-300"
                style={{
                    background: isScrolled
                        ? 'rgba(244, 237, 221, 0.85)'
                        : '#F4EDDD',
                    backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                }}
            >
                <Container className="h-full flex items-center justify-between">
                    {/* KHU VỰC BÊN TRÁI: Brand + Menu Links */}
                    <div className="flex items-center gap-4 lg:gap-6 shrink-0">
                        {/* Brand Logo - Giảm text-xl xuống text-lg chống gãy chữ */}
                        <Link href="/" className="flex items-center gap-2 no-underline text-[#2B2B2B] shrink-0">
                            <div className="w-8 h-8 rounded-full bg-[#843C2B] flex items-center justify-center text-white font-bold text-base shrink-0">
                                P
                            </div>
                            <span className="font-serif font-black text-lg tracking-tight whitespace-nowrap">
                                Pages & Co.
                            </span>
                        </Link>

                        {/* Navigation Links - Giảm gap từ 6 xuống 4 và text-sm xuống text-xs */}
                        <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
                            <Link href="/" className="text-xs font-medium text-[#666157] hover:text-black transition-colors no-underline whitespace-nowrap">Home</Link>
                            <Link href="/products" className="text-xs font-medium text-[#666157] hover:text-black transition-colors no-underline whitespace-nowrap">Shop All</Link>
                            <Link href="/fiction" className="text-xs font-medium text-[#666157] hover:text-black transition-colors no-underline whitespace-nowrap">Fiction</Link>
                            <Link href="/mystery" className="text-xs font-medium text-[#666157] hover:text-black transition-colors no-underline whitespace-nowrap">Mystery</Link>
                            <Link href="/children" className="text-xs font-medium text-[#666157] hover:text-black transition-colors no-underline whitespace-nowrap">Children</Link>
                            <Link href="/poetry" className="text-xs font-medium text-[#666157] hover:text-black transition-colors no-underline whitespace-nowrap">Poetry</Link>
                        </div>
                    </div>

                    {/* KHU VỰC BÊN PHẢI: Search + Auth + Giỏ hàng */}
                    <div className="flex items-center gap-2 lg:gap-3 shrink-0">
                        <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
                            <input
                                type="text"
                                placeholder="Tìm kiếm sản phẩm..."
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="w-[180px] md:w-[220px] bg-[#262220]/5 focus:bg-white text-xs text-[#262220] placeholder-[#969083] px-3.5 py-1.5 rounded-full border border-transparent focus:border-[#262220]/20 outline-none transition-all duration-300"
                            />
                            <button type="submit" className="hidden">Tìm kiếm</button>
                        </form>

                        {/* Trạng thái Login / Avatar điều hướng */}
                        {isLoggedIn ? (
                            <Dropdown placement="bottom-end" classNames={{ content: 'bg-[#F4EDDD] border border-[#DED6C4]' }}>
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        color="default"
                                        size="sm"
                                        src="https://i.pravatar.cc/150"
                                        className="transition-transform w-7 h-7 rounded-full cursor-pointer border-[#843C2B] shrink-0"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="User Actions" variant="flat">
                                    <DropdownItem key="products">
                                        <Link href="/products" className="w-full h-full block no-underline text-[#2B2B2B]">
                                            Danh sách sản phẩm
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem
                                        key="logout"
                                        color="danger"
                                        isDisabled={loading}
                                        onClick={handleLogout}
                                    >
                                        <span className="font-semibold">
                                            {loading ? 'Đang xử lý...' : 'Đăng xuất'}
                                        </span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        ) : (
                            // Thu gọn padding nút Sign In bằng kích thước nút Bag
                            <button
                                onClick={() => setIsLoginOpen(true)}
                                className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2B2B2B] border border-[#262220] hover:bg-[#262220] hover:text-white transition-all duration-300 whitespace-nowrap shrink-0"
                            >
                                Sign in
                            </button>
                        )}

                        {/* Giỏ hàng (Bag Component) */}
                        <CartBadge />
                    </div>
                </Container>
            </motion.nav>

            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
}

export default Navbar;
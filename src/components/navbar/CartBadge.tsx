'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartContext';

export default function CartBadge() {
    const { totalItems } = useCart();

    return (
        <Link href="/bag" className="no-underline shrink-0">
            <div className="flex items-center gap-1.5 bg-[#262220] hover:bg-[#3D3734] transition-colors px-3.5 py-1.5 rounded-full text-white cursor-pointer shrink-0">
                <span className="text-xs font-bold tracking-wide whitespace-nowrap">Bag</span>
                <div className="bg-[#DFA837] text-[#262220] font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shrink-0">
                    {totalItems}
                </div>
            </div>
        </Link>
    );
}
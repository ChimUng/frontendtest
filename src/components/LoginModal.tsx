'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuthAction } from "@/hooks/useAuthAction";

// Logic validate giữ nguyên y hệt bản LoginForm cũ — không đổi gì cả
const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Vui lòng nhập email." })
        .email({ message: "Email không hợp lệ" }),
    password: z
        .string()
        .min(1, { message: "Vui lòng nhập mật khẩu." }),
});

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const { login, loading } = useAuthAction();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    });

    const { formState: { errors }, reset } = form;

    // Khoá scroll nền khi mở modal + cho phép đóng bằng phím Esc
    useEffect(() => {
        if (!isOpen) return;
        document.body.style.overflow = 'hidden';
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const success = await login(values.email, values.password);
        if (success) {
            reset();
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ background: 'rgba(38, 30, 26, 0.55)', backdropFilter: 'blur(3px)' }}
            onClick={onClose}
        >
            <div
                className="w-full max-w-[400px] rounded-2xl p-8 relative"
                style={{ background: '#F4EDDD', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Nút đóng */}
                <button
                    onClick={onClose}
                    aria-label="Đóng"
                    className="absolute top-6 right-6 text-[#666157] hover:text-[#2B2B2B] transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Logo */}
                <div className="w-10 h-10 rounded-full bg-[#843C2B] flex items-center justify-center text-white font-bold text-lg mb-6">
                    P
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-bold text-[#2B2B2B] mb-1 mt-0">Welcome back</h2>
                <p className="text-sm text-[#666157] mb-6 mt-0">
                    Sign in to access your bag, orders and wishlist.
                </p>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    {/* Email */}
                    <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#666157] mb-1.5">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full h-11 px-3.5 rounded-lg text-sm text-[#2B2B2B] placeholder-[#969083] bg-white border border-[#DED6C4] outline-none focus:border-[#843C2B] transition-colors"
                            {...form.register('email')}
                        />
                        {errors.email && (
                            <p className="text-[#B3261E] text-xs mt-1.5 mb-0">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Mật khẩu */}
                    <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#666157] mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full h-11 px-3.5 rounded-lg text-sm text-[#2B2B2B] placeholder-[#969083] bg-white border border-[#DED6C4] outline-none focus:border-[#843C2B] transition-colors"
                            {...form.register('password')}
                        />
                        {errors.password && (
                            <p className="text-[#B3261E] text-xs mt-1.5 mb-0">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Nút Sign in */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 mt-2 rounded-lg text-white font-semibold text-sm transition-opacity"
                        style={{
                            background: '#843C2B',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? 'Đang xử lý...' : 'Sign in'}
                    </button>
                </form>

                <p className="text-center text-sm text-[#666157] mt-5 mb-0">
                    New here?{' '}
                    <Link href="/register" className="text-[#843C2B] font-medium hover:underline">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginModal;
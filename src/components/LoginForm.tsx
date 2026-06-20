"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useAuthAction } from "@/hooks/useAuthAction"

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Vui lòng nhập email." })
        .email({ message: "Email không hợp lệ" }),
    password: z
        .string()
        .min(1, { message: "Vui lòng nhập mật khẩu." }),
})

const LoginForm = () => {
    const { login, loading } = useAuthAction()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: "", password: "" },
    })

    const { formState: { errors } } = form

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await login(values.email, values.password)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Email */}
            <div>
                <label style={{
                    display: 'block', fontSize: '13px', fontWeight: 500,
                    color: '#a1a1aa', marginBottom: '6px'
                }}>
                    Email
                </label>
                <input
                    type="email"
                    placeholder="user@example.com"
                    style={{
                        width: '100%', height: '42px',
                        padding: '0 14px', boxSizing: 'border-box',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        color: '#fff', fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        colorScheme: 'dark',
                    }}
                    onFocus={e => e.target.style.borderColor = '#0079CE'}
                    {...form.register('email', {
                        onBlur: (e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                    })}
                />
                {errors.email && (
                    <p style={{ color: '#f87171', fontSize: '12px', marginTop: '5px', marginBottom: 0 }}>
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Mật khẩu */}
            <div>
                <label style={{
                    display: 'block', fontSize: '13px', fontWeight: 500,
                    color: '#a1a1aa', marginBottom: '6px'
                }}>
                    Mật khẩu
                </label>
                <input
                    type="password"
                    placeholder="••••••••"
                    style={{
                        width: '100%', height: '42px',
                        padding: '0 14px', boxSizing: 'border-box',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '10px',
                        color: '#fff', fontSize: '14px',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        colorScheme: 'dark',
                    }}
                    onFocus={e => e.target.style.borderColor = '#0079CE'}
                    {...form.register('password', {
                        onBlur: (e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'
                    })}
                />
                {errors.password && (
                    <p style={{ color: '#f87171', fontSize: '12px', marginTop: '5px', marginBottom: 0 }}>
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Nút đăng nhập */}
            <button
                type="submit"
                disabled={loading}
                style={{
                    width: '100%', height: '42px', marginTop: '4px',
                    borderRadius: '10px', border: 'none',
                    background: loading
                        ? 'rgba(0,121,206,0.4)'
                        : 'linear-gradient(90deg, #0079CE, #4D148c)',
                    color: '#fff', fontWeight: 600, fontSize: '14px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'opacity 0.2s',
                    boxShadow: '0 4px 16px rgba(0,121,206,0.3)',
                }}
                onMouseEnter={e => { if (!loading) (e.currentTarget).style.opacity = '0.88' }}
                onMouseLeave={e => { if (!loading) (e.currentTarget).style.opacity = '1' }}
            >
                {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
        </form>
    )
}

export default LoginForm
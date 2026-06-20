'use client'

import { useState } from 'react'
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const useAuthAction = () => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    // Trả về true/false để component gọi (vd: LoginModal) biết có nên đóng modal hay không
    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            setLoading(true)

            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (response.ok && data.success) {
                toast.success(data.message || 'Đăng nhập thành công.')

                // Không còn ép điều hướng sang /products nữa — người dùng đang ở đâu thì ở đó,
                // chỉ làm mới dữ liệu server + báo cho Navbar (và các nơi khác) biết trạng thái đã đổi
                router.refresh()
                window.dispatchEvent(new Event('showcase-auth-changed'))
                return true
            } else {
                toast.error(data.error || 'Đăng nhập thất bại. Vui lòng thử lại.')
                return false
            }
        }
        catch (err: any) {
            console.error('Login error:', err)
            toast.error('Đã xảy ra lỗi kết nối hệ thống!')
            return false
        }
        finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            setLoading(true)
            await fetch('/api/logout', { method: 'POST' }).catch(() => {})
            toast.success('Hẹn gặp lại.')
            window.dispatchEvent(new Event('showcase-auth-changed'))
            // /login không còn tồn tại nữa nên logout xong đưa về trang chủ
            router.push('/')
            router.refresh()
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, login, logout }
}
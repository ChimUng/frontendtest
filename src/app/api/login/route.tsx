// src/app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { mockUsers } from "@/lib/mockData";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email và mật khẩu là bắt buộc" },
                { status: 400 }
            );
        }

        const user = mockUsers.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            return NextResponse.json(
                { error: "Email hoặc mật khẩu không chính xác" },
                { status: 401 }
            );
        }

        const token = Buffer.from(`${user.id}:${user.email}`).toString("base64");
        const { password: _, ...userWithoutPassword } = user;

        const response = NextResponse.json(
            { success: true, message: "Đăng nhập thành công", user: userWithoutPassword },
            { status: 200 }
        );

        // Cookie 1: token bảo mật — httpOnly, JS không đọc được
        response.cookies.set("showcase-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 3, // 3 tiếng
        });

        // Cookie 2: cờ hiệu — KHÔNG httpOnly, JS đọc được để Navbar biết trạng thái
        response.cookies.set("showcase-logged-in", "true", {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 3, // cùng thời hạn
        });

        return response;
    } catch {
        return NextResponse.json(
            { error: "Lỗi hệ thống phía Server" },
            { status: 500 }
        );
    }
}
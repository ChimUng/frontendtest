// src/app/api/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const response = NextResponse.json(
            { success: true, message: "Đăng xuất thành công" },
            { status: 200 }
        );

        // Xóa cả 2 cookie bằng cách đặt maxAge = 0
        response.cookies.set("showcase-token", "", {
            httpOnly: true,
            path: "/",
            maxAge: 0,
        });

        response.cookies.set("showcase-logged-in", "", {
            httpOnly: false,
            path: "/",
            maxAge: 0,
        });

        return response;
    } catch {
        return NextResponse.json(
            { error: "Lỗi hệ thống phía Server" },
            { status: 500 }
        );
    }
}
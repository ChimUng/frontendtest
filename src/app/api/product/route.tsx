import { NextRequest, NextResponse } from "next/server";
import { mockProducts } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // 1. Lấy toàn bộ query parameters từ URL (khớp với Searchcard.tsx gửi lên)
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const sort = searchParams.get("sort"); 
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const rating = searchParams.get("rating");
    
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10); // Frontend đang gửi 12

    let filtered = [...mockProducts];

    // 2. Lọc theo từ khóa tìm kiếm (Search)
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) => 
          p.name.toLowerCase().includes(searchLower) || 
          (p.description && p.description.toLowerCase().includes(searchLower))
      );
    }

    // 3. Lọc theo danh mục (Category)
    if (category) {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    // 4. Lọc theo khoảng giá (Price Range)
    if (minPrice) {
      filtered = filtered.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseFloat(maxPrice));
    }

    // 5. Lọc theo đánh giá (Rating) - Giả sử user muốn lọc sản phẩm có rating >= mức chọn
    if (rating) {
      filtered = filtered.filter((p) => p.rating >= parseFloat(rating));
    }

    // 6. Sắp xếp (Sort)
    if (sort) {
      filtered.sort((a, b) => {
        switch (sort) {
          case "price_asc": // Giả sử value từ frontend là price_asc
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "rating_desc":
            return b.rating - a.rating;
          case "name_asc":
            return a.name.localeCompare(b.name);
          case "name_desc":
            return b.name.localeCompare(a.name);
          default:
            return 0; // Không sắp xếp nếu không khớp
        }
      });
    }

    // 7. Phân trang (Pagination)
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProducts = filtered.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        success: true,
        data: paginatedProducts,
        // Cập nhật lại format trả về cho khớp với Searchcard.tsx (cần field lastPage)
        lastPage: Math.ceil(filtered.length / limit) || 1,
        pagination: {
          page,
          limit,
          total: filtered.length,
          totalPages: Math.ceil(filtered.length / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
# 🛍️ Product Showcase

> Hệ thống trưng bày sản phẩm nội bộ — xây dựng bằng **Next.js 16**, **Tailwind CSS & Custom CSS**, **NextUI** và **Framer Motion....**.

---

## ✨ Tính năng nổi bật

- 🏠 **Trang chủ** — Hero slider tự động, genre cards, product rows cuộn ngang kéo-thả, ad banner
- 🔍 **Danh mục sản phẩm** — Tìm kiếm realtime (debounce), lọc theo danh mục / giá / đánh giá, sắp xếp nhiều tiêu chí, phân trang
- 📦 **Chi tiết sản phẩm** — Gallery, chọn số lượng, thêm giỏ, wishlist, sản phẩm liên quan
- 🛒 **Giỏ hàng** — Cập nhật số lượng, xóa sản phẩm, tính tổng tiền, checkout gated by login
- 🔐 **Xác thực** — Login modal (cookie-based, không redirect), logout, trạng thái navbar cập nhật tức thì
- 📱 **Responsive** — Mobile-first, bộ lọc collapsible trên mobile

---

## 🖼️ Giao diện

> **Hướng dẫn thêm ảnh:** Chụp màn hình → upload lên [Imgur](https://imgur.com/upload) → copy link `.png` trực tiếp → thay vào `YOUR_IMAGE_LINK` bên dưới.  
> Hoặc tạo thư mục `/docs/screenshots/` trong repo rồi dùng đường dẫn tương đối `./docs/screenshots/home.png`.

| Trang chủ | Danh mục sản phẩm |
|:---------:|:-----------------:|
| ![Home](YOUR_IMAGE_LINK_HOME) | ![Products](YOUR_IMAGE_LINK_PRODUCTS) |

| Chi tiết sản phẩm | Giỏ hàng |
|:-----------------:|:--------:|
| ![Detail](YOUR_IMAGE_LINK_DETAIL) | ![Bag](YOUR_IMAGE_LINK_BAG) |

---

## 🛠️ Tech Stack

| Layer | Công nghệ |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| UI Components | NextUI v2, Headless UI |
| Animation | Framer Motion |
| Form | React Hook Form + Zod |
| Toast | Sonner |
| Data | Mock data (in-memory) |

---

## 🚀 Chạy local

### Yêu cầu

- **Node.js** ≥ 18.17
- **npm** ≥ 9 (hoặc yarn / pnpm / bun)

### Các bước

```bash
# 1. Clone repo
git clone https://github.com/your-username/productshowcase.git
cd productshowcase

# 2. Cài dependencies
npm install

# 3. Chạy dev server
npm run dev
```

Mở trình duyệt tại **[http://localhost:3000](http://localhost:3000)**

> **Lưu ý:** Không cần file `.env` — dự án dùng mock data, không kết nối database hay dịch vụ ngoài.

---

## 🔑 Tài khoản demo

| Role | Email | Password |
|------|-------|----------|
| User | `user@example.com` | `password123` |
| Admin | `admin@example.com` | `admin123` |

---

## 📁 Cấu trúc thư mục

```
src/
├── app/
│   ├── api/              # Route handlers (login, logout, product)
│   ├── bag/              # Trang giỏ hàng
│   ├── products/         # Danh mục + chi tiết sản phẩm
│   └── page.tsx          # Trang chủ
├── components/
│   ├── CardComponent/    # ProductCard, ProductCards, GenreCards
│   ├── catalogcomponent/ # ProductsCatalog, Searchcard, options
│   ├── home/             # Herosection, AdBanner
│   ├── navbar/           # Navbar, CartBadge
│   ├── CartContext.tsx   # Global cart state
│   ├── LoginModal.tsx    # Modal đăng nhập
│   └── Footer.tsx
├── hooks/
│   └── useAuthAction.ts  # Login / logout logic
├── lib/
│   ├── mockData.ts       # Dữ liệu mẫu (50 sản phẩm, 2 users)
│   ├── types.ts
│   └── layout.ts
└── utils/
    ├── MotionDiv.ts
    └── UseDebounce.ts
```

---

## 📜 Scripts

```bash
npm run dev      # Chạy development server (hot reload)
npm run build    # Build production
npm run start    # Chạy production build
npm run lint     # Kiểm tra ESLint
```
# Decision Log

> **Tổng thời gian:** ~1 ngày rưỡi làm việc theo đúng yêu cầu đề bài.  
> **Quy trình chung:** Đọc & phân tích layout → tổ chức semantic HTML + tách component → implement responsive (Flexbox/Grid) → viết JS cho interactions.

---

## [DAY 1 — 13:00] - Khởi động dự án & chọn tech stack nền tảng

### Tình huống
Bắt đầu bằng việc đọc kỹ yêu cầu đề bài và phân tích cấu trúc layout tổng thể: có bao nhiêu trang, mỗi trang gồm những block nào, block nào có thể tái sử dụng. Xác định luồng người dùng chính: Home → Catalog → Detail → Bag → Checkout. Từ đó mới chọn stack phù hợp.

### Các phương án đã cân nhắc

| Phương án | Lý do chọn / không chọn |
|-----------|--------------------------|
| **Next.js 16 (App Router)** ✅ | File-based routing, Server Components, API Routes tích hợp — không cần backend riêng, cấu trúc thư mục phản ánh đúng cấu trúc layout đã phân tích |
| Vite + React SPA | Thiếu SSR/API route, phải dựng Express riêng thêm bước |
| Next.js 14 Pages Router | App Router hiện đại hơn, layout nesting ăn khớp với phân tích component |

**Quyết định:** Next.js 16 App Router + TypeScript làm nền tảng chính.

---

## [DAY 1 — 13:30] - Chọn styling & component library

### Tình huống
Sau khi phân tích layout, xác định cần: warm brown color palette tùy chỉnh (`#843C2B`, `#C2922E`, `#F4EDDD`), nhiều component tương tác phức tạp (Accordion filter, Select, Pagination, Radio group), responsive từ mobile lên desktop.

### Các phương án đã cân nhắc

| Phương án | Lý do chọn / không chọn |
|-----------|--------------------------|
| **Tailwind CSS v3** ✅ | Utility-first, implement Flexbox/Grid nhanh, responsive breakpoint sẵn, không cần file CSS riêng |
| **NextUI v2** ✅ | Accordion, Select, Pagination, Radio — những component nặng về accessibility mà viết từ đầu tốn cả ngày |
| Chakra UI | Bundle lớn hơn, ít tùy chỉnh hơn với Tailwind |
| shadcn/ui | Phù hợp nhưng cần nhiều setup hơn NextUI cho bộ lọc catalog |
| CSS Modules thuần | Khả thi nhưng chậm hơn đáng kể trong deadline 2 ngày |

**Quyết định:** Tailwind xử lý layout & custom style; NextUI xử lý component tương tác phức tạp.

---

## [DAY 1 — 14:00] - Phân tích & xây dựng layout Trang Home

### Tình huống
Trang Home là trang phức tạp nhất về layout: Hero slider full-width, Genre cards scroll ngang, Product rows kéo thả, Ad banner, Footer. Cần phân tích rõ từng block trước khi code để tách component đúng.

**Phân tích layout Home:**
```
<RootLayout>           ← layout.tsx — global (Navbar, Footer, Providers)
  <Navbar />           ← fixed top, hide-on-scroll
  <Herosection />      ← full-width slider, text overlay căn giữa dọc
  <GenreCards />       ← horizontal scroll row, drag-to-scroll
  <ProductCards />     ← horizontal scroll row (×3 section khác nhau)
  <AdBanner />         ← full-width banner với fade transition
  <Footer />           ← 5-column grid
```

Các component tái sử dụng nhận diện được: `ProductCard` (dùng trong cả Home lẫn Catalog), `Container` (max-width wrapper), `CartBadge`, `LoginModal`.

### Các phương án đã cân nhắc

| Phương án | Lý do chọn / không chọn |
|-----------|--------------------------|
| **Framer Motion `whileInView`** ✅ | Section fade-in khi scroll vào viewport, stagger tự nhiên |
| **`react-use-draggable-scroll`** ✅ | Drag-to-scroll ngang cho card rows mà không conflict với click link |
| CSS `scroll-snap` thuần | Không có drag-to-scroll trên desktop |
| Intersection Observer tự viết | Framer Motion đã bao gồm, không cần thêm code |

**Quyết định:** Framer Motion cho entrance animation; `react-use-draggable-scroll` + custom arrow visibility logic bằng `scrollLeft` listener cho card rows.

---

## [DAY 1 — 17:00] - Xây dựng layout Trang Product Catalog

### Tình huống
Trang `/products` là trang phức tạp nhất về interaction: sidebar filter + product grid + search + sort + pagination, tất cả phải sync với nhau. Phân tích layout trước khi implement.

**Phân tích layout Catalog:**
```
<ProductsCatalog>
  ├── Top bar: [SearchInput] [CategorySelect] [SortSelect] [ClearBtn]
  │            [MobileFilterToggle] (hidden desktop)
  ├── Mobile filter panel (collapsible, hidden desktop)
  └── Main row (Flexbox):
      ├── Left sidebar 160px (sticky top, hidden mobile)
      │   ├── <Accordion> Price Range filter
      │   └── <Accordion> Rating filter
      └── Right content (flex-1)
          └── <Searchcard>
              ├── Product grid (CSS Grid responsive)
              ├── Empty state
              └── <Pagination>
```

Responsive strategy: sidebar ẩn hoàn toàn trên mobile, thay bằng collapsible panel drop từ top bar xuống.

### Các phương án đã cân nhắc

| Phương án | Lý do chọn / không chọn |
|-----------|--------------------------|
| **Local state + Debounce 500ms** ✅ | Search realtime không giật, state đồng bộ qua props |
| **CSS Grid responsive cho product grid** ✅ | `grid-cols-2 → 3 → 4` tự động theo breakpoint |
| URL search params as single source of truth | Phức tạp hóa UX (browser history spam khi gõ search) |
| React Query / SWR | Hữu ích nhưng `useEffect + fetch` đủ dùng, tránh thêm dependency |
| Filter client-side hoàn toàn | Không scale, bundle data lớn xuống client |

**Quyết định:** `ProductsCatalog` giữ toàn bộ filter state, pass xuống `Searchcard` qua props; `Searchcard` chỉ lo fetch & render.

---

## [DAY 2 — 09:00] - Xây dựng layout Trang Product Detail & Bag

### Tình huống
Hai trang còn lại cần layout sạch, tập trung vào nội dung. Detail có layout 2 cột (ảnh trái, info phải); Bag có layout 2 cột (cart list trái, order summary phải sticky). Cả hai cần collapse về 1 cột trên mobile.

**Phân tích layout Detail:**
```
<ProductDetailPage>
  ├── Breadcrumb navigation
  ├── Main: Flexbox 2 cột (md:flex-row)
  │   ├── Trái: Image (aspect-ratio 4/3, rounded)
  │   └── Phải: [Name] [Rating] [Price] [Description]
  │              [Qty selector] [Add to bag] [Wishlist]
  │              [Meta grid: category, rating, stock, ID]
  └── Related products: <ProductCards /> horizontal scroll
```

**Phân tích layout Bag:**
```
<BagPage>
  ├── Breadcrumb
  ├── Empty state (conditional)
  └── Main: Flexbox gap-8 (lg:flex-row)
      ├── Trái flex-1: Cart item list (image + info + qty + price)
      └── Phải w-320px sticky: Order summary + Checkout btn
```

### Các phương án đã cân nhắc

| Phương án | Lý do chọn / không chọn |
|-----------|--------------------------|
| **Flexbox 2-col với `md:flex-row`** ✅ | Collapse tự nhiên về 1 cột trên mobile, không cần media query tay |
| CSS Grid 2-col fixed | Kém linh hoạt hơn khi cột phải có width cố định (320px) |
| **`position: sticky` cho Order summary** ✅ | Summary bám theo scroll trong khi cart list dài |
| Sidebar fixed absolute | Phức tạp hơn, dễ overlap content |

**Quyết định:** Flexbox layout + sticky sidebar cho Bag; 2-col Flexbox tự collapse cho Detail.

---

## [DAY 2 — 10:30] - Animation & UX motion

### Tình huống
Hero section slider và ad banner cần transition mượt. Navbar cần ẩn khi scroll xuống, hiện khi scroll lên.

### Các phương án đã cân nhắc

| Phương án | Lý do chọn / không chọn |
|-----------|--------------------------|
| **Framer Motion** ✅ | `useScroll` + `useMotionValueEvent` cho navbar; `opacity` transition cho slider |
| CSS `@keyframes` thuần | Khó trigger chính xác theo scroll direction |
| React Spring | API phức tạp hơn cho use case này |

**Quyết định:** Framer Motion `variants` + `animate` prop cho navbar hide/show; CSS `transition-opacity` đủ dùng cho slider fade.

---

## [DAY 2 — 13:00] - Quản lý state giỏ hàng

### Tình huống
Giỏ hàng cần chia sẻ state giữa Navbar badge, trang Bag, và trang Detail. Ngày 2 tập trung vào các interaction logic phức tạp hơn.

### Các phương án đã cân nhắc

| Phương án | Lý do chọn / không chọn |
|-----------|--------------------------|
| **React Context + useState** ✅ | Zero dependency, đủ dùng, setup nhanh |
| Zustand | Overkill, thêm dependency không cần thiết |
| Redux Toolkit | Quá phức tạp cho cart đơn giản |
| localStorage trực tiếp | Không reactive, không sync giữa component |

**Quyết định:** `CartContext` với `useCallback` memoized actions.

---

## [DAY 2 — 14:00] - Xác thực người dùng (Auth)

### Tình huống
Cần login/logout thật (cookie, checkout gate) không có database. Navbar cần biết auth state ngay lập tức sau login mà không reload trang.

### Các phương án đã cân nhắc

| Phương án | Lý do chọn / không chọn |
|-----------|--------------------------|
| **Cookie dual-layer** ✅ | `showcase-token` (httpOnly, bảo mật) + `showcase-logged-in` (JS-readable cho Navbar) |
| NextAuth.js | Overkill với mock data |
| JWT localStorage | XSS vulnerable |
| Session server-side | Cần database hoặc Redis |

**Quyết định:** API Route tự viết + cookie kép + `CustomEvent` `showcase-auth-changed` broadcast để Navbar cập nhật tức thì.

---

## [DAY 2 — 15:00] - Form validation & Notification system

### Tình huống
Login form cần validate inline. Tất cả interactions (add to cart, login, logout, remove item) cần feedback tức thì cho người dùng.

### Các phương án đã cân nhắc

| Form | Phương án | Lý do |
|------|-----------|-------|
| **React Hook Form + Zod** ✅ | Uncontrolled inputs, schema TypeScript-inferred |
| Formik + Yup | Verbose hơn, API cũ hơn |

| Toast | Phương án | Lý do |
|-------|-----------|-------|
| **Sonner** ✅ | ~3kB, `richColors`, dark theme, setup 1 dòng |
| React Toastify | Nặng hơn, CSS import riêng |
| React Hot Toast | Ít customization |

---

## [DAY 2 — 16:00] - Tổng kết & quy trình làm việc với AI

### Tình huống
Hoàn thiện toàn bộ luồng, review responsive, xử lý edge cases (hết hàng, giỏ trống, không tìm thấy sản phẩm, 404).

### Ghi chú thời gian & quy trình AI

Dự án hoàn thành trong **2 ngày** đúng theo yêu cầu đề bài. Tốc độ đạt được nhờ:

- **Kinh nghiệm & template cá nhân sẵn có:** Các pattern như Context/Hook, dual-cookie auth, debounce search, component tách biệt theo layout — đây là skill tích lũy từ thực tế, không phải tra cứu lại từ đầu
- **Next.js App Router proficiency:** Routing, Server Components, API Routes quen tay, không mất thời gian đọc docs cơ bản
- **Quy trình AI — 2 model song song:**
  - Sử dụng **Claude + Gemini chạy song song**: một model đóng vai reviewer phân tích logic & chỉ ra edge case, model còn lại nhận prompt idea đã được tối ưu để generate suggestion nhanh hơn
  - Cách này giúp **tối ưu prompt đầu vào**, tăng chất lượng output mỗi lần query thay vì phải hỏi đi hỏi lại
  - AI hỗ trợ các phần như: review cookie strategy, gợi ý cấu trúc Tailwind class cho responsive breakpoint, cross-check edge case logic
  - **Phần lớn code, kiến trúc và quyết định design vẫn đến từ kinh nghiệm và judgment cá nhân** — AI là accelerator, không phải author

> Tư duy ứng dụng AI không phải "để AI viết thay", mà là **dùng đúng model đúng việc, prompt chuẩn hướng dev muốn giải quyết để ra output tốt nhất trong thời gian ngắn nhất** — đây cũng là một kỹ năng thực tế trong môi trường làm việc hiện đại.
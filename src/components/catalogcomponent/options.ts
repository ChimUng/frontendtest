export interface FilterOption {
    name: string;
    value: string;
    type: string;
}

export const categoryOptions: FilterOption[] = [
    { name: "Thiết bị điện tử (Electronics)", value: "Electronics", type: "category" },
    { name: "Linh kiện & Nguồn (Power)", value: "Power", type: "category" },
    { name: "Phụ kiện máy tính", value: "Accessories", type: "category" },
    { name: "Thiết bị âm thanh", value: "Audio", type: "category" },
    { name: "Thiết bị lưu trữ", value: "Storage", type: "category" }
];

export const sortbyOptions: FilterOption[] = [
    { name: "Giá: Cao đến Thấp", value: "price_desc", type: "sort" },
    { name: "Giá: Thấp đến Cao", value: "price_asc", type: "sort" },
    { name: "Đánh giá cao nhất", value: "rating_desc", type: "sort" },
    { name: "Sản phẩm mới nhất", value: "latest", type: "sort" },
    { name: "Tên A → Z",        value: "name_asc", type: "sort" },
    { name: "Tên Z → A",        value: "name_desc", type: "sort" },
];

export const ratingOptions = [
    { name: "Từ 4.5 sao trở lên", value: "4.5" },
    { name: "Từ 4.0 sao trở lên", value: "4.0" },
    { name: "Từ 3.5 sao trở lên", value: "3.5" }
];

export const priceRangeOptions = [
    { name: "Dưới $50", value: "0-50" },
    { name: "Từ $50 - $200", value: "50-200" },
    { name: "Từ $200 - $500", value: "200-500" },
    { name: "Trên $500", value: "500-99999" }
];
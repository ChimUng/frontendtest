'use client';

import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import ProductCard from "../CardComponent/ProductCard";
import { Product } from "@/lib/types";
import UseDebounce from "@/utils/UseDebounce";

interface SearchcardProps {
    searchvalue: string;
    categoryvalue: string | null;
    sortbyvalue: string | null;
    priceRange: string | null;
    minPrice: string;
    maxPrice: string;
    ratingvalue: string | null;
}

const Searchcard: React.FC<SearchcardProps> = ({
    searchvalue,
    categoryvalue,
    sortbyvalue,
    priceRange,
    minPrice,
    maxPrice,
    ratingvalue
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState<Product[] | null>(null);
    const [lastpage, setLastpage] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    
    const debouncedSearch = UseDebounce(searchvalue, 500);

    // Reset trang hiện tại về 1 bất cứ khi nào có một tiêu chí lọc thay đổi
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, categoryvalue, sortbyvalue, priceRange, minPrice, maxPrice, ratingvalue]);

    useEffect(() => {
        const fetchSearchProducts = async () => {
            setLoading(true);
            try {
                // Phân tích logic chọn giá mẫu sẵn hoặc khoảng giá tự nhập tay
                let finalMinPrice = minPrice;
                let finalMaxPrice = maxPrice;
                
                if (priceRange) {
                    const parts = priceRange.split('-');
                    finalMinPrice = parts[0];
                    finalMaxPrice = parts[1];
                }

                // Thiết lập chuỗi tham số truy vấn chuẩn hóa gửi lên API Showcase nội bộ
                const queryParams = new URLSearchParams({
                    search: debouncedSearch,
                    category: categoryvalue || '',
                    sort: sortbyvalue || '',
                    minPrice: finalMinPrice,
                    maxPrice: finalMaxPrice,
                    rating: ratingvalue || '',
                    page: currentPage.toString(),
                    limit: '12' // Tăng số lượng item mỗi trang phù hợp với kết cấu lưới 6 cột
                });

                const res = await fetch(`/api/product?${queryParams.toString()}`);
                const json = await res.json();
                
                setProducts(json.data || []);
                setLastpage(json.lastPage || 1);
            } catch (error) {
                console.error("Lỗi đồng bộ tìm kiếm sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchSearchProducts();
    }, [debouncedSearch, categoryvalue, sortbyvalue, priceRange, minPrice, maxPrice, ratingvalue, currentPage]);

    return (
        <div className="w-full flex flex-col gap-4">
            
            {/* Trường hợp kết quả rỗng */}
            {!loading && products && products.length === 0 && (
                <div className="text-center w-full py-20 text-[#b0b0c0] bg-[#2A1F14] rounded-2xl border border-white/5">
                    <p className="text-lg font-medium">Rất tiếc!</p>
                    <p className="text-xs mt-1 text-gray-500">Không tìm thấy sản phẩm nào phù hợp với điều kiện lọc.</p>
                </div>
            )}

            {/* LƯỚI GRID KHÍT 6 CỘT - THU HẸP KHOẢNG CÁCH THỪA GIỮA CÁC CARDS */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 w-full justify-items-center">
                
                {/* Trạng thái giả lập Skeleton chuyển động khi đang tải */}
                {loading &&
                    Array.from({ length: 12 }, (_, index) => (
                        <div key={index} className="w-[165px] h-[240px] rounded-xl bg-[#2A1F14] border border-white/5 animate-pulse" />
                    ))
                }

                {/* Vẽ danh sách thẻ sản phẩm thật */}
                {!loading && products?.map((product) => (
                    <div key={product.id} className="transform hover:scale-[1.02] transition-transform duration-300">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {/* Điều hướng phân trang mẫu Blue cao cấp */}
            {!loading && lastpage > 1 && (
                <div className="flex justify-center mt-6 border-t border-white/5 pt-4">
                    <Pagination
                        total={lastpage}
                        page={currentPage}
                        onChange={setCurrentPage}
                        size="sm"
                        classNames={{
                            cursor: "bg-[#C2922E] text-white font-semibold shadow-lg shadow-[#C2922E]/20",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Searchcard;
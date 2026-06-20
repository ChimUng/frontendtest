'use client';

import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, Select, SelectItem, RadioGroup, Radio, Input, Button } from "@nextui-org/react";
import Searchcard from './Searchcard';
import { categoryOptions, sortbyOptions, ratingOptions, priceRangeOptions } from './options';

type ProductSearchParams = {
    category?: string[];
    sortby?: string;
    priceRange?: string;
    rating?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
};

interface ProductsCatalogProps {
    searchParams: ProductSearchParams;
}

function ProductsCatalog({ searchParams }: ProductsCatalogProps) {
    const initialCategory = searchParams.category && searchParams.category.length > 0 ? searchParams.category[0] : null;
    const { category, sortby, priceRange, rating, search, minPrice: urlMin, maxPrice: urlMax } = searchParams;
    const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
    const [sortbyvalue, setSortbyvalue] = useState<string | null>(sortby || null);
    const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(priceRange || null);
    const [selectedRating, setSelectedRating] = useState<string | null>(rating || null);
    const [searchvalue, setSearchvalue] = useState<string>(search || '');
    
    // States cho khoảng giá tự nhập tay
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    
    // Quản lý hiển thị thanh bộ lọc ẩn trên thiết bị di động
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    // Đồng bộ hóa ngược từ URL nếu có dữ liệu truyền vào ban đầu
    useEffect(() => {
        if (search !== undefined) setSearchvalue(search || '');
        if (category !== undefined) setSelectedCategory(category && category.length > 0 ? category[0] : null);
        if (sortby !== undefined) setSortbyvalue(sortby || null);
        if (priceRange !== undefined) setSelectedPriceRange(priceRange || null);
        if (rating !== undefined) setSelectedRating(rating || null);
        if (urlMin !== undefined) setMinPrice(urlMin || '');
        if (urlMax !== undefined) setMaxPrice(urlMax || '');
    }, [searchParams]);

    // Hàm dọn dẹp nhanh tất cả bộ lọc về trạng thái trống (Thùng rác)
    const resetFilters = () => {
        setSelectedCategory(null);
        setSortbyvalue(null);
        setSelectedPriceRange(null);
        setSelectedRating(null);
        setSearchvalue('');
        setMinPrice('');
        setMaxPrice('');
    };

    //  Định nghĩa logic kiểm tra trạng thái trống isFormEmpty để tối ưu hóa trải nghiệm người dùng
    const isFormEmpty =
        !selectedCategory &&
        !sortbyvalue &&
        !selectedPriceRange &&
        !selectedRating &&
        !searchvalue &&
        !minPrice &&
        !maxPrice;

    // Khi người dùng tự gõ khoảng giá, hủy kích hoạt ô chọn nhanh mẫu sẵn
    const handleCustomPriceChange = (type: 'min' | 'max', val: string) => {
        setSelectedPriceRange(null); // Xóa check mẫu sẵn
        if (type === 'min') setMinPrice(val);
        if (type === 'max') setMaxPrice(val);
    };

    // Lớp giao diện cấu hình chung để áp dụng hiệu ứng Highlight Màu Chủ Đạo (Blue #0079CE)
    const customSelectClasses = {
        trigger: "!bg-[#2A1F14] border border-[#8B4513]/40 hover:border-[#C2922E]/70 transition-colors rounded-xl !text-[#F4EDDD] data-[open=true]:border-[#C2922E]",
        popoverContent: "!bg-[#2A1F14] border border-[#8B4513]/40 rounded-xl !text-[#F4EDDD]",
        listbox: "p-1 !bg-[#2A1F14]",
        value: "!text-[#F4EDDD]",
        selectorIcon: "!text-[#C2922E]",
        innerWrapper: "!text-[#F4EDDD]",
    };

    const accordionItemClasses = {
        base: "!bg-[#2A1F14] rounded-xl",
        content: "pb-4 flex flex-col gap-3",
        heading: "!bg-[#2A1F14] rounded-xl px-2 border border-[#8B4513]/30",
        title: "!text-[#F4EDDD] text-sm font-semibold",
        trigger: "!text-[#F4EDDD]",
        indicator: "!text-[#C2922E]",
    };

    const filterFormContent = () => (
        <div className="flex flex-col gap-4">
            {/* Nhóm lọc Khoảng Giá */}
            <Accordion isCompact variant="splitted" defaultExpandedKeys={['price']} className="px-0 gap-2 flex flex-col">
                <AccordionItem 
                    key="price" 
                    aria-label="Price Filter" 
                    title="Khoảng Giá"
                    classNames={accordionItemClasses}
                >
                    <RadioGroup
                        value={selectedPriceRange || ""}
                        onValueChange={(val) => {
                            setSelectedPriceRange(val);
                            setMinPrice(''); // Xóa khoảng giá tự nhập để ưu tiên mẫu chọn
                            setMaxPrice('');
                        }}
                    >
                        {priceRangeOptions.map((p) => (
                            <Radio
                                value={p.value}
                                key={p.value}
                                classNames={{
                                    base: "gap-1.5",
                                    wrapper: "border-[#8B4513] group-data-[selected=true]:border-[#C2922E]",
                                    // Dot bên trong
                                    control: "bg-[#C2922E]",
                                    label: `text-xs ${selectedPriceRange === p.value ? "!text-[#C2922E] font-bold" : "!text-[#A89070]"}`
                                }}
                            >
                                {p.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                    
                    <div className="text-[10px] text-[#A89070] font-medium text-center border-t border-[#8B4513]/30 pt-2 mt-1">
                        HOẶC TỰ NHẬP
                    </div>
                    <div className="flex gap-2 items-center">
                        <Input 
                            type="number" 
                            placeholder="Từ $" 
                            aria-label="min price"
                            size="sm"
                            min={0}
                            value={minPrice}
                            onValueChange={(val) => handleCustomPriceChange('min', val)}
                            classNames={{
                                inputWrapper: "!bg-[#3D2B1A] border border-[#8B4513]/40 rounded-lg h-8 hover:border-[#C2922E]/60",
                                input: "!text-[#F4EDDD] placeholder:!text-[#A89070]",
                            }}
                        />
                        <span className="text-gray-500 text-xs">-</span>
                        <Input 
                            type="number" 
                            placeholder="Đến $" 
                            aria-label="max price"
                            size="sm"
                            min={0}
                            value={maxPrice}
                            onValueChange={(val) => handleCustomPriceChange('max', val)}
                            classNames={{
                                inputWrapper: "!bg-[#3D2B1A] border border-[#8B4513]/40 rounded-lg h-8 hover:border-[#C2922E]/60",
                                input: "!text-[#F4EDDD] placeholder:!text-[#A89070]",
                            }}
                        />
                    </div>
                </AccordionItem>
            </Accordion>

            {/* Nhóm lọc Đánh giá Rating */}
            <Accordion isCompact variant="splitted" defaultExpandedKeys={['rating']} className="px-0 gap-2 flex flex-col">
                <AccordionItem 
                    key="rating" 
                    aria-label="Rating Filter" 
                    title="Đánh Giá"
                    classNames={accordionItemClasses}
                >
                    <RadioGroup value={selectedRating || ""} onValueChange={setSelectedRating}>
                        {ratingOptions.map((r) => (
                            <Radio
                                value={r.value}
                                key={r.value}
                                classNames={{
                                    base: "gap-1.5",
                                    wrapper: "border-[#8B4513] group-data-[selected=true]:border-[#C2922E]",
                                    control: "bg-[#C2922E]",
                                    label: `text-xs ${selectedRating === r.value ? "!text-[#C2922E] font-bold" : "!text-[#A89070]"}`
                                }}
                            >
                                {r.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </AccordionItem>
            </Accordion>
        </div>
    );

    return (
        <div className="w-full min-h-screen py-4" style={{ backgroundColor: '#F4EDDD', color: '#2A2118' }}>
            
            {/* THANH ĐIỀU HƯỚNG TRÊN (DESKTOP BAR / MOBILE SEARCH) */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6 w-full">
                
                {/* Khung ô tìm kiếm chính */}
                <div className="w-full md:max-w-md flex gap-2">
                    <Input
                        type="text"
                        aria-label="Search items"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={searchvalue}
                        onValueChange={setSearchvalue}
                        isClearable
                        autoComplete="off"
                        classNames={{
                            inputWrapper: "!bg-[#EDE0C8] border border-[#8B4513]/30 rounded-xl h-11 hover:border-[#C2922E]/60",
                            input: "!text-[#2A2118] placeholder:!text-[#A89070]",
                            clearButton: "!text-[#8B4513]",
                        }}
                        startContent={
                            <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#8B4513' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        }
                    />
                    
                    {/* Nút bấm mở nhanh bộ lọc trên giao diện Mobile */}
                     <Button
                        isIconOnly
                        className="md:hidden !bg-[#EDE0C8] rounded-xl border border-[#8B4513]/30"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle filters"
                    >
                        <svg className="w-5 h-5" style={{ color: '#8B4513' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </Button>

                    {/* Nút xóa nhanh tất cả bộ lọc (Icon Thùng rác) */}
                    <Button
                        isIconOnly
                        className="!bg-[#EDE0C8] rounded-xl border border-[#8B4513]/30 hover:!bg-red-100 group transition-colors"
                        onClick={resetFilters}
                        disabled={isFormEmpty}
                        aria-label="Clear all filters"
                    >
                        <svg className="w-4 h-4 group-hover:text-red-600 transition-colors" style={{ color: '#8B4513' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </Button>
                </div>

                {/* KHU VỰC CÁC Ô SELECT CHỈ XUẤT HIỆN TRÊN MÀN HÌNH LỚN */}
                <div className="hidden md:flex items-center gap-3 w-full md:w-auto">
                    <Select
                        aria-label="Select category"
                        placeholder="Tất cả danh mục"
                        selectedKeys={selectedCategory ? [selectedCategory] : []}
                        className="w-48"
                        classNames={customSelectClasses}
                        onSelectionChange={(keys) => {
                            const val = (keys as any).anchorKey || Array.from(keys)[0] || null;
                            setSelectedCategory(val);
                        }}
                    >
                        {categoryOptions.map((cat) => (
                            <SelectItem
                                key={cat.value}
                                textValue={cat.name}
                                className="!text-[#F4EDDD] data-[selected=true]:!bg-[#8B4513] data-[selected=true]:!text-[#F4EDDD] data-[hover=true]:!bg-[#C2922E]/30 transition-colors"
                            >
                                {cat.name}
                            </SelectItem>
                        ))}
                    </Select>
 
                    <Select
                        aria-label="Sort options"
                        placeholder="Sắp xếp theo"
                        selectedKeys={sortbyvalue ? [sortbyvalue] : []}
                        className="w-48"
                        classNames={customSelectClasses}
                        onSelectionChange={(keys) => {
                            const val = (keys as any).anchorKey || Array.from(keys)[0] || null;
                            setSortbyvalue(val);
                        }}
                    >
                        {sortbyOptions.map((item) => (
                            <SelectItem
                                key={item.value}
                                textValue={item.name}
                                className="!text-[#F4EDDD] data-[selected=true]:!bg-[#8B4513] data-[selected=true]:!text-[#F4EDDD] data-[hover=true]:!bg-[#C2922E]/30 transition-colors"
                            >
                                {item.name}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>

            {/* BỘ LỌC DẠNG DROPDOWN KHI CLICK TRÊN MOBILE */}
            {isMobileMenuOpen && (
                <div className="md:hidden w-full rounded-2xl p-4 mb-6 flex flex-col gap-4 border border-[#8B4513]/30" style={{ backgroundColor: '#EDE0C8' }}>
                    <div className="grid grid-cols-2 gap-3">
                        <Select
                            aria-label="Select category mobile"
                            placeholder="Danh mục"
                            selectedKeys={selectedCategory ? [selectedCategory] : []}
                            classNames={customSelectClasses}
                            onSelectionChange={(keys) => setSelectedCategory((keys as any).anchorKey || Array.from(keys)[0] || null)}
                        >
                            {categoryOptions.map((cat) => (
                                <SelectItem key={cat.value} className="!text-[#F4EDDD] data-[selected=true]:!bg-[#8B4513] data-[hover=true]:!bg-[#C2922E]/30">{cat.name}</SelectItem>
                            ))}
                        </Select>
 
                        <Select
                            aria-label="Sort options mobile"
                            placeholder="Sắp xếp"
                            selectedKeys={sortbyvalue ? [sortbyvalue] : []}
                            classNames={customSelectClasses}
                            onSelectionChange={(keys) => setSortbyvalue((keys as any).anchorKey || Array.from(keys)[0] || null)}
                        >
                            {sortbyOptions.map((item) => (
                                <SelectItem key={item.value} className="!text-[#F4EDDD] data-[selected=true]:!bg-[#8B4513] data-[hover=true]:!bg-[#C2922E]/30">{item.name}</SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="w-full flex flex-col gap-4 border-t border-[#8B4513]/20 pt-3">
                        {filterFormContent()}
                    </div>
                </div>
            )}

            {/* BỐ CỤC CHÍNH CHIA HAI BÊN (DESKTOP VIEW) */}
            <div className="flex gap-5 items-start w-full">
                
                {/* CỘT TRÁI: Accordion hiển thị cố định trên Desktop */}
                <div className="hidden md:block w-[160px] flex-shrink-0 sticky top-[90px]">
                    {filterFormContent()}
                </div>

                {/* CỘT PHẢI: Hiển thị lưới sản phẩm Searchcard */}
                <div className="w-full">
                    <Searchcard
                        searchvalue={searchvalue}
                        categoryvalue={selectedCategory}
                        sortbyvalue={sortbyvalue}
                        priceRange={selectedPriceRange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        ratingvalue={selectedRating}
                    />
                </div>
            </div>

        </div>
    );
}

export default ProductsCatalog;
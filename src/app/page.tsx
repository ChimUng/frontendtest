import { MotionDiv } from '@/utils/MotionDiv'
import Herosection from '@/components/home/Herosection';
import ProductCards from '@/components/CardComponent/ProductCards';
import { Product } from '@/lib/types';
import Navbarcomponent from '@/components/navbar/Navbar'
import GenreCards from '@/components/CardComponent/GenreCards';
import AdBanner from '@/components/home/AdBanner';
import { CONTAINER_CLASS } from '@/lib/layout';

async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch('http://localhost:3000/api/product', {
            next: { revalidate: 60 },
            cache: 'no-store'
        });
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Fetch lỗi:", error);
        return [];
    }
}

// Chuyển component thành async function
export default async function HomePage() {

    const products = await getProducts();

    return (
        <div style={{ minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            {/* <Navbar /> */}
            <Navbarcomponent />

            {/* Hero — floats under fixed navbar */}
             <div className={`${CONTAINER_CLASS} pt-[90px]`}>
                <Herosection data={products} />
            </div>

            <MotionDiv
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`${CONTAINER_CLASS} pb-6`}
            >
                <GenreCards data={products} cardid="Sản phẩm nổi bật" viewAllHref="/products" />
            </MotionDiv>


            {/* Product row */}
            <MotionDiv
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`${CONTAINER_CLASS} pb-6`}
            >
                <ProductCards data={products} cardid="Sản phẩm nổi bật" viewAllHref="/products" />
            </MotionDiv>

            {/* Adventis row */}
            <MotionDiv
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`${CONTAINER_CLASS} mt-12 pb-6`}
            >
                <AdBanner data={products} />
            </MotionDiv>

            {/* Product row */}
            <MotionDiv
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`${CONTAINER_CLASS} mt-12 pb-6`}
            >
                <ProductCards data={products} cardid="Sản phẩm bán chạy" viewAllHref="/products" />
            </MotionDiv>
            
            {/* Product row */}
            <MotionDiv
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className={`${CONTAINER_CLASS} mt-12 pb-6`}
            >
                <ProductCards data={products} cardid="Sản phẩm sắp về" viewAllHref="/products" />
            </MotionDiv>
        </div>
    );
}
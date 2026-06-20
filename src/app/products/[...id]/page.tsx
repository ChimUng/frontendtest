import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbarcomponent from '@/components/navbar/Navbar';
import DetailsContainer from './DetailsContainer';
import ProductCards from '@/components/CardComponent/ProductCards';
import { Product } from '@/lib/types';
import { CONTAINER_CLASS } from '@/lib/layout';

interface PageProps {
    params: Promise<{ id: string }>;
}

async function getProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`http://localhost:3000/api/product/${id}`, {
            cache: 'no-store',
        });
        if (!res.ok) return null;
        const json = await res.json();
        return json.data || null;
    } catch (error) {
        console.error('Fetch lỗi:', error);
        return null;
    }
}

async function getRelatedProducts(category: string, excludeId: number): Promise<Product[]> {
    try {
        const res = await fetch(
            `http://localhost:3000/api/product?category=${encodeURIComponent(category)}&limit=12`,
            { cache: 'no-store' }
        );
        const json = await res.json();
        const list: Product[] = json.data || [];
        return list.filter((p) => p.id !== excludeId);
    } catch (error) {
        console.error('Fetch lỗi:', error);
        return [];
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);
    return {
        title: product ? `${product.name} - Product Showcase` : 'Sản phẩm không tồn tại',
        description: product?.description,
    };
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    const relatedProducts = await getRelatedProducts(product.category, product.id);

    return (
        <div>
            <Navbarcomponent />

            <div className={`${CONTAINER_CLASS} pt-[90px]`}>
                <DetailsContainer product={product} />

                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <ProductCards data={relatedProducts} cardid="You may also like" viewAllHref={`/products?category=${product.category}`} eyebrow="" />
                    </div>
                )}
            </div>
        </div>
    );
}
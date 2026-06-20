import Catalog from '@/components/catalogcomponent/ProductsCatalog';
import Navbarcomponent from '@/components/navbar/Navbar';
import { Metadata } from 'next';
import { CONTAINER_CLASS } from '@/lib/layout';

interface PageProps {
  searchParams: Promise<{
    year?: string;
    category?: string | string[];   // có thể là 1 string hoặc mảng string
    search?: string;
    sortby?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Product Showcase - Danh mục sản phẩm',
        description: 'Tìm kiếm và lọc các sản phẩm công nghệ tối tân',
    };
}

const Page = async ({ searchParams }: PageProps) => {
    const params = await searchParams;

    return (
        <div>
            <Navbarcomponent />
            <div className={`${CONTAINER_CLASS} pt-[90px]`}>
                <Catalog
                    searchParams={{
                        category: Array.isArray(params.category)
                            ? params.category
                            : params.category
                            ? [params.category]
                            : [],
                        search: params.search,
                        sortby: params.sortby,
                    }}
                />
            </div>
        </div>
    );
};

export default Page;
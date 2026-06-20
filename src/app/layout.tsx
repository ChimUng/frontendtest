import { Inter } from 'next/font/google'
import './globals.css'
import { NextUiProvider } from "./NextUiProvider"; 
import { Toaster } from 'sonner'
import NextTopLoader from 'nextjs-toploader';
import Footer from '@/components/Footer'; 
import { CartProvider } from '@/components/CartContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Product Showcase - Quản lý nội bộ",
  description: "Hệ thống quản lý sản phẩm chuyên nghiệp",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) { 
  return (
    <html lang="en" className="text-foreground bg-background" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <NextTopLoader color="#C2922E" shadow="0 0 10px #C2922E, 0 0 5px #4D148c" />
        <NextUiProvider>
          <CartProvider>
            {children}
          </CartProvider>
          <Toaster richColors={true} closeButton={true} theme='dark'/>
        </NextUiProvider>
        <Footer />
      </body>
    </html>
  )
}
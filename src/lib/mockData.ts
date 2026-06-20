// Mock Users
export const mockUsers = [
    { id: 1, email: "user@example.com",  password: "password123", name: "John Doe"   },
    { id: 2, email: "admin@example.com", password: "admin123",    name: "Admin User" },
];

// Mock Products — 50 items
export const mockProducts = [
    // ── Electronics ──────────────────────────────────────────────────────────
    { id:  1, name: 'Laptop Pro 16',        category: 'Electronics', price: 1299.99, stock: 15, rating: 4.5, description: 'High-performance laptop with 16GB RAM and 512GB SSD',                       image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop' },
    { id:  2, name: '4K Monitor 27"',       category: 'Electronics', price:  599.99, stock:  8, rating: 4.7, description: '27-inch 4K UHD display with HDR support and 144Hz refresh rate',           image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop' },
    { id:  3, name: 'Gaming PC Tower',      category: 'Electronics', price: 1899.99, stock:  5, rating: 4.8, description: 'RTX 4080, Intel i9, 32GB DDR5 RAM, 2TB NVMe SSD',                         image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&h=600&fit=crop' },
    { id:  4, name: 'Ultrabook Air',        category: 'Electronics', price:  999.99, stock: 20, rating: 4.4, description: 'Ultra-thin 13" laptop, 12-hour battery, Intel Core i7',                   image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop' },
    { id:  5, name: 'Tablet Pro 12',        category: 'Electronics', price:  849.99, stock: 12, rating: 4.6, description: '12.9-inch display, M2 chip, perfect for creative work',                   image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop' },
    { id:  6, name: 'Smart TV 55"',         category: 'Electronics', price:  699.99, stock:  9, rating: 4.5, description: '55-inch 4K OLED Smart TV with Dolby Vision and Atmos',                    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&h=600&fit=crop' },
    { id:  7, name: 'Wireless Earbuds Pro', category: 'Electronics', price:  199.99, stock: 40, rating: 4.7, description: 'Active noise cancellation, 30h battery, spatial audio',                   image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=600&fit=crop' },
    { id:  8, name: 'Over-ear Headphones',  category: 'Electronics', price:  349.99, stock: 18, rating: 4.8, description: 'Premium studio-quality sound, 40h battery, foldable design',              image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop' },
    { id:  9, name: 'Bluetooth Speaker',    category: 'Electronics', price:   89.99, stock: 35, rating: 4.3, description: '360° surround sound, IPX7 waterproof, 20h playtime',                      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=600&fit=crop' },
    { id: 10, name: 'Smartphone X15',       category: 'Electronics', price:  999.99, stock: 25, rating: 4.6, description: '6.7" AMOLED, 200MP camera, 5000mAh, Snapdragon 8 Gen 3',                  image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop' },
    { id: 11, name: 'Action Camera 4K',     category: 'Electronics', price:  299.99, stock: 22, rating: 4.5, description: '4K/120fps, HyperSmooth stabilization, waterproof to 10m',                 image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=600&fit=crop' },
    { id: 12, name: 'Smart Watch Series 9', category: 'Electronics', price:  399.99, stock: 30, rating: 4.7, description: 'Health monitoring, GPS, 18h battery, Always-On Retina display',           image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop' },
    { id: 13, name: 'Mini Projector 4K',    category: 'Electronics', price:  549.99, stock:  7, rating: 4.4, description: '4K resolution, 1000 ANSI lumens, built-in Android TV',                    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop' },
    { id: 14, name: 'NAS Storage 8TB',      category: 'Electronics', price:  479.99, stock:  6, rating: 4.3, description: '2-bay network attached storage, RAID support, remote access',              image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop' },
    { id: 15, name: 'E-Reader Paperwhite',  category: 'Electronics', price:  139.99, stock: 45, rating: 4.6, description: '7" glare-free display, 12-week battery, 32GB storage',                    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop' },

    // ── Accessories ──────────────────────────────────────────────────────────
    { id: 16, name: 'Wireless Mouse Pro',   category: 'Accessories', price:   59.99, stock: 50, rating: 4.4, description: 'Ergonomic design, silent clicks, 2.4GHz + Bluetooth',                     image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop' },
    { id: 17, name: 'Mechanical Keyboard',  category: 'Accessories', price:  129.99, stock: 25, rating: 4.6, description: 'TKL layout, RGB backlight, hot-swap Cherry MX switches',                  image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=600&fit=crop' },
    { id: 18, name: 'USB-C Hub 10-in-1',   category: 'Accessories', price:   49.99, stock: 60, rating: 4.5, description: 'HDMI 4K, 3×USB-A, SD card, 100W PD charging',                            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
    { id: 19, name: 'Laptop Stand Aluminium',category:'Accessories', price:   39.99, stock: 55, rating: 4.7, description: 'Adjustable height, solid aluminium, compatible with all laptops',          image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop' },
    { id: 20, name: 'Webcam 4K Pro',        category: 'Accessories', price:  149.99, stock: 20, rating: 4.6, description: '4K 30fps, auto-focus, built-in stereo mic, privacy cover',                image: 'https://images.unsplash.com/photo-1587826083219-8a81a196b4c2?w=800&h=600&fit=crop' },
    { id: 21, name: 'Monitor Light Bar',    category: 'Accessories', price:   45.99, stock: 40, rating: 4.5, description: 'Asymmetric lighting, no glare on screen, touch dimmer',                   image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&h=600&fit=crop' },
    { id: 22, name: 'USB-C Cable 2m',       category: 'Accessories', price:   14.99, stock:100, rating: 4.2, description: '240W charging, 40Gbps data, braided nylon jacket',                        image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&h=600&fit=crop' },
    { id: 23, name: 'Mouse Pad XL',         category: 'Accessories', price:   24.99, stock: 70, rating: 4.4, description: '900×400mm, stitched edges, non-slip rubber base',                         image: 'https://images.unsplash.com/photo-1615751072497-5f5169febe17?w=800&h=600&fit=crop' },
    { id: 24, name: 'Wrist Rest Set',       category: 'Accessories', price:   29.99, stock: 45, rating: 4.3, description: 'Memory foam, anti-slip, keyboard + mouse combo set',                      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop' },
    { id: 25, name: 'HDMI 2.1 Cable 3m',   category: 'Accessories', price:   19.99, stock: 80, rating: 4.3, description: '8K@60Hz / 4K@144Hz, 48Gbps bandwidth, gold-plated',                      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop' },
    { id: 26, name: 'Cable Management Kit', category: 'Accessories', price:   18.99, stock: 90, rating: 4.2, description: '60-piece set: clips, sleeves, velcro ties, cable box',                    image: 'https://images.unsplash.com/photo-1601524909162-ae8725290836?w=800&h=600&fit=crop' },
    { id: 27, name: 'Screen Cleaner Kit',   category: 'Accessories', price:    9.99, stock:120, rating: 4.1, description: 'Anti-static spray + microfibre cloth, safe for OLED/LCD',                 image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop' },
    { id: 28, name: 'Laptop Sleeve 15"',    category: 'Accessories', price:   22.99, stock: 65, rating: 4.4, description: 'Water-resistant, velvet interior, dual zipper, fits up to 15.6"',         image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=600&fit=crop' },
    { id: 29, name: 'Portable Charger 30W', category: 'Accessories', price:   54.99, stock: 38, rating: 4.5, description: '20000mAh, 30W PD, charges laptop + phone simultaneously',                 image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=600&fit=crop' },
    { id: 30, name: 'Privacy Screen Filter',category: 'Accessories', price:   34.99, stock: 28, rating: 4.2, description: '14" anti-spy filter, blue-light blocking, easy on/off',                   image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop' },

    // ── Networking ───────────────────────────────────────────────────────────
    { id: 31, name: 'WiFi 6E Router',       category: 'Networking',  price:  249.99, stock: 14, rating: 4.7, description: 'Tri-band, 10Gbps WAN, OFDMA, covers 300m², MU-MIMO',                     image: 'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&h=600&fit=crop' },
    { id: 32, name: 'Mesh WiFi System 3pk', category: 'Networking',  price:  349.99, stock:  8, rating: 4.8, description: 'Whole-home WiFi 6, covers 600m², seamless roaming',                      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop' },
    { id: 33, name: 'Network Switch 8-port',category: 'Networking',  price:   39.99, stock: 22, rating: 4.5, description: 'Gigabit unmanaged switch, plug-and-play, fanless',                       image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop' },
    { id: 34, name: 'PoE Switch 16-port',   category: 'Networking',  price:  159.99, stock: 10, rating: 4.6, description: '16× Gigabit PoE+, 230W budget, VLAN support, rackmount',                 image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop' },
    { id: 35, name: 'Cat8 Ethernet 10m',    category: 'Networking',  price:   16.99, stock: 75, rating: 4.3, description: '40Gbps, 2000MHz bandwidth, shielded, gold-plated RJ45',                   image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=800&h=600&fit=crop' },

    // ── Storage ──────────────────────────────────────────────────────────────
    { id: 36, name: 'NVMe SSD 2TB',         category: 'Storage',     price:  149.99, stock: 30, rating: 4.8, description: 'PCIe 4.0, 7400MB/s read, 6800MB/s write, M.2 2280',                      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&h=600&fit=crop' },
    { id: 37, name: 'External SSD 1TB',     category: 'Storage',     price:   89.99, stock: 42, rating: 4.7, description: '1050MB/s, USB-C 3.2 Gen2, drop-resistant, pocket-sized',                 image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&h=600&fit=crop' },
    { id: 38, name: 'USB Flash Drive 256GB',category: 'Storage',     price:   24.99, stock: 85, rating: 4.3, description: 'USB 3.2 Gen1, 400MB/s read, retractable connector',                      image: 'https://images.unsplash.com/photo-1618329027143-26b45b8bd493?w=800&h=600&fit=crop' },
    { id: 39, name: 'SD Card V90 128GB',    category: 'Storage',     price:   44.99, stock: 55, rating: 4.6, description: 'UHS-II V90, 300MB/s read, ideal for 8K video recording',                 image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&h=600&fit=crop' },
    { id: 40, name: 'HDD Desktop 8TB',      category: 'Storage',     price:  119.99, stock: 18, rating: 4.4, description: '7200RPM, 256MB cache, CMR, designed for 24/7 operation',                 image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },

    // ── Office ───────────────────────────────────────────────────────────────
    { id: 41, name: 'Ergonomic Chair',      category: 'Office',      price:  459.99, stock:  7, rating: 4.8, description: 'Lumbar support, adjustable armrests, breathable mesh back',               image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop' },
    { id: 42, name: 'Standing Desk 160cm',  category: 'Office',      price:  699.99, stock:  4, rating: 4.7, description: 'Electric height adjustment, memory settings, solid oak top',              image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=600&fit=crop' },
    { id: 43, name: 'Desk Organiser Set',   category: 'Office',      price:   34.99, stock: 50, rating: 4.3, description: 'Bamboo, 6 compartments, pen holder, phone stand included',                image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=800&h=600&fit=crop' },
    { id: 44, name: 'Ring Light 18"',       category: 'Office',      price:   69.99, stock: 25, rating: 4.5, description: '60W, 3 colour temps, phone holder + tripod stand included',               image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop' },
    { id: 45, name: 'Desk Pad Leather',     category: 'Office',      price:   42.99, stock: 35, rating: 4.4, description: '90×45cm PU leather, waterproof, smooth writing surface',                  image: 'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=800&h=600&fit=crop' },

    // ── Power ────────────────────────────────────────────────────────────────
    { id: 46, name: 'GaN Charger 140W',     category: 'Power',       price:   79.99, stock: 32, rating: 4.7, description: '3-port (2×USB-C + USB-A), charges laptop + 2 phones',                    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=600&fit=crop' },
    { id: 47, name: 'UPS 1500VA',           category: 'Power',       price:  189.99, stock:  9, rating: 4.6, description: '900W, AVR, LCD display, 8 outlets, protects PC + NAS',                   image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop' },
    { id: 48, name: 'Smart Power Strip',    category: 'Power',       price:   44.99, stock: 28, rating: 4.4, description: '6 AC + 3 USB-C + 2 USB-A, app control, energy monitoring',                image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop' },
    { id: 49, name: 'Surge Protector 8-way',category: 'Power',       price:   29.99, stock: 48, rating: 4.3, description: '4320 joules protection, 2m braided cable, childproof sockets',            image: 'https://images.unsplash.com/photo-1625772452859-1c03d884dcd7?w=800&h=600&fit=crop' },
    { id: 50, name: 'Wireless Charger Pad', category: 'Power',       price:   32.99, stock: 55, rating: 4.4, description: '15W Qi2, dual-coil, charges phone + earbuds simultaneously',              image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop' },
];

export interface GenreOption {
    name: string;      // Tên hiển thị (Ví dụ: Thiết bị điện tử)
    value: string;     // Khớp với thuộc tính product.category trong mockProducts
    cover: string;     // Link ảnh nền cho thể loại
}

export const genreOptions: GenreOption[] = [
    { 
        name: "Thiết bị điện tử", 
        value: "Electronics", 
        cover: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80" 
    },
    { 
        name: "Linh kiện & Nguồn", 
        value: "Power", 
        cover: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80" 
    },
    { 
        name: "Phụ kiện máy tính", 
        value: "Accessories", 
        cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" 
    },
    { 
        name: "Thiết bị âm thanh", 
        value: "Audio", 
        cover: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80" 
    },
    { 
        name: "Thiết bị lưu trữ", 
        value: "Storage", 
        cover: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80" 
    }
];

export type Product = (typeof mockProducts)[0];
export type User    = (typeof mockUsers)[0];
"use client";
import { useMemo, useState, useEffect } from "react";

type Category = {
  id: string;
  title: string; // Arabic title
  photoUrl?: string; // empty until user provides
  icon?: string; // emoji icon for category
};

type MenuItem = {
  id: string;
  categoryId: string;
  title: string; // Arabic name
  priceTl: number;
  photoUrl?: string; // empty until user provides
  description?: string; // optional description
};

type CartItem = {
  id: string;
  title: string;
  priceTl: number;
  quantity: number;
  photoUrl?: string;
};

const categories: Category[] = [
  { id: "fresh-juices", title: "عصائر فرش", icon: "🥤" },
  { id: "shawarma", title: "وجبات شاورما", icon: "🌯" },
  { id: "fast-food", title: "الأكلات السريعة", icon: "🍔" },
  { id: "desserts", title: "حلويات", icon: "🍰" },
  { id: "hot-drinks", title: "مشروبات ساخنة", icon: "☕" },
];

const items: MenuItem[] = [
  // عصائر فرش
  { id: "bolo-juice", categoryId: "fresh-juices", title: "عصير بولو", priceTl: 30, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX_PkFLuhlyIhF7T-4sNyoeGXLdWCZGGLZEA&s", description: "عصير طازج من الفواكه الطبيعية" },
  { id: "pomegranate-juice", categoryId: "fresh-juices", title: "عصير رمان", priceTl: 20, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOX5PjWsj26ZiWTFkef_Y5HyLWobxZ0-YzEQ&s", description: "عصير رمان طبيعي 100%" },
  { id: "orange-juice", categoryId: "fresh-juices", title: "عصير برتقال", priceTl: 25, photoUrl: "https://zerolounge.link/wpconten/uploads/2023/12/%D8%A8%D8%B1%D8%AA%D9%82%D8%A7%D9%84-%D9%81%D8%B1%D9%8A%D8%B4-%D9%A2.%D9%A0%D9%A0%D9%A0.jpg", description: "عصير برتقال طازج يومياً" },
  // وجبات شاورما
  { id: "shawarma-bill-meal", categoryId: "shawarma", title: "شاورما عربي وجبة دبل", priceTl: 160, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5bZGozmgE9959EAiR1bT706EeF24KuPrcZg&s", description: "وجبة كاملة مع البطاطس والمشروب" },
  { id: "shawarma-regular-meal", categoryId: "shawarma", title: "شاورما عربي وجبة عادي", priceTl: 120, photoUrl: "https://goldenmeal.jo/Upload/Product/57f2badf-4402-4f4e-a815-d692a1f333e0.jpg", description: "وجبة عادية مع البطاطس" },
  { id: "shawarma-lafah-adi", categoryId: "shawarma", title: "شاورما عربي لفة عادي", priceTl: 60, photoUrl: "https://modo3.com/thumbs/fit630x300/160944/1493759099/%D8%B9%D9%85%D9%84_%D8%A7%D9%84%D8%B4%D8%A7%D9%88%D8%B1%D9%85%D8%A7_%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A.jpg", description: "لفة شاورما عربية تقليدية" },
  { id: "shawarma-lafah-bill", categoryId: "shawarma", title: "شاورما عربي لفة دبل", priceTl: 90, photoUrl: "https://images.deliveryhero.io/image/hungerstation/menuitem/image_url_ref/3cae3a1e78844607013f2ceb666b765a.jpeg?width=1440&quality=75&webp=true", description: "لفة دبل مع لحم إضافي" },
  // الأكلات السريعة
  { id: "burger", categoryId: "fast-food", title: "همبرغر", priceTl: 200, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjQTvUkA1MWdg98x4cqJXOvLgdBt5Xlvx0qw&s", description: "برجر لحم طازج مع الخضار" },
  { id: "pizza", categoryId: "fast-food", title: "بيتزا", priceTl: 140, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM03UAWVodpyvAZvJ7CpbFaGhxjxQOWiczTg&s", description: "بيتزا إيطالية أصيلة" },
  { id: "crispy", categoryId: "fast-food", title: "كريسبي", priceTl: 200, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxH6nY0CxxL5uUy9CPo73h0Ez37rvibaUE5w&s", description: "دجاج مقرمش مع الصلصة" },
  { id: "kibbeh", categoryId: "fast-food", title: "كبة", priceTl: 100, photoUrl: "https://i.ytimg.com/vi/KcWN0JrZTX8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB32aFDpztx5-UwYFqd0pfJ23gj4g", description: "كبة لبنانية تقليدية" },
  // حلويات
  { id: "waffle", categoryId: "desserts", title: "وافل", priceTl: 60, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNSP3TonX7UD-Or7PLYGEheAzdy_ZFiMNzQ&s", description: "وافل بلجيكي مع الشوكولاتة" },
  { id: "cake", categoryId: "desserts", title: "كيك", priceTl: 80, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJQjQRmCXK7MKp6FpBUQY0Bc2DvSAlBZrfA&s", description: "كيك شوكولاتة طازج" },
  { id: "pancake", categoryId: "desserts", title: "بان كيك", priceTl: 40, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM3E41Mk-OB4f25Ak-s68vUJSxyHENiaViog&s", description: "بان كيك أمريكي مع القطر" },
  // مشروبات ساخنة
  { id: "coffee", categoryId: "hot-drinks", title: "قهوة", priceTl: 25, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc1bzJsrkkV3mNcqQ4QtIWHrghR8FxDemK7w&s", description: "قهوة تركية أصيلة" },
  { id: "nescafe", categoryId: "hot-drinks", title: "نسكافيه", priceTl: 20, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyJRoeZM6jlYdR060A1kYucUK__R77-3xzkw&s", description: "نسكافيه مع الحليب" },
  { id: "ice-coffee", categoryId: "hot-drinks", title: "آيس كوفي", priceTl: 30, photoUrl: "https://cdn.shopify.com/s/files/1/0642/0158/8951/files/e577860a00c021fbf86360f956588847_480x480.webp?v=1732791723", description: "قهوة باردة منعشة" },
  { id: "tea", categoryId: "hot-drinks", title: "جاي", priceTl: 10, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRox3Qe3UnnoolsZTF8qNSr7N_-tmTU-OXS-g&s", description: "جاي ساخن" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [animatingItem, setAnimatingItem] = useState<{ id: string, title: string, photoUrl?: string, startX: number, startY: number } | null>(null);
  const [cartBouncing, setCartBouncing] = useState<boolean>(false);

  // Simulate loading when changing categories
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  // Fixed Cart functions
  const addToCart = (item: MenuItem, event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Adding to cart:', item.title); // Debug log only

    const buttonRect = event.currentTarget.getBoundingClientRect();
    const cartButton = document.querySelector('[data-cart-button]') as HTMLElement;

    // Update cart state immediately
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, {
          id: item.id,
          title: item.title,
          priceTl: item.priceTl,
          quantity: 1,
          photoUrl: item.photoUrl
        }];
      }
    });

    // Start animation
    setAnimatingItem({
      id: item.id,
      title: item.title,
      photoUrl: item.photoUrl,
      startX: buttonRect.left + buttonRect.width / 2,
      startY: buttonRect.top + buttonRect.height / 2
    });

    // Trigger cart bounce animation
    setCartBouncing(true);
    setTimeout(() => setCartBouncing(false), 600);

    // Clear animation after delay
    setTimeout(() => {
      setAnimatingItem(null);
    }, 800);
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.priceTl * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const visibleItems = useMemo(() => {
    let filtered = items;

    // If no search query, show only current category items
    if (!searchQuery.trim()) {
      filtered = items.filter((it) => it.categoryId === activeCategory);
    } else {
      // If searching, search across ALL categories
      filtered = items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white" dir="rtl">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      {/* Add custom styles */}
      <style jsx>{`
        @keyframes flyToCart {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -200px) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translate(-200px, -300px) scale(0.3);
            opacity: 0;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        
        .animate-cart-bounce {
          animation: bounce 0.6s ease-in-out;
        }
        
        .category-button {
          background: rgba(31, 41, 55, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(75, 85, 99, 0.3);
        }
        
        .category-button.active {
          background: linear-gradient(135deg, #f97316, #ea580c);
          color: white;
          border: 1px solid #f97316;
        }
        
        .product-card {
          background: rgba(31, 41, 55, 0.5);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(75, 85, 99, 0.3);
          transition: all 0.3s ease;
        }
        
        .product-card:hover {
          transform: translateY(-4px);
          border-color: #f97316;
          box-shadow: 0 20px 25px -5px rgba(249, 115, 22, 0.1);
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 pt-8 sm:pt-12 lg:pt-16">
        {/* Header with Navigation and Logo */}
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            {/* Restaurant Logo and Title */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
              <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                <span className="text-3xl lg:text-4xl">🍽️</span>
              </div>
              <div className="text-center lg:text-right">
                <h1 className="text-2xl lg:text-4xl font-bold text-white mb-1">Restaurant Store</h1>
                <p className="text-orange-400 text-sm lg:text-base">قائمة الطعام الرقمية</p>
              </div>
            </div>

            {/* Search Bar and Cart */}
            <div className="flex gap-4 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="flex-1 lg:w-80">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="البحث في القائمة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    🔍
                  </div>
                </div>
              </div>

              {/* Cart Button */}
              <button
                data-cart-button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className={`relative px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-300 flex items-center gap-2 min-w-max ${cartBouncing ? 'animate-cart-bounce' : ''}`}
              >
                <span className="text-lg">🛒</span>
                <span className="hidden sm:inline">السلة</span>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Category Navigation */}
          <nav className="flex gap-3 overflow-x-auto scrollbar-hide pb-6 mt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-button flex items-center gap-2 whitespace-nowrap px-6 py-4 text-base rounded-2xl transition-all duration-300 min-w-max ${activeCategory === cat.id
                  ? "active text-white shadow-lg"
                  : "text-white hover:bg-gray-800/50 hover:scale-105"
                  }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </nav>
        </header>

        {/* Cart Panel */}
        {isCartOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden">
              {/* Cart Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">السلة</h3>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Cart Items */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🛒</div>
                    <p className="text-gray-400">السلة فارغة</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-800/50 rounded-xl">
                        {item.photoUrl && (
                          <img
                            src={item.photoUrl}
                            alt={item.title}
                            className="w-12 h-12 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.title}</h4>
                          <p className="text-orange-500 text-sm" dir="ltr">{item.priceTl} TL</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-white font-medium">المجموع:</span>
                    <span className="text-orange-500 font-bold text-xl" dir="ltr">{getTotalPrice()} TL</span>
                  </div>
                  <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors">
                    طلب الطلبية
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Flying Animation */}
        {animatingItem && (
          <div className="fixed inset-0 pointer-events-none z-50">
            <div
              className="absolute bg-orange-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2"
              style={{
                left: animatingItem.startX,
                top: animatingItem.startY,
                transform: 'translate(-50%, -50%)',
                animation: 'flyToCart 0.8s ease-in-out forwards'
              }}
            >
              {animatingItem.photoUrl && (
                <img
                  src={animatingItem.photoUrl}
                  alt={animatingItem.title}
                  className="w-6 h-6 object-cover rounded"
                />
              )}
              <span className="text-sm font-medium">{animatingItem.title}</span>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="space-y-8 mt-4 sm:mt-6">
          {/* Category Title */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white">
              {searchQuery.trim() ? "نتائج البحث" : categories.find((c) => c.id === activeCategory)?.title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
          </div>

          {/* Products Grid */}
          <section className={`grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto ${isLoading ? 'opacity-50' : ''}`}>
            {visibleItems.length > 0 ? (
              visibleItems.map((item, index) => (
                <article
                  key={item.id}
                  className="product-card group rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="relative">
                    {item.photoUrl ? (
                      <img
                        src={item.photoUrl}
                        alt={item.title}
                        className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="aspect-[4/3] bg-gray-800 flex items-center justify-center text-gray-400 rounded-t-2xl">
                        <span className="text-base">لا توجد صورة</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-6">
                    <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex items-center justify-center mb-3">
                      <span className="text-lg sm:text-2xl font-bold text-orange-500" dir="ltr">{item.priceTl} TL</span>
                    </div>
                    <button
                      onClick={(e) => addToCart(item, e)}
                      className="w-full py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      إضافة إلى السلة
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">لا توجد نتائج</h3>
                <p className="text-gray-400">جرب البحث بكلمات مختلفة</p>
              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Restaurant Store - جميع الحقوق محفوظة
          </p>
        </footer>
      </div>
    </div>
  );
}
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
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Simulate loading when changing categories
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeCategory]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white page-transition" dir="rtl">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 pt-24 sm:pt-32 lg:pt-40">
        {/* Header with Navigation and Logo */}
        <header className="mb-16 sm:mb-20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">
            {/* Restaurant Logo and Title */}
            <div className="logo-header flex items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
              <div className="logo-container w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                <img
                  src="/favicon.ico"
                  alt="Restaurant Logo"
                  className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                />
              </div>
              <div className="text-center lg:text-right">
                <h1 className="text-2xl lg:text-4xl font-bold text-white mb-1">Restaurant Store</h1>
                <p className="text-orange-400 text-sm lg:text-base">قائمة الطعام الرقمية</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="w-full lg:w-80">
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
          </div>

          {/* Category Navigation */}
          <nav className="flex gap-3 overflow-x-auto scrollbar-hide pb-6 mt-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-button flex items-center gap-2 whitespace-nowrap px-6 py-4 text-base rounded-2xl transition-all duration-300 min-w-max ${activeCategory === cat.id
                  ? "active text-black shadow-lg"
                  : "text-white hover:bg-gray-800/50 hover:scale-105"
                  }`}
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </nav>
        </header>

        {/* Main Content */}
        <main className="space-y-8 mt-12 sm:mt-16">
          {/* Category Title */}
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 page-title text-white">
              {searchQuery.trim() ? "نتائج البحث" : categories.find((c) => c.id === activeCategory)?.title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
          </div>



          {/* Products Grid */}
          <section className={`grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto ${isLoading ? 'opacity-50' : ''}`}>
            {visibleItems.length > 0 ? (
              visibleItems.map((item, index) => (
                <article
                  key={item.id}
                  className="product-card group rounded-2xl shadow-xl overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
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
                      <div className="aspect-[4/3] bg-gray-800 flex items-center justify-center text-gray-400 skeleton rounded-t-2xl">
                        <span className="text-base">لا توجد صورة</span>
                      </div>
                    )}

                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex items-center justify-center">
                      <span className="text-2xl font-bold text-orange-500">TL {item.priceTl}</span>
                    </div>
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
        <footer className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 Restaurant Store - جميع الحقوق محفوظة
          </p>
        </footer>
      </div>
    </div>
  );
}

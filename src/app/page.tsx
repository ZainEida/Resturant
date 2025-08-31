"use client";
import { useMemo, useState } from "react";

type Category = {
  id: string;
  title: string; // Arabic title
  photoUrl?: string; // empty until user provides
};

type MenuItem = {
  id: string;
  categoryId: string;
  title: string; // Arabic name
  priceTl: number;
  photoUrl?: string; // empty until user provides
};

const categories: Category[] = [
  { id: "fresh-juices", title: "عصائر فرش" },
  { id: "shawarma", title: "وجبات شاورما" },
  { id: "fast-food", title: "الأكلات السريعة" },
  { id: "desserts", title: "حلويات" },
  { id: "hot-drinks", title: "مشروبات ساخنة" },
];

const items: MenuItem[] = [
  // عصائر فرش
  { id: "bolo-juice", categoryId: "fresh-juices", title: "عصير بولو", priceTl: 30, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX_PkFLuhlyIhF7T-4sNyoeGXLdWCZGGLZEA&s" },
  { id: "pomegranate-juice", categoryId: "fresh-juices", title: "عصير رمان", priceTl: 20, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOX5PjWsj26ZiWTFkef_Y5HyLWobxZ0-YzEQ&s" },
  { id: "orange-juice", categoryId: "fresh-juices", title: "عصير برتقال", priceTl: 25, photoUrl: "https://zerolounge.link/wpconten/uploads/2023/12/%D8%A8%D8%B1%D8%AA%D9%82%D8%A7%D9%84-%D9%81%D8%B1%D9%8A%D8%B4-%D9%A2.%D9%A0%D9%A0%D9%A0.jpg" },
  // وجبات شاورما
  { id: "shawarma-bill-meal", categoryId: "shawarma", title: "شاورما عربي وجبة دبل", priceTl: 160, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5bZGozmgE9959EAiR1bT706EeF24KuPrcZg&s" },
  { id: "shawarma-regular-meal", categoryId: "shawarma", title: "شاورما عربي وجبة عادي", priceTl: 120, photoUrl: "https://goldenmeal.jo/Upload/Product/57f2badf-4402-4f4e-a815-d692a1f333e0.jpg" },
  { id: "shawarma-lafah-adi", categoryId: "shawarma", title: "شاورما عربي لفة عادي", priceTl: 60, photoUrl: "https://modo3.com/thumbs/fit630x300/160944/1493759099/%D8%B9%D9%85%D9%84_%D8%A7%D9%84%D8%B4%D8%A7%D9%88%D8%B1%D9%85%D8%A7_%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A.jpg" },
  { id: "shawarma-lafah-bill", categoryId: "shawarma", title: "شاورما عربي لفة دبل", priceTl: 90, photoUrl: "https://images.deliveryhero.io/image/hungerstation/menuitem/image_url_ref/3cae3a1e78844607013f2ceb666b765a.jpeg?width=1440&quality=75&webp=true" },
  // الأكلات السريعة
  { id: "burger", categoryId: "fast-food", title: "همبرغر", priceTl: 200, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjQTvUkA1MWdg98x4cqJXOvLgdBt5Xlvx0qw&s" },
  { id: "pizza", categoryId: "fast-food", title: "بيتزا", priceTl: 140, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM03UAWVodpyvAZvJ7CpbFaGhxjxQOWiczTg&s" },
  { id: "crispy", categoryId: "fast-food", title: "كريسبي", priceTl: 200, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxH6nY0CxxL5uUy9CPo73h0Ez37rvibaUE5w&s" },
  { id: "kibbeh", categoryId: "fast-food", title: "كبة", priceTl: 100, photoUrl: "https://i.ytimg.com/vi/KcWN0JrZTX8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB32aFDpztx5-UwYFqd0pfJ23gj4g" },
  // حلويات
  { id: "waffle", categoryId: "desserts", title: "وافل", priceTl: 60, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNSP3TonX7UD-Or7PLYGEheAzdy_ZFiMNzQ&s" },
  { id: "cake", categoryId: "desserts", title: "كيك", priceTl: 80, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJQjQRmCXK7MKp6FpBUQY0Bc2DvSAlBZrfA&s" },
  { id: "pancake", categoryId: "desserts", title: "بان كيك", priceTl: 40, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM3E41Mk-OB4f25Ak-s68vUJSxyHENiaViog&s" },
  // مشروبات ساخنة
  { id: "coffee", categoryId: "hot-drinks", title: "قهوة", priceTl: 25, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc1bzJsrkkV3mNcqQ4QtIWHrghR8FxDemK7w&s" },
  { id: "nescafe", categoryId: "hot-drinks", title: "نسكافيه", priceTl: 20, photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyJRoeZM6jlYdR060A1kYucUK__R77-3xzkw&s" },
  { id: "ice-coffee", categoryId: "hot-drinks", title: "آيس كوفي", priceTl: 30, photoUrl: "https://cdn.shopify.com/s/files/1/0642/0158/8951/files/e577860a00c021fbf86360f956588847_480x480.webp?v=1732791723" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0].id);

  const visibleItems = useMemo(
    () => items.filter((it) => it.categoryId === activeCategory),
    [activeCategory]
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-black text-white page-transition" dir="rtl">
      {/* Header with Navigation and Logo */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        {/* Navigation Buttons */}
        <header className="flex gap-2 sm:gap-4 w-full sm:w-auto overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`category-button whitespace-nowrap px-4 py-3 sm:px-6 sm:py-3 text-base sm:text-lg rounded-full transition-all duration-300 min-w-max ${activeCategory === cat.id
                ? "active text-black"
                : "text-white hover:bg-[#222222]"
                }`}
            >
              {cat.title}
            </button>
          ))}
        </header>

        {/* Restaurant Logo */}
        <div className="logo-header flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center sm:justify-end">
          <div className="logo-container w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
            <img
              src="/favicon.ico"
              alt="Restaurant Logo"
              className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
            />
          </div>
          <h1 className="text-xl sm:text-3xl font-bold text-white">Restaurant Store</h1>
        </div>
      </div>

      <div className="relative">
        <h2 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 page-title relative z-10 text-center text-white">
          {categories.find((c) => c.id === activeCategory)?.title}
        </h2>

        {/* Products Grid */}
        <section className="grid gap-4 sm:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {visibleItems.map((it) => (
            <article
              key={it.id}
              className="product-card rounded-xl sm:rounded-2xl shadow-lg"
            >
              {it.photoUrl ? (
                <img
                  src={it.photoUrl}
                  alt={it.title}
                  className="w-full aspect-[4/3] object-cover rounded-t-xl sm:rounded-t-2xl"
                  loading="lazy"
                />
              ) : (
                <div className="aspect-[4/3] bg-[#222222] flex items-center justify-center text-[#cccccc] skeleton rounded-t-xl sm:rounded-t-2xl">
                  <span className="text-sm sm:text-base">لا توجد صورة</span>
                </div>
              )}
              <div className="p-3 sm:p-6 flex items-center justify-between">
                <h3 className="text-sm sm:text-lg font-semibold text-white">{it.title}</h3>
                <span className="text-xs sm:text-base font-bold text-[#ff9900]">TL {it.priceTl}</span>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

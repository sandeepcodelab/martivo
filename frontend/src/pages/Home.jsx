import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Container from "../components/Container/Container";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";
import hero1 from "@/assets/img/hero1.jpg";
import hero2 from "@/assets/img/hero2.jpg";
import hero3 from "@/assets/img/hero3.jpg";
import hero4 from "@/assets/img/hero4.jpg";
import hero5 from "@/assets/img/hero5.jpg";
import hero6 from "@/assets/img/hero6.jpg";
import hoodie from "@/assets/img/hoodie.jpg";
import jacket from "@/assets/img/jacket.jpg";
import jeans from "@/assets/img/jeans.jpg";
import shirt from "@/assets/img/shirt.jpg";
import shorts from "@/assets/img/shorts.jpg";
import sweater from "@/assets/img/sweater.jpg";
import tshirt from "@/assets/img/tshirt.jpg";
import belt from "@/assets/img/belt.jpg";
import cap from "@/assets/img/cap.jpg";
import shoes from "@/assets/img/shoes.jpg";
import watch from "@/assets/img/watch.jpg";
import { Link } from "react-router";
import ProductCard from "@/components/Product/ProductCard";
import { getAllProducts } from "@/services/productService";

export default function HomePage() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  const [carouselApi, setCarouselApi] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];
  const categories = [
    { title: "T-Shirts", url: tshirt },
    { title: "Shirts", url: shirt },
    { title: "Jeans", url: jeans },
    { title: "Jackets", url: jacket },
    { title: "Hoodies", url: hoodie },
    { title: "Sweaters", url: sweater },
    { title: "Shorts", url: shorts },
    { title: "Shoes", url: shoes },
    { title: "Watches", url: watch },
    { title: "Caps", url: cap },
    { title: "Belts", url: belt },
  ];

  const homepageCategories = categories.slice(0, 7);

  useEffect(() => {
    if (!carouselApi) return;

    // Safe access to prevent runtime errors
    setScrollSnaps(carouselApi?.scrollSnapList?.() ?? []);
    setSelectedIndex(carouselApi?.selectedScrollSnap?.() ?? 0);

    const onSelect = () => {
      setSelectedIndex(carouselApi?.selectedScrollSnap?.() ?? 0);
    };

    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off?.("select", onSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getAllProducts({ limit: 12 });
        setProducts(res?.data?.data?.products);
      } catch (err) {
        setErrors(err);
        console.log("Err: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="space-y-20 pb-20">
      {/* ================= HERO SECTION ================= */}
      <section>
        <Carousel
          plugins={[plugin.current]}
          className="w-full relative"
          onMouseEnter={() => plugin.current?.stop()}
          onMouseLeave={() => plugin.current?.play()}
          opts={{ loop: true }}
          setApi={setCarouselApi}
        >
          <CarouselContent>
            {heroImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[350px] sm:h-[420px] md:h-[500px] overflow-hidden">
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt="Hero banner"
                  />

                  <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 sm:px-10 md:px-16 text-white">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4">
                      Discover Your Style
                    </h1>
                    <p className="text-sm sm:text-base md:text-lg mb-6 max-w-md">
                      Premium collections curated just for you. Elevate your
                      wardrobe today.
                    </p>
                    <Button size="lg" className="text-white cursor-pointer">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 hidden md:flex" />
          <CarouselNext className="right-4 hidden md:flex" />
        </Carousel>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 rounded-full transition-all",
                index === selectedIndex ? "w-6 bg-primary" : "w-2 bg-gray-300",
              )}
              onClick={() => carouselApi?.scrollTo?.(index)}
            />
          ))}
        </div>
      </section>

      {/* ================= CATEGORY SECTION ================= */}
      <section className="bg-gray-200 dark:bg-muted/40 py-10 sm:py-16">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-bold mb-10 text-center">
            Shop by Category
          </h2>

          {/* Mobile Layout (Horizontal Scroll) */}
          <div className="flex md:hidden gap-4 p-1 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
            {homepageCategories.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 snap-start group text-center cursor-pointer"
              >
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border group-hover:scale-105 transition">
                  <img
                    src={item.url}
                    className="w-full h-full object-cover"
                    alt={item.title}
                  />
                </div>

                <p className="mt-2 text-xs font-medium group-hover:text-primary transition">
                  {item.title}
                </p>
              </div>
            ))}

            {/* All Categories */}
            <div className="flex-shrink-0 group text-center cursor-pointer">
              <div className="w-20 h-20 mx-auto rounded-full bg-gray-400 flex items-center justify-center group-hover:scale-105 transition">
                <LayoutGrid />
              </div>

              <p className="mt-2 text-xs font-medium group-hover:text-primary transition">
                More
              </p>
            </div>
          </div>

          {/* Desktop Layout (Grid) */}
          <div className="hidden md:grid grid-cols-6 lg:grid-cols-8 gap-6">
            {homepageCategories.map((item, i) => (
              <div key={i} className="group text-center cursor-pointer">
                <div className="w-24 h-24 lg:w-28 lg:h-28 mx-auto rounded-full overflow-hidden border group-hover:scale-105 transition">
                  <img
                    src={item.url}
                    className="w-full h-full object-cover"
                    alt={item.title}
                  />
                </div>

                <p className="mt-3 text-sm lg:text-base font-medium group-hover:text-primary transition">
                  {item.title}
                </p>
              </div>
            ))}

            {/* All Categories */}
            <div className="group text-center cursor-pointer">
              <div className="w-24 h-24 lg:w-28 lg:h-28 mx-auto rounded-full bg-gray-400 flex items-center justify-center group-hover:scale-105 transition">
                <LayoutGrid />
              </div>

              <p className="mt-3 text-sm lg:text-base font-medium group-hover:text-primary transition">
                More
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= PRODUCT SECTIONS ================= */}
      {/* Featured Products */}
      <section>
        <Container>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>

          {!loading ? (
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((item) => (
                <Link key={item.title} to={`/product-details/${item}`}>
                  <ProductCard item={item} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-70">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </Container>
      </section>

      {/* Best Sellers */}
      <section>
        <Container>
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Best Sellers</h2>
            <Link to="/products">
              <Button variant="ghost">View All</Button>
            </Link>
          </div>

          {!loading ? (
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((item) => (
                <Link key={item.title} to={`/product-details/${item}`}>
                  <ProductCard item={item} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-70">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

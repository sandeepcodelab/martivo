import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "../components/Container/Container";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Heart, LayoutGrid } from "lucide-react";

export default function HomePage() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  const [api, setApi] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState([]);

  React.useEffect(() => {
    if (!api) return;

    setScrollSnaps(api.scrollSnapList());
    setSelectedIndex(api.selectedScrollSnap());

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-background">
        <Container>
          <Carousel
            plugins={[plugin.current]}
            className="w-full relative py-1"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
            opts={{ loop: true }}
            setApi={setApi}
          >
            <CarouselContent>
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div>
                    <Card className="py-0 bg-[url(https://placehold.co/1200x720)] bg-center bg-no-repeat bg-cover">
                      <CardContent className="h-100 px-0 overflow-hidden">
                        {/* <span>{index + 1}</span> */}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0" />
            <CarouselNext className="absolute right-0" />
          </Carousel>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-2">
            {scrollSnaps.map((_, index) => (
              <Button
                key={index}
                size="icon"
                // variant="ghost"
                className={cn(
                  "h-1.5 w-1.5 rounded-full p-0",
                  index === selectedIndex ? "w-3" : "bg-gray-300"
                )}
                onClick={() => api && api.scrollTo(index)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Category Section */}
      <section className="py-8">
        <Container>
          <div className="flex flex-wrap">
            <div className="flex gap-4 flex-1 justify-evenly overflow-hidden">
              {[
                {
                  title: "T-shirt",
                  url: "https://placehold.co/200x200/EEE/31343C?font=lora&text=T-Shirt",
                },
                {
                  title: "Shoes",
                  url: "https://placehold.co/200x200/EEE/31343C?font=lora&text=Shoes",
                },
                {
                  title: "Jeans",
                  url: "https://placehold.co/200x200/EEE/31343C?font=lora&text=Jeans",
                },
                {
                  title: "Jacket",
                  url: "https://placehold.co/200x200/EEE/31343C?font=lora&text=Jacket",
                },
                {
                  title: "Watch",
                  url: "https://placehold.co/200x200/EEE/31343C?font=lora&text=Watch",
                },
                {
                  title: "Cap",
                  url: "https://placehold.co/200x200/EEE/31343C?font=lora&text=Cap",
                },
                {
                  title: "Bag",
                  url: "https://placehold.co/200x200/EEE/31343C?font=lora&text=Bag",
                },
                {
                  title: "Sunglasses",
                  url: "https://placehold.co/200x200/EEE/31343C?font=lora&text=Sunglasses",
                },
              ].map((feature, i) => (
                <div key={i} className="text-center">
                  <div className="w-30 h-30 ">
                    <img
                      src={feature.url}
                      alt=""
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div>
                    <p className="text-muted-foreground">{feature.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex px-4">
              <div className="text-center">
                <div className="w-30 h-30 bg-gray-200 rounded-full flex items-center justify-center">
                  <LayoutGrid />
                </div>
                <div>
                  <p className="text-muted-foreground">All Category</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Products Preview */}
      <section className="py-10">
        <Container>
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="hover:shadow-md transition">
                <Heart />
                <div className="h-40 bg-muted rounded-t-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Image</span>
                </div>
                <CardHeader>
                  <CardTitle>Product {item}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">$99.00</p>
                  <Button size="sm" className="w-full">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Products Preview */}
      <section className="py-10">
        <Container>
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="hover:shadow-md transition">
                <Heart />
                <div className="h-40 bg-muted rounded-t-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Image</span>
                </div>
                <CardHeader>
                  <CardTitle>Product {item}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">$99.00</p>
                  <Button size="sm" className="w-full">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

import Container from "@/components/Container/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function ProductDetails() {
  return (
    <section className="mt-4">
      <Container>
        <div className="bg-green-500 grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Gallery */}
          <div className="flex gap-4">
            <div>
              <Carousel
                opts={{
                  align: "start",
                }}
                orientation="vertical"
                className="relative w-full max-w-20"
              >
                <CarouselContent className="-mt-1 h-80 sm:h-100 lg:h-100">
                  {Array.from({ length: 9 }).map((_, index) => (
                    <CarouselItem key={index} className="pt-1 basis-1/5">
                      <Card className="py-0 w-15 h-18 md:w-20 md:h-22 overflow-hidden">
                        <CardContent className="px-0">
                          <img
                            src="https://placehold.co/600x600/gray/FFFFFF/png"
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-0" />
                <CarouselNext className="absolute bottom-0" />
              </Carousel>
            </div>
            <div>
              <Card className="py-0 min-w-58 w-full h-80 sm:h-100 lg:h-100 overflow-hidden">
                <CardContent className="px-0">
                  <img
                    src="https://placehold.co/600x600/gray/FFFFFF/png"
                    alt=""
                    className="object-contain md:object-cover"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product details */}
          <div className="w-full px-10 md:pr-5 ">
            <h1 className="text-2xl font-medium">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
            </h1>
            <div className="my-2">
              <p>Star</p>
            </div>
            <div>
              <div className="text-2xl font-medium">Rs. 5000</div>
              <div className="text-lg">
                Rs. 10000
                <span className="pl-3">50% off</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-medium">Select Size</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="border-blue-600 border-2 rounded px-3">S</span>
                <span className="border-blue-600 border-2 rounded px-3">M</span>
                <span className="border-blue-600 border-2 rounded px-3">L</span>
                <span className="border-blue-600 border-2 rounded px-3">
                  XL
                </span>
                <span className="border-blue-600 border-2 rounded px-3">
                  XXL
                </span>
              </div>
            </div>
            <div className="mt-5">
              <span className="font-medium">Select Colour</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="border-red-600 border-2 rounded px-3">
                  Red
                </span>
                <span className="border-red-600 border-2 rounded px-3">
                  Green
                </span>
                <span className="border-red-600 border-2 rounded px-3">
                  Yellow
                </span>
                <span className="border-red-600 border-2 rounded px-3">
                  Pink
                </span>
                <span className="border-red-600 border-2 rounded px-3">
                  Purple
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 md:w-100">
              <Button variant="outline" className="w-full cursor-pointer">
                Buy Now
              </Button>
              <Button className="w-full mt-3 cursor-pointer">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <section className="bg-green-500 mt-5">
          <div className="text-2xl font-medium mb-3">Product Details</div>
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
            sed veritatis hic a laborum asperiores suscipit quos iure cupiditate
            quae odio blanditiis recusandae commodi ipsam corrupti, accusantium
            repellendus? Aliquid, atque? Eligendi velit ratione aut, earum illo
            a perspiciatis saepe corporis odit doloribus excepturi in ad quos
            distinctio error quas inventore culpa commodi temporibus nihil
            repudiandae officiis fugit numquam maiores. Nemo! Velit iste vitae
            tempore delectus? Quam voluptates quo impedit veritatis aliquid quia
            maxime sint at doloremque ullam recusandae atque consequatur officia
            facere ad asperiores magni, saepe optio odio, autem repellendus.
            Pariatur quas sed cum, nemo quaerat consequuntur animi maiores dicta
            obcaecati corporis quod, inventore praesentium iusto, recusandae a.
            Inventore veniam iure quos dolorum eos ea temporibus sint vel vero
            nam? Aliquam consequatur laborum optio porro ut obcaecati quia
            debitis voluptatum. Ad, hic doloribus? Consectetur, tempore hic
            dicta maiores quo error nostrum accusamus, pariatur modi nihil
            velit, quasi excepturi eos fugit!
          </div>
        </section>
      </Container>
    </section>
  );
}

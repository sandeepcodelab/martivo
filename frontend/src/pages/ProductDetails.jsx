import { useEffect, useState } from "react";
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
import axios from "axios";
import { useParams } from "react-router";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    axios
      .get(`/api/v1/product/singleProduct/${id}`)
      .then((res) => setProduct(res.data?.data.product))
      .catch((err) => console.log(err));
  }, []);

  console.log(product);

  return (
    <Container>
      <section className="mt-4">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Gallery */}
          <div className="flex gap-4">
            <Carousel
              opts={{
                align: "start",
              }}
              orientation="vertical"
              className="relative w-full max-w-20"
            >
              <CarouselContent className="-mt-1 h-[350px] md:h-[450px]">
                {product?.images.map((image) => (
                  <CarouselItem key={image.url} className="pt-1 basis-1/5">
                    <Card className="py-0 w-18 h-20 md:w-20 md:h-22 overflow-hidden">
                      <CardContent className="px-0">
                        <div className="w-full h-full">
                          <img
                            src={image.url}
                            alt="product-image"
                            className="w-full h-full aspect-square"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute top-0" />
              <CarouselNext className="absolute bottom-0" />
            </Carousel>
            <div>
              <Card className="py-0 w-full overflow-hidden">
                <CardContent className="px-0">
                  <div className="w-full h-[350px] md:h-[450px]">
                    <img
                      src={product?.thumbnail.url}
                      alt={product?.name}
                      className="w-full h-full aspect-square"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product details */}
          <div className="w-full md:px-5 md:pr-5 ">
            <h1 className="text-2xl font-medium dark:text-white">
              {product?.title}
            </h1>
            <div className="my-2 dark:text-white">
              <p>Star</p>
            </div>
            <div>
              <div className="text-2xl font-medium dark:text-white">
                Rs. 5000
              </div>
              <div className="text-lg dark:text-white">
                Rs. 10000
                <span className="pl-3">50% off</span>
              </div>
            </div>
            <div className="mt-4 dark:text-white">
              <span className="font-medium">Select Size</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="border-black dark:border-white border-2 rounded px-3">
                  S
                </span>
                <span className="border-black dark:border-white border-2 rounded px-3">
                  M
                </span>
                <span className="border-black dark:border-white border-2 rounded px-3">
                  L
                </span>
                <span className="border-black dark:border-white border-2 rounded px-3">
                  XL
                </span>
                <span className="border-black dark:border-white border-2 rounded px-3">
                  XXL
                </span>
              </div>
            </div>
            <div className="mt-5">
              <span className="font-medium">Select Colour</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="border-black dark:border-white border-2 rounded px-3">
                  Red
                </span>
                <span className="border-black dark:border-white border-2 rounded px-3">
                  Green
                </span>
                <span className="border-black dark:border-white border-2 rounded px-3">
                  Yellow
                </span>
                <span className="border-black dark:border-white border-2 rounded px-3">
                  Pink
                </span>
                <span className="border-black dark:border-white border-2 rounded px-3">
                  Purple
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 w-full lg:w-100">
              <Button variant="outline" className="w-full cursor-pointer">
                Buy Now
              </Button>
              <Button className="w-full mt-3 text-white cursor-pointer">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="mt-10">
        <div className="text-2xl font-medium mb-3 dark:text-white">
          Product Description
        </div>
        <div className="dark:text-white">{product?.description}</div>
      </section>

      {/* Description Section */}
      <section className="mt-10">
        <div className="text-2xl font-medium mb-3 dark:text-white">
          Realated Products
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="relative w-full"
        >
          <CarouselContent>
            {Array.from({ length: 9 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card className="py-0 overflow-hidden">
                    <CardContent className="px-0">
                      <img
                        src="https://placehold.co/600x800/gray/FFFFFF/png"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0" />
          <CarouselNext className="absolute right-0" />
        </Carousel>
      </section>
    </Container>
  );
}

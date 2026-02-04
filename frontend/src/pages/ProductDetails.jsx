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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [variants, setVariants] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setColor] = useState(null);
  const [selectedSize, setSize] = useState(null);
  // const category = product?.category;

  useEffect(() => {
    // Get product
    axios
      .get(`/api/v1/product/singleProduct/${id}`)
      .then((res) => setProduct(res.data?.data.product))
      .catch((err) => console.log(err));

    // Get variants
    axios
      .get(`/api/v1/product-variant/${id}/all`)
      .then((res) => setVariants(res.data?.data.variants))
      .catch((err) => console.log(err));

    // if (!category) {
    //   // Get variants
    //   axios
    //     .get(`/api/v1/product-variant/${id}/all`)
    //     .then((res) => setVariants(res.data?.data.variants))
    //     .catch((err) => console.log(err));
    // }
  }, []);

  // console.log("Products: ", product);
  // console.log("Variants: ", variants);

  useEffect(() => {
    if (!selectedSize || !selectedColor) return;

    const filteredVariant = variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize,
    );

    console.log("filteredVariant", filteredVariant);

    if (filteredVariant) {
      console.log(
        `Comination exists ${filteredVariant?.size} : ${selectedSize}`,
      );
    } else {
      console.log(
        `Sorry, this combination does not exist ${filteredVariant?.size} : ${selectedSize}`,
      );
    }
  }, [selectedColor, selectedSize]);

  const addToCartHandler = (e) => {
    e.preventDefault();

    console.log(quantity);

    // const variantId = varia;
  };

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
                {product.images?.map((image) => (
                  <CarouselItem key={image?.url} className="pt-1 basis-1/5">
                    <Card className="py-0 w-18 h-20 md:w-20 md:h-22 overflow-hidden">
                      <CardContent className="px-0">
                        <div className="w-full h-full">
                          <img
                            src={image?.url}
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
                      src={product?.thumbnail?.url}
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

            <div className="flex gap-2">
              <div className="mt-4 grid justify-items-end gap-5">
                <Label>Color:</Label>
                <Label>Size: </Label>
                <Label>Quantity:</Label>
              </div>
              <div className="mt-4 grid gap-5">
                <Select onValueChange={setColor}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {variants?.map((variant) => (
                        <SelectItem key={variant?._id} value={variant?.color}>
                          {variant?.color}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select onValueChange={setSize}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {variants?.map((variant) => (
                        <SelectItem key={variant?._id} value={variant?.size}>
                          {variant?.size}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="w-[150px]">
                  <Input
                    type="number"
                    defaultValue={quantity}
                    min={1}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 w-full lg:w-100">
              {/* <Button variant="outline" className="w-full cursor-pointer">
                Buy Now
              </Button> */}
              <Button
                onClick={addToCartHandler}
                className="w-full mt-3 text-white cursor-pointer"
              >
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

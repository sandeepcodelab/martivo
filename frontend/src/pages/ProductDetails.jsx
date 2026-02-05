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
import { Minus, Plus } from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [variants, setVariants] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setColor] = useState("");
  const [selectedSize, setSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState({});
  const [combinationError, setCombinationError] = useState("");
  const [errors, setError] = useState({});
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

  // Check variant
  useEffect(() => {
    if (!selectedSize || !selectedColor) return;

    const filteredVariant = variants.find(
      (variant) =>
        variant.color === selectedColor && variant.size === selectedSize,
    );

    if (filteredVariant) {
      setSelectedVariant(filteredVariant);
      setCombinationError("");
    } else {
      setCombinationError(
        `This combination (${selectedColor}, ${selectedSize}) is not in stock.`,
      );
    }
  }, [selectedColor, selectedSize]);

  // Add to cart
  // const addToCartHandler = (e) => {
  //   e.preventDefault();

  //   const nextErrors = {};

  //   if (!selectedColor) {
  //     nextErrors.color = "Select a color.";
  //   }

  //   if (!selectedSize) {
  //     nextErrors.size = "Select a size.";
  //   }

  //   if (!quantity || quantity <= 0) {
  //     nextErrors.quantity = "Select quantity.";
  //   }

  //   setError(nextErrors);

  //   if (combinationError) return;

  //   if (Object.keys(errors).length > 0) return;

  //   if (Object.keys(selectedVariant).length === 0) return;

  //   axios
  //     .post("/api/v1/cart/add", { variantId: selectedVariant._id, quantity })
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

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
                Rs.{" "}
                {Object.keys(selectedVariant).length > 0
                  ? selectedVariant.price
                  : variants[0]?.price}
              </div>
              <div className="text-lg dark:text-white">
                Rs. 10000
                <span className="pl-3">50% off</span>
              </div>
              <div>
                <span className="text-sm text-red-500 mt-4">
                  {combinationError}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="mt-5 grid justify-items-end gap-5">
                <Label>Color:</Label>
                <Label>Size: </Label>
                <Label>Quantity:</Label>
              </div>
              <div className="mt-5 grid gap-5">
                <Select onValueChange={setColor} value={selectedColor}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {variants?.map((variant) => (
                        <SelectItem key={variant?.color} value={variant?.color}>
                          {variant?.color}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Select onValueChange={setSize} value={selectedSize}>
                  <SelectTrigger className="w-[200px]">
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
                <div className="w-[200px] flex gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity((prev) => prev - 1)}
                  >
                    <Minus />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    min={1}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              <div className="mt-5 grid gap-5">
                <div>
                  <span className="text-sm text-red-500">{errors?.color}</span>
                </div>
                <div>
                  <span className="text-sm text-red-500">{errors?.size}</span>
                </div>
                <div>
                  <span className="text-sm text-red-500">
                    {errors?.quantity}
                  </span>
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

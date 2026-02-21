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
import { IndianRupee, Minus, Plus } from "lucide-react";
import { notification } from "@/utils/toast";
import { useContext } from "react";
import AuthContext from "@/contexts/AuthContext";
import { addItemToCart, addItemToGuestCart } from "@/services/cartService";
import { Spinner } from "@/components/ui/spinner";
import { getAllVariants, getProduct } from "@/services/productService";

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
  const [loader, setLoader] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const { updateCartCount, userData } = useContext(AuthContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoader(true);

        // Get product and variant
        const [productRes, variantsRes] = await Promise.all([
          getProduct(id),
          getAllVariants(id),
        ]);

        setProduct(productRes?.data?.data?.product);
        setVariants(variantsRes?.data?.data?.variants);
      } catch (err) {
        notification.error("Failed to load product details.");
      } finally {
        setLoader(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

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

  const inputQTY = (e) => {
    const qty = Number(e.target.value);

    if (!isNaN(qty)) {
      setQuantity(qty);
    } else {
      setQuantity(0);
    }
  };

  // Add to cart
  const addToCartHandler = async (e) => {
    e.preventDefault();

    const nextErrors = {};
    const qty = Number(quantity);

    if (!selectedColor) {
      nextErrors.color = "Select a color.";
    }

    if (!selectedSize) {
      nextErrors.size = "Select a size.";
    }

    if (!Number.isInteger(qty) || qty <= 0) {
      nextErrors.quantity = "Quantity must be a valid number.";
    }

    if (qty > selectedVariant?.stock) {
      nextErrors.quantityLimit = `Only ${selectedVariant?.stock} items available in stock.`;
    }

    if (combinationError) return;

    setError(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    if (!selectedVariant?._id) return;

    setBtnLoader(true);

    try {
      let totalItems = null;
      if (userData.isAuthenticated) {
        const res = await addItemToCart(selectedVariant._id, quantity);
        totalItems = res?.data?.data?.cart.items?.length;
      } else {
        const res = addItemToGuestCart(selectedVariant._id, quantity);
        totalItems = res?.length;
      }

      updateCartCount(totalItems);
      // Notification
      notification.success("Item added to cart.");
    } catch (err) {
      notification.error("Failed to add item.");
    } finally {
      setBtnLoader(false);
    }
  };

  // Loading state
  if (loader) {
    return (
      <div className="flex justify-center items-center h-70">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              <div className="flex items-center text-2xl font-medium dark:text-white">
                <IndianRupee size={20} className="mt-1" />
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
                    disabled={quantity <= 1 ? true : false}
                  >
                    <Minus />
                  </Button>
                  <Input
                    type="text"
                    value={quantity}
                    min={1}
                    onChange={inputQTY}
                    className="text-center"
                  />
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    disabled={quantity >= selectedVariant?.stock ? true : false}
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
              <div className="mt-5 grid items-center gap-5">
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
                  <span className="text-sm text-red-500">
                    {errors?.quantityLimit}
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-5 w-full">
              {/* <Button variant="outline" className="w-full cursor-pointer">
                Buy Now
              </Button> */}
              <Button
                onClick={addToCartHandler}
                className="w-full mt-3 text-white cursor-pointer"
                disabled={btnLoader}
              >
                {btnLoader ? (
                  <>
                    <Spinner /> Add to Cart
                  </>
                ) : (
                  "Add to Cart"
                )}
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

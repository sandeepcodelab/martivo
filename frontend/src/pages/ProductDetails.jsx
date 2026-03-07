import { useEffect, useState, useContext } from "react";
import Container from "@/components/Container/Container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IndianRupee, Minus, Plus, Star } from "lucide-react";
import { notification } from "@/utils/toast";
import AuthContext from "@/contexts/AuthContext";
import { addItemToCart, addItemToGuestCart } from "@/services/cartService";
import { Spinner } from "@/components/ui/spinner";
import { getAllVariants, getProduct } from "@/services/productService";

export default function ProductDetails() {
  const { id } = useParams();
  const { updateCartCount, userData } = useContext(AuthContext);

  const [product, setProduct] = useState({});
  const [variants, setVariants] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setColor] = useState("");
  const [selectedSize, setSize] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loader, setLoader] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [combinationError, setCombinationError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoader(true);
        const [productRes, variantRes] = await Promise.all([
          getProduct(id),
          getAllVariants(id),
        ]);

        const productData = productRes?.data?.data?.product;
        const variantData = variantRes?.data?.data?.variants;

        setProduct(productData);
        setVariants(variantData);
        setSelectedImage(productData?.thumbnail?.url);
      } catch {
        notification.error("Failed to load product.");
      } finally {
        setLoader(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!selectedColor || !selectedSize) return;

    const found = variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize,
    );

    if (found) {
      setSelectedVariant(found);
      setCombinationError("");
    } else {
      setSelectedVariant(null);
      setCombinationError("This combination is not available.");
    }
  }, [selectedColor, selectedSize, variants]);

  const handleAddToCart = async (e) => {
    e.preventDefault();

    const nextErrors = {};
    if (!selectedColor) nextErrors.color = "Select color.";
    if (!selectedSize) nextErrors.size = "Select size.";
    if (quantity <= 0) nextErrors.quantity = "Invalid quantity.";
    if (quantity > selectedVariant?.stock)
      nextErrors.quantity = `Only ${selectedVariant?.stock} in stock`;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    if (!selectedVariant) return;

    try {
      setBtnLoader(true);
      let totalItems;

      if (userData.isAuthenticated) {
        const res = await addItemToCart(selectedVariant._id, quantity);
        totalItems = res?.data?.data?.cart.items.length;
      } else {
        const res = addItemToGuestCart(selectedVariant._id, quantity);
        totalItems = res.length;
      }

      updateCartCount(totalItems);
      notification.success("Added to cart.");
    } catch {
      notification.error("Failed to add item.");
    } finally {
      setBtnLoader(false);
    }
  };

  if (loader) {
    return (
      <div className="flex justify-center items-center h-80">
        <Spinner />
      </div>
    );
  }

  const uniqueColors = [...new Set(variants.map((v) => v.color))];
  const uniqueSizes = [...new Set(variants.map((v) => v.size))];

  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-15 mt-8">
        {/* Image Section */}
        <div className="space-y-4">
          <Card className="overflow-hidden rounded-2xl shadow-md py-0">
            <CardContent className="p-0 h-[500px]">
              <img
                src={selectedImage}
                alt="product"
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </CardContent>
          </Card>

          <div className="flex gap-3">
            {[product.thumbnail, ...(product?.images || [])].map((img) => (
              <img
                key={img?.url}
                src={img?.url}
                onClick={() => setSelectedImage(img.url)}
                className="w-20 h-20 object-cover rounded-lg cursor-pointer border hover:border-primary"
              />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-500">(120 reviews)</span>
          </div>

          {/* Price */}
          <div>
            <div className="flex items-center gap-4">
              <span className="flex items-center text-3xl font-bold">
                <IndianRupee size={20} />
                {selectedVariant?.price || variants[0]?.price}
              </span>
              <span className="line-through text-gray-400">₹10000</span>
              <span className="text-green-600 font-medium">50% OFF</span>
            </div>

            {combinationError ? (
              <p className="text-red-500 text-sm">{combinationError}</p>
            ) : (
              selectedVariant?.stock > 0 && (
                <p className="text-sm text-green-600 mt-1">
                  In Stock ({selectedVariant.stock})
                </p>
              )
            )}
          </div>

          {/* Color Selection */}
          <div>
            <Label>Color</Label>
            <div className="flex gap-3 mt-2">
              {uniqueColors.map((color) => (
                <button
                  key={color}
                  onClick={() => setColor(color)}
                  className={`px-4 py-2 rounded-md border ${
                    selectedColor === color
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300 hover:border-primary"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
            <p className="text-red-500 text-sm">{errors.color}</p>
          </div>

          {/* Size Selection */}
          <div>
            <Label>Size</Label>

            <div className="flex gap-3 mt-2 flex-wrap">
              {uniqueSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSize(size)}
                  className={`px-4 py-2 rounded-md border text-sm font-medium transition
                  ${
                    selectedSize === size
                      ? "bg-primary text-white border-primary"
                      : "border-gray-300 hover:border-primary"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <p className="text-red-500 text-sm mt-1">{errors.size}</p>
          </div>

          {/* Quantity */}
          <div>
            <Label>Quantity</Label>
            <div className="flex gap-4 items-center">
              <div className="flex items-center border rounded-lg w-[150px] mt-2">
                <button
                  className="px-3 py-2"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  <Minus size={16} />
                </button>
                <Input
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="text-center border-none"
                />
                <button
                  className="px-3 py-2"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
              <p className="text-red-500 text-sm">{errors.quantity}</p>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            className="w-full h-12 text-lg font-semibold rounded-xl shadow-md text-white cursor-pointer"
            disabled={btnLoader}
          >
            {btnLoader ? <Spinner className="mr-2" /> : "Add to Cart"}
          </Button>
        </div>
      </div>

      {/* Description */}
      <section className="mt-16">
        <Card className="p-6 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Product Description</h2>
          <p className="leading-relaxed">{product.description}</p>
        </Card>
      </section>
    </Container>
  );
}

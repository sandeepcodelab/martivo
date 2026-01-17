import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Upload, Trash2, CircleX } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [showVariants, setShowVariants] = useState(false);
  const [variants, setVariants] = useState([
    {
      size: "",
      color: "",
      price: "",
      stock: "",
    },
  ]);

  const thumbnailRef = useRef(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const productImagesRef = useRef(null);
  const [productImages, setProductImages] = useState([]);
  const [productImagesPreview, setProductImagesPreview] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (thumbnailImage) {
      const url = URL.createObjectURL(thumbnailImage);
      setThumbnailPreview(url);

      return () => URL.revokeObjectURL(url);
    }

    if (!thumbnailImage) {
      setThumbnailPreview(null);
      return;
    }
  }, [thumbnailImage]);

  const removeProductImage = (index) => {
    setProductImages((prev) => prev.filter((value, i) => i !== index));

    setProductImagesPreview((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((value, i) => i !== index);
    });
  };

  const productImagesHandler = (e) => {
    const images = Array.from(e.target.files);

    if (!images.length) return;

    const urls = images.map((image) => URL.createObjectURL(image));

    setProductImages((prev) => [...prev, ...images]);
    setProductImagesPreview((prev) => [...prev, ...urls]);

    return () => urls.map((url) => URL.revokeObjectURL(url));
  };

  const addAnotherVariants = () => {
    setVariants([
      ...variants,
      {
        size: "",
        color: "",
        price: "",
        stock: "",
      },
    ]);
  };

  const variantChangesHandler = (index, field, value) => {
    const updateVariants = [...variants];
    updateVariants[index][field] = value;
    setVariants(updateVariants);
  };

  const removeVariant = (removeIndex) => {
    setVariants((prev) => prev.filter((value, index) => index !== removeIndex));
  };

  // Saving product
  const saveProductHandler = () => {
    const newErrors = {};

    if (!title) {
      newErrors.title = "Title is required";
    }
    if (!category) {
      newErrors.category = "Category is required";
    }
    if (!thumbnailImage) {
      newErrors.thumbnail = "Image is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
  };

  // Save variants
  const saveVariantHandler = () => {
    console.log(variants);
  };

  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* ================= LEFT SIDE ================= */}
      <div className="lg:col-span-8 space-y-8">
        {/* Product Details */}
        <Card className="p-5">
          <CardHeader>
            <CardTitle>Product details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <Input
                placeholder="Product title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors((prev) => ({ ...prev, title: "" }));
                }}
              />
              {errors.title && <p className="text-red-500">{errors.title}</p>}
            </div>

            <div className="mb-5">
              <Select
                value={category}
                onValueChange={(value) => {
                  setCategory(value);
                  setErrors((prev) => ({ ...prev, category: "" }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select product category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500">{errors.category}</p>
              )}
            </div>

            <ReactQuill
              placeholder="Description..."
              value={description}
              onChange={setDescription}
            />

            {/* Actions */}
            <div className="flex justify-end">
              <Button
                onClick={saveProductHandler}
                className="text-white cursor-pointer"
              >
                Save & continue
              </Button>
            </div>

            {/* Add Variants CTA */}
            <Separator />
            <div className="flex justify-between">
              <p className="text-sm text-muted-foreground mt-2">
                If this product has multiple options like size or color
              </p>
              <Button
                type="button"
                onClick={() => setShowVariants(true)}
                className="text-white cursor-pointer"
              >
                + Add variants
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Variants Section */}
        {showVariants && (
          <Card>
            <CardHeader>
              <CardTitle>Variants</CardTitle>
              <p className="text-sm text-muted-foreground">
                Each variant can have its own price and stock
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              {variants.map((variant, index) => (
                <Card key={index}>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      <Input
                        placeholder="Size (e.g. M)"
                        value={variant.size}
                        onChange={(e) =>
                          variantChangesHandler(index, "size", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Color (e.g. Red)"
                        value={variant.color}
                        onChange={(e) =>
                          variantChangesHandler(index, "color", e.target.value)
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        min={0}
                        value={variant.price}
                        onChange={(e) =>
                          variantChangesHandler(index, "price", e.target.value)
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Stock"
                        min={0}
                        value={variant.stock}
                        onChange={(e) =>
                          variantChangesHandler(index, "stock", e.target.value)
                        }
                      />
                    </div>
                    {variants.length > 1 && (
                      <CardFooter className="flex justify-end px-0">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeVariant(index)}
                          className="cursor-pointer"
                        >
                          Remove
                        </Button>
                      </CardFooter>
                    )}
                  </CardContent>
                </Card>
              ))}
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={addAnotherVariants}
              >
                + Add another variant
              </Button>
              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={saveVariantHandler}
                  className="text-white cursor-pointer"
                >
                  Save variants
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="lg:col-span-4 space-y-6 sticky top-6">
        {/* Thumbnail */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Main image</CardTitle>
            {thumbnailImage ? (
              <Trash2
                onClick={() => setThumbnailImage(null)}
                className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-red-400"
              />
            ) : (
              ""
            )}
          </CardHeader>

          <CardContent>
            {thumbnailPreview ? (
              <div className="h-[180px] rounded-lg overflow-hidden">
                <img
                  src={thumbnailPreview}
                  alt="Preview"
                  className="w-full h-full"
                />
              </div>
            ) : (
              <div className="h-[180px] bg-muted rounded-lg" />
            )}
            {errors.thumbnail && (
              <p className="text-red-500">{errors.thumbnail}</p>
            )}
          </CardContent>

          <CardFooter>
            <input
              type="file"
              ref={thumbnailRef}
              hidden
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => {
                setThumbnailImage(e.target.files[0]);
                setErrors((prev) => ({ ...prev, thumbnail: "" }));
              }}
            />
            <Button
              type="button"
              className="w-full text-white cursor-pointer"
              onClick={() => thumbnailRef.current?.click()}
            >
              <Upload />
              Upload thumbnail
            </Button>
          </CardFooter>
        </Card>

        {/* Gallery */}
        <Card>
          <CardHeader>
            <CardTitle>Product images</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-3 gap-2">
            {productImagesPreview.length > 0
              ? productImagesPreview.map((preview, index) => (
                  <div key={preview} className="relative">
                    <img src={preview} className="aspect-square rounded-md" />

                    <CircleX
                      onClick={() => removeProductImage(index)}
                      size={20}
                      className="absolute -top-1 -right-1 bg-red-500 rounded-full cursor-pointer"
                    />
                  </div>
                ))
              : [1, 2, 3].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded-md" />
                ))}
          </CardContent>

          <CardFooter>
            <input
              type="file"
              ref={productImagesRef}
              hidden
              accept="image/png, image/jpeg, image/jpg"
              multiple
              onChange={productImagesHandler}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => productImagesRef.current?.click()}
            >
              <Upload />
              Upload images
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

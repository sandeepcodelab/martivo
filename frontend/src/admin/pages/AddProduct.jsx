import { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Upload, Trash2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
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
  const [showVariants, setShowVariants] = useState(false);
  const thumbnailRef = useRef(null);
  const productImagesRef = useRef(null);
  const [variants, setVariants] = useState([
    {
      size: "",
      color: "",
      price: "",
      stock: "",
    },
  ]);

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
            <Input placeholder="Product title" />

            <Select>
              <SelectTrigger className="w-full mb-5">
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

            <ReactQuill placeholder="Description..." />

            {/* Actions */}
            <div className="flex justify-end">
              <Button className="text-white cursor-pointer">
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
                <Button type="button" className="text-white cursor-pointer">
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
            <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground" />
          </CardHeader>

          <CardContent>
            <div className="h-[180px] bg-muted rounded-lg flex items-center justify-center"></div>
          </CardContent>

          <CardFooter>
            <input
              type="file"
              ref={thumbnailRef}
              hidden
              accept="image/png, image/jpeg, image/jpg"
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
            {[1, 2, 3].map((i) => (
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

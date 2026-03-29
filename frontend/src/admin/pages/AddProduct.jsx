import { useState, useRef, useEffect } from "react";
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
import Editor from "@/components/Editor/Editor";
import { getAllcategories } from "@/services/categoryService";
import { notification } from "@/utils/toast";
import { addBulkVariants, createProduct } from "@/services/productService";
import { Spinner } from "@/components/ui/spinner";

export default function AddProduct() {
  const editorRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const thumbnailRef = useRef(null);
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const productImagesRef = useRef(null);
  const [productImages, setProductImages] = useState([]);
  const [productImagesPreview, setProductImagesPreview] = useState([]);
  const [errors, setErrors] = useState({});
  const [productLoader, setProductLoader] = useState(false);
  const [storedProduct, setStoredProduct] = useState({});
  const [variants, setVariants] = useState([
    {
      size: "",
      color: "",
      price: "",
      salePrice: "",
      stock: "",
      sku: "",
    },
  ]);
  const [variantsLoader, setVariantsLoader] = useState(false);
  const [variantsErrors, setVariantsErrors] = useState({});

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllcategories();
        setCategories(res?.data?.data?.categories);
      } catch (err) {
        notification.error(err.response.data.message);
      }
    };

    fetchCategories();
  }, []);

  // Handle Images
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

  // Remove Images
  const removeProductImage = (index) => {
    setProductImages((prev) => prev.filter((value, i) => i !== index));

    setProductImagesPreview((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((value, i) => i !== index);
    });
  };

  // Handle product images
  const productImagesHandler = (e) => {
    const images = Array.from(e.target.files);

    if (!images.length) return;

    const urls = images.map((image) => URL.createObjectURL(image));

    setProductImages((prev) => [...prev, ...images]);
    setProductImagesPreview((prev) => [...prev, ...urls]);

    return () => urls.map((url) => URL.revokeObjectURL(url));
  };

  // Variants
  const addAnotherVariants = () => {
    setVariants([
      ...variants,
      {
        size: "",
        color: "",
        price: "",
        salePrice: "",
        stock: "",
        sku: "",
      },
    ]);
  };

  // Handle variant update
  const variantChangesHandler = (index, field, value) => {
    const updateVariants = [...variants];
    updateVariants[index][field] = value;
    setVariants(updateVariants);

    setVariantsErrors((prev) => {
      const updated = { ...prev };
      delete updated[`variants[${index}].${field}`];
      return updated;
    });
  };

  // Remove variant
  const removeVariant = (removeIndex) => {
    setVariants((prev) => prev.filter((value, index) => index !== removeIndex));
  };

  // Clear all form fields
  const resetAllFields = () => {
    // Basic fields
    setTitle("");
    setSlug("");
    setSelectedCategory("");

    // Editor
    editorRef.current?.clear();

    // Thumbnail
    setThumbnailImage(null);
    setThumbnailPreview(null);
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }

    // Product Images
    setProductImages([]);
    setProductImagesPreview([]);
    if (productImagesRef.current) {
      productImagesRef.current.value = "";
    }

    // Variants
    setVariants([
      {
        size: "",
        color: "",
        price: "",
        salePrice: "",
        stock: "",
        sku: "",
      },
    ]);

    // Errors
    setErrors({});
    setVariantsErrors({});

    // Stored product
    setStoredProduct({});

    // Loaders
    setProductLoader(false);
    setVariantsLoader(false);
  };

  // Saving product
  const saveProductHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const newErrors = {};

    if (!title) {
      newErrors.title = "Title is required";
    }
    if (!slug) {
      newErrors.slug = "Slug is required";
    }
    if (!selectedCategory) {
      newErrors.category = "Category is required";
    }
    if (!thumbnailImage) {
      newErrors.thumbnail = "Image is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const description = JSON.stringify(editorRef?.current.getJSON());

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("category", selectedCategory);
    formData.append("description", description);
    formData.append("thumbnail", thumbnailImage);
    productImages.map((image) => formData.append("images", image));

    try {
      setProductLoader(true);
      const res = await createProduct(formData);
      setStoredProduct(res?.data?.data?.product);
    } catch (err) {
      notification.error(err.response.data.message);
    } finally {
      setProductLoader(false);
    }
  };

  // Save variants
  const saveVariantHandler = async (e) => {
    e.preventDefault();

    try {
      setVariantsLoader(true);

      const productId = storedProduct?._id;

      if (!productId) {
        notification.error("Create product first");
        return;
      }

      const res = await addBulkVariants(productId, variants);

      // Reset all fields
      resetAllFields();

      notification.success(res.data.message);
    } catch (err) {
      if (err.response.status === 422) {
        const flatErrors = {};
        err?.response?.data?.errors?.forEach((obj) => {
          Object.assign(flatErrors, obj);
        });
        setVariantsErrors(flatErrors);
      }
      notification.error(err.response?.data?.message);
    } finally {
      setVariantsLoader(false);
    }
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
                  setErrors((prev) => ({ ...prev, title: "", slug: "" }));
                  setSlug(
                    e.target.value.trim().replaceAll(" ", "-").toLowerCase(),
                  );
                }}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Slug"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setErrors((prev) => ({ ...prev, slug: "" }));
                }}
              />
              {errors.slug && (
                <p className="text-red-500 text-sm">{errors.slug}</p>
              )}
            </div>

            <div className="mb-5">
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  setErrors((prev) => ({ ...prev, category: "" }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select product category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {categories.map((cate) => (
                      <SelectItem key={cate._id} value={cate._id}>
                        {cate.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm">{errors.category}</p>
              )}
            </div>

            <div>
              <Editor ref={editorRef} />
            </div>

            {/* Actions */}

            {Object.keys(storedProduct).length === 0 && (
              <div className="flex justify-end">
                <Button
                  onClick={saveProductHandler}
                  className="text-white cursor-pointer"
                  disabled={productLoader}
                >
                  {productLoader ? (
                    <div className="flex items-center gap-2">
                      <Spinner />
                      Saving...
                    </div>
                  ) : (
                    "Save & continue"
                  )}
                </Button>
              </div>
            )}

            {/* Variants Section */}
            {Object.keys(storedProduct).length > 0 && (
              <div>
                <Separator />
                <div className="my-5">
                  <h3 className="text-lg font-bold">Variants</h3>
                  <p className="text-sm text-muted-foreground">
                    Each variant can have its own price and stock
                  </p>
                </div>

                <div className="space-y-4">
                  {variants.map((variant, index) => (
                    <Card key={index}>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                          <div>
                            <Input
                              placeholder="Size (e.g. M)"
                              value={variant.size}
                              onChange={(e) =>
                                variantChangesHandler(
                                  index,
                                  "size",
                                  e.target.value,
                                )
                              }
                            />
                            <p className="text-xs text-red-500">
                              {variantsErrors[`variants[${index}].size`]}
                            </p>
                          </div>

                          <div>
                            <Input
                              placeholder="Color (e.g. Red)"
                              value={variant.color}
                              onChange={(e) =>
                                variantChangesHandler(
                                  index,
                                  "color",
                                  e.target.value,
                                )
                              }
                            />
                            <p className="text-xs text-red-500">
                              {variantsErrors[`variants[${index}].color`]}
                            </p>
                          </div>

                          <div>
                            <Input
                              type="number"
                              placeholder="Price"
                              min={0}
                              value={variant.price}
                              onChange={(e) =>
                                variantChangesHandler(
                                  index,
                                  "price",
                                  e.target.value,
                                )
                              }
                            />
                            <p className="text-xs text-red-500">
                              {variantsErrors[`variants[${index}].price`]}
                            </p>
                          </div>

                          <div>
                            <Input
                              type="number"
                              placeholder="Sale Price"
                              min={0}
                              value={variant.salePrice}
                              onChange={(e) =>
                                variantChangesHandler(
                                  index,
                                  "salePrice",
                                  e.target.value,
                                )
                              }
                            />
                            <p className="text-xs text-red-500">
                              {variantsErrors[`variants[${index}].salePrice`]}
                            </p>
                          </div>

                          <div>
                            <Input
                              type="number"
                              placeholder="Stock"
                              min={0}
                              value={variant.stock}
                              onChange={(e) =>
                                variantChangesHandler(
                                  index,
                                  "stock",
                                  e.target.value,
                                )
                              }
                            />
                            <p className="text-xs text-red-500">
                              {variantsErrors[`variants[${index}].stock`]}
                            </p>
                          </div>

                          <div>
                            <Input
                              type="text"
                              placeholder="SKU"
                              value={variant.sku}
                              onChange={(e) =>
                                variantChangesHandler(
                                  index,
                                  "sku",
                                  e.target.value,
                                )
                              }
                            />
                            <p className="text-xs text-red-500">
                              {variantsErrors[`variants[${index}].sku`]}
                            </p>
                          </div>
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
                      {variantsLoader ? (
                        <div className="flex items-center gap-2">
                          <Spinner />
                          Saving...
                        </div>
                      ) : (
                        "Save variants"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {/* End Variants Section */}
          </CardContent>
        </Card>
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
              <p className="text-red-500 text-sm">{errors.thumbnail}</p>
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

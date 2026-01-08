import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Trash2, Upload, CircleX } from "lucide-react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function AddProduct() {
  const uploadThumbnail = useRef(null);

  const handelUploadThumbnail = () => {
    uploadThumbnail.current?.click();
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between mb-5">
          <div className="text-2xl font-bold pl-4">Add new product</div>
          <div>
            <Button type="submit" className="text-white cursor-pointer">
              Save
            </Button>
          </div>
        </div>
        <div className="w-full flex gap-10 items-start">
          <div className="border-1 rounded-2xl w-4/6 p-5 bg-card text-card-foreground">
            <div>
              <Input
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
                className="mb-5"
              />
              {errors.title && <span>This field is required</span>}
            </div>

            <div>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full mb-5">
                      <SelectValue placeholder="Select a fruit" />
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
                )}
              />
              {errors.category && <span>This field is required</span>}
            </div>

            {/* Text Editor */}
            <div className="w-full">
              <Controller
                name="description"
                control={control}
                rules={{
                  validate: (value) => {
                    const text = value.replace(/<[^>]*>/g, "").trim();
                    return (
                      text.length >= 10 || "Minimum 10 characters required"
                    );
                  },
                }}
                render={({ field }) => (
                  <ReactQuill
                    theme="snow"
                    placeholder="Description..."
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.description?.message && (
                <span>This field is required</span>
              )}
            </div>
          </div>

          <div className="rounded-2xl w-2/6">
            {/* Product Image (thumbnail) */}
            <Card className="mb-5">
              <CardHeader>
                <CardTitle>Product Image</CardTitle>
                <CardAction>
                  <Trash2
                    size={14}
                    className="text-white hover:text-red-500 cursor-pointer"
                  />
                </CardAction>
              </CardHeader>
              <CardContent className="w-full h-[250px]">
                <img
                  src="http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                  className="w-full h-full rounded-2xl object-cover"
                />
              </CardContent>
              <CardFooter>
                {/* <Input
                  type="file"
                  ref={uploadThumbnail}
                  {...register("thumbnail")}
                  className="hidden"
                /> */}
                <Input
                  type="file"
                  className="hidden"
                  {...register("thumbnail", { required: true })}
                  ref={(el) => {
                    register("thumbnail").ref(el);
                    uploadThumbnail.current = el;
                  }}
                />

                <Button
                  type="button"
                  onClick={handelUploadThumbnail}
                  className="text-white w-full cursor-pointer"
                >
                  <Upload />
                  Upload Image
                </Button>
              </CardFooter>
              {errors.thumbnail && <span>This field is required</span>}
            </Card>

            {/* Product Images  */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src="http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                        className="w-full h-full rounded-2xl"
                      />

                      <CircleX
                        strokeWidth={3}
                        size={20}
                        className="absolute -top-1 -right-1 text-red-500 bg-red-200 rounded-full cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="button"
                  className="text-white w-full cursor-pointer"
                >
                  <Upload />
                  Upload Images
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* errors will return when field validation fails  */}

          {/* <input type="submit" /> */}
        </div>
      </form>
    </div>
  );
}

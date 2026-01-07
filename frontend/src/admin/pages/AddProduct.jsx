import { useState } from "react";
import { useForm } from "react-hook-form";
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Trash2, Upload, CircleX } from "lucide-react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export default function AddProduct() {
  const [content, setContent] = useState("");

  //   const {
  //     register,
  //     handleSubmit,
  //     watch,
  //     formState: { errors },
  //   } = useForm();

  //   const onSubmit = (data) => console.log(data);

  //   console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="w-full flex gap-10 items-start">
      <div className="border-1 rounded-2xl w-4/6 p-5 bg-card text-card-foreground">
        <Input type="text" placeholder="Title" className="mb-5" />

        <Select>
          <SelectTrigger className="w-full mb-5">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="blueberry">Blueberry</SelectItem>
              <SelectItem value="grapes">Grapes</SelectItem>
              <SelectItem value="pineapple">Pineapple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Text Editor */}
        <div className="w-full">
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="snow"
            placeholder="Start typing..."
          />
        </div>
      </div>

      <div className="rounded-2xl w-2/6">
        {/* Product Image (thumbnail) */}
        <Card className="mb-5">
          <CardHeader>
            <CardTitle>Product Image</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
            <CardAction>
              <Trash2
                size={14}
                className="text-white hover:text-red-500 cursor-pointer"
              />
            </CardAction>
          </CardHeader>
          <CardContent className="h-50">
            <img
              src="http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
              className="w-full h-full rounded-2xl"
            />
          </CardContent>
          <CardFooter>
            <Button className="bg-primary text-white w-full">
              <Upload />
              Upload Image
            </Button>
          </CardFooter>
        </Card>

        {/* Product Images  */}
        <Card>
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index} className="w-20 h-auto relative">
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
            <Button className="bg-primary text-white w-full">
              <Upload />
              Upload Images
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      {/* register your input into the hook by invoking the "register" function */}
      {/* <input defaultValue="test" {...register("example")} /> */}
      {/* include validation with required or other standard HTML validation rules */}
      {/* <input {...register("exampleRequired", { required: true })} /> */}
      {/* errors will return when field validation fails  */}
      {/* {errors.exampleRequired && <span>This field is required</span>} */}
      {/* <input type="submit" /> */}
      {/* </form> */}
    </div>
  );
}

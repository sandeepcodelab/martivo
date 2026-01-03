import { useForm } from "react-hook-form";
import TinyEditor from "../components/TinyEditor";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function AddProduct() {
  //   const {
  //     register,
  //     handleSubmit,
  //     watch,
  //     formState: { errors },
  //   } = useForm();

  //   const onSubmit = (data) => console.log(data);

  //   console.log(watch("example")); // watch input value by passing the name of it

  return (
    <div className="w-full flex gap-10">
      <div className="border-1 rounded-2xl w-4/6 p-5">
        <Input type="text" placeholder="Title" />
        <Select>
          <SelectTrigger className="w-full">
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

        {/* Textarea */}
        <TinyEditor />
      </div>
      <div className="border-1 rounded-2xl w-2/6 p-5">
        <div className="rounded-2xl overflow-hidden">
          <img className="w-full h-60 rounded-2xl" />
        </div>
        <Input
          // ref={inputRef}
          type="file"
          accept="image/*"
          // onChange={handleFileChange}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          // onClick={() => inputRef.current?.click()}
          className="w-full flex gap-2"
        >
          <Upload size={16} />
          Upload Image
        </Button>
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

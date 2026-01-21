import Container from "@/components/Container/Container";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const showPasswordIcon = watch("password");
  const showConfirmPasswordIcon = watch("confirmPassword");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (formData) => {
    const payload = {
      ...formData,
      email: formData.email.trim().toLowerCase(),
    };
    console.log(payload);
  };

  // console.log(watch("example")); // watch input value by passing the name of it

  return (
    <Container>
      <div className="flex justify-center my-15">
        <Card className="bg-card w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center font-bold text-xl">
              Sign Up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2 mb-5">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  {...register("fullname", { required: true })}
                />
                {errors.fullname && (
                  <p className="text-sm text-red-500">Full Name is required.</p>
                )}
              </div>

              <div className="grid gap-2 mb-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">Email is required.</p>
                )}
              </div>

              <div className="grid gap-2 mb-5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    className="pr-10"
                  />
                  {showPasswordIcon && (
                    <Button
                      onClick={() => setShowPassword((prev) => !prev)}
                      type="button"
                      size="icon"
                      className="absolute top-0 right-0 rounded-l-none text-white bg-transparent hover:bg-transparent"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </Button>
                  )}
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">Password is required.</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", { required: true })}
                    className="pr-10"
                  />
                  {showConfirmPasswordIcon && (
                    <Button
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      type="button"
                      size="icon"
                      className="absolute top-0 right-0 rounded-l-none text-white bg-transparent hover:bg-transparent"
                    >
                      {showConfirmPassword ? <Eye /> : <EyeOff />}
                    </Button>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    Confirm Password is required.
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full text-white cursor-pointer mt-6"
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-muted-foreground">
            Already have an account?&nbsp;
            <Link
              to="/auth/login"
              className="hover:underline hover:text-primary"
            >
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}

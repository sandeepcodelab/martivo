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
import { Link, useNavigate } from "react-router";
import { EyeOff, Eye } from "lucide-react";
import { useState } from "react";
import { signupUser } from "@/services/authService";
import { notification } from "@/utils/toast";
import { Spinner } from "@/components/ui/spinner";

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const showPasswordIcon = watch("password");
  const showConfirmPasswordIcon = watch("confirmPassword");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const { password, confirmPassword } = formData;

    if (confirmPassword !== password) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const payload = {
      ...formData,
      email: formData.email.trim().toLowerCase(),
    };

    try {
      setLoader(true);

      const res = await signupUser(payload);
      notification.success(res?.data?.message);
      navigate("/auth/login");
    } catch (error) {
      if (error.status === 422) {
        setApiErrors(Object.assign({}, ...error?.response?.data.errors));
      }
      notification.error(error?.response?.data.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <Container>
      <div className="flex justify-center my-8">
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
                  {...register("name", { required: true })}
                />
                {errors.fullname && (
                  <p className="text-sm text-red-500">Full Name is required.</p>
                )}
                {apiErrors.name && (
                  <p className="text-sm text-red-500">{apiErrors.name}</p>
                )}
              </div>

              <div className="grid gap-2 mb-5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
                {apiErrors.email && (
                  <p className="text-sm text-red-500">{apiErrors.email}</p>
                )}
              </div>

              <div className="grid gap-2 mb-5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required.",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
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
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
                {apiErrors.password && (
                  <p className="text-sm text-red-500">{apiErrors.password}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required.",
                    })}
                    className="pr-10"
                  />
                  {showConfirmPasswordIcon && (
                    <Button
                      onClick={() => {
                        setShowConfirmPassword((prev) => !prev);
                      }}
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
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full text-white cursor-pointer mt-6"
                disabled={loader}
              >
                {loader ? (
                  <div className="flex justify-center items-center gap-2">
                    <Spinner />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-muted-foreground">
            Already have an account?&nbsp;
            <Link
              to="/auth/login"
              className="text-primary font-semibold hover:underline"
            >
              Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}

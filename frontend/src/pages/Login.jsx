import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Container from "@/components/Container/Container";
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
import { Spinner } from "@/components/ui/spinner";
import { EyeOff, Eye } from "lucide-react";
import AuthContext from "@/contexts/AuthContext";
import { notification } from "@/utils/toast";
import { userLogin } from "@/services/authService";

export default function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const showPasswordIcon = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const { loggedInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const payload = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    setSpinner(true);

    try {
      const res = await userLogin(payload);
      loggedInUser(res);

      notification.success("Logged in successfully.");
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";

      notification.error(message);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <Container>
      <div className="flex justify-center my-8">
        <Card className="bg-card w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center font-bold text-xl">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
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

              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link to="#" className="text-sm hover:underline">
                    Forgot your password?
                  </Link> */}
                </div>
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

              <Button
                type="submit"
                className="w-full text-white cursor-pointer mt-6"
                disabled={spinner}
              >
                {spinner ? (
                  <div className="flex justify-center items-center gap-2">
                    <Spinner />
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-muted-foreground">
            Don&apos;t have an account?&nbsp;
            <Link
              to="/auth/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </Container>
  );
}

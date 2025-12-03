import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container/Container";

import { Card, CardContent } from "@/components/ui/card";

import { Check, Circle } from "lucide-react";

export default function Checkout() {
  const paymentMethods = [
    "Card",
    "Paypal",
    "Phone Pe",
    "Google Pay",
    "Paytm",
    "Apple Pay",
    "Amazon Pay",
  ];

  const [paymentMethodSelected, setPaymentMethodSelected] = useState("");

  const [step, setStep] = useState(1);

  // Initialize React Hook Form
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
    },
  });

  const { register, handleSubmit, formState, getValues } = methods;
  const { errors } = formState;

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data) => {
    console.log("✅ Final Submitted Data:", data);
  };

  return (
    <Container>
      <div className="max-w-full md:max-w-xl mx-auto mt-10 bg-card border p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-bold text-center mb-4">Checkout</h2>
        <h2 className="text-xl font-semibold text-center mb-4">
          Step {step} of 4
        </h2>

        {/* progress bar */}
        <div className="flex flex-col items-center w-full mb-5">
          {/* Circle */}
          <div className="flex items-center w-full max-w-md justify-between">
            <div className="flex flex-col items-center">
              <span className="w-6 h-6 flex justify-center items-center border-2 rounded-full text-xs">
                1
              </span>
            </div>

            <div className="flex-1 h-0.5 bg-gray-300"></div>

            <div className="flex flex-col items-center">
              <span className="w-6 h-6 flex justify-center items-center border-2 rounded-full text-xs">
                2
              </span>
            </div>

            <div className="flex-1 h-0.5 bg-gray-300"></div>

            <div className="flex flex-col items-center">
              <span className="w-6 h-6 flex justify-center items-center border-2 rounded-full text-xs">
                3
              </span>
            </div>

            <div className="flex-1 h-0.5 bg-gray-300"></div>

            <div className="flex flex-col items-center">
              <span className="w-6 h-6 flex justify-center items-center border-2 rounded-full text-xs">
                4
              </span>
            </div>
          </div>

          {/* Title */}
          <div className="flex justify-between w-full max-w-md">
            <span className="text-xs text-center w-8 -ml-2">Name</span>
            <span className="text-xs text-center w-8 -ml-2">Address</span>
            <span className="text-xs text-center w-8 -ml-1">Payment</span>
            <span className="text-xs text-center w-8">Review</span>
          </div>
        </div>

        {/* Multi-step form */}
        <FormProvider {...methods}>
          <Form {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={methods.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            {...register("name", {
                              required: "Name is required",
                            })}
                          />
                        </FormControl>
                        <FormMessage>{errors.name?.message}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                              },
                            })}
                          />
                        </FormControl>
                        <FormMessage>{errors.email?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your mobile number"
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                              },
                            })}
                          />
                        </FormControl>
                        <FormMessage>{errors.email?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={methods.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your address"
                            {...register("address", {
                              required: "Address is required",
                            })}
                          />
                        </FormControl>
                        <FormMessage>{errors.address?.message}</FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={methods.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your city"
                            {...register("city", {
                              required: "City is required",
                            })}
                          />
                        </FormControl>
                        <FormMessage>{errors.city?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="State"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your state"
                            {...register("state", {
                              required: "State is required",
                            })}
                          />
                        </FormControl>
                        <FormMessage>{errors.state?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="Pin Code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pin Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your pin code"
                            {...register("Pin code", {
                              required: "Pin code is required",
                            })}
                          />
                        </FormControl>
                        <FormMessage>{errors.zip?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={methods.control}
                    name="Country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your country"
                            {...register("country", {
                              required: "Country is required",
                            })}
                          />
                        </FormControl>
                        <FormMessage>{errors.country?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4">
                  {paymentMethods.map((paymentMethod) => (
                    <Card
                      key={paymentMethod}
                      className="w-full py-4"
                      onClick={() => setPaymentMethodSelected(paymentMethod)}
                    >
                      <CardContent className="flex justify-between items-center">
                        <div className="font-semibold">{paymentMethod}</div>
                        <div>
                          {paymentMethodSelected === paymentMethod ? (
                            <Check
                              size={20}
                              className="border-2 border-green-600 rounded-full bg-green-600 text-white"
                            />
                          ) : (
                            <Circle size={20} />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* STEP 4 - REVIEW */}
              {step === 4 && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg mb-2">
                    Review Your Information
                  </h3>
                  <p>
                    <strong>Name:</strong> {getValues("name")}
                  </p>
                  <p>
                    <strong>Email:</strong> {getValues("email")}
                  </p>
                  <p>
                    <strong>Address:</strong> {getValues("address")}
                  </p>
                  <p>
                    <strong>City:</strong> {getValues("city")}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-between">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="w-28"
                  >
                    Back
                  </Button>
                )}

                {step < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto w-28"
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto w-28">
                    Submit
                  </Button>
                )}
              </div>

              {/* Progress bar */}
              <div className="flex justify-center gap-2 mt-4">
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className={`h-1.5 w-8 rounded-full ${
                      step >= n ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </form>
          </Form>
        </FormProvider>
      </div>
    </Container>
  );
}

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

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Checkout() {
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
                    name="ZIP/Postal Code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP/Postal Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your ZIP"
                            {...register("ZIP", {
                              required: "ZIP is required",
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
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Product Information</AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>
                          Our flagship product combines cutting-edge technology
                          with sleek design. Built with premium materials, it
                          offers unparalleled performance and reliability.
                        </p>
                        <p>
                          Key features include advanced processing capabilities,
                          and an intuitive user interface designed for both
                          beginners and experts.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Shipping Details</AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>
                          We offer worldwide shipping through trusted courier
                          partners. Standard delivery takes 3-5 business days,
                          while express shipping ensures delivery within 1-2
                          business days.
                        </p>
                        <p>
                          All orders are carefully packaged and fully insured.
                          Track your shipment in real-time through our dedicated
                          tracking portal.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Return Policy</AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p>
                          We stand behind our products with a comprehensive
                          30-day return policy. If you&apos;re not completely
                          satisfied, simply return the item in its original
                          condition.
                        </p>
                        <p>
                          Our hassle-free return process includes free return
                          shipping and full refunds processed within 48 hours of
                          receiving the returned item.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
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

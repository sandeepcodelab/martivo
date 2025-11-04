import Container from "@/components/Container/Container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, X, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Cart() {
  return (
    <section>
      <Container>
        <div className="flex flex-wrap">
          {/* Left Side */}
          <div className="w-full md:w-[70%] p-3">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="font-bold">
                  Cart <span>(3 products)</span>
                </CardTitle>
                <CardAction className="flex text-sm text-red-600 cursor-pointer">
                  <X size={20} />
                  Clear cart
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="hidden md:flex w-full border-b border-gray-300 pb-2">
                  <div className="w-[58%]">Product</div>
                  <div className="w-[24%]">Quantity</div>
                  <div className="w-[18%]">Price</div>
                </div>
                <Card className="mt-3 py-3">
                  <CardContent className="px-3">
                    <div className="flex flex-wrap md:items-center w-full">
                      <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start w-full md:w-[50%]">
                        <div className="w-50 h-50 md:w-25 md:min-w-25 md:h-30 rounded-2xl overflow-hidden">
                          <img
                            src="https://placehold.co/400x600/gray/FFFFFF/png"
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="px-3 py-5 md:py-0">
                          <div>
                            Product Lorem ipsum dolor sit amet consectetur
                            adipisicing elit.
                          </div>
                          <div>Size: M</div>
                          <div>Color: Red</div>
                        </div>
                      </div>
                      <div className="w-full md:w-[25%] py-3 text-center">
                        Quantity
                      </div>
                      <div className="w-full md:w-[20%] py-3 text-center">
                        Price
                      </div>
                      <div className="flex justify-center w-full md:w-[5%] py-3">
                        <Trash2
                          size={20}
                          className="cursor-pointer text-red-600"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Right Side */}
          <div className="w-full md:w-[30%] p-3">
            <Card className="w-full gap-2">
              <CardHeader>
                <CardTitle className="font-bold">Price Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium">1 Items</div>
                <div className="flex justify-between border-b-2 py-3">
                  <div>
                    <p>Product 1</p>
                  </div>
                  <div>
                    <p>12300</p>
                  </div>
                </div>
                <div className="flex justify-between font-semibold my-3">
                  <div>Total</div>
                  <div>12300</div>
                </div>
                <Link to="/checkout">
                  <Button className="w-full">
                    Place order <ArrowRight />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

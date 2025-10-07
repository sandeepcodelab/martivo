import Container from "@/components/Container/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Products() {
  return (
    <section className="py-2 text-white">
      <Container>
        <h2 className="text-3xl font-bold mb-8">Best Sellers</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 9 }).map((item) => (
            <Card
              key={item}
              className="hover:shadow-md transition py-0 pb-6 gap-1"
            >
              <div className="w-full h-50 rounded-t-lg overflow-hidden relative">
                <img
                  src="https://placehold.co/400x400/gray/white"
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white rounded-full p-1">
                  <Heart className="size-5 fill-gray-300 text-gray-300" />
                </div>
              </div>
              <CardHeader className="mt-3">
                <CardTitle>Product {item}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">$99.00</p>
                <Button size="sm" className="w-full cursor-pointer">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

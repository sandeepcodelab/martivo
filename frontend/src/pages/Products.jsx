import Container from "@/components/Container/Container";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/v1/product/all")
      .then((res) => {
        setProducts(res.data?.data.products);
        return;
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(products);

  return (
    <section className="py-2 text-white">
      <Container>
        <h2 className="text-3xl font-bold mb-8">Best Sellers</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product?.title}
              className="hover:shadow-md transition py-0 pb-6 gap-1"
            >
              <CardContent className="px-0">
                <div className="w-full h-60 rounded-t-lg overflow-hidden relative border-b">
                  <Link to={`/product-details/${product?._id}`}>
                    <img
                      src={product?.thumbnail.url}
                      alt=""
                      className="w-full h-full aspect-square"
                    />
                  </Link>
                  <div className="absolute top-2 right-2">
                    <Heart className="size-6 fill-gray-400" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="grid px-4">
                <Link to={`/product-details/${product?._id}`}>
                  <p className="text-lg py-1">{product?.title}</p>
                </Link>
                <p className="text-muted-foreground mb-2">$99.00</p>

                <Button size="sm" className="w-full text-white cursor-pointer">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

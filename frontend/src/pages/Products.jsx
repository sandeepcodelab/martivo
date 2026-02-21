import Container from "@/components/Container/Container";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllProducts } from "@/services/productService";
import { notification } from "@/utils/toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoader(true);

        const res = await getAllProducts();
        setProducts(res.data?.data?.products);
      } catch (err) {
        // console.log(err);
        notification.error("Failed to load products.");
      } finally {
        setLoader(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Loading state
  if (loader) {
    return (
      <div className="flex justify-center items-center h-70">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                  <p className="text-lg py-1 hover:underline">
                    {product?.title}
                  </p>
                </Link>
                <p className="text-muted-foreground mb-2">$99.00</p>
                {/* 
                <Button size="sm" className="w-full text-white cursor-pointer">
                  Add to Cart
                </Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

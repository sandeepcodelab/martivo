import Container from "@/components/Container/Container";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getAllProducts } from "@/services/productService";
import { notification } from "@/utils/toast";
import ProductCard from "@/components/Product/ProductCard";
import { Button } from "@/components/ui/button";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoader(true);

        const res = await getAllProducts({ category });
        setProducts(res.data?.data?.products);
      } catch (err) {
        // console.log(err);
        notification.error("Failed to load products.");
      } finally {
        setLoader(false);
      }
    };

    fetchAllProducts();
  }, [searchParams]);

  // Loading state
  if (loader) {
    return (
      <div className="flex justify-center items-center h-70">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section className="my-8">
      <Container>
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Link key={product._id} to={`/product-details/${product._id}`}>
                <ProductCard item={product} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="h-70 flex flex-col justify-center items-center gap-4">
            <h2 className="text-2xl font-semibold">
              We couldn't find any items in this category yet.
            </h2>
            <p className="text-lg font-semibold">Explore other categories.</p>
            <Link to="/products">
              <Button className="text-white cursor-pointer">
                View All Products
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

import Container from "@/components/Container/Container";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllProducts } from "@/services/productService";
import { notification } from "@/utils/toast";
import ProductCard from "@/components/Product/ProductCard";

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
            <Link key={product._id} to={`/product-details/${product._id}`}>
              <ProductCard item={product} />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

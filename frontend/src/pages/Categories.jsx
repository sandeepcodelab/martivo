import Container from "@/components/Container/Container";
import { getAllcategories } from "@/services/categoryService";
import { notification } from "@/utils/toast";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function UserCategories() {
  const [loading, setloading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setloading(true);
        const res = await getAllcategories({ sort: "asc", limit: 100 });
        setCategories(res.data?.data.categories);
      } catch (err) {
        notification.error("Failed to load categories.");
      } finally {
        setloading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-70">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="my-8">
      <Container>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Categories</h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {categories.map((category) => (
            <div
              key={category._id}
              className="group text-center cursor-pointer"
            >
              <Link to={`/products?category=${category.slug}`}>
                <div className="w-24 h-24 lg:w-28 lg:h-28 mx-auto rounded-full overflow-hidden border group-hover:scale-105 transition">
                  <img
                    src={category.image}
                    className="w-full h-full object-cover"
                    alt={category.name}
                  />
                </div>

                <p className="mt-3 text-sm lg:text-base font-medium group-hover:text-primary transition">
                  {category.name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { ProductColumns } from "../../components/DataTable/Columns";
import { DataTable } from "../../components/DataTable/Data-Table";
import { adminGetAllProducts } from "@/services/productService";
import { notification } from "@/utils/toast";
import { PaginationList } from "@/components/Pagination/Pagination";
import { useSearchParams } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

export default function ProductsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedValue, setSearchedValue] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [productForDelete, setProductForDelete] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await adminGetAllProducts({ search, page, limit });
        setAllProducts(res?.data?.data?.products);
        setPaginationData(res?.data?.data?.pageInfo || {});
      } catch (err) {
        setAllProducts([]);
        notification.error(err?.response?.data?.message);
      }
    };

    fetchProducts();
  }, [search, page, limit]);

  // Set filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        prev.set("search", searchedValue);
        prev.set("page", 1);
        prev.set("limit", 10);
        return prev;
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [searchedValue]);

  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchedValue(value);
  };

  // Delete handler
  const onDelete = (data) => {
    setProductForDelete(data);
    setAlertOpen(true);
  };

  const deleteProduct = async () => {
    if (!productForDelete?._id) return;

    try {
      setLoader(true);
      await deleteProduct(!productForDelete._id);

      setAlertOpen(false);
      setAllProducts((prev) =>
        prev.filter((product) => product._id !== productForDelete._id),
      );
      setProductForDelete({});
    } catch (err) {
      notification.error(err?.response?.data?.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="mb-4">
        <Input
          value={searchedValue}
          onChange={searchHandler}
          placeholder="Search..."
          className="max-w-sm"
        />
      </div>

      <DataTable columns={ProductColumns(onDelete)} data={allProducts} />

      {/* Pagination controls */}
      <div className="pt-4">
        <PaginationList
          paginationData={paginationData}
          onPageChange={(newPage) =>
            setSearchParams((prev) => {
              prev.set("page", newPage);
              return prev;
            })
          }
          onLimitChange={(newLimit) =>
            setSearchParams((prev) => {
              prev.set("limit", newLimit);
              return prev;
            })
          }
        />
      </div>

      {/* Alert Dialog For Delete */}
      <AlertDialog open={alertOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Deleting this product "
              <strong>{productForDelete.title}</strong>" will permanently remove
              it and may impact products linked to it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setAlertOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={deleteProduct}
              className="bg-red-600 hover:bg-red-500 text-white cursor-pointer"
              disabled={loader}
            >
              {loader ? (
                <div className="flex items-center gap-2">
                  <Spinner />
                  Deleting...
                </div>
              ) : (
                "Yes, Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

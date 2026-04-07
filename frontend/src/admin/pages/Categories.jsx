import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { CategoryColumns } from "../../components/DataTable/Columns";
import { DataTable } from "../../components/DataTable/Data-Table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
import { notification } from "@/utils/toast";
import {
  addCategory,
  adminGetAllcategories,
  categoryDelete,
  updateCategory,
} from "@/services/categoryService";
import { useSearchParams } from "react-router";
import { PaginationList } from "@/components/Pagination/Pagination";

export default function Categories() {
  const imageRef = useRef(null);
  const [allCategories, setAllCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchedValue, setSearchedValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryImagePreview, setCategoryImagePreview] = useState("");
  const [categoryStatus, setCategoryStatus] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(null);
  const [paginationData, setPaginationData] = useState({});
  const [error, setError] = useState({});
  const [loader, setLoader] = useState(false);

  const search = searchParams.get("search") || "";
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;

  // Fetching categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await adminGetAllcategories({ search, page, limit });
        setAllCategories(res?.data?.data?.categories || []);
        setPaginationData(res?.data?.data?.pageInfo || {});
      } catch (err) {
        setAllCategories([]);
      }
    };
    fetchCategories();
  }, [search, page, limit]);

  // Set searched data
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

  // Search handler
  const searchHandler = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchedValue(value);
  };

  // Image handler
  const imageHandler = (e) => {
    const file = e.target.files[0];

    setCategoryImage(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setCategoryImagePreview(url);

      return () => URL.revokeObjectURL(url);
    }

    if (!file) {
      setCategoryImagePreview(null);
      return;
    }
  };

  // Add category handler
  const submitHandler = async (e) => {
    e.preventDefault();

    const errors = {};
    const formData = new FormData();

    if (!categoryName) {
      errors.name = "Category name is required.";
    }

    if (!categoryImage) {
      errors.image = "Category Image is required.";
    }

    setError(errors);

    if (Object.keys(errors).length > 0) return;

    formData.append("name", categoryName.trim());
    formData.append("image", categoryImage);
    formData.append("status", categoryStatus);

    try {
      setLoader(true);

      const res = await addCategory(formData);
      const newCategory = res?.data?.data?.category;

      setAllCategories((prev) => [newCategory, ...prev]);
      dialogOnChangeHandler(false);

      notification.success("New category added successfully.");
    } catch (err) {
      if (err.status === 409) notification.error("Category already exists.");
      else notification.error(err.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  // edit handler
  const onEdit = (row) => {
    setSelectedCategory(row);
    setDialogOpen(true);
    setCategoryName(row.name);
    setCategoryStatus(row.status);
    setCategoryImage(row.image);
    setCategoryImagePreview(row.image);
  };

  const editHandler = async (e) => {
    e.preventDefault();

    const errors = {};
    const formData = new FormData();

    if (!selectedCategory) return;

    if (!categoryName) {
      errors.name = "Category name is required.";
    }

    if (!categoryImage) {
      errors.image = "Category Image is required.";
    }

    setError(errors);

    if (Object.keys(errors).length > 0) return;

    formData.append("name", categoryName.trim());
    formData.append("image", categoryImage);
    formData.append("status", categoryStatus);

    try {
      setLoader(true);

      const res = await updateCategory(selectedCategory._id, formData);
      const updatedCategory = res?.data?.data?.category;

      setAllCategories((prev) =>
        prev.map((item) => {
          if (item._id !== updatedCategory._id) return item;
          return {
            ...item,
            name: updatedCategory.name,
            image: updatedCategory.image,
            status: updatedCategory.status,
          };
        }),
      );

      dialogOnChangeHandler(false);
      notification.success("Category updated successfully.");
    } catch (err) {
      notification.error(err.response.data.message);
    } finally {
      setLoader(false);
    }
  };

  // delete handler
  const onDelete = (row) => {
    if (row) {
      setAlertOpen(true);
      setDeleteCategory(row);
    }
  };
  const deleteHandler = async () => {
    if (!deleteCategory) return;

    try {
      setLoader(true);

      const res = await categoryDelete(deleteCategory._id);
      const category = res?.data?.data?.category;

      setAllCategories((prev) =>
        prev.filter((item) => item._id !== category._id),
      );

      setAlertOpen(false);
      setDeleteCategory(null);

      notification.success("Category deleted successfully.");
    } catch (error) {
      notification.error("Failed to deleted category!");
    } finally {
      setLoader(false);
    }
  };

  const dialogOnChangeHandler = (open) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedCategory(null);
      setCategoryName("");
      setCategoryImage("");
      setCategoryImagePreview("");
      setError(null);
    }
  };

  return (
    <div className="container mx-auto ">
      {/* Filter and add section*/}
      <div className="flex items-center justify-between pb-4">
        <Input
          value={searchedValue}
          onChange={searchHandler}
          placeholder="Search..."
          className="max-w-sm"
        />
        <Button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="max-w-sm text-white cursor-pointer"
        >
          <Plus />
          Add new category
        </Button>
      </div>

      {/* Table */}
      <DataTable
        columns={CategoryColumns(onEdit, onDelete)}
        data={allCategories}
        btnName="Add category"
        btnLink="/admin/add-category"
      />

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

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={dialogOnChangeHandler}>
        <DialogContent
          aria-describedby={undefined}
          className="sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>
              {selectedCategory ? "Update category" : "Add category"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={selectedCategory ? editHandler : submitHandler}>
            <div className="grid gap-5 mt-2">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Category name</Label>
                <Input
                  id="name-1"
                  name="name"
                  type="text"
                  value={categoryName}
                  onChange={(e) => {
                    (setCategoryName(e.target.value),
                      setError((prev) => ({ ...prev, name: "" })));
                  }}
                />
                {error?.name && (
                  <div className="text-sm text-red-500">{error.name}</div>
                )}
              </div>

              <div className="grid gap-3">
                <Label>Category Image</Label>
                <Input
                  id="image"
                  type="file"
                  ref={imageRef}
                  onChange={(e) => {
                    (imageHandler(e),
                      setError((prev) => ({ ...prev, image: "" })));
                  }}
                  hidden
                  accept=".jpeg, .jpg, .png"
                />

                <div className="flex justify-center">
                  <div className="w-[150px] h-[150px] relative group overflow-hidden rounded-lg">
                    {categoryImage ? (
                      <img
                        src={categoryImagePreview}
                        alt="IMG"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full border border-gray-800 flex justify-center items-center">
                        Image
                      </div>
                    )}

                    <button
                      type="button"
                      className="absolute bottom-0 left-0 w-full py-3 border-t 
                        bg-black/80 text-white opacity-0 
                          group-hover:opacity-100 transition duration-200 cursor-pointer"
                      onClick={() => imageRef?.current.click()}
                    >
                      Upload image
                    </button>
                  </div>
                </div>
                {error?.image && (
                  <div className="text-sm text-red-500">{error.image}</div>
                )}
              </div>

              <div className="grid gap-3">
                <Label>Active</Label>
                <Switch
                  checked={categoryStatus}
                  className="cursor-pointer"
                  onCheckedChange={() => setCategoryStatus((prev) => !prev)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => setCategoryName("")}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="Submit"
                className="text-white cursor-pointer"
                disabled={loader}
              >
                {selectedCategory != null
                  ? loader
                    ? "Updating..."
                    : "Update"
                  : loader
                    ? "Saving..."
                    : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog */}
      <AlertDialog open={alertOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Deleting "
              <span className="font-semibold">{deleteCategory?.name}</span>"
              category will permanently remove it and may impact products linked
              to it.
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
              onClick={deleteHandler}
              className="bg-red-600 hover:bg-red-500 text-white cursor-pointer"
              disabled={loader}
            >
              {loader ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

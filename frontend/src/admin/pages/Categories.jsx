import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CategoryColumns } from "../components/Columns";
import { DataTable } from "../components/Data-Table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Categories() {
  const [searchValue, setSearchValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // edit handler
  const onEdit = (row) => {
    setSelectedCategory(row);
    setDialogOpen(true);
    // console.log("edit:", row);
  };

  // delete handler
  const onDelete = (id) => {
    // console.log("Delete id:", id);
  };

  const dialogOnChangeHandler = (open) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedCategory(null);
    }
  };

  const categoryData = [
    {
      categoryName: "Electronics",
      slug: "electronics",
      status: "Active",
    },
    {
      categoryName: "Clothing",
      slug: "clothing",
      status: "Active",
    },
    {
      categoryName: "Home & Kitchen",
      slug: "home-kitchen",
      status: "Active",
    },
    {
      categoryName: "Books",
      slug: "books",
      status: "Inactive",
    },
    {
      categoryName: "Sports & Fitness",
      slug: "sports-fitness",
      status: "Active",
    },
    {
      categoryName: "Beauty & Personal Care",
      slug: "beauty-personal-care",
      status: "Inactive",
    },
  ];

  return (
    <div className="container mx-auto ">
      {/* Filter and add section*/}
      <div className="flex items-center justify-between pb-4">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search..."
          className="max-w-sm"
        />
        <Button
          type="button"
          onClick={() => setDialogOpen(true)}
          className="max-w-sm text-white cursor-pointer"
        >
          <Plus />
          Add category
        </Button>
      </div>

      {/* Table */}
      <DataTable
        columns={CategoryColumns(onEdit, onDelete)}
        data={categoryData}
        btnName="Add category"
        btnLink="/admin/add-category"
      />

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={dialogOnChangeHandler}>
        <form>
          <DialogContent
            aria-describedby={undefined}
            className="sm:max-w-[425px]"
          >
            <DialogHeader>
              <DialogTitle>
                {selectedCategory != null ? "Update category" : "Add category"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-5 mt-2">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Name</Label>
                <Input
                  id="name-1"
                  name="name"
                  defaultValue={
                    selectedCategory != null
                      ? selectedCategory.categoryName
                      : ""
                  }
                />
              </div>
              <div className="grid gap-3">
                <Label>Active</Label>
                <Switch
                  checked={selectedCategory?.status === "Active" ? true : false}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="cursor-pointer">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="text-white cursor-pointer">
                {selectedCategory != null ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

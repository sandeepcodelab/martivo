import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { notification } from "@/utils/toast";
import {
  deleteUser,
  getUserById,
  updateUserRole,
} from "@/services/userService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export default function UserDetails() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [editBtn, setEditBtn] = useState(false);
  const [btnLoader, setBtnLoader] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const id = params.id;

    if (!id) return;

    const fetchUserDetails = async () => {
      try {
        setLoading(true);

        const res = await getUserById(id);
        setUser(res.data.data.user);
        setUserRole(res.data.data.user.role);
      } catch (err) {
        notification.error(
          err.response?.data?.message || "Error fetching user",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Update user role
  const roleUpdateHandler = async () => {
    const id = params.id;
    if (!id || !userRole) return;

    try {
      setBtnLoader(true);

      const res = await updateUserRole(id, userRole);

      const newRole = res.data.data.user.role;
      setUser((prev) => ({ ...prev, role: newRole }));
      setEditBtn(false);
    } catch (err) {
      notification.error(err.response?.data?.message || "Error updating user");
    } finally {
      setBtnLoader(false);
    }
  };

  // Delete user
  const deleteUserHandler = async () => {
    const id = params.id;
    if (!id) return;

    try {
      setBtnLoader(true);

      const res = await deleteUser(id);
      setAlertOpen(false);
      navigate("/admin/users");
    } catch (err) {
      notification.error(err.response?.data?.message || "Error deleting user");
    } finally {
      setBtnLoader(false);
    }
  };

  const getRoleStyle = (role) => {
    return role === "admin"
      ? "bg-red-200 text-red-700 border border-red-400"
      : "bg-blue-200 text-blue-700 border border-blue-400";
  };

  const getInitials = (name = "") => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const roles = ["user", "admin"];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-72">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="max-w-3xl mx-auto shadow-xl rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-4">
          {/* Avatar */}
          <div className="h-14 w-14 flex items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-lg">
            {getInitials(user.name)}
          </div>

          <div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <p className="text-sm ">{user.email}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border">
              <p className="text-xs mb-1">Role</p>
              {!editBtn ? (
                <span
                  className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getRoleStyle(
                    user.role,
                  )}`}
                >
                  {user.role}
                </span>
              ) : (
                <Select
                  value={userRole}
                  onValueChange={(value) => setUserRole(value)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="p-4 rounded-xl border">
              <p className="text-xs mb-1">Joined On</p>
              <p className="font-medium">
                {new Date(user.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            {!editBtn ? (
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => setEditBtn(true)}
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => setEditBtn(false)}
                  className="text-white cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  onClick={roleUpdateHandler}
                  className="text-white cursor-pointer"
                  disabled={btnLoader}
                >
                  {btnLoader ? "Updating..." : "Update"}
                </Button>
              </>
            )}
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => setAlertOpen(true)}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Alert Dialog for delete */}
      <AlertDialog open={alertOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Deleting "{" "}
              <span className="font-bold">{user?.name}</span> ", "{" "}
              <span className="font-bold">{user?.email}</span> " will
              permanently remove the user and may affect related data in the
              system.
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
              onClick={deleteUserHandler}
              className="bg-red-600 hover:bg-red-500 text-white cursor-pointer"
              disabled={btnLoader}
            >
              {btnLoader ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

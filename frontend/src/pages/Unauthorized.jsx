import { ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <ShieldX className="w-14 h-14 text-red-500" />
          </div>
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>
            You don’t have permission to view this page.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground text-center mb-6">
            If you believe this is a mistake, please contact support or try
            logging in with a different account.
          </p>

          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="cursor-pointer"
            >
              Go Back
            </Button>
            <Button
              onClick={() => navigate("/")}
              className="text-white cursor-pointer"
            >
              Go Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

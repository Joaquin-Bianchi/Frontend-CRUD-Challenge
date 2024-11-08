import { Users, ClipboardList, BoxIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to Our Service
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/orders" className="no-underline">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center">
              <ClipboardList className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Orders</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              View and manage your orders
            </CardContent>
          </Card>
        </Link>
        <Link
          to="/clients"
          className="no-underline pointer-events-none opacity-50"
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center">
              <Users className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Clients</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              Manage your client list
            </CardContent>
          </Card>
        </Link>
        <Link
          to="/workouts"
          className="no-underline pointer-events-none opacity-50"
        >
          <Card className="flex flex-col items-center hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-col items-center">
              <BoxIcon className="h-12 w-12 text-primary mb-2" />
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              Browse workout plans
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

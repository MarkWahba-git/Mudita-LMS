import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProductForm from "../product-form";

export const metadata = { title: "New Product | Admin | Mudita LMS" };

export default async function NewProductPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/dashboard");

  return <ProductForm mode="create" />;
}

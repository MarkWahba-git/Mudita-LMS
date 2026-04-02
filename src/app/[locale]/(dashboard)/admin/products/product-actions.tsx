"use client";

import { useTransition } from "react";
import { deleteProduct } from "@/actions/product.actions";
import { Trash2 } from "lucide-react";

export function DeleteProductButton({ productId, name }: { productId: string; name: string }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteProduct(productId);
      if (!result.success) alert(result.error);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-600 transition-colors disabled:opacity-50"
      title="Delete product"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}

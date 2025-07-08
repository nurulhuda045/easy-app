"use server"

import { productDetailsSchema } from "@/schemas/products";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createProduct as createProductDb, updateProduct as updateProductDb, deleteProductDb } from "../db/products";
import { redirect } from "next/navigation";


export async function createProduct(
  unsafeData: z.infer<typeof productDetailsSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { userId } = await auth()
  const { success, data } = productDetailsSchema.safeParse(unsafeData)

  if (!success || userId == null) {
    return { error: true, message: "There was an error creating your product" }
  }

  const { id } = await createProductDb({ ...data, clerkUserId: userId })
  console.log("Product created:", id)
  redirect(`/dashboard/products/${id}/edit?tab=countries`)
}

export async function updateProduct(
  id: string,
  unsafeData: z.infer<typeof productDetailsSchema>
): Promise<{ error: boolean; message: string } | undefined> {
  const { userId } = await auth()
  const { success, data } = productDetailsSchema.safeParse(unsafeData)

  const errorMessage = "There was an error updating your product";

  if (!success || userId == null) {
    return { error: true, message: errorMessage }
  }

  const isSuccess = await updateProductDb(data, {userId, id})
  
  return { error: false, message: isSuccess ? "Product details updated successfully" : errorMessage}
}

export async function deleteProduct(id: string) {
  const { userId } = await auth()

  const errorMessage = "There was an error deleting your product";
  if (userId == null) {
    return { error: true, message: errorMessage}
  }

  const isSuccess = await deleteProductDb({id, userId})

  return { error: !isSuccess, message: isSuccess ? "successfully deleted your product" : errorMessage }
}
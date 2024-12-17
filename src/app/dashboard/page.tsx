import { auth } from "@clerk/nextjs/server"
import { getProduct } from "./products"
import { NoProducts } from "./_components/NoProducts"

export default async function DashboardPage() {
    const { userId, redirectToSignIn } = await auth()
    if (userId == null) return redirectToSignIn()

    const products = await getProduct(userId, { limit: 6 })

    if (products.length === 0) return <NoProducts />
    
    return null
}
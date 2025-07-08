import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageWithBackButton } from "../../_components/PageWithBackButton";
import { ProductDetailsForm } from "../../_components/forms/ProductDetailsForm";

export default function NewProductPage() {
    return (
        <PageWithBackButton
            pageTitle="New Product"
            backButtonHref="/dashboard/products"
        >
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductDetailsForm />
                </CardContent>
            </Card>
        </PageWithBackButton>
    )
} 
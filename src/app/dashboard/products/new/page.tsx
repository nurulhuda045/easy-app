import { PageWithBackButton } from "../../_components/PageWithBackButton";

export default function NewProductPage() {
    return (
        <PageWithBackButton
            pageTitle="New Product"
            backButtonHref="/dashboard/products"
        >
            Inner
        </PageWithBackButton>
    )
} 
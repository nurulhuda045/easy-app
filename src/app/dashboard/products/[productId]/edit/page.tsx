import { CountryDiscountForm } from "@/app/dashboard/_components/forms/CountryDiscountForm";
import { ProductDetailsForm } from "@/app/dashboard/_components/forms/ProductDetailsForm";
import { PageWithBackButton } from "@/app/dashboard/_components/PageWithBackButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProduct, getProductCountryGroups } from "@/server/db/products";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params: { productId },
  searchParams: { tab = "details" },
}: {
  params: { productId: string };
  searchParams: { tab?: string | undefined };
}) {
  const { userId, redirectToSignIn } = await auth();
  if (userId == null) return redirectToSignIn();

  const product = await getProduct({ id: productId, userId });

  if (product == null) return notFound();
  
  return (
    <PageWithBackButton
      backButtonHref="dashboard/products"
      pageTitle="Edit Product"
    >
      <Tabs defaultValue={tab}>
        <TabsList className="bg-background/60">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="country">Country</TabsTrigger>
          <TabsTrigger value="customization">Customization</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <DetailTab product={product} />
        </TabsContent>
        <TabsContent value="country">
          <CountryTab productId={product.id} userId={userId} />
        </TabsContent>
        <TabsContent value="customization">Customization</TabsContent>
      </Tabs>
    </PageWithBackButton>
  );
}

function DetailTab({
  product,
}: {
  product: {
    id: string;
    name: string;
    description: string | null;
    url: string;
  };
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Product Details</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductDetailsForm product={product} />
      </CardContent>
    </Card>
  );
}

async function CountryTab({
  productId,
  userId,
}: {
  productId: string;
  userId: string;
}) {
  const countryGroups = await getProductCountryGroups({
    productId,
    userId,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Country Discounts</CardTitle>
        <CardDescription>
          Leave the discount field blank if you do not want to display details
          for any specific parity group
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CountryDiscountForm productId={productId} countryGroups={countryGroups} />
      </CardContent>
    </Card>
  );
}

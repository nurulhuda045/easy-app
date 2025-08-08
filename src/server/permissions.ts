import { getProductCount } from "./db/products";
import { getUserSubscriptionTier } from "./db/subscriptions";

export async function canRemovebranding(userId: string) {
    if (!userId) return false;
    const tier = await getUserSubscriptionTier(userId);

    return tier?.canRemoveBranding;
}

export async function canCustomizeBanner(userId: string | null) {
    if (!userId) return false;
    const tier = await getUserSubscriptionTier(userId);

    return tier?.canCustomizeBanner;
}

export async function canAccessAnalytics(userId: string) {
    if (!userId) return false;
    const tier = await getUserSubscriptionTier(userId);

    return tier?.canAccessAnalytics;
}

export  async function canCreateProduct(userId: string | null) {
    if (userId == null) return false;
    const tier = await getUserSubscriptionTier(userId);
    const productCount = await getProductCount(userId);
    return productCount < tier.maxNumberOfProducts;
}
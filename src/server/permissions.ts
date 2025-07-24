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
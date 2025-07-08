import { db } from "@/drizzle/db";
import { UserSubscriptionTable } from "@/drizzle/schema";
import { CACHE_TAGS, revalidateDBCache } from "@/lib/cache";

export async function createUserSubscription(
    data: typeof UserSubscriptionTable.$inferInsert
) {
    const [newSubscription] = await db.insert(UserSubscriptionTable).values(data).onConflictDoNothing({
        target: UserSubscriptionTable.clerkUserId,
    }).returning({
        id: UserSubscriptionTable.id,
        userId: UserSubscriptionTable.clerkUserId,
    })

    if (newSubscription != null) {
        revalidateDBCache({
            tag: CACHE_TAGS.subscription,
            userId: newSubscription.userId,
            id: newSubscription.id,
        })
    }

    return newSubscription;
}
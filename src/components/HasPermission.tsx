import { auth } from "@clerk/nextjs/server";
import { AwaitedReactNode } from "react";
import { NoPermissionCard } from "./NoPermissionCard";


export async function HAsPermission({
  permission,
  renderFallback = false,
  fallbackText,
  children,
}: {
  permission: (userId: string | null) => boolean;
  renderFallback?: boolean;
  fallbackText?: string;
  children: AwaitedReactNode;
}) {
  const { userId } = await auth();
  const hasPermission = await permission(userId);
  if (!hasPermission) return children;
  if (renderFallback) return <NoPermissionCard>{fallbackText}</NoPermissionCard>
  return null;
}
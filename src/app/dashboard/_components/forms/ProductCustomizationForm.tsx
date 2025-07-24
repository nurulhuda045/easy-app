"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RequiredLabelIcon } from "@/components/RequiredLableIcon";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { productCustomizationSchema } from "@/schemas/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Banner } from "@/components/Banner";
import { updateProductCustomization } from "@/server/actions/products";
import { useToast } from "@/hooks/use-toast";
import { NoPermissionCard } from "@/components/NoPermissionCard";

export default function ProductCustomizationForm({
  canRemovebranding,
  canCustomizeBannner,
  customization,
}: {
  canRemovebranding: boolean;
  canCustomizeBannner: boolean;
  customization: {
    productId: string;
    locationMessage: string;
    backgroundColor: string;
    textColor: string;
    fontSize: string;
    bannerContainer: string;
    isSticky: boolean;
    classPrefix?: string | null;
  };
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof productCustomizationSchema>>({
    resolver: zodResolver(productCustomizationSchema),
    defaultValues: {
      ...customization,
      classPrefix: customization.classPrefix ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof productCustomizationSchema>) {
    const data = await updateProductCustomization(
      customization.productId,
      values
    );

    console.log(data.error);
    toast({
      title: data.error ? "Error" : "Success",
      description: data.message,
      variant: data.error ? "destructive" : "default",
    });
  }

  const formValues = form.watch();

  return (
    <>
      <div>
        <Banner
          message={formValues.locationMessage}
          mappings={{
            country: "India",
            coupon: "SAVE20",
            discount: "20",
          }}
          customization={formValues}
          canRemoveBranding={canRemovebranding}
        />
      </div>
      {!canCustomizeBannner && (
        <div className="mt-8">
          <NoPermissionCard />
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-6 mt-8"
        >
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            <FormField
              control={form.control}
              name="locationMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    PPP Discount Message
                    <RequiredLabelIcon />
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={!canCustomizeBannner}
                      className="min-h-20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    {"Data Parameters: {country}, {coupon}, {discount}"}
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Background Color
                      <RequiredLabelIcon />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={!canCustomizeBannner} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="textColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Text Color
                      <RequiredLabelIcon />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={!canCustomizeBannner} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fontSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Font Size
                      <RequiredLabelIcon />
                    </FormLabel>
                    <FormControl>
                      <Input disabled={!canCustomizeBannner} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isSticky"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sticky?</FormLabel>
                    <FormControl>
                      <Switch
                        className="block"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!canCustomizeBannner}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bannerContainer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Banner Container</FormLabel>
                    <FormControl>
                      <Input disabled={!canCustomizeBannner} {...field} />
                    </FormControl>
                    <FormDescription>
                      HTML container selector where you want to place the
                      banner. Ex: #container, .container, body
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="classPrefix"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class Prefix</FormLabel>
                    <FormControl>
                      <Input disabled={!canCustomizeBannner} {...field} />
                    </FormControl>
                    <FormDescription>
                      An optional prefix added to all CSS classes to avoid
                      conflicts
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {canCustomizeBannner && (
            <div className="self-end">
              <Button disabled={form.formState.isSubmitting} type="submit">
                Save
              </Button>
            </div>
          )}
        </form>
      </Form>
    </>
  );
}

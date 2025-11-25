"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group@1.1.2";

import { cn } from "./utils";
import { toggleVariants } from "./toggle";

interface ToggleVariants {
  size?: keyof typeof toggleVariants.size;
  variant?: keyof typeof toggleVariants.variant;
}

const ToggleGroupContext = React.createContext<ToggleVariants>({
  size: "default",
  variant: "default",
});

interface ToggleGroupProps
  extends React.ComponentProps<typeof ToggleGroupPrimitive.Root>,
    ToggleVariants {}

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

interface ToggleGroupItemProps
  extends React.ComponentProps<typeof ToggleGroupPrimitive.Item>,
    ToggleVariants {}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext);

  const finalVariant = context.variant || variant || "default";
  const finalSize = context.size || size || "default";

  const baseToggleClasses =
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap";

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={finalVariant}
      data-size={finalSize}
      className={cn(
        baseToggleClasses,
        toggleVariants.variant[finalVariant],
        toggleVariants.size[finalSize],
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };

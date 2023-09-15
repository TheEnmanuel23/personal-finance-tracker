import clsx from "clsx";
import React from "react";

export interface Props {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  children: React.ReactNode;
  className?: string;
}

const variants = {
  p: "text-base",
  h1: "text-3xl font-bold",
  h2: "text-2xl font-bold",
  h3: "text-xl font-bold",
  h4: "text-lg font-bold",
  h5: "text-sm font-bold",
  h6: "text-xs font-bold",
};

export const Typography = ({
  as: Component = "p",
  children,
  className,
  ...props
}: Props) => {
  const classNames = clsx(variants[Component], className);

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};

import React from "react";
import clsx from "clsx";

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  variant?: "primary" | "secondary" | "indigo";
  /**
   * Custom className
   */
  className?: string;
  /**
   * Button contents
   */
  children: React.ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) => {
  const classNames = clsx(
    "btn  rounded text-white p-2",
    {
      "bg-green-500 hover:bg-green-600": variant === "primary",
      "bg-red-500 hover:bg-red-600": variant === "secondary",
      "bg-indigo-500 hover:bg-indigo-600": variant === "indigo",
    },
    className,
  );
  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  );
};

import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

const CustomLink = ({
  to,
  children,
  className,
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const classNames = clsx("text-base", className);

  return (
    <Link className={classNames} to={to}>
      {children}
    </Link>
  );
};

export default CustomLink;

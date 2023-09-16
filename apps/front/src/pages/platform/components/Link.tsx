import React from "react";
import { Link as RRLink } from "react-router-dom";
import clsx from "clsx";

const Link = ({
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
    <RRLink className={classNames} to={to}>
      {children}
    </RRLink>
  );
};

export default Link;

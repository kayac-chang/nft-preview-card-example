import { cloneElement, isValidElement, PropsWithChildren } from "react";
import clsx from "clsx";

type Props = PropsWithChildren<{
  className?: string;
}>;
export function Style({ children, className }: Props) {
  if (!isValidElement(children))
    throw new Error("should be render with valid react element.");

  return cloneElement(children, {
    className: clsx(children.props.className, className),
  });
}

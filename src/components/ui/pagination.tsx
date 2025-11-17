import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/lib";
import { ButtonProps } from "@/components/ui/button";

const Pagination =
  ({
    className,
    ...props
  }: React.ComponentProps<"nav">) => (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn(
        "mx-auto flex w-full justify-center",
        className,
      )}
      {...props}
    />
  );
Pagination.displayName =
  "Pagination";

const PaginationContent =
  React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
  >(
    (
      {
        className,
        ...props
      },
      ref,
    ) => (
      <ul
        ref={
          ref
        }
        className={cn(
          "flex flex-row items-center gap-1",
          className,
        )}
        {...props}
      />
    ),
  );
PaginationContent.displayName =
  "PaginationContent";

const PaginationItem =
  React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
  >(
    (
      {
        className,
        ...props
      },
      ref,
    ) => (
      <li
        ref={
          ref
        }
        className={cn(
          "",
          className,
        )}
        {...props}
      />
    ),
  );
PaginationItem.displayName =
  "PaginationItem";

type PaginationLinkProps =
  {
    isActive?: boolean;
  } & Pick<
    ButtonProps,
    "size"
  > &
    React.ComponentProps<"a">;

const PaginationLink =
  ({
    className,
    isActive,
    size = "icon",
    ...props
  }: PaginationLinkProps) => (
    <a
      aria-current={
        isActive
          ? "page"
          : undefined
      }
      className={cn(
        "group relative inline-flex items-center justify-center rounded-full border backdrop-blur-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-100/60 focus-visible:ring-offset-slate-900 light:focus-visible:ring-slate-900/40 light:focus-visible:ring-offset-white shadow-[0_15px_45px_rgba(2,6,23,0.35)] light:shadow-[0_12px_35px_rgba(15,23,42,0.08)] text-sm font-medium",
        size ===
          "icon"
          ? "h-10 w-10"
          : "h-10 px-5",
        "border-slate-800/70 bg-slate-900/65 text-slate-200/90 hover:text-white hover:border-slate-700/60 hover:bg-slate-900/90 light:border-slate-200/60 light:bg-white/80 light:text-slate-700 light:hover:text-slate-900 light:hover:border-slate-300/70",
        isActive &&
          "text-slate-900 light:text-white bg-gradient-to-br from-slate-100 via-slate-200 to-white light:from-slate-900 light:via-slate-800 light:to-slate-700 border-transparent shadow-[0_25px_50px_rgba(2,6,23,0.55)] light:shadow-[0_18px_40px_rgba(15,23,42,0.25)]",
        className,
      )}
      {...props}
    />
  );
PaginationLink.displayName =
  "PaginationLink";

const PaginationPrevious =
  ({
    className,
    ...props
  }: React.ComponentProps<
    typeof PaginationLink
  >) => (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        "gap-1 pl-2.5",
        className,
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>
        Previous
      </span>
    </PaginationLink>
  );
PaginationPrevious.displayName =
  "PaginationPrevious";

const PaginationNext =
  ({
    className,
    ...props
  }: React.ComponentProps<
    typeof PaginationLink
  >) => (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        "gap-1 pr-2.5",
        className,
      )}
      {...props}
    >
      <span>
        Next
      </span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  );
PaginationNext.displayName =
  "PaginationNext";

const PaginationEllipsis =
  ({
    className,
    ...props
  }: React.ComponentProps<"span">) => (
    <span
      aria-hidden
      className={cn(
        "flex h-9 w-9 items-center justify-center text-slate-400 light:text-slate-700",
        className,
      )}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">
        More
        pages
      </span>
    </span>
  );
PaginationEllipsis.displayName =
  "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};

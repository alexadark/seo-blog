import type { CategoryStoryblok } from "~/types";
import { Link } from "@remix-run/react";

type CategoriesProps = {
  categories: CategoryStoryblok[];
} & React.HTMLAttributes<HTMLDivElement>;

export const Categories = ({ categories, ...props }: CategoriesProps) => {
  return (
    <div {...props} className="flex items-center space-x-2">
      {/* <FolderClosed className="text-sm text-black mr-2" /> */}
      {categories?.map((c: CategoryStoryblok) => (
        <Link prefetch="intent" to={`/${c.full_slug}`} key={c.id}>
          <span className="text-white bg-teal-500 text-sm px-2 py-1 hover:bg-slate-600 transition duration-300 block">
            {c.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

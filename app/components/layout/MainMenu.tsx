import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { useLoaderData, NavLink } from "@remix-run/react";
import type { NavItemStoryblok } from "~/types";
import { type loader } from "~/root";

export const MainMenu = () => {
  let { headerNav: nav } = useLoaderData<typeof loader>();

  return (
    <nav className="flex space-x-2 items-center" {...storyblokEditable(nav)}>
      <NavLink prefetch="intent" to="/" className="menu-item">
        Home
      </NavLink>
      {nav.map((nestedBlok: NavItemStoryblok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </nav>
  );
};

import { useLoaderData } from "@remix-run/react";
import { render } from "storyblok-rich-text-react-renderer";
import { type loader } from "~/root";

export const Footer = () => {
  const { footerText } = useLoaderData<typeof loader>();
  return (
    <footer className="py-10 bg-teal-500 text-white ">
      <div className="max-w-site mx-auto px-5 ">
        <div>
          {render(footerText)} &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

import { storyblokEditable } from "@storyblok/react";
import { useLoaderData, useMatches } from "@remix-run/react";
import { format } from "date-fns";
import type { PostStoryblok } from "~/types";
import { Categories } from "~/components/Categories";
import type { loader } from "~/routes/blog.$";
import { Tags } from "~/components/Tags";
import { DisqusComments } from "~/components/DisqusComments";
import { SocialShare } from "~/components/SocialShare";
import { AuthorBox } from "~/components/AuthorBox";
import { MDRenderer } from "~/utils";

export const Post = ({ blok }: PostStoryblok) => {
  const { publishDate, id, name } = useLoaderData<typeof loader>();

  const {
    data: { defaultPostImage },
  } = useMatches()[0];

  let { headline, categories, image, tags, author, md_content } = blok;
  image = image?.id ? image : defaultPostImage;

  const url = typeof window !== "undefined" && window.location.href;
  return (
    <>
      <article
        {...storyblokEditable(blok)}
        key={blok._uid}
        className="max-w-content mx-auto"
      >
        {image && (
          <img
            src={`${image?.filename}/m/850x400/smart/filters:quality(60)/`}
            alt={image?.alt}
          />
        )}
        <h1>{headline}</h1>
        <div className="flex flex-wrap justify-between align-middle mb-2">
          <div className=" text-sm italic text-primary">
            {format(new Date(publishDate), "MMMM dd, yyyy")}
          </div>
          <Categories categories={categories} className="space-x-2" />
        </div>
        <Tags tags={tags} className="space-x-2" />
        <MDRenderer className="content">{md_content}</MDRenderer>
        <div className="flex justify-center">
          <AuthorBox author={author} component={"author"} _uid={blok._uid} />
        </div>
        {url && <SocialShare url={url} />}
      </article>
      {/*
      <aside className="fixed z-10 top-[4.6rem] bottom-0 right-[max(0px,calc(50%-45rem))] w-[19.5rem] py-6 px-8 overflow-y-auto hidden xl:block">
        <AuthorBox
          author={{ ...author, _uid: blok._uid }}
          component={"author"}
          _uid={blok._uid}
        />
      </aside> */}

      {/* <DisqusComments
        shortname="remix-blog"
        identifier={id}
        title={name}
        url={`${typeof window !== "undefined" && window.location.href}`}
      /> */}
    </>
  );
};

export default Post;

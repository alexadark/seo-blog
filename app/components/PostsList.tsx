import { useState } from "react";
import { getStoryblokApi } from "@storyblok/react";
import { useMatches } from "@remix-run/react";
import type { PostStoryblok } from "~/types";
import { PostCard } from "./PostCard";
import { getPostCardData } from "~/utils";

interface PostsListType {
  grid?: boolean;
  uuid?: string;
}

interface RouteData {
  total: number;
  posts: PostStoryblok[];
}
export const PostsList = ({ grid, uuid }: PostsListType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const matches = useMatches();
  const globalData = matches[0].data;
  const { total, posts: firstsPosts } = matches[1].data as RouteData;
  const [posts, setPosts] = useState(firstsPosts);

  interface GlobalData {
    perPage: number;
  }

  const sbApi = getStoryblokApi();
  const resolveRelations = ["post.categories", "post.tags", "post.author"];

  const perPage = (globalData as GlobalData)?.perPage;

  const fetchPosts = async (page: number, uuid: string) => {
    const { data: blog } = await sbApi.get(`cdn/stories`, {
      version: "draft",
      starts_with: "blog/",
      per_page: perPage,
      page,
      is_startpage: false,
      resolve_relations: resolveRelations,
      search_term: uuid,
    });

    const nextPosts = blog.stories.map((p: PostStoryblok) =>
      getPostCardData(p)
    );

    setPosts((prevPosts: PostStoryblok[]) => [...prevPosts, ...nextPosts]);
  };

  const loadMore = () => {
    let nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchPosts(nextPage, uuid || "");
  };
  return (
    <div itemScope itemType="http://schema.org/CollectionPage">
      <div className={grid ? "grid sm:grid-cols-2 md:grid-cols-3 gap-5" : ""}>
        {posts?.map((p: PostStoryblok, index: number) => {
          return (
            <div key={p?.id} className="flex flex-col h-full">
              <PostCard post={p} grid={grid} />
            </div>
          );
        })}
      </div>
      {total && posts.length < total && (
        <div className={`flex items-center ${grid ? "mt-5" : ""}`}>
          <button className="button mx-auto py-4 px-7" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

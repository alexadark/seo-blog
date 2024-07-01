import { useMatches } from "@remix-run/react";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";

export const useStoryblokData = (route: string) => {
  const matches = useMatches();
  const { data } = matches?.find((m) => m?.id === route) ?? {};

  console.log("Route data:", data); // Add this line

  const story = useStoryblokState(data?.blok ?? null, {
    resolveRelations: [
      "post.categories",
      "post.tags",
      "post.author",
      "post.comments",
    ],
  });

  console.log("Storyblok story:", story); // Add this line

  return story?.content ? <StoryblokComponent blok={story.content} /> : null;
};

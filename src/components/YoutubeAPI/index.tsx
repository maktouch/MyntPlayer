import { Video } from "components/Atoms/Playlist";

export type YTApiResponse = {
  items: Video[];
};

export function getEndpoint() {
  const endpoint = new URL("https://youtube.googleapis.com/youtube/v3/search");
  endpoint.searchParams.append("part", "snippet");
  endpoint.searchParams.append("type", "video");
  endpoint.searchParams.append("videoEmbeddable", "true");
  endpoint.searchParams.append("topicId", "/m/04rlf");
  endpoint.searchParams.append(
    "key",
    "AIzaSyCA-nA7YQ5RdBY9MsaqbuhwyifQYzsStN4"
  );

  return endpoint;
}

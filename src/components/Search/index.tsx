import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import useFetch from "react-fetch-hook";
import { ScaleLoader } from "react-spinners";
import { usePlaylist, Video } from "components/Atoms/Playlist";

function Input(props) {
  return (
    <input
      type="search"
      placeholder="Search a video"
      className="shadow-sm focus:ring-green-700 focus:border-green-700 block sm:text-sm border-gray-300 rounded-md text-gray-900 w-full"
      {...props}
    />
  );
}

function Item(props: { video: Video; onAppend: () => void }) {
  const { appendVideo } = usePlaylist();
  const { onAppend } = props;
  const title = props.video.snippet.title;
  const image = props.video.snippet.thumbnails.default.url;

  const onClick = (e) => {
    appendVideo(props.video);
    onAppend?.();
  };

  return (
    <li
      className="p-2 flex w-full hover:bg-gray-200 rounded-sm cursor-pointer"
      onClick={onClick}
    >
      <img
        className="h-10 w-17 rounded-md self-center"
        src={image}
        alt={title}
      />
      <div className="mx-3 w-full">
        <p
          className="text-sm font-medium text-gray-700 "
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
    </li>
  );
}

export function Search(props) {
  const [actual, setQuery] = useState("");
  const [query] = useDebounce(actual.trim(), 500);

  const endpoint = new URL("https://youtube.googleapis.com/youtube/v3/search");
  endpoint.searchParams.append("part", "snippet");
  endpoint.searchParams.append("maxResults", "10");
  endpoint.searchParams.append("q", query);
  endpoint.searchParams.append("type", "video");
  endpoint.searchParams.append("videoEmbeddable", "true");
  endpoint.searchParams.append(
    "key",
    "AIzaSyCA-nA7YQ5RdBY9MsaqbuhwyifQYzsStN4"
  );

  const validQuery = actual.length > 3 && query.length > 3;

  const { isLoading, data } = useFetch(endpoint.href, {
    depends: [validQuery],
  });

  const loading = (isLoading || actual.trim() !== query) && actual !== "";

  const onAppend = useCallback(function () {
    setQuery("");
  }, []);

  return (
    <>
      <Input onChange={(e) => setQuery(e.target.value)} value={actual} />
      {validQuery && (
        <div className="origin-top-right absolute top-8 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {loading && (
              <div className="flex justify-center">
                <ScaleLoader />
              </div>
            )}

            {!loading && data?.items?.length === 0 && (
              <div className="p-5 text-gray-800">
                No results found, try another query
              </div>
            )}

            {!loading &&
              data?.items?.length > 0 &&
              data?.items?.map((item) => (
                <Item key={item.etag} video={item} onAppend={onAppend} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

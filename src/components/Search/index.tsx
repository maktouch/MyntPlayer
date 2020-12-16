import { useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import useFetch from "react-fetch-hook";
import { ScaleLoader } from "react-spinners";
import { usePlaylist, Video } from "components/Atoms/Playlist";
import { getEndpoint } from "components/YoutubeAPI";
import cx from "classnames";

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

function Item(props: {
  video: Video;
  onAppend: () => void;
  isDuplicate: boolean;
}) {
  const { appendVideo } = usePlaylist();
  const { onAppend, isDuplicate } = props;
  const title = props.video.snippet.title;
  const image = props.video.snippet.thumbnails.default.url;

  const onClick = (e) => {
    if (isDuplicate) {
      return;
    }
    appendVideo(props.video);
    onAppend?.();
  };

  return (
    <li
      className={cx("p-2 flex w-full hover:bg-gray-200 rounded-sm", {
        "text-gray-300": isDuplicate,
        "cursor-pointer text-gray-700": !isDuplicate,
      })}
      onClick={onClick}
    >
      <img
        className="h-10 w-17 rounded-md self-center"
        src={image}
        alt={title}
      />
      <div className="mx-3 w-full">
        <p
          className="text-sm font-medium "
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
    </li>
  );
}

export function Search(props) {
  const { currentIds } = usePlaylist();
  const [actual, setQuery] = useState("");
  const [query] = useDebounce(actual.trim(), 500);

  const endpoint = getEndpoint();
  endpoint.searchParams.append("maxResults", "10");
  endpoint.searchParams.append("q", query);

  const validQuery = actual.length > 3 && query.length > 3;

  const { isLoading, data } = useFetch(endpoint.href, {
    depends: [validQuery],
  });

  const loading = (isLoading || actual.trim() !== query) && actual !== "";

  const onAppend = useCallback(function () {
    setQuery("");
  }, []);

  const items = data?.items || [];

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

            {!loading && items.length === 0 && (
              <div className="p-5 text-gray-800">
                No results found, try another query
              </div>
            )}

            {!loading &&
              items.length > 0 &&
              items.map((item) => (
                <Item
                  key={item.etag}
                  video={item}
                  onAppend={onAppend}
                  isDuplicate={currentIds.current.includes(item.id.videoId)}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
}

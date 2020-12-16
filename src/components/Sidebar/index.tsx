import { usePlaylist, Video } from "components/Atoms/Playlist";
import { Search } from "components/Search";

function Item(props: Video) {
  const { removeVideo } = usePlaylist();
  const title = props.snippet.title;
  const image = props.snippet.thumbnails.default.url;

  const onClickRemove = (e) => {
    removeVideo(props.id.videoId);
  };

  return (
    <li className="py-2 flex w-full hover:bg-gray-800 rounded-sm">
      <img
        className="h-10 w-17 rounded-md self-center"
        src={image}
        alt={title}
      />
      <div className="ml-3 w-full">
        <p
          className="text-sm font-medium text-gray-400 "
          dangerouslySetInnerHTML={{ __html: title }}
        />
      </div>
      <button
        type="button"
        className="inline-flex items-center px-2 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        onClick={onClickRemove}
      >
        <svg
          className="h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </li>
  );
}

export function Sidebar(props) {
  const { playlist } = usePlaylist();

  return (
    <div className="sidebar h-full max-h-screen flex flex-col ">
      <Search />

      <h2 className="text-gray-100 text-xs font-medium uppercase tracking-wide mt-4 mb-2">
        Queued Videos
      </h2>

      <ul className="divide-y divide-gray-900 max-h-full overflow-y-scroll">
        {playlist.map((item) => (
          <Item key={item.etag} {...item} />
        ))}
      </ul>
    </div>
  );
}

import { usePlaylist, Video } from "components/Atoms/Playlist";
import { Search } from "components/Search";
import { SuggestMore } from "components/SuggestMore";

function Item(props: Video) {
  const { removeVideo } = usePlaylist();
  const title = props.snippet.title;
  const image = props.snippet.thumbnails.default.url;

  const onClickRemove = (e) => {
    removeVideo(props.id.videoId);
  };

  return (
    <li className="p-2 flex w-full hover:bg-gray-800 rounded-sm">
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
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {/* <svg
          
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
        </svg> */}
      </button>
    </li>
  );
}

export function Sidebar(props) {
  const { playlist, playNext } = usePlaylist();

  return (
    <div className="sidebar h-full max-h-screen flex flex-col pl-5">
      <Search />

      <h2 className="text-gray-100 text-xs font-medium uppercase tracking-wide mt-4 mb-2">
        Queued Videos ({playlist.length})
      </h2>

      <ul className="flex flex-col divide-y divide-gray-900 max-h-full overflow-y-scroll">
        {playlist.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  No video in the queue. Use the search above to add videos to
                  play
                </p>
              </div>
            </div>
          </div>
        )}

        {playlist.map((item) => (
          <Item key={item.etag} {...item} />
        ))}

        <SuggestMore />
      </ul>
    </div>
  );
}

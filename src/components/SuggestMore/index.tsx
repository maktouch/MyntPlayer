import { usePlaylist } from "components/Atoms/Playlist";

export function SuggestMore(props) {
  const { suggestMoreVideos, playlist } = usePlaylist();

  if (playlist.length === 0) {
    return null;
  }

  return (
    <button
      type="button"
      className="my-5 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-mynt-gray hover:bg-mynt focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mynt m-auto"
      onClick={suggestMoreVideos}
    >
      <svg
        className="-ml-0.5 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      Suggest more videos
    </button>
  );
}

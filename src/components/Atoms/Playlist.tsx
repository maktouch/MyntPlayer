import { useCallback } from "react";
import { atom } from "recoil";
import { useRecoilState } from "recoil";

export type Video = {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Record<
      string,
      {
        url: string;
        width: number;
        height: number;
      }
    >;
    channelTitle: string;
    publishTime: string;
  };
};

const PlaylistState = atom<Video[]>({
  key: "Playlist",
  default: [],
});

export function usePlaylist() {
  const [playlist, setPlaylist] = useRecoilState(PlaylistState);

  const appendVideo = useCallback(function (video: Video) {
    setPlaylist((state) => {
      return [...state, video];
    });
  }, []);

  const removeVideo = useCallback(
    function (id) {
      const index = playlist.findIndex((video) => video.id.videoId === id);

      if (index > -1) {
        setPlaylist((state) => {
          return [...state.slice(0, index), ...state.slice(index + 1)];
        });
      }
    },
    [playlist]
  );

  return { playlist, setPlaylist, removeVideo, appendVideo };
}

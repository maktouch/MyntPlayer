import { getEndpoint } from "components/YoutubeAPI";
import { useCallback, useEffect, useRef } from "react";
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
  const lastVideo = useRef<Video>(null);
  const currentIds = useRef<string[]>(null);
  const [playlist, setPlaylist] = useRecoilState(PlaylistState);

  useEffect(
    function () {
      lastVideo.current = playlist[playlist.length - 1];
      currentIds.current = playlist.map((v) => v.id.videoId);
    },
    [playlist]
  );

  const videoIsInQueue = useCallback(function (video: Video) {
    return currentIds.current.includes(video.id.videoId);
  }, []);

  const appendVideo = useCallback(function (video: Video) {
    if (videoIsInQueue(video)) {
      return;
    }

    setPlaylist((state) => {
      return [...state, video];
    });
  }, []);

  const concatVideos = useCallback(function (videos: Video[]) {
    setPlaylist((state) => {
      return [...state, ...videos.filter((item) => !videoIsInQueue(item))];
    });
  }, []);

  const suggestMoreVideos = useCallback(async function () {
    const endpoint = getEndpoint();
    endpoint.searchParams.append("maxResults", "10");
    endpoint.searchParams.append(
      "relatedToVideoId",
      lastVideo?.current?.id?.videoId
    );

    const response = await fetch(endpoint.href);
    const { items } = await response.json();

    const suggestions = (items as Video[])
      .filter((item) => !!item.snippet)
      .filter((item) => !videoIsInQueue(item));

    concatVideos(suggestions);
  }, []);

  const playNext = useCallback(function () {
    let empty = false;
    setPlaylist((state) => {
      const [first, ...rest] = state;

      if (rest.length === 0) {
        empty = true;
      }

      return rest;
    });

    if (empty) {
      suggestMoreVideos();
    }
  }, []);

  const removeVideo = useCallback(
    function (id) {
      const index = playlist.findIndex((video) => video.id.videoId === id);

      if (index > -1) {
        let empty = false;
        setPlaylist((state) => {
          const newState = [
            ...state.slice(0, index),
            ...state.slice(index + 1),
          ];

          if (newState.length === 0) {
            empty = true;
          }

          return newState;
        });

        if (empty) {
          suggestMoreVideos();
        }
      }
    },
    [playlist]
  );

  return {
    currentIds,
    playlist,
    setPlaylist,
    removeVideo,
    appendVideo,
    suggestMoreVideos,
    playNext,
  };
}

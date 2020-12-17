import { usePlaylist } from "components/Atoms/Playlist";
import useDimensions from "react-use-dimensions";
import YouTube, { Options } from "react-youtube";

export function Player(props) {
  const [ref, { width, height }] = useDimensions();

  const { playlist, playNext } = usePlaylist();

  const current = playlist[0];

  if (!current) {
    return null;
  }

  const opts = {
    height: String(height),
    width: String(width),
    playerVars: {
      autoplay: 1,
      showinfo: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      fs: 0,
    },
  } as Options;

  return (
    <div className="player" ref={ref}>
      <YouTube opts={opts} videoId={current?.id?.videoId} onEnd={playNext} />
    </div>
  );
}

import { Play } from "lucide-react";

interface VideoPlayerProps {
  url?: string;
  title: string;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

export function VideoPlayer({ url, title }: VideoPlayerProps) {
  if (url && (url.includes("youtube") || url.includes("youtu.be"))) {
    const videoId = getYouTubeId(url);
    return (
      <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  if (url && url.includes("vimeo")) {
    const videoId = getVimeoId(url);
    return (
      <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video">
        <iframe
          src={`https://player.vimeo.com/video/${videoId}`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-black aspect-video">
      <div className="flex flex-col items-center gap-3 text-white/70">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
          <Play className="h-8 w-8" />
        </div>
        <p className="text-sm font-medium">{title}</p>
        {!url && (
          <p className="text-xs text-white/40">No video available</p>
        )}
      </div>
    </div>
  );
}

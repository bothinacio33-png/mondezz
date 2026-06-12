interface Props {
  url: string;
  title: string;
}

function getEmbedUrl(url: string): { type: "iframe" | "video"; src: string } | null {
  try {
    const u = new URL(url);
    // YouTube
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be")) {
      const id = u.hostname.includes("youtu.be") ? u.pathname.slice(1) : u.searchParams.get("v");
      if (id) return { type: "iframe", src: `https://www.youtube.com/embed/${id}?rel=0` };
    }
    // Vimeo
    if (u.hostname.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean)[0];
      if (id) return { type: "iframe", src: `https://player.vimeo.com/video/${id}` };
    }
    // Direct video file
    if (/\.(mp4|webm|mov)$/i.test(u.pathname)) {
      return { type: "video", src: url };
    }
    return { type: "iframe", src: url };
  } catch {
    return null;
  }
}

export const ProductVideo = ({ url, title }: Props) => {
  const embed = getEmbedUrl(url);
  if (!embed) return null;

  return (
    <section className="bg-white py-20 px-6 md:px-24">
      <div className="mx-auto max-w-5xl">
        <p className="font-sans text-[10px] tracking-[0.4em] text-brass mb-6">— EM MOVIMENTO</p>
        <div className="relative aspect-video w-full overflow-hidden bg-ink">
          {embed.type === "iframe" ? (
            <iframe
              src={embed.src}
              title={`Vídeo do produto ${title}`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          ) : (
            <video src={embed.src} controls preload="metadata" className="h-full w-full object-cover">
              <track kind="captions" />
            </video>
          )}
        </div>
      </div>
    </section>
  );
};

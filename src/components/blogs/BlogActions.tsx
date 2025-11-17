import {
  useState,
  useEffect,
} from "react";
import {
  Heart,
  Bookmark,
} from "lucide-react";
import {
  toggleBlogLike,
  isBlogLiked,
  toggleBlogSave,
  isBlogSaved,
} from "@/lib/blogStorage";
import { cn } from "@/lib";

interface BlogActionsProps {
  slug: string;
  initialLiked?: boolean;
}

export default function BlogActions({
  slug,
  initialLiked = false,
}: BlogActionsProps) {
  const [
    liked,
    setLiked,
  ] =
    useState(
      initialLiked,
    );
  const [
    saved,
    setSaved,
  ] =
    useState(
      false,
    );
  const [
    isLiking,
    setIsLiking,
  ] =
    useState(
      false,
    );

  useEffect(() => {
    isBlogLiked(
      slug,
    ).then(
      setLiked,
    );
    setSaved(
      isBlogSaved(
        slug,
      ),
    );
  }, [
    slug,
  ]);

  const handleLike =
    async () => {
      if (
        isLiking
      )
        return;
      setIsLiking(
        true,
      );
      try {
        const newLiked =
          await toggleBlogLike(
            slug,
          );
        setLiked(
          newLiked,
        );
      } catch (error) {
        console.error(
          "Error toggling like:",
          error,
        );
      } finally {
        setIsLiking(
          false,
        );
      }
    };

  const handleSave =
    () => {
      const newSaved =
        toggleBlogSave(
          slug,
        );
      setSaved(
        newSaved,
      );
    };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={
          handleLike
        }
        disabled={
          isLiking
        }
        className={cn(
          "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40",
          liked
            ? "border-red-500/70 bg-red-500/20 text-red-400 light:text-red-600 hover:bg-red-500/30 light:hover:bg-red-500/20"
            : "border-slate-800/70 light:border-slate-300/70 bg-slate-900/60 light:bg-slate-100/60 text-slate-400 light:text-slate-600 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-slate-100/80",
          isLiking &&
            "opacity-50 cursor-not-allowed",
        )}
        style={{
          fontFamily:
            "var(--font-body)",
          fontWeight: 500,
        }}
        aria-label={
          liked
            ? "Unlike this blog"
            : "Like this blog"
        }
      >
        <Heart
          className={cn(
            "h-4 w-4",
            liked &&
              "fill-current",
          )}
        />
        {liked
          ? "Liked"
          : "Like"}
      </button>
      <button
        onClick={
          handleSave
        }
        className={cn(
          "inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-100/40 light:focus-visible:ring-slate-900/40",
          saved
            ? "border-blue-500/70 bg-blue-500/20 text-blue-400 light:text-blue-600 hover:bg-blue-500/30 light:hover:bg-blue-500/20"
            : "border-slate-800/70 light:border-slate-300/70 bg-slate-900/60 light:bg-slate-100/60 text-slate-400 light:text-slate-600 hover:border-slate-700/70 light:hover:border-slate-300 hover:bg-slate-900/90 light:hover:bg-slate-100/80",
        )}
        style={{
          fontFamily:
            "var(--font-body)",
          fontWeight: 500,
        }}
        aria-label={
          saved
            ? "Remove from saved"
            : "Save for later"
        }
      >
        <Bookmark
          className={cn(
            "h-4 w-4",
            saved &&
              "fill-current",
          )}
        />
        {saved
          ? "Saved"
          : "Save"}
      </button>
    </div>
  );
}

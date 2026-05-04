import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib'
import CloudinaryImg from '@/components/ui/cloudinary-img'

interface ProfilePictureProps {
  imageUrl: string
  signature: string
  className?: string
}

export default function ProfilePicture({
  imageUrl,
  signature,
  className,
}: ProfilePictureProps) {
  return (
    <div className={cn('relative border border-[var(--border-line)] bg-[var(--paper)]', className)}>
      <div className="flex items-center justify-between border-b border-[var(--border-line)] bg-[var(--surface-subtle)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--graphite-muted)]">
        <span className="inline-flex items-center gap-2">
          <ImageIcon className="h-3.5 w-3.5" aria-hidden="true" />
          asset.profile
        </span>
        <span>render:image</span>
      </div>
      <div className="relative p-4">
        <div
          className="pointer-events-none absolute inset-4"
          aria-hidden="true"
        >
          <div className="absolute left-0 right-0 top-6 border-t border-dashed border-[var(--border-dashed)]" />
          <div className="absolute bottom-6 left-0 right-0 border-t border-dashed border-[var(--border-dashed)]" />
          <div className="absolute left-6 top-0 bottom-0 border-l border-dashed border-[var(--border-dashed)]" />
          <div className="absolute right-6 top-0 bottom-0 border-l border-dashed border-[var(--border-dashed)]" />
        </div>
        <div className="relative bg-[var(--paper)] p-3">
          <CloudinaryImg
            publicId={imageUrl}
            width={600}
            height={800}
            alt="Profile photo of Naufaldi Rafif Satriya"
            preview={false}
            noStyle
            className="aspect-[3/4] w-full border border-[var(--border-line)]"
            imgClassName="object-cover grayscale"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px border-t border-[var(--border-line)] bg-[var(--border-line)]">
        <div className="bg-[var(--paper)] px-4 py-3">
          <div className="text-drawing-label">Source</div>
          <div className="mt-1 truncate font-mono text-xs uppercase tracking-[0.12em] text-[var(--graphite)]">
            cloudinary
          </div>
        </div>
        <div className="bg-[var(--paper)] px-4 py-3">
          <div className="text-drawing-label">Signature</div>
          <div className="mt-1 truncate font-mono text-xs uppercase tracking-[0.12em] text-[var(--graphite)]">
            {signature}
          </div>
        </div>
      </div>
    </div>
  )
}

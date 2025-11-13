import { ArrowRight } from 'lucide-react'
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
    <div className={cn('relative', className)}>
      <div
        className="absolute -left-6 top-4 opacity-20"
        style={{
          animation: 'fade-in 900ms ease-out both',
          animationDelay: '60ms',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-6 border-t border-dashed border-slate-600" />
          <ArrowRight className="h-3 w-3 text-slate-600" />
        </div>
      </div>

      <div
        className="relative rotate-2 bg-white p-4 shadow-2xl w-[300px] md:w-auto"
        style={{
          animation: 'fade-in 900ms ease-out both',
          animationDelay: '120ms',
        }}
      >
        <div className="border-4 border-slate-900 bg-white p-3">
          <CloudinaryImg
            publicId={imageUrl}
            width={600}
            height={800}
            alt="Profile"
            preview={false}
            noStyle
            className="w-full md:w-[300px]"
          />
        </div>
        <div
          className="mt-3 text-center text-sm italic text-slate-900"
          style={{
            fontFamily: 'cursive',
            fontWeight: 400,
          }}
        >
          {signature}
        </div>
      </div>
    </div>
  )
}


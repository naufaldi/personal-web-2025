import { useState } from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import { buildCloudinaryUrl, buildBlurUrl, isCloudinaryUrl } from '@/lib/cloudinary'
import { cn } from '@/lib/utils'

interface CloudinaryImgProps {
  publicId: string
  width: string | number
  height: string | number
  alt: string
  title?: string
  className?: string
  imgClassName?: string
  aspect?: { width: number; height: number }
  preview?: boolean
  noStyle?: boolean
  mdx?: boolean
}

export default function CloudinaryImg({
  publicId,
  width,
  height,
  alt,
  title,
  className,
  imgClassName,
  aspect,
  preview = true,
  noStyle = false,
  mdx = false,
}: CloudinaryImgProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  const isCloudinary = isCloudinaryUrl(publicId)
  const urlBlurred = isCloudinary
    ? buildBlurUrl(publicId, width, aspect)
    : publicId
  const url = isCloudinary
    ? buildCloudinaryUrl(publicId, { width, aspect })
    : publicId

  const handleClick = preview ? () => setIsOpen(true) : undefined
  const handleImageLoad = () => setIsLoaded(true)

  const aspectRatio = aspect
    ? aspect.height / aspect.width
    : typeof height === 'number' && typeof width === 'number'
      ? height / width
      : typeof height === 'string' && typeof width === 'string'
        ? parseFloat(height) / parseFloat(width)
        : undefined

  const useAspectRatioPadding = aspectRatio !== undefined

  return (
    <>
      <figure
        className={cn(className, {
          'overflow-hidden rounded shadow-sm dark:shadow-none': !noStyle,
          'mx-auto': mdx && typeof width === 'number' && width <= 800,
          'h-full w-full': noStyle && !aspectRatio,
          'w-full': noStyle && aspectRatio,
        })}
        style={{
          ...(mdx && typeof width === 'number' && width <= 800
            ? { maxWidth: width }
            : {}),
          ...(noStyle ? { margin: 0 } : {}),
        }}
      >
        <div
          className={cn('relative', {
            'h-full w-full': !useAspectRatioPadding,
          })}
          style={{
            ...(useAspectRatioPadding
              ? {
                  height: 0,
                  paddingTop: `${aspectRatio * 100}%`,
                }
              : {}),
            cursor: preview ? 'zoom-in' : 'default',
          }}
          onClick={handleClick}
          role={preview ? 'button' : undefined}
          tabIndex={preview ? 0 : undefined}
          onKeyDown={
            preview
              ? (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setIsOpen(true)
                  }
                }
              : undefined
          }
          aria-label={preview ? `Open ${alt} in lightbox` : undefined}
        >
          <div
            className={cn(
              'absolute inset-0 blur-[20px] z-0 transition-opacity duration-300',
              isLoaded ? 'opacity-0' : 'opacity-100',
            )}
            style={{
              backgroundImage: `url(${urlBlurred})`,
              backgroundPosition: 'center center',
              backgroundSize: '100%',
            }}
            aria-hidden="true"
          />
          <img
            src={url}
            alt={alt}
            title={title || alt}
            className={cn(
              'absolute left-0 top-0 h-full w-full z-10',
              imgClassName || 'object-cover',
            )}
            loading="lazy"
            decoding="async"
            onLoad={handleImageLoad}
          />
        </div>
      </figure>
      {isOpen && (
        <Lightbox mainSrc={url} onCloseRequest={() => setIsOpen(false)} />
      )}
    </>
  )
}


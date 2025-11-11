import { buildUrl } from 'cloudinary-build-url'

const CLOUD_NAME = 'cynux'

export interface CloudinaryTransformations {
  width?: number | string
  height?: number | string
  aspect?: { width: number; height: number }
  blur?: number
  quality?: number
}

export const extractPublicId = (url: string): string | null => {
  if (!url.includes('cloudinary.com')) {
    return null
  }

  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/)
  if (match && match[1]) {
    return match[1].split('?')[0]
  }

  return null
}

export const isCloudinaryUrl = (url: string): boolean => {
  return url.includes('cloudinary.com')
}

export const buildCloudinaryUrl = (
  publicIdOrUrl: string,
  transformations?: CloudinaryTransformations,
): string => {
  let publicId = publicIdOrUrl

  if (isCloudinaryUrl(publicIdOrUrl)) {
    const extracted = extractPublicId(publicIdOrUrl)
    if (extracted) {
      publicId = extracted
    } else {
      return publicIdOrUrl
    }
  }

  const rawTransformation = transformations?.aspect
    ? `c_fill,ar_${transformations.aspect.width}:${transformations.aspect.height},w_${transformations.width || 'auto'}`
    : undefined

  return buildUrl(publicId, {
    cloud: {
      cloudName: CLOUD_NAME,
    },
    transformations: {
      effect: transformations?.blur
        ? {
            name: `blur:${transformations.blur}`,
          }
        : undefined,
      quality: transformations?.quality || undefined,
      rawTransformation,
    },
  })
}

export const buildBlurUrl = (
  publicIdOrUrl: string,
  width?: number | string,
  aspect?: { width: number; height: number },
): string => {
  return buildCloudinaryUrl(publicIdOrUrl, {
    width,
    aspect,
    blur: 1000,
    quality: 1,
  })
}


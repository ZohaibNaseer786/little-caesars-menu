'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

export function ImageWithFallback({ src, alt, ...props }: ImageProps) {
  const [imageSrc, setImageSrc] = useState(src)

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      onError={() => setImageSrc('/images/menu-placeholder.svg')}
    />
  )
}

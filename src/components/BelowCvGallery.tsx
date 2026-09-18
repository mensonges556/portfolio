import image1 from '../../image.png'
import image2 from '../../image2.png'
import image3 from '../../image3.png'

const IMAGES = [
  { src: image1, alt: '' },
  { src: image2, alt: '' },
  { src: image3, alt: '' },
] as const

export function BelowCvGallery() {
  return (
    <div className="cv-below-gallery" id="projets">
      {IMAGES.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt={img.alt}
          className="cv-below-gallery__img"
          draggable={false}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </div>
  )
}

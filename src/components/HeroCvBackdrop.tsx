import Grainient from './Grainient'

export const HERO_CV_GRAINIENT = {
  color1: '#fc81ff',
  color2: '#d3d3d3',
  color3: '#fc81ff',
  timeSpeed: 0.25,
  colorBalance: 0.0,
  warpStrength: 1.0,
  warpFrequency: 5.0,
  warpSpeed: 2.0,
  warpAmplitude: 50.0,
  blendAngle: 0.0,
  blendSoftness: 0.05,
  rotationAmount: 500.0,
  noiseScale: 2.0,
  grainAmount: 0.055,
  grainScale: 2.0,
  grainAnimated: false,
  contrast: 1.5,
  gamma: 1.0,
  saturation: 1.0,
  centerX: 0.0,
  centerY: 0.0,
  zoom: 0.9,
} as const

export function HeroCvBackdrop() {
  return (
    <div className="hero-cv-stack__bg" aria-hidden>
      <div className="hero-cv-stack__grain">
        <Grainient {...HERO_CV_GRAINIENT} />
      </div>
    </div>
  )
}

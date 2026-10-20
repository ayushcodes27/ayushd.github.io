import { Lottie } from 'lottie-react'
import mascotAnimation from '../assets/hero-mascot.json'

export default function LottieMascot() {
  return (
    <div className="w-full flex items-center justify-center select-none pointer-events-none py-2">
      <div className="w-[300px] sm:w-[380px] md:w-[420px] lg:w-[460px] max-w-full aspect-square flex items-center justify-center">
        <Lottie
          src={mascotAnimation}
          autoplay
          loop
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

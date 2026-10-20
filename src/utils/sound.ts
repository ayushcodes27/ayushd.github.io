// Sound system disabled per configuration
export type SoundType = 'click' | 'toggle' | 'pop' | 'retro' | 'success' | 'hover'

export function isSoundEnabled(): boolean {
  return false
}

export function toggleSound(): boolean {
  return false
}

export function subscribeSound(_callback: (enabled: boolean) => void): () => void {
  return () => {}
}

export function playSound(_type: SoundType = 'click') {
  // Completely disabled
}

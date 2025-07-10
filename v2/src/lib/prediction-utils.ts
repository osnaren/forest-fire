import type { PredictionResult } from '@/store'

export function formatProbability(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

export function getTopPrediction(predictions: PredictionResult): {
  class: string
  confidence: number
  label: string
} {
  const entries = Object.entries(predictions)
  const [topClass, confidence] = entries.reduce((a, b) => {
    const aValue = predictions[a[0] as keyof PredictionResult] ?? 0
    const bValue = predictions[b[0] as keyof PredictionResult] ?? 0
    return aValue > bValue ? a : b
  })

  const labels = {
    fire: 'Fire Detected',
    smoke: 'Smoke Detected', 
    no_fire: 'No Fire',
    smoke_fire: 'Smoke & Fire'
  }

  return {
    class: topClass,
    confidence,
    label: labels[topClass as keyof typeof labels] || topClass
  }
}

export function getPredictionColor(className: string): string {
  const colors = {
    fire: 'text-red-500',
    smoke: 'text-amber-500',
    no_fire: 'text-emerald-500',
    smoke_fire: 'text-orange-500'
  }
  
  return colors[className as keyof typeof colors] || 'text-gray-500'
}

export function getPredictionVariant(className: string): 'fire' | 'smoke' | 'no-fire' | 'default' {
  const variants = {
    fire: 'fire' as const,
    smoke: 'smoke' as const,
    no_fire: 'no-fire' as const,
    smoke_fire: 'fire' as const
  }
  
  return variants[className as keyof typeof variants] || 'default'
}

export function formatProcessingTime(timeMs: number): string {
  if (timeMs < 1000) {
    return `${timeMs}ms`
  }
  return `${(timeMs / 1000).toFixed(1)}s`
}

import React, { useState } from 'react'

interface RatingProps {
  rating: number // integer 0 to 5
  onRate?: (value: number) => void
  max?: number
  interactive?: boolean
}

const RatingField: React.FC<RatingProps> = ({ rating, onRate, max = 5, interactive = true }) => {
  const [hovered, setHovered] = useState<number | null>(null)

  const isActive = (index: number) => {
    const value = interactive && hovered !== null ? hovered : rating
    return index < value
  }

  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          onClick={() => interactive && onRate?.(i + 1)}
          onMouseEnter={() => interactive && setHovered(i + 1)}
          onMouseLeave={() => interactive && setHovered(null)}
          style={{
            cursor: interactive ? 'pointer' : 'default',
            fontSize: '1.5rem',
            color: isActive(i) ? '#ffc107' : '#adb5bd',
            transition: 'color 0.2s',
            marginRight: '4px',
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default RatingField

'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HoverCardProps {
  children: React.ReactNode
  className?: string
  hoverContent?: React.ReactNode
  direction?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

const directions = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
}

export function HoverCard({ children, className, hoverContent, direction = 'top', delay = 0.2 }: HoverCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div 
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {hoverContent && (
        <motion.div
          className={cn(
            'absolute z-50 bg-white rounded-lg shadow-xl p-4 min-w-max',
            directions[direction]
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.9 
          }}
          transition={{ 
            duration: 0.2, 
            delay: isHovered ? delay : 0 
          }}
          style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
        >
          {hoverContent}
        </motion.div>
      )}
    </div>
  )
}

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function MagneticButton({ children, className, onClick }: MagneticButtonProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = (e.clientX - centerX) * 0.1
    const y = (e.clientY - centerY) * 0.1
    
    setPosition({ x, y })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      className={cn('relative inline-block', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

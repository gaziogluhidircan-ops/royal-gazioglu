'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  color?: 'primary' | 'gold' | 'white'
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12'
}

const colors = {
  primary: 'border-primary-600 border-t-transparent',
  gold: 'border-gold-500 border-t-transparent',
  white: 'border-white border-t-transparent'
}

export function LoadingSpinner({ size = 'md', className, color = 'primary' }: LoadingSpinnerProps) {
  return (
    <motion.div
      className={cn(
        'border-2 border-solid rounded-full animate-spin',
        sizes[size],
        colors[color],
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    />
  )
}

interface PulseLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  color?: 'primary' | 'gold' | 'white'
}

const pulseSizes = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4'
}

const pulseColors = {
  primary: 'bg-primary-600',
  gold: 'bg-gold-500',
  white: 'bg-white'
}

export function PulseLoader({ size = 'md', className, color = 'primary' }: PulseLoaderProps) {
  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={cn('rounded-full', pulseSizes[size], pulseColors[color])}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

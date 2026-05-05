'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedButtonProps {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

const variants = {
  primary: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl',
  secondary: 'bg-stone-600 hover:bg-stone-700 text-white shadow-lg hover:shadow-xl',
  gold: 'bg-gold-500 hover:bg-gold-600 text-stone-900 shadow-lg hover:shadow-xl',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white'
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

export function AnimatedButton({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className,
  ...props 
}: AnimatedButtonProps) {
  return (
    <motion.button
      className={cn(
        'rounded-lg font-medium transition-all duration-300 relative overflow-hidden',
        variants[variant],
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.2 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

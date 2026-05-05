'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

export function ParallaxSection({ children, className, speed = 0.5 }: ParallaxSectionProps) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])

  return (
    <motion.div
      style={{ y }}
      className={cn('relative', className)}
    >
      {children}
    </motion.div>
  )
}

interface FloatingElementProps {
  children: React.ReactNode
  className?: string
  duration?: number
  delay?: number
}

export function FloatingElement({ children, className, duration = 3, delay = 0 }: FloatingElementProps) {
  return (
    <motion.div
      className={cn('relative', className)}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

interface FadeInOnScrollProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
}

export function FadeInOnScroll({ 
  children, 
  className, 
  direction = 'up', 
  delay = 0,
  duration = 0.6 
}: FadeInOnScrollProps) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 30 }
      case 'down': return { opacity: 0, y: -30 }
      case 'left': return { opacity: 0, x: 30 }
      case 'right': return { opacity: 0, x: -30 }
      default: return { opacity: 0, y: 30 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

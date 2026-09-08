'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function AnimateIn({
  children,
  className = '',
  delay = 0,
  amount = 0.2,
  y = 40,
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

export interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

/**
 * Minimal reusable motion wrapper preparing architecture for future cinematic animation system.
 */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  yOffset = 20,
  className = '',
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;

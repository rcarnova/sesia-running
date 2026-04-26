'use client'

import { useEffect } from 'react'
import styles from './home.module.css'

export default function ScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(`.${styles.reveal}`)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible)
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}

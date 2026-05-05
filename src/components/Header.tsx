'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Globe } from 'lucide-react'
import { useLanguage, languages } from '@/contexts/LanguageContext'
import { NavigationItem } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navigation: NavigationItem[] = [
  { name: 'Ana Sayfa', nameEn: 'Home', href: '/' },
  { name: 'Odalar', nameEn: 'Rooms', href: '/rooms' },
  { name: 'Rezervasyon', nameEn: 'Booking', href: '/booking' },
  { name: 'Galeri', nameEn: 'Gallery', href: '/gallery' },
  { name: 'Blog', nameEn: 'Blog', href: '/blog' },
  { name: 'İletişim', nameEn: 'Contact', href: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-stone-600 rounded-full flex items-center justify-center">
              <span className="text-white font-serif text-lg font-bold">RG</span>
            </div>
            <span className="font-serif text-2xl font-bold text-stone-900">
              Royal Gazioğlu
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-stone-700 hover:text-primary-600 transition-colors font-medium"
              >
                {t(item.name, item.nameEn)}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-stone-700 hover:text-primary-600 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language.flag} {language.code.toUpperCase()}
                </span>
              </button>
              <div className="absolute right-0 mt-2 w-24 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-white rounded-lg shadow-lg py-2 border border-stone-200">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                      className="w-full px-3 py-1 text-left text-sm hover:bg-stone-50 transition-colors flex items-center space-x-2"
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Phone */}
            <a
              href="tel:+905551234567"
              className="flex items-center space-x-2 text-stone-700 hover:text-primary-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+90 555 123 45 67</span>
            </a>

            {/* Book Now Button */}
            <Link
              href="/booking"
              className="btn-gold text-sm px-6 py-2"
            >
              {t('Rezervasyon', 'Book Now')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-primary-600 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-stone-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-stone-700 hover:text-primary-600 transition-colors font-medium py-2"
                >
                  {t(item.name, item.nameEn)}
                </Link>
              ))}

              {/* Language Switcher Mobile */}
              <div className="pt-4 border-t border-stone-200">
                <p className="text-sm text-stone-600 mb-2">
                  {t('Dil Seçimi', 'Language')}
                </p>
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                      className={cn(
                        'px-3 py-1 rounded-md text-sm transition-colors',
                        language.code === lang.code
                          ? 'bg-primary-600 text-white'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      )}
                    >
                      {lang.flag} {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Phone Mobile */}
              <div className="pt-4 border-t border-stone-200">
                <a
                  href="tel:+905551234567"
                  className="flex items-center space-x-2 text-stone-700 hover:text-primary-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">+90 555 123 45 67</span>
                </a>
              </div>

              {/* Book Now Button Mobile */}
              <div className="pt-4">
                <Link
                  href="/booking"
                  onClick={() => setIsOpen(false)}
                  className="btn-gold w-full text-center"
                >
                  {t('Rezervasyon', 'Book Now')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

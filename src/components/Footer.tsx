'use client'

import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { NavigationItem } from '@/types'

const footerNavigation: NavigationItem[] = [
  { name: 'Ana Sayfa', nameEn: 'Home', href: '/' },
  { name: 'Odalar', nameEn: 'Rooms', href: '/rooms' },
  { name: 'Rezervasyon', nameEn: 'Booking', href: '/booking' },
  { name: 'Galeri', nameEn: 'Gallery', href: '/gallery' },
  { name: 'Blog', nameEn: 'Blog', href: '/blog' },
  { name: 'İletişim', nameEn: 'Contact', href: '/contact' },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white font-serif text-lg font-bold">RG</span>
              </div>
              <span className="font-serif text-2xl font-bold">Royal Gazioğlu</span>
            </div>
            <p className="text-stone-300 mb-4 max-w-md">
              {t(
                'Tunceli\'nin kalbinde, doğa ile bütünleşmiş lüks bir kaçış deneyimi. Modern taş mimari ve benzersiz konfor.',
                'A luxury escape experience in the heart of Tunceli, integrated with nature. Modern stone architecture and unique comfort.'
              )}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-gold-400">
              {t('Hızlı Linkler', 'Quick Links')}
            </h3>
            <ul className="space-y-2">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-stone-300 hover:text-primary-400 transition-colors"
                  >
                    {t(item.name, item.nameEn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4 text-gold-400">
              {t('İletişim', 'Contact')}
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                <span className="text-stone-300 text-sm">
                  Halvori Köyü, Tunceli<br />
                  Türkiye
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="tel:+905551234567"
                  className="text-stone-300 hover:text-primary-400 transition-colors text-sm"
                >
                  +90 555 123 45 67
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href="mailto:info@royalgazioglu.com"
                  className="text-stone-300 hover:text-primary-400 transition-colors text-sm"
                >
                  info@royalgazioglu.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-400 text-sm mb-4 md:mb-0">
              © 2024 Royal Gazioğlu. {t('Tüm hakları saklıdır.', 'All rights reserved.')}
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-stone-400 hover:text-primary-400 transition-colors">
                {t('Gizlilik Politikası', 'Privacy Policy')}
              </a>
              <a href="#" className="text-stone-400 hover:text-primary-400 transition-colors">
                {t('Kullanım Koşulları', 'Terms of Service')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

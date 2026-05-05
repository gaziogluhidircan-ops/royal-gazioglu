'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Language } from '@/types'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (tr: string, en: string) => string
}

const languages: Language[] = [
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
]

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(languages[0])

  const t = (tr: string, en: string) => {
    return language.code === 'tr' ? tr : en
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export { languages }

export interface Room {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  features: string[]
  featuresEn: string[]
  price: number
  maxGuests: number
  size: number
  images: string[]
  hasFloatingSpa?: boolean
  category: 'standard' | 'deluxe' | 'suite' | 'presidential'
}

export interface BlogPost {
  id: string
  title: string
  titleEn: string
  slug: string
  excerpt: string
  excerptEn: string
  content: string
  contentEn: string
  author: string
  authorEn: string
  publishedAt: Date
  image: string
  category: 'wellness' | 'nature' | 'travel' | 'hotel' | 'sustainability' | 'activities' | 'dining' | 'architecture'
  tags: string[]
  readTime: number
}

export interface BookingData {
  checkIn: Date
  checkOut: Date
  guests: number
  roomId?: string
  roomName?: string
  totalPrice?: number
}

export interface ContactInfo {
  name: string
  email: string
  phone: string
  message: string
}

export interface Language {
  code: 'tr' | 'en'
  name: string
  flag: string
}

export type NavigationItem = {
  name: string
  nameEn: string
  href: string
}

export type Activity = {
  id: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  icon: string
  duration: string
  difficulty: 'easy' | 'medium' | 'hard'
}

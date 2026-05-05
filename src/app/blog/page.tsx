'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, ChevronRight, Search, Filter, Tag } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { BlogPost } from '@/types'
import { cn, formatDate } from '@/lib/utils'

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    id: 'floating-spa-revolution',
    title: 'Yüzen Spa Devrimi',
    titleEn: 'The Floating Spa Revolution',
    slug: 'floating-spa-revolution',
    excerpt: 'Royal Gazioğlu\'nun yenilikçi yüzen spa konsepti, lüks konaklamayı nasıl yeniden tanımlıyor?',
    excerptEn: 'How Royal Gazioğlu\'s innovative floating spa concept is redefining luxury accommodation?',
    content: 'Royal Gazioğlu\'nun yenilikçi yüzen spa konsepti, lüks konaklamayı nasıl yeniden tanımlıyor?',
    contentEn: 'How Royal Gazioğlu\'s innovative floating spa concept is redefining luxury accommodation?',
    author: 'Elif Yılmaz',
    authorEn: 'Elif Yılmaz',
    publishedAt: new Date('2024-01-15'),
    category: 'wellness',
    tags: ['spa', 'wellness', 'luxury', 'innovation'],
    image: '/floating-spa-blog.jpg',
    readTime: 5
  },
  {
    id: 'mountain-wellness-journey',
    title: 'Dağda Wellness Yolculuğu',
    titleEn: 'Mountain Wellness Journey',
    slug: 'mountain-wellness-journey',
    excerpt: 'Tunceli\'nin doğal güzellikleri ile iç içe huzurlu bir wellness deneyimi.',
    excerptEn: 'A peaceful wellness experience integrated with the natural beauty of Tunceli.',
    content: 'Tunceli\'nin doğal güzellikleri ile iç içe huzurlu bir wellness deneyimi.',
    contentEn: 'A peaceful wellness experience integrated with the natural beauty of Tunceli.',
    author: 'Ahmet Demir',
    authorEn: 'Ahmet Demir',
    publishedAt: new Date('2024-01-10'),
    category: 'nature',
    tags: ['nature', 'wellness', 'mountains', 'meditation'],
    image: '/mountain-wellness-blog.jpg',
    readTime: 7
  },
  {
    id: 'secret-tunceli',
    title: 'Tunceli\'nin Sırları',
    titleEn: 'Secrets of Tunceli',
    slug: 'secret-tunceli',
    excerpt: 'Keşfedilmemiş cennet Tunceli\'nin saklı güzellikleri ve kültürel zenginlikleri.',
    excerptEn: 'The hidden beauties and cultural richness of Tunceli, the undiscovered paradise.',
    content: 'Keşfedilmemiş cennet Tunceli\'nin saklı güzellikleri ve kültürel zenginlikleri.',
    contentEn: 'The hidden beauties and cultural richness of Tunceli, the undiscovered paradise.',
    author: 'Zeynep Kaya',
    authorEn: 'Zeynep Kaya',
    publishedAt: new Date('2024-01-05'),
    category: 'travel',
    tags: ['tunceli', 'travel', 'culture', 'discovery'],
    image: '/tunceli-secrets-blog.jpg',
    readTime: 8
  },
  {
    id: 'sustainable-luxury',
    title: 'Sürdürülebilir Lüks',
    titleEn: 'Sustainable Luxury',
    slug: 'sustainable-luxury',
    excerpt: 'Doğa ile uyum içinde lüks konaklama: Sürdürülebilirlik ve konforun buluştuğu nokta.',
    excerptEn: 'Luxury accommodation in harmony with nature: Where sustainability and comfort meet.',
    content: 'Doğa ile uyum içinde lüks konaklama: Sürdürülebilirlik ve konforun buluştuğu nokta.',
    contentEn: 'Luxury accommodation in harmony with nature: Where sustainability and comfort meet.',
    author: 'Mehmet Öz',
    authorEn: 'Mehmet Öz',
    publishedAt: new Date('2023-12-28'),
    category: 'sustainability',
    tags: ['sustainability', 'luxury', 'eco-friendly', 'nature'],
    image: '/sustainable-luxury-blog.jpg',
    readTime: 6
  },
  {
    id: 'digital-detox',
    title: 'Dijital Detox',
    titleEn: 'Digital Detox',
    slug: 'digital-detox',
    excerpt: 'Teknolojiden uzaklaşarak zihinsel ve bedensel yenilenme nasıl sağlanır?',
    excerptEn: 'How to achieve mental and physical renewal by stepping away from technology?',
    content: 'Teknolojiden uzaklaşarak zihinsel ve bedensel yenilenme nasıl sağlanır?',
    contentEn: 'How to achieve mental and physical renewal by stepping away from technology?',
    author: 'Ayşe Çelik',
    authorEn: 'Ayşe Çelik',
    publishedAt: new Date('2023-12-20'),
    category: 'wellness',
    tags: ['digital-detox', 'wellness', 'meditation', 'mindfulness'],
    image: '/digital-detox-blog.jpg',
    readTime: 5
  },
  {
    id: 'seasonal-activities',
    title: 'Mevsimsel Aktiviteler',
    titleEn: 'Seasonal Activities',
    slug: 'seasonal-activities',
    excerpt: 'Royal Gazioğlu\'da dört mevsim boyunca yapılabilecek doğa aktiviteleri.',
    excerptEn: 'Nature activities available throughout the four seasons at Royal Gazioğlu.',
    content: 'Royal Gazioğlu\'da dört mevsim boyunca yapılabilecek doğa aktiviteleri.',
    contentEn: 'Nature activities available throughout the four seasons at Royal Gazioğlu.',
    author: 'Can Polat',
    authorEn: 'Can Polat',
    publishedAt: new Date('2023-12-15'),
    category: 'activities',
    tags: ['activities', 'seasons', 'nature', 'adventure'],
    image: '/seasonal-activities-blog.jpg',
    readTime: 6
  },
  {
    id: 'local-cuisine',
    title: 'Yöresel Lezzetler',
    titleEn: 'Local Cuisine',
    slug: 'local-cuisine',
    excerpt: 'Tunceli\'nin otantik mutfağından seçkin lezzetler ve gastronomi yolculuğu.',
    excerptEn: 'Selected flavors from Tunceli\'s authentic cuisine and gastronomic journey.',
    content: 'Tunceli\'nin otantik mutfağından seçkin lezzetler ve gastronomi yolculuğu.',
    contentEn: 'Selected flavors from Tunceli\'s authentic cuisine and gastronomic journey.',
    author: 'Şef Hasan Yıldız',
    authorEn: 'Chef Hasan Yıldız',
    publishedAt: new Date('2023-12-10'),
    category: 'dining',
    tags: ['cuisine', 'local-food', 'gastronomy', 'culture'],
    image: '/local-cuisine-blog.jpg',
    readTime: 7
  },
  {
    id: 'architecture-nature',
    title: 'Mimari ve Doğa',
    titleEn: 'Architecture and Nature',
    slug: 'architecture-nature',
    excerpt: 'Royal Gazioğlu\'nun doğa ile bütünleşmiş modern taş mimarisi.',
    excerptEn: 'Royal Gazioğlu\'s modern stone architecture integrated with nature.',
    content: 'Royal Gazioğlu\'nun doğa ile bütünleşmiş modern taş mimarisi.',
    contentEn: 'Royal Gazioğlu\'s modern stone architecture integrated with nature.',
    author: 'Mimar Leyla Aksoy',
    authorEn: 'Architect Leyla Aksoy',
    publishedAt: new Date('2023-12-05'),
    category: 'architecture',
    tags: ['architecture', 'design', 'nature', 'stone-house'],
    image: '/architecture-nature-blog.jpg',
    readTime: 8
  }
]

// Categories for filtering
const categories = [
  { id: 'all', name: 'Tümü', nameEn: 'All' },
  { id: 'wellness', name: 'Wellness', nameEn: 'Wellness' },
  { id: 'nature', name: 'Doğa', nameEn: 'Nature' },
  { id: 'travel', name: 'Seyahat', nameEn: 'Travel' },
  { id: 'sustainability', name: 'Sürdürülebilirlik', nameEn: 'Sustainability' },
  { id: 'activities', name: 'Aktiviteler', nameEn: 'Activities' },
  { id: 'dining', name: 'Yemek', nameEn: 'Dining' },
  { id: 'architecture', name: 'Mimari', nameEn: 'Architecture' }
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function BlogPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerptEn.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-stone-800 to-stone-900">
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            className="font-serif text-4xl md:text-5xl font-bold text-shadow mb-4"
            {...fadeInUp}
          >
            {t('Blog', 'Blog')}
          </motion.h1>
          <motion.p 
            className="text-xl font-light max-w-2xl mx-auto text-shadow"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {t(
              'Doğa, wellness ve seyahat üzerine ilham veren hikayeler.',
              'Inspiring stories about nature, wellness, and travel.'
            )}
          </motion.p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder={t('Blog yazılarında ara...', 'Search blog posts...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-stone-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {t(category.name, category.nameEn)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 text-stone-600">
            {t(
              `${filteredPosts.length} blog yazısı bulundu`,
              `${filteredPosts.length} blog posts found`
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={fadeInUp}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 bg-gradient-to-br from-primary-400 to-stone-500 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-stone-900 px-3 py-1 rounded-full text-xs font-semibold">
                        {t(post.category, post.category)}
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">
                            {post.category === 'wellness' ? '🧘' :
                             post.category === 'nature' ? '🌿' :
                             post.category === 'travel' ? '✈️' :
                             post.category === 'sustainability' ? '🌍' :
                             post.category === 'activities' ? '🏃' :
                             post.category === 'dining' ? '🍽️' :
                             post.category === 'architecture' ? '🏛️' : '📝'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-stone-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} {t('dk', 'min')}</span>
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-stone-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {t(post.title, post.titleEn)}
                    </h3>
                    
                    <p className="text-stone-600 mb-4 line-clamp-3">
                      {t(post.excerpt, post.excerptEn)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-stone-500">
                        <User className="w-4 h-4" />
                        <span>{t(post.author, post.authorEn)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-primary-600 group-hover:translate-x-1 transition-transform">
                        <span className="text-sm font-medium">{t('Devamı', 'Read More')}</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>

                    {post.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full flex items-center gap-1"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div
              {...fadeInUp}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-stone-400" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">
                {t('Blog Yazısı Bulunamadı', 'No Blog Posts Found')}
              </h3>
              <p className="text-stone-600">
                {t(
                  'Arama kriterlerinize uygun blog yazısı bulunamadı.',
                  'No blog posts found matching your search criteria.'
                )}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              {t('Bültene Katılın', 'Subscribe to Our Newsletter')}
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              {t(
                'En yeni blog yazıları ve özel teklifler için e-posta listemize katılın.',
                'Join our email list for the latest blog posts and special offers.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('E-posta adresiniz', 'Your email address')}
                className="flex-1 px-4 py-3 rounded-lg text-stone-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="btn-gold bg-gold-500 hover:bg-gold-600 text-stone-900 px-6 py-3 rounded-lg font-semibold">
                {t('Abone Ol', 'Subscribe')}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

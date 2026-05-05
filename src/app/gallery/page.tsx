'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Maximize2, Grid, List } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { cn } from '@/lib/utils'

// Gallery categories
const categories = [
  { id: 'all', name: 'Tümü', nameEn: 'All' },
  { id: 'rooms', name: 'Odalar', nameEn: 'Rooms' },
  { id: 'nature', name: 'Doğa', nameEn: 'Nature' },
  { id: 'spa', name: 'Spa', nameEn: 'Spa' },
  { id: 'dining', name: 'Yemek', nameEn: 'Dining' },
  { id: 'activities', name: 'Aktiviteler', nameEn: 'Activities' }
]

// Gallery images data
const galleryImages = [
  // Rooms
  { id: 1, category: 'rooms', title: 'Kral Süiti', titleEn: 'Royal Suite', description: 'Dağ manzaralı lüks süit', descriptionEn: 'Luxury suite with mountain view' },
  { id: 2, category: 'rooms', title: 'Doğa Deluxe', titleEn: 'Nature Deluxe', description: 'Orman manzaralı konforlu oda', descriptionEn: 'Comfortable room with forest view' },
  { id: 3, category: 'rooms', title: 'Göl Manzarası', titleEn: 'Lake View', description: 'Göl manzaralı romantik oda', descriptionEn: 'Romantic room with lake view' },
  { id: 4, category: 'rooms', title: 'Yüzen Spa', titleEn: 'Floating Spa', description: 'Yerçekimsiz spa deneyimi', descriptionEn: 'Anti-gravity spa experience' },
  { id: 5, category: 'rooms', title: 'Dağ Kaçamağı', titleEn: 'Mountain Retreat', description: 'Dağ manzaralı sade oda', descriptionEn: 'Simple room with mountain view' },
  { id: 6, category: 'rooms', title: 'Nehir Vadisi', titleEn: 'River Valley', description: 'Nehir manzaralı huzurlu oda', descriptionEn: 'Peaceful room with river view' },
  
  // Nature
  { id: 7, category: 'nature', title: 'Sabah Manzarası', titleEn: 'Morning View', description: 'Otelin doğa ile iç içe manzarası', descriptionEn: 'Hotel view integrated with nature' },
  { id: 8, category: 'nature', title: 'Orman Yolu', titleEn: 'Forest Path', description: 'Otel çevresindeki yürüyüş yolları', descriptionEn: 'Walking trails around the hotel' },
  { id: 9, category: 'nature', title: 'Göl Gün Batımı', titleEn: 'Lake Sunset', description: 'Göl üzerindeki gün batımı', descriptionEn: 'Sunset over the lake' },
  { id: 10, category: 'nature', title: 'Dağ Manzarası', titleEn: 'Mountain View', description: 'Karlı dağların manzarası', descriptionEn: 'View of snowy mountains' },
  { id: 11, category: 'nature', title: 'Nehir Kenarı', titleEn: 'River Bank', description: 'Nehir kenarındaki dinlenme alanları', descriptionEn: 'Rest areas by the river' },
  { id: 12, category: 'nature', title: 'Doğa Yaşamı', titleEn: 'Wildlife', description: 'Bölgedeki doğal yaşam', descriptionEn: 'Natural wildlife in the area' },
  
  // Spa
  { id: 13, category: 'spa', title: 'Yüzen Spa', titleEn: 'Floating Spa', description: 'Yerçekimsiz spa deneyimi', descriptionEn: 'Anti-gravity spa experience' },
  { id: 14, category: 'spa', title: 'Masaj Odası', titleEn: 'Massage Room', description: 'Profesyonel masaj hizmetleri', descriptionEn: 'Professional massage services' },
  { id: 15, category: 'spa', title: 'Buhar Odası', titleEn: 'Steam Room', description: 'Modern buhar odası', descriptionEn: 'Modern steam room' },
  { id: 16, category: 'spa', title: 'Sauna', titleEn: 'Sauna', description: 'Fin sauna deneyimi', descriptionEn: 'Finnish sauna experience' },
  { id: 17, category: 'spa', title: 'Rahatlama Alanı', titleEn: 'Relaxation Area', description: 'Spa sonrası dinlenme alanı', descriptionEn: 'Post-spa relaxation area' },
  { id: 18, category: 'spa', title: 'Jakuzi', titleEn: 'Jacuzzi', description: 'Açık jakuzi keyfi', descriptionEn: 'Outdoor jacuzzi pleasure' },
  
  // Dining
  { id: 19, category: 'dining', title: 'Restoran', titleEn: 'Restaurant', description: 'Şefin özel lezzetleri', descriptionEn: "Chef's special flavors" },
  { id: 20, category: 'dining', title: 'Kahvaltı', titleEn: 'Breakfast', description: 'Zengin kahvaltı büfesi', descriptionEn: 'Rich breakfast buffet' },
  { id: 21, category: 'dining', title: 'Bar', titleEn: 'Bar', description: 'Özel kokteyller ve içkiler', descriptionEn: 'Special cocktails and drinks' },
  { id: 22, category: 'dining', title: 'Özel Akşam Yemeği', titleEn: 'Special Dinner', description: 'Romantik akşam yemeği', descriptionEn: 'Romantic dinner' },
  { id: 23, category: 'dining', title: 'Teras', titleEn: 'Terrace', description: 'Açık hava yemek alanı', descriptionEn: 'Outdoor dining area' },
  { id: 24, category: 'dining', title: 'Şef', titleEn: 'Chef', description: 'Usta şeflerimiz', descriptionEn: 'Our master chefs' },
  
  // Activities
  { id: 25, category: 'activities', title: 'Yürüyüş', titleEn: 'Hiking', description: 'Doğa yürüyüşleri', descriptionEn: 'Nature hiking' },
  { id: 26, category: 'activities', title: 'Bisiklet', titleEn: 'Cycling', description: 'Dağ bisikleti turları', descriptionEn: 'Mountain bike tours' },
  { id: 27, category: 'activities', title: 'Balık Tutma', titleEn: 'Fishing', description: 'Gölde balık tutma', descriptionEn: 'Fishing in the lake' },
  { id: 28, category: 'activities', title: 'Kuş Gözlemciliği', titleEn: 'Bird Watching', description: 'Kuş gözlemciliği turları', descriptionEn: 'Bird watching tours' },
  { id: 29, category: 'activities', title: 'Yoga', titleEn: 'Yoga', description: 'Doğa yoga seansları', descriptionEn: 'Nature yoga sessions' },
  { id: 30, category: 'activities', title: 'Kamp', titleEn: 'Camping', description: 'Lüks kamp deneyimi', descriptionEn: 'Luxury camping experience' }
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

export default function GalleryPage() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory)

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
            {t('Galeri', 'Gallery')}
          </motion.h1>
          <motion.p 
            className="text-xl font-light max-w-2xl mx-auto text-shadow"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {t(
              'Royal Gazioğlu\'nun büyüleyici anları ve unutulmaz deneyimleri.',
              'Enchanting moments and unforgettable experiences at Royal Gazioğlu.'
            )}
          </motion.p>
        </div>
      </section>

      {/* Filter and View Controls */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === category.id
                      ? "bg-primary-600 text-white"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                  )}
                >
                  {t(category.name, category.nameEn)}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-stone-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded transition-colors",
                  viewMode === 'grid' ? "bg-white shadow-sm" : "text-stone-600"
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded transition-colors",
                  viewMode === 'list' ? "bg-white shadow-sm" : "text-stone-600"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 text-stone-600">
            {t(
              `${filteredImages.length} fotoğraf bulundu`,
              `${filteredImages.length} photos found`
            )}
          </div>

          {viewMode === 'grid' ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="aspect-square bg-gradient-to-br from-primary-400 to-stone-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-white font-semibold text-sm">
                        {t(image.title, image.titleEn)}
                      </h3>
                      <p className="text-white/80 text-xs">
                        {t(image.description, image.descriptionEn)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  variants={fadeInUp}
                  className="flex flex-col md:flex-row bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="md:w-1/3 aspect-video md:aspect-square bg-gradient-to-br from-primary-400 to-stone-500 relative">
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-serif text-xl font-bold text-stone-900">
                        {t(image.title, image.titleEn)}
                      </h3>
                      <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded-full">
                        {categories.find(c => c.id === image.category)?.name}
                      </span>
                    </div>
                    <p className="text-stone-600 mb-4">
                      {t(image.description, image.descriptionEn)}
                    </p>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1">
                      <Maximize2 className="w-4 h-4" />
                      {t('Büyüt', 'Enlarge')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-stone-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="aspect-video bg-gradient-to-br from-primary-400 to-stone-500 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Maximize2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl font-serif">{t(selectedImage.title, selectedImage.titleEn)}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center text-white">
                <h3 className="font-serif text-2xl font-bold mb-2">
                  {t(selectedImage.title, selectedImage.titleEn)}
                </h3>
                <p className="text-stone-300">
                  {t(selectedImage.description, selectedImage.descriptionEn)}
                </p>
                <p className="text-sm text-stone-400 mt-2">
                  {categories.find(c => c.id === selectedImage.category)?.name}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

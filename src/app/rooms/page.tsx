'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Wifi, Car, Coffee, Dumbbell, WandSparkles, Trees, Waves, Users, Square, Star, Bath, Wind, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Room } from '@/types'
import { cn } from '@/lib/utils'

// Complete room data with 6 unique luxury rooms
const rooms: Room[] = [
  {
    id: 'royal-suite',
    name: 'Kral Süiti',
    nameEn: 'Royal Suite',
    description: 'Dağ manzaralı özel jakuzili lüks süit. Yüzen spa deneyimi ve akıllı ev otomasyonu ile donatılmıştır.',
    descriptionEn: 'Luxury suite with mountain view and private jacuzzi. Equipped with floating spa experience and smart home automation.',
    features: ['Yüzen Spa', 'Akıllı Ev', 'Manzaralı Balkon', 'Mini Bar', 'King Yatak', 'Lüks Banyo', 'Şömine', 'Private Butler'],
    featuresEn: ['Floating Spa', 'Smart Home', 'Mountain View Balcony', 'Mini Bar', 'King Bed', 'Luxury Bathroom', 'Fireplace', 'Private Butler'],
    price: 4500,
    maxGuests: 2,
    size: 85,
    images: ['/royal-suite-1.jpg', '/royal-suite-2.jpg', '/royal-suite-3.jpg'],
    hasFloatingSpa: true,
    category: 'presidential'
  },
  {
    id: 'nature-deluxe',
    name: 'Doğa Deluxe',
    nameEn: 'Nature Deluxe',
    description: 'Orman manzaralı geniş oda. Doğal malzemelerle dekore edilmiş ve modern konfor sunmaktadır.',
    descriptionEn: 'Spacious room with forest view. Decorated with natural materials and offers modern comfort.',
    features: ['Orman Manzarası', 'King Yatak', 'Oturma Alanı', 'Kahve Makinesi', 'Work Desk', 'Rain Shower'],
    featuresEn: ['Forest View', 'King Bed', 'Seating Area', 'Coffee Machine', 'Work Desk', 'Rain Shower'],
    price: 2800,
    maxGuests: 2,
    size: 55,
    images: ['/nature-deluxe-1.jpg', '/nature-deluxe-2.jpg'],
    category: 'deluxe'
  },
  {
    id: 'lake-view',
    name: 'Göl Manzarası',
    nameEn: 'Lake View',
    description: 'Göl manzaralı romantik oda. Özel veranda ve şömine ile unutulmaz bir konaklama deneyimi.',
    descriptionEn: 'Romantic room with lake view. Unforgettable accommodation experience with private veranda and fireplace.',
    features: ['Göl Manzarası', 'Veranda', 'Şömine', 'Lüks Banyo', 'Jakuzi', 'Mini Bar'],
    featuresEn: ['Lake View', 'Veranda', 'Fireplace', 'Luxury Bathroom', 'Jacuzzi', 'Mini Bar'],
    price: 3500,
    maxGuests: 2,
    size: 65,
    images: ['/lake-view-1.jpg', '/lake-view-2.jpg'],
    category: 'deluxe'
  },
  {
    id: 'floating-spa-suite',
    name: 'Yüzen Spa Süiti',
    nameEn: 'Floating Spa Suite',
    description: 'Yerçekimsiz spa deneyimi sunan özel tasarım süit. İmmersif rahatlama ve teknolojik yenilikler.',
    descriptionEn: 'Specially designed suite offering anti-gravity spa experience. Immersive relaxation and technological innovations.',
    features: ['Yüzen Spa', 'İmmersif Rahatlama', 'Akıllı Aydınlatma', 'Sound Therapy', 'Aromaterapi', 'Climate Control'],
    featuresEn: ['Floating Spa', 'Immersive Relaxation', 'Smart Lighting', 'Sound Therapy', 'Aromatherapy', 'Climate Control'],
    price: 5200,
    maxGuests: 2,
    size: 75,
    images: ['/floating-spa-1.jpg', '/floating-spa-2.jpg', '/floating-spa-3.jpg'],
    hasFloatingSpa: true,
    category: 'presidential'
  },
  {
    id: 'mountain-retreat',
    name: 'Dağ Kaçamağı',
    nameEn: 'Mountain Retreat',
    description: 'Dağ manzaralı sade ve şık oda. Doğal taş detaylar ve modern konforun mükemmel birleşimi.',
    descriptionEn: 'Simple and elegant room with mountain view. Perfect combination of natural stone details and modern comfort.',
    features: ['Dağ Manzarası', 'Taş Detaylar', 'Queen Yatak', 'Modern Banyo', 'Klima', 'Safe'],
    featuresEn: ['Mountain View', 'Stone Details', 'Queen Bed', 'Modern Bathroom', 'AC', 'Safe'],
    price: 2200,
    maxGuests: 2,
    size: 45,
    images: ['/mountain-retreat-1.jpg', '/mountain-retreat-2.jpg'],
    category: 'standard'
  },
  {
    id: 'river-valley',
    name: 'Nehir Vadisi',
    nameEn: 'River Valley',
    description: 'Nehir manzaralı ferah oda. Doğa ile iç içe huzurlu bir konaklama deneyimi.',
    descriptionEn: 'Spacious room with river view. A peaceful accommodation experience integrated with nature.',
    features: ['Nehir Manzarası', 'Private Terrace', 'Tea Station', 'Reading Nook', 'Eco-friendly', 'Organic Amenities'],
    featuresEn: ['River View', 'Private Terrace', 'Tea Station', 'Reading Nook', 'Eco-friendly', 'Organic Amenities'],
    price: 2600,
    maxGuests: 2,
    size: 50,
    images: ['/river-valley-1.jpg', '/river-valley-2.jpg'],
    category: 'deluxe'
  }
]

const amenityIcons: Record<string, React.ReactElement> = {
  'Yüzen Spa': <WandSparkles className="w-5 h-5" />,
  'Floating Spa': <WandSparkles className="w-5 h-5" />,
  'Akıllı Ev': <Shield className="w-5 h-5" />,
  'Smart Home': <Shield className="w-5 h-5" />,
  'Manzaralı Balkon': <Trees className="w-5 h-5" />,
  'Mountain View Balcony': <Trees className="w-5 h-5" />,
  'Orman Manzarası': <Trees className="w-5 h-5" />,
  'Forest View': <Trees className="w-5 h-5" />,
  'Göl Manzarası': <Waves className="w-5 h-5" />,
  'Lake View': <Waves className="w-5 h-5" />,
  'Nehir Manzarası': <Waves className="w-5 h-5" />,
  'River View': <Waves className="w-5 h-5" />,
  'Dağ Manzarası': <Trees className="w-5 h-5" />,
  'Mountain View': <Trees className="w-5 h-5" />,
  'King Yatak': <Star className="w-5 h-5" />,
  'King Bed': <Star className="w-5 h-5" />,
  'Queen Yatak': <Star className="w-5 h-5" />,
  'Queen Bed': <Star className="w-5 h-5" />,
  'Lüks Banyo': <Bath className="w-5 h-5" />,
  'Luxury Bathroom': <Bath className="w-5 h-5" />,
  'Jakuzi': <Bath className="w-5 h-5" />,
  'Jacuzzi': <Bath className="w-5 h-5" />,
  'Klima': <Wind className="w-5 h-5" />,
  'AC': <Wind className="w-5 h-5" />,
  'Mini Bar': <Coffee className="w-5 h-5" />,
  'Kahve Makinesi': <Coffee className="w-5 h-5" />,
  'Coffee Machine': <Coffee className="w-5 h-5" />,
  'Şömine': <Star className="w-5 h-5" />,
  'Fireplace': <Star className="w-5 h-5" />,
  'Veranda': <Trees className="w-5 h-5" />,
  'Private Terrace': <Trees className="w-5 h-5" />,
  'Oturma Alanı': <Users className="w-5 h-5" />,
  'Seating Area': <Users className="w-5 h-5" />,
  'Work Desk': <Users className="w-5 h-5" />,
  'Rain Shower': <Bath className="w-5 h-5" />,
  'Safe': <Shield className="w-5 h-5" />,
  'İmmersif Rahatlama': <WandSparkles className="w-5 h-5" />,
  'Immersive Relaxation': <WandSparkles className="w-5 h-5" />,
  'Akıllı Aydınlatma': <Star className="w-5 h-5" />,
  'Smart Lighting': <Star className="w-5 h-5" />,
  'Sound Therapy': <WandSparkles className="w-5 h-5" />,
  'Aromaterapi': <WandSparkles className="w-5 h-5" />,
  'Aromatherapy': <WandSparkles className="w-5 h-5" />,
  'Climate Control': <Wind className="w-5 h-5" />,
  'Private Butler': <Users className="w-5 h-5" />,
  'Taş Detaylar': <Trees className="w-5 h-5" />,
  'Stone Details': <Trees className="w-5 h-5" />,
  'Modern Banyo': <Bath className="w-5 h-5" />,
  'Modern Bathroom': <Bath className="w-5 h-5" />,
  'Tea Station': <Coffee className="w-5 h-5" />,
  'Reading Nook': <Users className="w-5 h-5" />,
  'Eco-friendly': <Trees className="w-5 h-5" />,
  'Organic Amenities': <Coffee className="w-5 h-5" />
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function RoomsPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-stone-800 to-stone-900">
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1 
            className="font-serif text-5xl md:text-6xl font-bold text-shadow mb-6"
            {...fadeInUp}
          >
            {t('Lüks Odalarımız', 'Our Luxury Rooms')}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-light max-w-3xl mx-auto text-shadow"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {t(
              'Her biri kendine özgü karaktere sahip lüks odalarımızda rüya gibi bir konaklama deneyimi yaşayın.',
              'Experience a dream-like stay in our luxury rooms, each with its own unique character.'
            )}
          </motion.p>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-80 bg-gradient-to-br from-primary-500 to-stone-600 overflow-hidden">
                  {room.hasFloatingSpa && (
                    <div className="absolute top-4 right-4 z-10 bg-gold-500 text-stone-900 px-4 py-2 rounded-full text-sm font-semibold floating">
                      {t('Yüzen Spa', 'Floating Spa')}
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl font-bold">{room.category === 'presidential' ? '👑' : room.category === 'deluxe' ? '💎' : '🌿'}</span>
                      </div>
                      <p className="text-xl font-serif">{t(room.name, room.nameEn)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                        {t(room.name, room.nameEn)}
                      </h3>
                      <p className="text-stone-600 mb-4">
                        {t(room.description, room.descriptionEn)}
                      </p>
                    </div>
                    <div className="text-right ml-4">
                      <span className="text-3xl font-bold text-primary-600">₺{room.price}</span>
                      <span className="text-stone-500 text-sm block">/{t('gece', 'night')}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 text-stone-600">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{room.maxGuests} {t('Misafir', 'Guest')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-stone-600">
                      <Square className="w-4 h-4" />
                      <span className="text-sm">{room.size}m²</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-stone-900 mb-3">{t('Özellikler', 'Features')}</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {room.features.slice(0, 6).map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-stone-600 text-sm">
                          <div className="w-5 h-5 text-primary-600 flex items-center justify-center">
                            {amenityIcons[feature] || <Star className="w-4 h-4" />}
                          </div>
                          <span>{t(feature, room.featuresEn[idx])}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Link
                      href={`/booking?room=${room.id}`}
                      className="btn-primary flex-1 text-center"
                    >
                      {t('Rezervasyon Yap', 'Book Now')}
                    </Link>
                    <Link
                      href={`/rooms/${room.id}`}
                      className="flex items-center justify-center px-6 py-3 border border-stone-300 rounded-md text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      <span>{t('Detaylar', 'Details')}</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Room Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-4">
              {t('Oda Kategorileri', 'Room Categories')}
            </h2>
            <p className="text-stone-600 text-lg max-w-2xl mx-auto">
              {t(
                'Her bütçeye ve zevke uygun lüks konaklama seçenekleri.',
                'Luxury accommodation options suitable for every budget and taste.'
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-center p-8 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-2">
                {t('Standart Odalar', 'Standard Rooms')}
              </h3>
              <p className="text-stone-600 mb-4">
                {t(
                  'Doğa ile iç içe, konforlu ve şık odalar.',
                  'Comfortable and elegant rooms integrated with nature.'
                )}
              </p>
              <p className="text-2xl font-bold text-primary-600">₺2,200+</p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="text-center p-8 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors"
            >
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-2">
                {t('Deluxe Odalar', 'Deluxe Rooms')}
              </h3>
              <p className="text-stone-600 mb-4">
                {t(
                  'Geniş alanlar, özel manzaralar ve premium özellikler.',
                  'Spacious areas, special views, and premium features.'
                )}
              </p>
              <p className="text-2xl font-bold text-primary-600">₺2,800+</p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.6 }}
              className="text-center p-8 rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors"
            >
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👑</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-2">
                {t('Presidential Süitler', 'Presidential Suites')}
              </h3>
              <p className="text-stone-600 mb-4">
                {t(
                  'Yüzen spa, akıllı ev teknolojileri ve özel butler hizmeti.',
                  'Floating spa, smart home technologies, and private butler service.'
                )}
              </p>
              <p className="text-2xl font-bold text-primary-600">₺4,500+</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
              {t('Mükemmel Odanızı Bulun', 'Find Your Perfect Room')}
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              {t(
                'Royal Gazioğlu\'nun benzersiz odalarında unutulmaz bir konaklama deneyimi için rezervasyonunuzu yapın.',
                'Make your reservation for an unforgettable accommodation experience in Royal Gazioğlu\'s unique rooms.'
              )}
            </p>
            <Link href="/booking" className="btn-gold bg-gold-500 hover:bg-gold-600 text-stone-900">
              {t('Şimdi Rezervasyon Yap', 'Book Now')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

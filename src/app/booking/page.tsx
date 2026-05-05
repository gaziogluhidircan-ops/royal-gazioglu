'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, Users, Search, Clock, MapPin, Star, Check, X, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Room, BookingData } from '@/types'
import { cn, formatDate, formatPrice } from '@/lib/utils'

// Sample rooms data for booking
const availableRooms: Room[] = [
  {
    id: 'royal-suite',
    name: 'Kral Süiti',
    nameEn: 'Royal Suite',
    description: 'Dağ manzaralı özel jakuzili lüks süit',
    descriptionEn: 'Luxury suite with mountain view and private jacuzzi',
    features: ['Yüzen Spa', 'Akıllı Ev', 'Manzaralı Balkon'],
    featuresEn: ['Floating Spa', 'Smart Home', 'Mountain View Balcony'],
    price: 4500,
    maxGuests: 2,
    size: 85,
    images: ['/royal-suite-1.jpg'],
    hasFloatingSpa: true,
    category: 'presidential'
  },
  {
    id: 'nature-deluxe',
    name: 'Doğa Deluxe',
    nameEn: 'Nature Deluxe',
    description: 'Orman manzaralı geniş oda',
    descriptionEn: 'Spacious room with forest view',
    features: ['Orman Manzarası', 'King Yatak', 'Oturma Alanı'],
    featuresEn: ['Forest View', 'King Bed', 'Seating Area'],
    price: 2800,
    maxGuests: 2,
    size: 55,
    images: ['/nature-deluxe-1.jpg'],
    category: 'deluxe'
  },
  {
    id: 'lake-view',
    name: 'Göl Manzarası',
    nameEn: 'Lake View',
    description: 'Göl manzaralı romantik oda',
    descriptionEn: 'Romantic room with lake view',
    features: ['Göl Manzarası', 'Veranda', 'Şömine'],
    featuresEn: ['Lake View', 'Veranda', 'Fireplace'],
    price: 3500,
    maxGuests: 2,
    size: 65,
    images: ['/lake-view-1.jpg'],
    category: 'deluxe'
  }
]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

export default function BookingPage() {
  const { t } = useLanguage()
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: new Date(),
    checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    guests: 2,
  })
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [showRoomDetails, setShowRoomDetails] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSearching, setIsSearching] = useState(false)

  // Handle URL params for pre-selected room
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const roomId = urlParams.get('room')
    if (roomId) {
      const room = availableRooms.find(r => r.id === roomId)
      if (room) {
        setSelectedRoom(room)
        setCurrentStep(2)
      }
    }
  }, [])

  const handleSearch = () => {
    setIsSearching(true)
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
      setCurrentStep(2)
    }, 1500)
  }

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room)
    setShowRoomDetails(true)
  }

  const handleBookingConfirm = () => {
    setCurrentStep(3)
  }

  const calculateTotal = () => {
    if (!selectedRoom || !bookingData.checkIn || !bookingData.checkOut) return 0
    
    const nights = Math.ceil((bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) / (1000 * 60 * 60 * 24))
    return selectedRoom.price * nights
  }

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0
    return Math.ceil((bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) / (1000 * 60 * 60 * 24))
  }

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
            {t('Rezervasyon', 'Booking')}
          </motion.h1>
          <motion.p 
            className="text-xl font-light max-w-2xl mx-auto text-shadow"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {t(
              'Mükemmel konaklamanız için hızlı ve kolay rezervasyon.',
              'Fast and easy reservation for your perfect stay.'
            )}
          </motion.p>
        </div>
      </section>

      {/* Booking Progress */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors",
                  currentStep >= step ? "bg-primary-600 text-white" : "bg-stone-200 text-stone-600"
                )}>
                  {currentStep > step ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={cn(
                    "flex-1 h-1 mx-4 transition-colors",
                    currentStep > step ? "bg-primary-600" : "bg-stone-200"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <span className={cn(currentStep >= 1 ? "text-primary-600 font-semibold" : "text-stone-500")}>
              {t('Tarih Seçimi', 'Select Dates')}
            </span>
            <span className={cn(currentStep >= 2 ? "text-primary-600 font-semibold" : "text-stone-500")}>
              {t('Oda Seçimi', 'Select Room')}
            </span>
            <span className={cn(currentStep >= 3 ? "text-primary-600 font-semibold" : "text-stone-500")}>
              {t('Onay', 'Confirmation')}
            </span>
          </div>
        </div>
      </section>

      {/* Step 1: Date Selection */}
      {currentStep === 1 && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8">
                {t('Konaklama Tarihlerinizi Seçin', 'Select Your Stay Dates')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {t('Giriş Tarihi', 'Check-in Date')}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={bookingData.checkIn.toISOString().split('T')[0]}
                      onChange={(e) => setBookingData({...bookingData, checkIn: new Date(e.target.value)})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-stone-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {t('Çıkış Tarihi', 'Check-out Date')}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={bookingData.checkOut.toISOString().split('T')[0]}
                      onChange={(e) => setBookingData({...bookingData, checkOut: new Date(e.target.value)})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      min={bookingData.checkIn.toISOString().split('T')[0]}
                    />
                    <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-stone-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    {t('Misafir Sayısı', 'Number of Guests')}
                  </label>
                  <div className="relative">
                    <select
                      value={bookingData.guests}
                      onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                    >
                      <option value={1}>1 {t('Misafir', 'Guest')}</option>
                      <option value={2}>2 {t('Misafir', 'Guests')}</option>
                      <option value={3}>3 {t('Misafir', 'Guests')}</option>
                      <option value={4}>4 {t('Misafir', 'Guests')}</option>
                    </select>
                    <Users className="absolute right-3 top-3.5 w-5 h-5 text-stone-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-stone-600">{t('Konaklama Süresi', 'Stay Duration')}</p>
                    <p className="text-lg font-semibold text-stone-900">
                      {calculateNights()} {t('gece', 'night')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-stone-600">{t('Tarih Aralığı', 'Date Range')}</p>
                    <p className="text-lg font-semibold text-stone-900">
                      {formatDate(bookingData.checkIn)} - {formatDate(bookingData.checkOut)}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSearching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('Aranıyor...', 'Searching...')}</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>{t('Müsait Odaları Ara', 'Search Available Rooms')}</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Step 2: Room Selection */}
      {currentStep === 2 && (
        <section className="py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="mb-8">
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
                {t('Müsait Odalar', 'Available Rooms')}
              </h2>
              <p className="text-stone-600">
                {t(
                  `${formatDate(bookingData.checkIn)} - ${formatDate(bookingData.checkOut)} tarihleri için ${calculateNights()} gecelik müsait odalar`,
                  `Available rooms for ${calculateNights()} nights from ${formatDate(bookingData.checkIn)} to ${formatDate(bookingData.checkOut)}`
                )}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableRooms.map((room, index) => (
                <motion.div
                  key={room.id}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300",
                    selectedRoom?.id === room.id ? "ring-2 ring-primary-600 shadow-xl" : "hover:shadow-xl"
                  )}
                  onClick={() => handleRoomSelect(room)}
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary-500 to-stone-600">
                    {room.hasFloatingSpa && (
                      <div className="absolute top-4 right-4 bg-gold-500 text-stone-900 px-3 py-1 rounded-full text-xs font-semibold">
                        {t('Yüzen Spa', 'Floating Spa')}
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-2">
                          <span className="text-2xl">{room.category === 'presidential' ? '👑' : '💎'}</span>
                        </div>
                        <p className="text-lg font-serif">{t(room.name, room.nameEn)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                          {t(room.name, room.nameEn)}
                        </h3>
                        <p className="text-stone-600 text-sm mb-2">
                          {t(room.description, room.descriptionEn)}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-stone-500">
                          <span>{room.size}m²</span>
                          <span>•</span>
                          <span>{room.maxGuests} {t('Misafir', 'Guests')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.features.slice(0, 3).map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded-full"
                        >
                          {t(feature, room.featuresEn[idx])}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-2xl font-bold text-primary-600">{formatPrice(room.price)}</span>
                        <span className="text-stone-500 text-sm">/{t('gece', 'night')}</span>
                      </div>
                      <div className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                        selectedRoom?.id === room.id ? "border-primary-600 bg-primary-600" : "border-stone-300"
                      )}>
                        {selectedRoom?.id === room.id && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedRoom && (
              <motion.div
                {...fadeInUp}
                className="mt-8 bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                      {t('Seçilen Oda', 'Selected Room')}: {t(selectedRoom.name, selectedRoom.nameEn)}
                    </h3>
                    <p className="text-stone-600">{t(selectedRoom.description, selectedRoom.descriptionEn)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-stone-600">{t('Toplam Tutar', 'Total Amount')}</p>
                    <p className="text-3xl font-bold text-primary-600">{formatPrice(calculateTotal())}</p>
                    <p className="text-sm text-stone-500">{calculateNights()} {t('gece', 'nights')}</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors"
                  >
                    {t('Önceki Adım', 'Previous Step')}
                  </button>
                  <button
                    onClick={handleBookingConfirm}
                    className="flex-1 btn-primary"
                  >
                    {t('Rezervasyonu Onayla', 'Confirm Booking')}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Step 3: Confirmation */}
      {currentStep === 3 && selectedRoom && (
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
                  {t('Rezervasyonunuz Hazır!', 'Your Reservation is Ready!')}
                </h2>
                <p className="text-stone-600">
                  {t(
                    'Rezervasyon bilgilerinizi kontrol edip onaylamak için son adım.',
                    'Final step to review and confirm your reservation details.'
                  )}
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-stone-50 rounded-lg p-6">
                  <h3 className="font-semibold text-stone-900 mb-4">{t('Rezervasyon Detayları', 'Reservation Details')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-stone-600">{t('Oda', 'Room')}</p>
                      <p className="font-semibold text-stone-900">{t(selectedRoom.name, selectedRoom.nameEn)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-600">{t('Misafir Sayısı', 'Number of Guests')}</p>
                      <p className="font-semibold text-stone-900">{bookingData.guests} {t('Misafir', 'Guests')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-600">{t('Giriş', 'Check-in')}</p>
                      <p className="font-semibold text-stone-900">{formatDate(bookingData.checkIn)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-600">{t('Çıkış', 'Check-out')}</p>
                      <p className="font-semibold text-stone-900">{formatDate(bookingData.checkOut)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-lg p-6">
                  <h3 className="font-semibold text-stone-900 mb-4">{t('Özet', 'Summary')}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-stone-600">{t('Oda Fiyatı', 'Room Rate')}</span>
                      <span className="font-semibold">{formatPrice(selectedRoom.price)} x {calculateNights()} {t('gece', 'nights')}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-primary-600 pt-2 border-t">
                      <span>{t('Toplam', 'Total')}</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    {t(
                      'Bu bir demo rezervasyondur. Gerçek rezervasyon için otel ile iletişime geçin.',
                      'This is a demo reservation. For actual booking, please contact the hotel.'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-3 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  {t('Geri Dön', 'Go Back')}
                </button>
                <button
                  onClick={() => {
                    // In a real app, this would submit to backend
                    alert(t('Rezervasyonunuz alınmıştır! Teşekkür ederiz.', 'Your reservation has been received! Thank you.'))
                    setCurrentStep(1)
                    setSelectedRoom(null)
                  }}
                  className="flex-1 btn-primary"
                >
                  {t('Rezervasyonu Tamamla', 'Complete Reservation')}
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Room Details Modal */}
      <AnimatePresence>
        {showRoomDetails && selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRoomDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 bg-gradient-to-br from-primary-500 to-stone-600">
                <button
                  onClick={() => setShowRoomDetails(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">{selectedRoom.category === 'presidential' ? '👑' : '💎'}</span>
                    </div>
                    <p className="text-2xl font-serif">{t(selectedRoom.name, selectedRoom.nameEn)}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-4">
                  {t(selectedRoom.name, selectedRoom.nameEn)}
                </h3>
                <p className="text-stone-600 mb-6">
                  {t(selectedRoom.description, selectedRoom.descriptionEn)}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-stone-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{selectedRoom.maxGuests} {t('Misafir', 'Guest')}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-stone-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{selectedRoom.size}m²</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-stone-900 mb-3">{t('Özellikler', 'Features')}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRoom.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-stone-600 text-sm">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>{t(feature, selectedRoom.featuresEn[idx])}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">{formatPrice(selectedRoom.price)}</span>
                    <span className="text-stone-500 text-sm">/{t('gece', 'night')}</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowRoomDetails(false)
                      // Room is already selected, just close modal
                    }}
                    className="btn-primary"
                  >
                    {t('Seçili Oda', 'Selected Room')}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

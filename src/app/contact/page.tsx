'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter, MessageSquare } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ContactInfo } from '@/types'
import { cn } from '@/lib/utils'

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

export default function ContactPage() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }, 1500)
  }

  const handleInputChange = (field: keyof ContactInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
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
            {t('İletişim', 'Contact')}
          </motion.h1>
          <motion.p 
            className="text-xl font-light max-w-2xl mx-auto text-shadow"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {t(
              'Royal Gazioğlu\'na ulaşın ve unutulmaz deneyiminizi planlayın.',
              'Reach Royal Gazioğlu and plan your unforgettable experience.'
            )}
          </motion.p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">
                {t('Adres', 'Address')}
              </h3>
              <p className="text-stone-600">
                Royal Gazioğlu<br />
                Tunceli, Türkiye<br />
                {t('Doğa kalbinde', 'In the heart of nature')}
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">
                {t('Telefon', 'Phone')}
              </h3>
              <p className="text-stone-600">
                +90 555 123 45 67<br />
                +90 555 987 65 43
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">
                {t('E-posta', 'Email')}
              </h3>
              <p className="text-stone-600">
                info@royalgazioglu.com<br />
                reservations@royalgazioglu.com
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">
                {t('Çalışma Saatleri', 'Working Hours')}
              </h3>
              <p className="text-stone-600">
                {t('Her Gün', 'Every Day')}<br />
                09:00 - 21:00
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div {...fadeInUp}>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-8">
                {t('Bize Ulaşın', 'Get in Touch')}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                      {t('Adınız Soyadınız', 'Your Name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={t('Adınızı girin', 'Enter your name')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-2">
                      {t('E-posta Adresiniz', 'Your Email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder={t('E-posta adresinizi girin', 'Enter your email')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                    {t('Telefon Numaranız', 'Your Phone Number')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder={t('Telefon numaranızı girin', 'Enter your phone number')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-2">
                    {t('Mesajınız', 'Your Message')}
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder={t('Mesajınızı buraya yazın...', 'Write your message here...')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('Gönderiliyor...', 'Sending...')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{t('Mesajı Gönder', 'Send Message')}</span>
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg"
                  >
                    {t('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.', 'Your message was sent successfully! We will get back to you shortly.')}
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg"
                  >
                    {t('Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.', 'An error occurred while sending the message. Please try again.')}
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div {...fadeInUp} className="space-y-8">
              {/* Map Placeholder */}
              <div className="bg-stone-200 rounded-xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-stone-400 mx-auto mb-4" />
                  <p className="text-stone-600 font-medium">
                    {t('Harita Yükleniyor', 'Map Loading')}
                  </p>
                  <p className="text-stone-500 text-sm mt-2">
                    Tunceli, Türkiye
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-4">
                  {t('Sosyal Medya', 'Social Media')}
                </h3>
                <p className="text-stone-600 mb-6">
                  {t(
                    'Bizi sosyal medyada takip ederek güncel haberlerden ve özel tekliflerden haberdar olun.',
                    'Follow us on social media to stay updated with news and special offers.'
                  )}
                </p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gold-500 text-stone-900 rounded-full flex items-center justify-center hover:bg-gold-600 transition-colors"
                  >
                    <MessageSquare className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-stone-100 rounded-xl p-6">
                <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">
                  {t('Hızlı Bilgi', 'Quick Info')}
                </h3>
                <div className="space-y-3 text-stone-600">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      {t(
                        'Rezervasyon için en az 24 saat önceden bildirim yapmanız tavsiye edilir.',
                        'It is recommended to notify at least 24 hours in advance for reservations.'
                      )}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      {t(
                        'Transfer hizmetimizden faydalanmak için 48 saat önce rezervasyon yapın.',
                        'Make a reservation 48 hours in advance to benefit from our transfer service.'
                      )}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p>
                      {t(
                        'Özel etkinlik ve organizasyonlar için bizimle iletişime geçin.',
                        'Contact us for special events and organizations.'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-stone-900 mb-4">
              {t('Sıkça Sorulan Sorular', 'Frequently Asked Questions')}
            </h2>
            <p className="text-stone-600">
              {t(
                'Royal Gazioğlu hakkında merak edilenler',
                'What you wonder about Royal Gazioğlu'
              )}
            </p>
          </motion.div>

          <motion.div 
            className="space-y-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              {
                q: t('Otelinize nasıl ulaşabilirim?', 'How can I reach your hotel?'),
                a: t('Otelimize özel araçla, transfer hizmetimizle veya toplu taşıma araçlarıyla kolayca ulaşabilirsiniz. Detaylı bilgi için rezervasyon ekibimizle iletişime geçin.', 'You can easily reach our hotel by private car, our transfer service, or public transportation. Contact our reservation team for detailed information.')
              },
              {
                q: t('Otopark hizmetiniz var mı?', 'Do you have parking service?'),
                a: t('Evet, konuklarımız için ücretsiz otopark hizmetimiz mevcuttur.', 'Yes, we have free parking service available for our guests.')
              },
              {
                q: t('Evcil hayvan kabul ediyor musunuz?', 'Do you accept pets?'),
                a: t('Evcil hayvan politikamız hakkında bilgi almak için lütfen önceden iletişime geçin.', 'Please contact us in advance for information about our pet policy.')
              },
              {
                q: t('Check-in ve check-out saatleri nedir?', 'What are the check-in and check-out times?'),
                a: t('Check-in saati 14:00, check-out saati 11:00\'dir. Özel talepler için lütfen iletişime geçin.', 'Check-in time is 14:00, check-out time is 11:00. Please contact us for special requests.')
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-stone-50 rounded-lg p-6"
              >
                <h4 className="font-semibold text-stone-900 mb-2">{faq.q}</h4>
                <p className="text-stone-600">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

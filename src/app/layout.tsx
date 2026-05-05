import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: {
    default: 'Royal Gazioğlu | Lüks Dağ Oteli & Yüzen Spa',
    template: '%s | Royal Gazioğlu'
  },
  description: 'Royal Gazioğlu - Tunceli Halvori Köyü\'nde modern taş mimari, yüzen spa, yüzme havuzu ve doğa ile bütünleşmiş lüks otel. Wellness, spa ve benzersiz doğa deneyimleri.',
  keywords: [
    'luxury hotel', 'mountain retreat', 'Tunceli', 'Dersim', 'Royal Gazioğlu', 
    'boutique hotel', 'nature luxury', 'yüzen spa', 'floating spa', 'wellness hotel',
    'taş mimari', 'stone architecture', 'doğa oteli', 'mountain wellness', 'spa hotel',
    'luxury retreat', 'nature hotel', 'boutique accommodation', 'premium hotel'
  ],
  authors: [{ name: 'Royal Gazioğlu' }],
  creator: 'Royal Gazioğlu',
  publisher: 'Royal Gazioğlu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://royalgazioglu.com'),
  alternates: {
    canonical: 'https://royalgazioglu.com',
    languages: {
      'tr': 'https://royalgazioglu.com/tr',
      'en': 'https://royalgazioglu.com/en',
    },
  },
  openGraph: {
    title: 'Royal Gazioğlu | Lüks Dağ Oteli & Yüzen Spa',
    description: 'Doğa ile bütünleşmiş lüks dağ oteli, yüzen spa ve wellness deneyimleri',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Royal Gazioğlu',
    url: 'https://royalgazioglu.com',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Royal Gazioğlu Hotel - Luxury Mountain Retreat',
      },
      {
        url: '/og-image-2.jpg',
        width: 1200,
        height: 630,
        alt: 'Royal Gazioğlu Floating Spa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal Gazioğlu | Lüks Dağ Oteli & Yüzen Spa',
    description: 'Doğa ile bütünleşmiş lüks dağ oteli, yüzen spa ve wellness deneyimleri',
    images: ['/og-image.jpg'],
    creator: '@royalgazioglu',
    site: '@royalgazioglu',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-stone-50">
        <LanguageProvider>
          <Header />
          <main className="relative">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}

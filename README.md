# Royal Gazioğlu - Luxury Mountain Hotel

A modern, luxurious hotel website built with Next.js 14, featuring multi-language support, stunning animations, and a premium user experience.

## 🏨 Project Overview

Royal Gazioğlu is a luxury mountain hotel located in Tunceli, Turkey. This website showcases the hotel's premium features including:
- Modern stone architecture
- Floating spa experiences
- Luxury rooms and suites
- Wellness and nature activities
- Multi-language support (Turkish/English)

## ✨ Features

### 🎨 Design & UX
- Modern, clean design with luxury aesthetics
- Responsive layout for all devices
- Smooth animations and micro-interactions
- Premium user experience with hover effects
- Parallax scrolling and magnetic buttons

### 🌐 Multi-Language Support
- Turkish and English language options
- Dynamic content switching
- SEO-friendly URL structure for both languages

### 📱 Pages
- **Homepage**: Hero section with smooth scroll navigation
- **Rooms**: 6 unique luxury rooms with floating spa features
- **Booking**: Multi-step booking system with date/room selection
- **Gallery**: Grid layout with hover effects and modal views
- **Blog**: Content management with categories and search
- **Contact**: Contact form, location map, and FAQ

### 🚀 Technical Features
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- SEO optimization with metadata
- Vercel-ready deployment

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm or yarn
- Git

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd royal-gazioglu
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Optional: Add your environment variables here
# NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📁 Project Structure

```
royal-gazioglu/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (pages)/        # Route groups
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Homepage
│   ├── components/         # Reusable components
│   │   ├── ui/            # UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ...
│   ├── contexts/          # React contexts
│   │   └── LanguageContext.tsx
│   ├── lib/               # Utility functions
│   │   └── utils.ts
│   └── types/             # TypeScript type definitions
│       └── index.ts
├── public/                # Static assets
│   ├── images/
│   ├── robots.txt
│   └── favicon.ico
├── package.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## 🎨 Customization

### Colors
The design uses a sophisticated color palette:
- **Primary**: Stone/earth tones (`stone-600`, `stone-900`)
- **Accent**: Gold (`gold-500`, `gold-600`)
- **Background**: Light stone (`stone-50`)
- **Text**: Dark stone (`stone-900`)

### Fonts
- **Inter**: Clean, modern sans-serif for body text
- **Playfair Display**: Elegant serif for headings

### Animations
- Smooth page transitions
- Hover effects on interactive elements
- Parallax scrolling for visual depth
- Loading states and micro-interactions

## 🌍 Multi-Language Support

The website supports Turkish and English languages. To add new languages:

1. Update the `LanguageContext.tsx` with new language options
2. Add translations to component text using the `t()` function
3. Update metadata for SEO in different languages

Example usage:
```tsx
import { useLanguage } from '@/contexts/LanguageContext'

const { t } = useLanguage()

<h1>{t('Hoş Geldiniz', 'Welcome')}</h1>
```

## 📱 SEO Optimization

The website is optimized for search engines with:
- Comprehensive metadata
- Open Graph tags for social sharing
- Twitter Card support
- XML sitemap
- Robots.txt configuration
- Structured data markup

### Meta Tags
Each page can have custom metadata by exporting a `metadata` object:

```tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
  openGraph: {
    title: 'Social Media Title',
    description: 'Social Media Description',
  },
}
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Configure Custom Domain**
   - Add your custom domain in Vercel dashboard
   - Update DNS settings as instructed

### Manual Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Start Production Server**
   ```bash
   npm start
   ```

### Environment Variables for Production

Set these in your hosting platform:
```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🔧 Configuration

### Tailwind CSS
Customize the design system in `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Custom primary colors
        },
        gold: {
          // Custom gold colors
        }
      }
    }
  }
}
```

### Next.js Configuration
Update `next.config.js` for additional optimization:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-domain.com'],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
```

## 📊 Performance Optimization

The website includes several performance optimizations:
- Image optimization with Next.js Image component
- Code splitting with dynamic imports
- Lazy loading for heavy components
- Minimal CSS with Tailwind's purging
- SEO-friendly routing

### Lighthouse Scores
Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 100

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, please contact:
- Email: info@royalgazioglu.com
- Phone: +90 555 123 45 67

## 🌟 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library

---

**Royal Gazioğlu** - Where Luxury Meets Nature 🏔️✨

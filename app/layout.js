import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/use-toast';
import Navbar from './Navbar';
import Footer from './Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://tedxateneodemanilau.com'),
  title:
    'TEDxAteneodeManilaU: Labyrinthine | Navigating Complexity Through Ideas Worth Spreading',
  description:
    'Join TEDxAteneodeManilaU for Labyrinthine, where we explore the intricate paths of innovation, creativity, and transformation. Experience talks that challenge perspectives and inspire change.',
  keywords:
    'TEDx, TEDxAteneodeManilaU, TedXAteneo, TedXADMU, ADMU, Ateneo de Manila University, Labyrinthine, TED Talks, Innovation, Ideas Worth Spreading, Manila, Philippines, Conference, Event, April 30 2025, Leong Hall, Ateneo, Katipunan, Loyola Heights, TEDxManila, TEDxPhilippines, Student Conference, University Event, Ateneo Event, TEDx Conference, Public Speaking, Knowledge Sharing, Intellectual Discourse, Academic Conference, University Talks, Student Organization, Ateneo Organizations, TEDx Community, Philippine TEDx',
  authors: [{ name: 'TEDxAteneodeManilaU Team' }],
  creator: 'TEDxAteneodeManilaU',
  publisher: 'TEDxAteneodeManilaU',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tedxateneodemanilau.com',
    siteName: 'TEDxAteneodeManilaU',
    title:
      'TEDxAteneodeManilaU: Labyrinthine | Navigating Complexity Through Ideas Worth Spreading',
    description:
      'Join TEDxAteneodeManilaU for Labyrinthine, where we explore the intricate paths of innovation, creativity, and transformation. Experience talks that challenge perspectives and inspire change.',
    images: [
      {
        url: '/tedx-logo.png',
        width: 1200,
        height: 630,
        alt: 'TEDxAteneodeManilaU Labyrinthine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'TEDxAteneodeManilaU: Labyrinthine | Navigating Complexity Through Ideas Worth Spreading',
    description:
      'Join TEDxAteneodeManilaU for Labyrinthine, where we explore the intricate paths of innovation, creativity, and transformation. Experience talks that challenge perspectives and inspire change.',
    images: ['/tedx-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://tedxateneodemanilau.com',
  },
  verification: {
    google: 'your-google-site-verification',
  },
  category: 'event',
  classification: 'public',
  referrer: 'origin-when-cross-origin',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "68b74fefacd54b36984ff59565cd4010"}'
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}

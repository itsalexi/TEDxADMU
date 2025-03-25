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
    'TEDxAteneoDeManilaU: Labyrinthine | Navigating Complexity Through Ideas Worth Spreading',
  description:
    'Join TEDxAteneoDeManilaU for Labyrinthine, where we explore the intricate paths of innovation, creativity, and transformation. Experience talks that challenge perspectives and inspire change.',
  keywords:
    'TEDx, TEDxAteneoDeManilaU, Labyrinthine, Ateneo de Manila University, TED Talks, Innovation, Ideas Worth Spreading',
  authors: [{ name: 'TEDxAteneoDeManilaU Team' }],
  creator: 'TEDxAteneoDeManilaU',
  publisher: 'TEDxAteneoDeManilaU',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tedxateneodemanilau.com',
    siteName: 'TEDxAteneoDeManilaU',
    title:
      'TEDxAteneoDeManilaU: Labyrinthine | Navigating Complexity Through Ideas Worth Spreading',
    description:
      'Join TEDxAteneoDeManilaU for Labyrinthine, where we explore the intricate paths of innovation, creativity, and transformation. Experience talks that challenge perspectives and inspire change.',
    images: [
      {
        url: '/tedx-logo.png',
        width: 1200,
        height: 630,
        alt: 'TEDxAteneoDeManilaU Labyrinthine',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'TEDxAteneoDeManilaU: Labyrinthine | Navigating Complexity Through Ideas Worth Spreading',
    description:
      'Join TEDxAteneoDeManilaU for Labyrinthine, where we explore the intricate paths of innovation, creativity, and transformation. Experience talks that challenge perspectives and inspire change.',
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
  icons: {
    icon: '/favicon.ico',
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

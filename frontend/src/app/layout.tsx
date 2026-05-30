import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Premium Bamboo Tissue Box | Small Details, Premium Spaces.',
  description: 'Elevate your home, office, and car with our elegant minimalist tissue box, crafted from premium organic bamboo. Reserve your unit today.',
  keywords: 'bamboo tissue box, luxury home decor, premium car interior accessories, minimalist tissue box holder, eco friendly tissue box, premium office accessories',
  openGraph: {
    title: 'Premium Bamboo Tissue Box',
    description: 'Elevate your space. Elegant minimalist design crafted from sustainable premium bamboo.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

import './globals.css';

export const metadata = {
  title: 'Quote Machine',
  description: 'A random quote generator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


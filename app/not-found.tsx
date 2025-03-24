import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">Halaman Tidak Ditemukan</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Maaf, halaman yang Anda cari tidak dapat ditemukan.
      </p>
      <Link 
        href="/" 
        className="px-6 py-2 mt-8 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}

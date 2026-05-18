export default function Hero() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-16 mx-auto text-center lg:py-24 lg:px-12">

          {/* Badge */}
          <span className="inline-flex items-center px-4 py-1 text-sm font-medium text-white bg-indigo-600 rounded-full mb-7">
            📚 Welcome to Nawbooks
          </span>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Temukan Buku Favoritmu di sini
          </h1>

          {/* Description */}
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Jelajahi berbagai koleksi buku terbaik dari berbagai genre dan author favoritmu.
            Mulai dari novel, teknologi, bisnis, hingga pengembangan diri.
          </p>

          {/* Button */}
          <div className="flex flex-col mb-10 space-y-4 lg:mb-16 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="/books"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
            >
              Lihat Buku
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
            >
              Tentang Kami
            </a>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3">

            <div className="p-6 bg-gray-100 rounded-xl dark:bg-gray-800">
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                📖 Banyak Pilihan Buku
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Ribuan koleksi buku dari berbagai kategori terbaik.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-xl dark:bg-gray-800">
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                🚚 Pengiriman Cepat
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Pesanan diproses dengan cepat dan aman sampai tujuan.
              </p>
            </div>

            <div className="p-6 bg-gray-100 rounded-xl dark:bg-gray-800">
              <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                💳 Pembayaran Mudah
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Mendukung berbagai metode pembayaran online.
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
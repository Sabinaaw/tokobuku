export default function Testimonial() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-16 mx-auto text-center lg:px-6">
          <div className="max-w-screen-sm mx-auto mb-12">
            <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Apa Kata Pelanggan?
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Beberapa review dari pelanggan yang telah membeli buku di BookStore.
            </p>
          </div>

          {/* Testimonials */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="p-6 shadow bg-gray-50 rounded-2xl dark:bg-gray-800">
              <svg
                className="h-10 mb-4 text-indigo-500"
                fill="currentColor"
                viewBox="0 0 24 27"
              >
                <path d="M14.017 18V10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983V18H0Z" />
              </svg>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                “Pengiriman cepat dan bukunya original. Packing juga aman banget!”
              </p>
              <div className="flex items-center justify-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://i.pravatar.cc/100?img=12"
                  alt="user"
                />
                <div className="ml-4 text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Sadewa Sagara
                  </h3>
                  <span className="text-sm text-gray-500">
                    Customer
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 shadow bg-gray-50 rounded-2xl dark:bg-gray-800">
              <svg
                className="h-10 mb-4 text-indigo-500"
                fill="currentColor"
                viewBox="0 0 24 27"
              >
                <path d="M14.017 18V10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983V18H0Z" />
              </svg>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                “UI website-nya nyaman dipakai dan checkout sangat mudah.”
              </p>
              <div className="flex items-center justify-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://i.pravatar.cc/100?img=32"
                  alt="user"
                />
                <div className="ml-4 text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Yudistira Yogendra
                  </h3>
                  <span className="text-sm text-gray-500">
                    Customer
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 shadow bg-gray-50 rounded-2xl dark:bg-gray-800">
              <svg
                className="h-10 mb-4 text-indigo-500"
                fill="currentColor"
                viewBox="0 0 24 27"
              >
                <path d="M14.017 18V10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983V18H0Z" />
              </svg>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                “Koleksi bukunya lengkap banget. Recommended buat pecinta buku!”
              </p>
              <div className="flex items-center justify-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://i.pravatar.cc/100?img=15"
                  alt="user"
                />
                <div className="ml-4 text-left">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Arjuna Arkana
                  </h3>
                  <span className="text-sm text-gray-500">
                    Customer
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
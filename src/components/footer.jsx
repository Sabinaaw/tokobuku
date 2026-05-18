export default function Footer() {
  return (
    <>
      <footer className="bg-white border-t dark:bg-gray-900">
        <div className="w-full max-w-screen-xl p-6 mx-auto lg:py-8">

          {/* Footer */}
          <div className="md:flex md:justify-between">

            {/* About us Description */}
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                  Nawbooks
                </span>
              </a>

              <p className="max-w-md mt-4 text-gray-500 dark:text-gray-400">
                Nawbook merupakan platform penjualan buku online yang menyediakan
                berbagai koleksi buku terbaik dari berbagai genre dan penulis favorit kamu.
              </p>
            </div>

            {/* Menu */}
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">

              {/* Navigation */}
              <div>
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Navigation
                </h2>
                <ul className="text-gray-500 dark:text-gray-400">
                  <li className="mb-2">
                    <a href="/" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/books" className="hover:underline">
                      Books
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/cart" className="hover:underline">
                      Cart
                    </a>
                  </li>
                </ul>
              </div>

              {/* Help */}
              <div>
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Help
                </h2>

                <ul className="text-gray-500 dark:text-gray-400">
                  <li className="mb-2">
                    <a href="#" className="hover:underline">
                      FAQ
                    </a>
                  </li>

                  <li className="mb-2">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>

                  <li className="mb-2">
                    <a href="#" className="hover:underline">
                      Terms & Conditions
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Contact
                </h2>

                <ul className="text-gray-500 dark:text-gray-400">
                  <li className="mb-2">
                    <span>Email:</span>
                    <br />
                    Nawbooks@gmail.com
                  </li>

                  <li className="mb-2">
                    <span>Phone:</span>
                    <br />
                    +62 813-8272-6985
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Bottom */}
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="text-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              © 2026 Nawbook. All Rights Reserved. Sabrina Jasmine.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
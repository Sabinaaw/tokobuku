export default function About() {
  return (
    <div className="px-6 py-20 mx-auto text-white max-w-7xl">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-5xl font-black">
          About Us
        </h1>
        <p className="max-w-3xl mx-auto text-xl text-gray-400">
          Nawbook adalah platform toko buku online yang
          menyediakan berbagai koleksi buku, manga,
          novel, dan komik favorit dengan pengalaman
          belanja yang modern dan nyaman.
        </p>
      </div>

      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop"
            alt="About Nawbook"
            className="shadow-2xl rounded-3xl"
          />
        </div>

        <div>
          <h2 className="mb-6 text-3xl font-bold">
            Our Mission
          </h2>

          <p className="mb-6 leading-8 text-gray-400">
            Kami percaya bahwa setiap buku memiliki
            kekuatan untuk menginspirasi, menghibur,
            dan membuka wawasan baru. Nawbook hadir
            untuk memudahkan para pecinta buku
            menemukan karya favorit mereka.
          </p>

          <p className="mb-6 leading-8 text-gray-400">
            Dengan koleksi yang terus bertambah dan
            sistem yang mudah digunakan, kami
            berkomitmen memberikan pengalaman belanja
            buku terbaik bagi semua pengguna.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="p-6 text-center border bg-slate-900 border-slate-800 rounded-2xl">
              <h3 className="text-3xl font-black text-indigo-400">
                500+
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Books
              </p>
            </div>

            <div className="p-6 text-center border bg-slate-900 border-slate-800 rounded-2xl">
              <h3 className="text-3xl font-black text-green-400">
                1K+
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Customers
              </p>
            </div>

            <div className="p-6 text-center border bg-slate-900 border-slate-800 rounded-2xl">
              <h3 className="text-3xl font-black text-pink-400">
                99%
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
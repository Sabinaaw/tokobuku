import { useEffect, useState } from "react";
import API from "../../_api";

export default function CustomerDashboard() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // =========================================
    // FETCH BOOKS
    // =========================================
    useEffect(() => {

        let ignore = false;

        async function loadBooks() {

            try {

                const { data } = await API.get("/books");

                const booksData = Array.isArray(data)
                    ? data
                    : data.data || [];

                if (!ignore) {
                    setBooks(booksData);
                }

            } catch (err) {

                console.error(err);

            } finally {

                if (!ignore) {
                    setLoading(false);
                }

            }
        }

        loadBooks();

        return () => {
            ignore = true;
        };

    }, []);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-hidden">

            {/* ========================================= */}
            {/* BACKGROUND */}
            {/* ========================================= */}
            <div className="fixed inset-0 -z-10">

                <img
                    src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop"
                    alt="library"
                    className="w-full h-full object-cover opacity-10"
                />

                <div className="absolute inset-0 bg-slate-950/90" />

            </div>

            {/* ========================================= */}
            {/* NAVBAR */}
            {/* ========================================= */}
            <div className="border-b border-slate-800/80 bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50">

                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* LOGO */}
                    <div>

                      <h1
                        className="
                          text-3xl
                          font-black
                          bg-gradient-to-r
                          from-cyan-300
                          via-indigo-200
                          to-pink-300
                          bg-clip-text
                          text-transparent
                          drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]
                        "
                      >
                        Nawbooks
                      </h1>

                      <p className="text-sm text-gray-300 mt-1 tracking-wide">
                        Explore your favorite books
                      </p>

                    </div>

                    {/* USER */}
                    <div className="flex items-center gap-4">

                        <div className="text-right">

                            <p className="text-sm text-gray-400">
                                Welcome back 👋
                            </p>

                            <h2 className="font-bold text-lg">
                                {user?.name}
                            </h2>

                        </div>

                        <button
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = "/login";
                            }}
                            className="
                                bg-red-500/20
                                hover:bg-red-500/30
                                border
                                border-red-500/50
                                text-red-400
                                px-5
                                py-2
                                rounded-2xl
                                transition
                                text-sm
                                font-semibold
                            "
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

            {/* ========================================= */}
            {/* HERO */}
            {/* ========================================= */}
            <div className="max-w-7xl mx-auto px-6 pt-10">

                <div
                    className="
                        relative
                        overflow-hidden
                        rounded-[40px]
                        bg-gradient-to-br
                        from-indigo-700
                        via-purple-700
                        to-pink-600
                        p-10
                        shadow-[0_0_80px_rgba(99,102,241,0.4)]
                    "
                >

                    {/* BACKGROUND IMAGE */}
                    <img
                        src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop"
                        alt="books"
                        className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                            opacity-20
                        "
                    />

                    <div className="absolute inset-0 bg-black/30" />

                    <div className="relative z-10">

                        <h1 className="text-5xl font-black leading-tight max-w-3xl">
                            Discover Amazing Books
                            For Your Next Journey 🚀
                        </h1>

                        <p className="text-indigo-100 mt-5 max-w-2xl text-lg leading-relaxed">
                            Temukan berbagai buku terbaik dari author favoritmu.
                            Mulai dari novel, teknologi, edukasi, hingga fantasy
                            dalam satu platform modern.
                        </p>

                        <div className="flex gap-4 mt-8">

                            <button
                                className="
                                    bg-white
                                    text-indigo-700
                                    font-bold
                                    px-7
                                    py-3
                                    rounded-2xl
                                    hover:scale-105
                                    transition
                                    shadow-xl
                                "
                            >
                                Explore Books
                            </button>

                            <button
                                className="
                                    bg-white/10
                                    backdrop-blur
                                    border
                                    border-white/20
                                    px-7
                                    py-3
                                    rounded-2xl
                                    hover:bg-white/20
                                    transition
                                "
                            >
                                View Categories
                            </button>

                        </div>

                    </div>

                    {/* GLOW */}
                    <div
                        className="
                            absolute
                            -right-24
                            -top-24
                            w-96
                            h-96
                            bg-white/10
                            rounded-full
                            blur-3xl
                        "
                    />

                </div>

            </div>

            {/* ========================================= */}
            {/* LOADING */}
            {/* ========================================= */}
            {loading ? (

                <div className="text-center py-32 text-gray-400 text-xl">
                    Loading books...
                </div>

            ) : (

                <>
                    {/* ========================================= */}
                    {/* STATS */}
                    {/* ========================================= */}
                    <div className="max-w-7xl mx-auto px-6 mt-10">

                        <div className="grid md:grid-cols-3 gap-6">

                            {/* TOTAL BOOK */}
                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    bg-slate-900/80
                                    backdrop-blur
                                    border
                                    border-indigo-500/20
                                    rounded-3xl
                                    p-7
                                    shadow-xl
                                "
                            >

                                <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />

                                <h2 className="text-gray-400 text-sm">
                                    Total Books
                                </h2>

                                <p className="text-5xl font-black mt-3 text-indigo-400">
                                    {books.length}
                                </p>

                            </div>

                            {/* CATEGORY */}
                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    bg-slate-900/80
                                    backdrop-blur
                                    border
                                    border-pink-500/20
                                    rounded-3xl
                                    p-7
                                    shadow-xl
                                "
                            >

                                <div className="absolute right-0 top-0 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />

                                <h2 className="text-gray-400 text-sm">
                                    Categories
                                </h2>

                                <p className="text-5xl font-black mt-3 text-pink-400">
                                    {[
                                        ...new Set(
                                            books.map(
                                                (b) => b.genre?.name
                                            )
                                        ),
                                    ].length}
                                </p>

                            </div>

                            {/* AUTHORS */}
                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    bg-slate-900/80
                                    backdrop-blur
                                    border
                                    border-green-500/20
                                    rounded-3xl
                                    p-7
                                    shadow-xl
                                "
                            >

                                <div className="absolute right-0 top-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />

                                <h2 className="text-gray-400 text-sm">
                                    Authors
                                </h2>

                                <p className="text-5xl font-black mt-3 text-green-400">
                                    {[
                                        ...new Set(
                                            books.map(
                                                (b) => b.author?.name
                                            )
                                        ),
                                    ].length}
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* ========================================= */}
                    {/* BOOKS */}
                    {/* ========================================= */}
                    <div className="max-w-7xl mx-auto px-6 py-16">

                        <div className="flex items-center justify-between mb-10">

                            <div>

                                <h2 className="text-4xl font-black">
                                    Recommended Books ✨
                                </h2>

                                <p className="text-gray-400 mt-2 text-lg">
                                    Buku rekomendasi terbaik untuk kamu!
                                </p>

                            </div>

                        </div>

                        {books.length === 0 ? (

                            <div className="text-center py-20 text-gray-500">
                                Buku belum tersedia
                            </div>

                        ) : (

                            <div
                                className="
                                    grid
                                    grid-cols-1
                                    sm:grid-cols-2
                                    lg:grid-cols-3
                                    xl:grid-cols-4
                                    gap-8
                                "
                            >

                                {books.map((book) => (

                                    <div
                                        key={book.id}
                                        className="
                                            group
                                            bg-slate-900/80
                                            backdrop-blur
                                            border
                                            border-slate-800
                                            rounded-[30px]
                                            overflow-hidden
                                            hover:border-indigo-500/40
                                            transition-all
                                            duration-300
                                            hover:-translate-y-3
                                            shadow-2xl
                                        "
                                    >

                                        {/* IMAGE */}
                                        <div className="relative h-80 overflow-hidden bg-slate-800">

                                            <img
                                                src={
                                                    book.cover ||
                                                    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop"
                                                }
                                                alt={book.title}
                                                className="
                                                    w-full
                                                    h-full
                                                    object-cover
                                                    group-hover:scale-110
                                                    transition
                                                    duration-700
                                                "
                                            />

                                            {/* OVERLAY */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                                            {/* GENRE */}
                                            <div className="absolute top-4 left-4">

                                                <span
                                                    className="
                                                        bg-indigo-500/90
                                                        text-white
                                                        text-xs
                                                        px-4
                                                        py-1.5
                                                        rounded-full
                                                        backdrop-blur
                                                        font-semibold
                                                    "
                                                >
                                                    {book.genre?.name || "Unknown"}
                                                </span>

                                            </div>

                                        </div>

                                        {/* CONTENT */}
                                        <div className="p-6">

                                            <h3 className="text-2xl font-bold line-clamp-1">
                                                {book.title}
                                            </h3>

                                            <p className="text-gray-400 text-sm mt-3">
                                                ✍️ {book.author?.name || "Unknown Author"}
                                            </p>

                                            <p className="text-gray-500 text-sm mt-4 line-clamp-2 leading-relaxed">
                                                {book.description ||
                                                    "No description available"}
                                            </p>

                                            {/* PRICE */}
                                            <div className="flex items-center justify-between mt-7">

                                                <div>

                                                    <p className="text-xs text-gray-400">
                                                        Price
                                                    </p>

                                                    <h2 className="text-2xl font-black text-green-400">
                                                        Rp {Number(book.price).toLocaleString("id-ID")}
                                                    </h2>

                                                </div>

                                                <button
                                                    className="
                                                        bg-gradient-to-r
                                                        from-indigo-600
                                                        to-purple-600
                                                        hover:scale-105
                                                        px-5
                                                        py-2.5
                                                        rounded-2xl
                                                        font-semibold
                                                        transition
                                                        shadow-lg
                                                    "
                                                >
                                                    Detail
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>
                </>
            )}

        </div>
    );
}
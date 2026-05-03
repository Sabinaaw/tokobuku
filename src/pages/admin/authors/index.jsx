import { useEffect, useState } from "react";
import { getAuthors } from "../../../_services/authors";
import { Link } from "react-router-dom";

export default function AdminAuthors() {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAuthors();
                setAuthors(data);
            } catch (error) {
                console.error("Failed to fetch authors:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="p-6 text-white">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Authors</h1>

                <Link
                    to="/admin/authors/create"
                    className="bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg shadow"
                >
                    + Add Author
                </Link>
            </div>

            {/* Table */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-800 text-gray-300">
                        <tr>
                            <th className="text-left px-4 py-3">ID</th>
                            <th className="text-left px-4 py-3">Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {authors.length > 0 ? (
                            authors.map((a) => (
                                <tr
                                    key={a.id}
                                    className="border-t border-slate-700 hover:bg-slate-800 transition"
                                >
                                    <td className="px-4 py-3">{a.id}</td>
                                    <td className="px-4 py-3">{a.name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="2"
                                    className="text-center py-6 text-gray-400"
                                >
                                    Data kosong
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
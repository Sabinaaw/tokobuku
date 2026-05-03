import { useState } from "react";
import { createAuthor } from "../../../_services/authors";
import { useNavigate } from "react-router-dom";

export default function AuthorCreate() {
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createAuthor({ name });

        navigate("/admin/authors");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold mb-4 text-indigo-600">
            Create Author
            </h1>

            <input
                type="text"
                placeholder="Author Name"
                className="border p-2 w-full mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>
    );
}
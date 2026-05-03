import { useState } from "react";
import { createGenre } from "../../../_services/genres";
import { useNavigate } from "react-router-dom";

export default function GenreCreate() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createGenre({
            name,
            description,
        });

        navigate("/admin/genres");
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
        <h1 className="text-xl font-bold mb-4 text-indigo-600">
        Create Genres
        </h1>

            <input
                type="text"
                placeholder="Name"
                className="border p-2 w-full mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Description"
                className="border p-2 w-full mb-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <button className="bg-indigo-600 text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>
    );
}
export default function AuthInput({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    error,
}) {
    return (
        <div>
            <label className="block text-sm text-gray-300 mb-1">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
                    w-full p-3 rounded-xl
                    bg-slate-800
                    border
                    text-white
                    outline-none
                    transition
                    ${
                        error
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-700 focus:ring-indigo-500"
                    }
                    focus:ring-2
                `}
            />

            {error && (
                <p className="text-red-400 text-sm mt-1">
                    {error}
                </p>
            )}
        </div>
    );
}
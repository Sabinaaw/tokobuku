import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    if (!user) {
        return <Navigate to="/login" />;
    }

    // Kalau bukan admin
    if (user.role !== "admin") {
        return <Navigate to="/customer" />;
    }

    return children;
}
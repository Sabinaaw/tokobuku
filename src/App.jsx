import { BrowserRouter, Routes, Route } from "react-router-dom";

// ======================================
// PUBLIC PAGES
// ======================================
import Home from "./pages/public/Index";
import Books from "./pages/public/books";

// ======================================
// LAYOUTS
// ======================================
import PublicLayout from "./layouts/Public";
import AdminLayout from "./layouts/admin";

// ======================================
// ROUTE PROTECTION
// ======================================
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

// ======================================
// AUTH
// ======================================
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// ======================================
// CUSTOMER
// ======================================
import CustomerDashboard from "./pages/customer";

// ======================================
// ADMIN DASHBOARD
// ======================================
import Dashboard from "./pages/admin";

// ======================================
// BOOKS
// ======================================
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import EditBook from "./pages/admin/books/edit";

// ======================================
// GENRES
// ======================================
import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";
import EditGenre from "./pages/admin/genres/Edit";

// ======================================
// AUTHORS
// ======================================
import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";
import EditAuthor from "./pages/admin/authors/edit";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* ====================================== */}
                {/* PUBLIC */}
                {/* ====================================== */}
                <Route element={<PublicLayout />}>

                    <Route
                        index
                        element={<Home />}
                    />

                    <Route
                        path="books"
                        element={<Books />}
                    />

                </Route>

                {/* ====================================== */}
                {/* AUTH */}
                {/* ====================================== */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* ====================================== */}
                {/* CUSTOMER */}
                {/* ====================================== */}
                <Route
                    path="/customer"
                    element={
                        <PrivateRoute>
                            <CustomerDashboard />
                        </PrivateRoute>
                    }
                />

                {/* ====================================== */}
                {/* ADMIN */}
                {/* ====================================== */}
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute>

                            <AdminRoute>
                                <AdminLayout />
                            </AdminRoute>

                        </PrivateRoute>
                    }
                >

                    {/* DASHBOARD */}
                    <Route
                        index
                        element={<Dashboard />}
                    />

                    {/* ====================================== */}
                    {/* BOOKS */}
                    {/* ====================================== */}
                    <Route path="books">

                        <Route
                            index
                            element={<AdminBooks />}
                        />

                        <Route
                            path="create"
                            element={<BookCreate />}
                        />

                        <Route
                            path="edit/:id"
                            element={<EditBook />}
                        />

                    </Route>

                    {/* ====================================== */}
                    {/* GENRES */}
                    {/* ====================================== */}
                    <Route path="genres">

                        <Route
                            index
                            element={<AdminGenres />}
                        />

                        <Route
                            path="create"
                            element={<GenreCreate />}
                        />

                        <Route
                            path="edit/:id"
                            element={<EditGenre />}
                        />

                    </Route>

                    {/* ====================================== */}
                    {/* AUTHORS */}
                    {/* ====================================== */}
                    <Route path="authors">

                        <Route
                            index
                            element={<AdminAuthors />}
                        />

                        <Route
                            path="create"
                            element={<AuthorCreate />}
                        />

                        <Route
                            path="edit/:id"
                            element={<EditAuthor />}
                        />

                    </Route>

                </Route>

            </Routes>
        </BrowserRouter>
    );
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Index";
import Books from "./pages/public/books";
import PublicLayout from "./layouts/Public";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";
import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
        </Route>

        {/* AUTH */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* ADMIN */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          
          <Route path="books">
            <Route index element={<AdminBooks />} />
            <Route path="create" element={<BookCreate />} />
          </Route>

          <Route path="genres" element={<AdminGenres />} />
            <Route path="genres/create" element={<GenreCreate />} />

            <Route path="authors" element={<AdminAuthors />} />
            <Route path="authors/create" element={<AuthorCreate />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
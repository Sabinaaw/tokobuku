import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Index";
import Books from "./pages/public/books";
import PublicLayout from "./layouts/Public";
import PrivateRoute from "./components/PrivateRoute";
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
import EditBook from "./pages/admin/books/edit";
import EditAuthor from "./pages/admin/authors/edit";
import EditGenre from "./pages/admin/genres/Edit";

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

        {/* ADMIN (PROTECTED) */}
        <Route
          path="admin"
          element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />

          {/* BOOKS */}
          <Route path="books">
            <Route index element={<AdminBooks />} />
            <Route path="create" element={<BookCreate />} />
            <Route path="/admin/books/edit/:id" element={<EditBook />} />
          </Route>

          {/* GENRES */}
          <Route path="genres">
            <Route index element={<AdminGenres />} />
            <Route path="create" element={<GenreCreate />} />
            <Route path="/admin/genres/edit/:id" element={<EditGenre />} />
          </Route>

          {/* AUTHORS */}
          <Route path="authors">
            <Route index element={<AdminAuthors />} />
            <Route path="create" element={<AuthorCreate />} />
            <Route path="/admin/authors/edit/:id" element={<EditAuthor />} />
          </Route>

        </Route>

      </Routes>
    </BrowserRouter>
  );
}
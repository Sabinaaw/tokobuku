import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/Public";
import AdminLayout from "./layouts/admin";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/public/Index";
import Books from "./pages/public/books";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import CustomerDashboard from "./pages/customer";
import CustomerBookDetail from "./pages/customer/detail";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import MyTransactions from "./pages/customer/MyTransactions";
import Dashboard from "./pages/admin";
import AdminUsers from "./pages/admin/users";
import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";
import EditBook from "./pages/admin/books/edit";
import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";
import EditGenre from "./pages/admin/genres/Edit";
import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";
import EditAuthor from "./pages/admin/authors/edit";
import About from "./pages/public/about";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="about" element={<About />}/>

          <Route
            path="cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/customer"
          element={
            <PrivateRoute>
              <CustomerDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/customer/books/:id"
          element={
            <PrivateRoute>
              <CustomerBookDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-transactions"
          element={
            <PrivateRoute>
              <MyTransactions />
            </PrivateRoute>
          }
        />

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
          <Route index element={<Dashboard />} />
          <Route path="users">
            <Route index element={<AdminUsers />} />
          </Route>

          <Route path="books">
            <Route index element={<AdminBooks />} />
            <Route path="create" element={<BookCreate />} />
            <Route path="edit/:id" element={<EditBook />} />
          </Route>

          <Route path="genres">
            <Route index element={<AdminGenres />} />
            <Route path="create" element={<GenreCreate />} />
            <Route path="edit/:id" element={<EditGenre />} />
          </Route>

          <Route path="authors">
            <Route index element={<AdminAuthors />} />
            <Route path="create" element={<AuthorCreate />} />
            <Route path="edit/:id" element={<EditAuthor />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
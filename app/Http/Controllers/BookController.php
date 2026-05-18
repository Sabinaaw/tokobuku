<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $query = Book::with(['author', 'genre']);
        if ($request->search) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        if ($request->genre_id) {
            $query->where('genre_id', $request->genre_id);
        }
        $books = $query->latest()->get();
        return response()->json([
            'success' => true,
            'data' => $books
        ]);
    }

    public function show($id)
    {
        $book = Book::with(['author', 'genre'])->find($id);
        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book tidak ditemukan'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $book
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required',
            'price'       => 'required|integer',
            'stock'       => 'required|integer',
            'author_id'   => 'required',
            'genre_id'    => 'required',
            'description' => 'nullable',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);
        $imageName = null;
        $destination = public_path('books');
        if (!file_exists($destination)) {
            mkdir($destination, 0777, true);
        }

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->file('image')->extension();
            $request->file('image')->move($destination, $imageName);
        }
        $book = Book::create([
            'title'       => $request->title,
            'price'       => $request->price,
            'stock'       => $request->stock,
            'author_id'   => $request->author_id,
            'genre_id'    => $request->genre_id,
            'description' => $request->description,
            'image'       => $imageName
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data berhasil ditambahkan',
            'data'    => $book
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book tidak ditemukan'
            ], 404);
        }
        $request->validate([
            'title'       => 'required',
            'price'       => 'required|integer',
            'stock'       => 'required|integer',
            'author_id'   => 'required',
            'genre_id'    => 'required',
            'description' => 'nullable',
            'image'       => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);
        $destination = public_path('books');
        if (!file_exists($destination)) {
            mkdir($destination, 0777, true);
        }

        if ($request->hasFile('image')) {
            if ($book->image && file_exists($destination . '/' . $book->image)) {
                unlink($destination . '/' . $book->image);
            }
            $imageName = time() . '.' . $request->file('image')->extension();
            $request->file('image')->move($destination, $imageName);
            $book->image = $imageName;
        }
        $book->title       = $request->title;
        $book->price       = $request->price;
        $book->stock       = $request->stock;
        $book->author_id   = $request->author_id;
        $book->genre_id    = $request->genre_id;
        $book->description = $request->description;
        $book->save();

        return response()->json([
            'success' => true,
            'message' => 'Data berhasil diupdate',
            'data'    => $book
        ]);
    }

    public function destroy($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json([
                'success' => false,
                'message' => 'Book tidak ditemukan'
            ], 404);
        }
        $destination = public_path('books');
        if ($book->image && file_exists($destination . '/' . $book->image)) {
            unlink($destination . '/' . $book->image);
        }
        $book->delete();
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ]);
    }
}

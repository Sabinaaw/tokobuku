<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with('author')->get();
        return response()->json($books);
    }

    public function show($id)
    {
        $book = Book::with('author')->find($id);
        return response()->json($book);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'price' => 'required',
            'author_id' => 'required',
        ]);

        $book = Book::create($request->all());

        return response()->json([
            'message' => 'Data berhasil ditambahkan',
            'data' => $book
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'price' => 'required',
            'author_id' => 'required',
        ]);

        $book = Book::find($id);
        $book->update($request->all());

        return response()->json([
            'message' => 'Data berhasil diupdate',
            'data' => $book
        ]);
    }

    public function destroy($id)
    {
        Book::destroy($id);

        return response()->json([
            'message' => 'Data berhasil dihapus'
        ]);
    }
}
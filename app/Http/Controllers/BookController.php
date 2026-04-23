<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\Author;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with('author')->get();
        return view('books.index', compact('books'));
    }

    public function create()
    {
        $authors = Author::all();
        return view('books.create', compact('authors'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'price' => 'required',
            'author_id' => 'required',
        ]);

        Book::create($request->all());

        return redirect('/books')->with('success', 'Data berhasil ditambahkan');
    }

    public function edit($id)
    {
        $book = Book::findOrFail($id);
        $authors = Author::all();
        return view('books.edit', compact('book', 'authors'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required',
            'price' => 'required',
            'author_id' => 'required',
        ]);

        Book::findOrFail($id)->update($request->all());

        return redirect('/books')->with('success', 'Data berhasil diupdate');
    }

    public function destroy($id)
    {
        Book::destroy($id);
        return redirect('/books')->with('success', 'Data berhasil dihapus');
    }
}
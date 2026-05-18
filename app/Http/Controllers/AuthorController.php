<?php
namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{
    public function index()
    {
        $authors = Author::latest()->get();
        return response()->json([
            'success' => true,
            'data' => $authors
        ]);
    }

    public function show($id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'message' => 'Author tidak ditemukan'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $author
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);
        $author = Author::create([
            'name' => $request->name
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Author berhasil ditambahkan',
            'data' => $author
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'message' => 'Author tidak ditemukan'
            ], 404);
        }
        $request->validate([
            'name' => 'required|string|max:255'
        ]);
        $author->update([
            'name' => $request->name
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Author berhasil diupdate',
            'data' => $author
        ]);
    }

    public function destroy($id)
    {
        $author = Author::find($id);
        if (!$author) {
            return response()->json([
                'message' => 'Author tidak ditemukan'
            ], 404);
        }
        $author->delete();
        return response()->json([
            'success' => true,
            'message' => 'Author berhasil dihapus'
        ]);
    }
}

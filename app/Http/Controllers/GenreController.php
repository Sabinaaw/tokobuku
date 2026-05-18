<?php
namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::latest()->get();
        return response()->json([
            'success' => true,
            'data' => $genres
        ]);
    }

    public function show($id)
    {
        $genre = Genre::find($id);
        if (!$genre) {
            return response()->json([
                'message' => 'Genre tidak ditemukan'
            ], 404);
        }
        return response()->json([
            'success' => true,
            'data' => $genre
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);
        $genre = Genre::create([
            'name' => $request->name
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Genre berhasil ditambahkan',
            'data' => $genre
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $genre = Genre::find($id);
        if (!$genre) {
            return response()->json([
                'message' => 'Genre tidak ditemukan'
            ], 404);
        }
        $request->validate([
            'name' => 'required|string|max:255'
        ]);
        $genre->update([
            'name' => $request->name
        ]);
        return response()->json([
            'success' => true,
            'message' => 'Genre berhasil diupdate',
            'data' => $genre
        ]);
    }

    public function destroy($id)
    {
        $genre = Genre::find($id);
        if (!$genre) {
            return response()->json([
                'message' => 'Genre tidak ditemukan'
            ], 404);
        }
        $genre->delete();
        return response()->json([
            'success' => true,
            'message' => 'Genre berhasil dihapus'
        ]);
    }
}

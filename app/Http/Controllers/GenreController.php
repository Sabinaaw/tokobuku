<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{

    public function index()
    {
        $genres = Genre::all();

        return response()->json([
            'message' => 'Data genres berhasil diambil',
            'data' => $genres
        ], 200);
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
            'message' => 'Genre berhasil ditambahkan',
            'data' => $genre
        ], 201);
    }

    public function show($id)
    {
        $genre = Genre::find($id);

        if (!$genre) {
            return response()->json([
                'message' => 'Genre tidak ditemukan'
            ], 404);
        }

        return response()->json($genre, 200);
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
            'message' => 'Genre berhasil diupdate',
            'data' => $genre
        ], 200);
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
            'message' => 'Genre berhasil dihapus'
        ], 200);
    }
}
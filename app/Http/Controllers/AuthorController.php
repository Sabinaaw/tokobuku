<?php

namespace App\Http\Controllers;

use App\Models\Author;
use Illuminate\Http\Request;

class AuthorController extends Controller
{

    public function index()
    {
        $authors = Author::all();

        return response()->json([
            'status' => 'success',
            'data' => $authors
        ]);
    }

    public function show($id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Author not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $author
        ]);
    }

    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255'
        ]);

        $author = Author::create($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $author
        ], 201);
    }

    // ✅ PUT (UPDATE)
    public function update(Request $request, $id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Author not found'
            ], 404);
        }

        $author->update($request->all());

        return response()->json([
            'status' => 'success',
            'data' => $author
        ]);
    }

    // ✅ DELETE
    public function destroy($id)
    {
        $author = Author::find($id);

        if (!$author) {
            return response()->json([
                'status' => 'error',
                'message' => 'Author not found'
            ], 404);
        }

        $author->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Deleted successfully'
        ]);
    }
}
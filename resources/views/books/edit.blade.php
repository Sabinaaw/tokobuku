<!DOCTYPE html>
<html>
<head>
    <title>Edit Buku</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">

    <h2 class="mb-4">✏️ Edit Buku</h2>

    {{-- Error Validation --}}
    @if ($errors->any())
        <div class="alert alert-danger">
            <ul class="mb-0">
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif

    <div class="card shadow p-4">
        <form action="{{ route('books.update', $book->id) }}" method="POST">
            @csrf
            @method('PUT')

            <div class="mb-3">
                <label class="form-label">Judul Buku</label>
                <input 
                    type="text" 
                    name="title" 
                    class="form-control" 
                    value="{{ $book->title }}" 
                    placeholder="Masukkan judul">
            </div>

            <div class="mb-3">
                <label class="form-label">Harga</label>
                <input 
                    type="number" 
                    name="price" 
                    class="form-control" 
                    value="{{ $book->price }}" 
                    placeholder="Masukkan harga">
            </div>

            <div class="mb-3">
                <label class="form-label">Author</label>
                <select name="author_id" class="form-select">
                    @foreach($authors as $author)
                        <option value="{{ $author->id }}"
                            {{ $book->author_id == $author->id ? 'selected' : '' }}>
                            {{ $author->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="d-flex justify-content-between">
                <a href="{{ route('books.index') }}" class="btn btn-secondary">
                    Kembali
                </a>

                <button type="submit" class="btn btn-warning">
                    🔄 Update
                </button>
            </div>
        </form>
    </div>

</div>

</body>
</html>
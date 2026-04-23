<!DOCTYPE html>
<html>
<head>
    <title>Tambah Buku</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">

    <h2 class="mb-4">➕ Tambah Buku</h2>

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
        <form action="{{ route('books.store') }}" method="POST">
            @csrf

            <div class="mb-3">
                <label class="form-label">Judul Buku</label>
                <input type="text" name="title" class="form-control" placeholder="Masukkan judul">
            </div>

            <div class="mb-3">
                <label class="form-label">Harga</label>
                <input type="number" name="price" class="form-control" placeholder="Masukkan harga">
            </div>

            <div class="mb-3">
                <label class="form-label">Author</label>
                <select name="author_id" class="form-select">
                    <option value="">-- Pilih Author --</option>
                    @foreach($authors as $author)
                        <option value="{{ $author->id }}">
                            {{ $author->name }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="d-flex justify-content-between">
                <a href="{{ route('books.index') }}" class="btn btn-secondary">
                    Kembali
                </a>

                <button type="submit" class="btn btn-success">
                    💾 Simpan
                </button>
            </div>
        </form>
    </div>

</div>

</body>
</html>
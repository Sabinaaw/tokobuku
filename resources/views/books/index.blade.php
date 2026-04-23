<!DOCTYPE html>
<html>
<head>
    <title>Data Buku</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<div class="container mt-5">

    <h2 class="mb-4">📚 Data Buku</h2>

    {{-- Alert --}}
    @if(session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif

    <a href="{{ route('books.create') }}" class="btn btn-primary mb-3">
        + Tambah Buku
    </a>

    <table class="table table-bordered table-striped">
        <thead class="table-dark">
            <tr>
                <th>Judul</th>
                <th>Harga</th>
                <th>Author</th>
                <th width="200">Aksi</th>
            </tr>
        </thead>
        <tbody>
            @forelse($books as $book)
            <tr>
                <td>{{ $book->title }}</td>
                <td>Rp {{ number_format($book->price) }}</td>
                <td>{{ $book->author->name }}</td>
                <td>
                    <a href="{{ route('books.edit', $book->id) }}" class="btn btn-warning btn-sm">
                        Edit
                    </a>

                    <form action="{{ route('books.destroy', $book->id) }}" method="POST" class="d-inline">
                        @csrf
                        @method('DELETE')
                        <button class="btn btn-danger btn-sm">
                            Hapus
                        </button>
                    </form>
                </td>
            </tr>
            @empty
            <tr>
                <td colspan="4" class="text-center">
                    Belum ada data
                </td>
            </tr>
            @endforelse
        </tbody>
    </table>

</div>

</body>
</html>
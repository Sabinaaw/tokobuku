<!DOCTYPE html>
<html>
<head>
    <title>Author</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-10">

    <h1 class="text-2xl font-bold mb-4">Daftar Author</h1>

    <!-- Search -->
    <input type="text" id="search" placeholder="Cari author..."
        class="mb-4 p-2 border rounded w-full">

    <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg shadow">
            <thead class="bg-green-500 text-white">
                <tr>
                    <th class="py-2 px-4">ID</th>
                    <th class="py-2 px-4">Nama Author</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                @foreach($authors as $author)
                <tr class="border-b hover:bg-gray-100">
                    <td class="py-2 px-4">{{ $author['id'] }}</td>
                    <td class="py-2 px-4">{{ $author['name'] }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <script>
        const searchInput = document.getElementById('search');
        const rows = document.querySelectorAll('#tableBody tr');

        searchInput.addEventListener('keyup', function() {
            const keyword = this.value.toLowerCase();

            rows.forEach(row => {
                row.textContent.toLowerCase().includes(keyword)
                    ? row.style.display = ''
                    : row.style.display = 'none';
            });
        });
    </script>

</body>
</html>
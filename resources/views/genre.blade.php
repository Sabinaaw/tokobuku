<!DOCTYPE html>
<html>
<head>
    <title>Genre</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-10">

    <h1 class="text-2xl font-bold mb-4">Daftar Genre</h1>

    <!-- Search -->
    <input type="text" id="search" placeholder="Cari genre..."
        class="mb-4 p-2 border rounded w-full">

    <div class="overflow-x-auto">
        <table class="min-w-full bg-white rounded-lg shadow">
            <thead class="bg-blue-500 text-white">
                <tr>
                    <th class="py-2 px-4">ID</th>
                    <th class="py-2 px-4">Nama Genre</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                @foreach($genres as $genre)
                <tr class="border-b hover:bg-gray-100">
                    <td class="py-2 px-4">{{ $genre['id'] }}</td>
                    <td class="py-2 px-4">{{ $genre['name'] }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- JS Search -->
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
import { useEffect, useState } from 'react'

function App() {
  const [items, setItems] = useState([]);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';
  // Fetch Data
  const fetchItems = () => {
    fetch(`${API_URL}/items`)
      .then(res => res.json())
      .then(data => setItems(data));
  };

  useEffect(() => { fetchItems() }, []);

  // Update Stock Function
  const updateStock = (id, currentStock) => {
    const newStock = currentStock + 1; // Nambah stok +1
    fetch(`${API_URL}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stock: newStock })
    }).then(() => fetchItems()); // Refresh data
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📦 Gudang Jawara Testing</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ background: '#333', color: 'white' }}>
            <th>ID</th>
            <th>Nama Barang</th>
            <th>Stok</th>
            <th>Dibuat Tgl (Created At)</th>
            <th>Terakhir Update (Updated At)</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td><strong>{item.stock}</strong></td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
              <td style={{ color: 'blue', fontWeight: 'bold' }}>
                {new Date(item.updated_at).toLocaleString()}
              </td>
              <td>
                <button onClick={() => updateStock(item.id, item.stock)}>
                  ➕ Tambah Stok
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><em>*Coba klik tombol Tambah Stok, dan perhatikan jam 'Terakhir Update' akan berubah otomatis!</em></p>
    </div>
  )
}

export default App
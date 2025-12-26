import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Ini agar bisa diakses dari luar container (0.0.0.0)
    port: 5173,
    // TAMBAHKAN BAGIAN INI:
    allowedHosts: [
      'my-gudang.jawaracodecorp.cloud',
      'www.my-gudang.jawaracodecorp.cloud',
      'all' // Opsional: gunakan 'all' jika ingin mengizinkan semua domain (lebih praktis)
    ] 
  }
})

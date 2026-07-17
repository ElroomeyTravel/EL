# ElRoomeny Travel

Selamat datang di repositori **ElRoomeny Travel** — sebuah website statis untuk agen travel premium yang melayani rute Kediri, Malang, dan Surabaya.

## Ringkasan Proyek

Website ini dibuat dengan HTML, CSS, dan JavaScript untuk menampilkan:

- halaman beranda responsif dengan informasi layanan dan armada
- daftar armada travel premium seperti Avanza, Innova, Hiace, dan ELF
- posting blog sederhana di `blog.html`
- halaman kursus di `Kursus.html`
- halaman praktik TOEFL di `toefl-practice.html`, dan materi `toefl-reading.js`
- integrasi kontak WhatsApp untuk pemesanan dan konsultasi wisata

## Struktur File

- `index.html` — halaman utama website
- `blog.html` — halaman blog
- `Kursus.html` — halaman kursus
- `toefl-practice.html` — halaman latihan TOEFL
- `script.js` — logika JavaScript untuk interaksi halaman utama
- `kursus.js`, `blog.js`, `toefl-practice.js`, `toefl-reading.js` — JavaScript tambahan
- `style.css` — styling website
- `assets/` — gambar dan ikon pendukung
- `CNAME` — konfigurasi GitHub Pages custom domain

## Fitur Utama

- Navigasi responsif dengan menu hamburger pada perangkat mobile
- Tampilan armada dan fasilitas dinamis berdasarkan data JavaScript
- Tombol pemesanan dan kontak WhatsApp cepat
- Desain modern dengan dukungan Google Fonts dan Font Awesome
- Optimasi SEO sederhana menggunakan meta tag dan Open Graph

## Cara Menjalankan

Karena ini adalah website statis, cukup buka `index.html` di browser atau jalankan server lokal:

```bash
cd "D:\Elroomeny Travel"
python -m http.server 8000
```

Kemudian buka `http://localhost:8000`.

## Catatan

- Pastikan semua file `assets/` tersedia untuk tampilan gambar yang lengkap.
- Jika ingin memperbarui nomor WhatsApp atau data armada, edit `script.js` pada bagian `CONFIG` dan `FLEET_DATA`.

## Lisensi

Repositori ini dapat digunakan sebagai contoh atau referensi untuk proyek website statis agen travel.


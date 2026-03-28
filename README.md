# Muhammad Sayyid Habibie — Personal Portfolio

Portfolio website pribadi Muhammad Sayyid Habibie, mahasiswa S1 Informatika di Stikom El Rahma. Dibangun dengan HTML, CSS, dan JavaScript murni tanpa framework.

---

## Fitur

- Single-page dengan section: Home, About, Skills, Education, Projects, Services, Testimonials, Contact
- Typing animation di hero section
- Scroll reveal animation pada setiap section
- Skill progress bar dengan animasi saat di-scroll
- Responsive design untuk semua ukuran layar (desktop, tablet, HP)
- Admin panel tersembunyi untuk mengedit konten langsung dari browser
- Semua perubahan tersinkron ke GitHub — tampil sama di semua device
- Upload foto ke Cloudinary (permanen, tersedia di semua device)
- Upload CV ke Cloudinary (permanen, tersedia di semua device)
- Form contact terhubung langsung ke WhatsApp

---

## Struktur File

```
portfolio/
├── assets/
│   ├── image.png           # Foto profil default
│   ├── img1.jpg            # Foto testimonial 1 default
│   ├── img2.jpg            # Foto testimonial 2 default
│   └── img3.jpg            # Foto testimonial 3 default
├── index.html              # Struktur halaman utama
├── style.css               # Semua styling & responsive
├── script.js               # Navigasi, scroll reveal, skill bar, contact WA
├── admin2.js               # Panel admin, GitHub sync, Cloudinary upload
├── portfolio-data.json     # Data konten (auto-generated oleh panel edit)
├── portfolio-photos.json   # URL foto & CV (auto-generated oleh panel edit)
└── README.md
```

---

## Cara Menjalankan

Cukup buka `index.html` di browser. Tidak perlu server atau instalasi apapun.

---

## Admin Panel

Tombol edit tersembunyi — tidak terlihat oleh pengunjung biasa.

**Cara memunculkan tombol edit:**
- Desktop: Tekan `Ctrl + Shift + A`
- HP / Mobile: Ketuk nama **"Muhammad Sayyid Habibie"** di header sebanyak **5x cepat** dalam 2 detik

Tombol ✏️ muncul di pojok kanan bawah → klik → login:
- Nama: `Muhammad Sayyid Habibie`
- Password: *(hubungi pemilik)*

**Tab yang tersedia:**

| Tab | Fungsi |
|---|---|
| Home | Nama panggilan, deskripsi hero, social links |
| About | Subtitle profesi, bio, statistik |
| Skills | Tambah / edit / hapus skill & persentase |
| Education | Tambah / edit / hapus riwayat pendidikan |
| Projects | Tambah / edit / hapus project & link |
| Services | Tambah / edit / hapus layanan |
| Testimonials | Tambah / edit / hapus testimoni |
| Footer | Teks copyright |
| Photos | Upload foto profil & testimonial (via Cloudinary) |
| CV | Upload CV (via Cloudinary) |

> Tab menu bisa digeser horizontal di layar HP.

---

## Sinkronisasi Data

Semua perubahan dari panel edit otomatis tersinkron ke GitHub:

| Data | Disimpan di |
|---|---|
| Semua teks konten | `portfolio-data.json` di GitHub repo |
| Foto profil & testimonial | Cloudinary + URL di `portfolio-photos.json` |
| CV | Cloudinary + URL di `portfolio-photos.json` |

Artinya — edit di HP, langsung tampil di laptop orang lain yang buka website.

---

## Teknologi

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 | Styling, animasi, responsive |
| JavaScript (Vanilla) | Interaktivitas & admin panel |
| Boxicons | Icon library |
| GitHub API | Sinkronisasi data konten antar device |
| Cloudinary | Hosting foto & CV permanen |
| WhatsApp API | Pengiriman pesan dari form contact |

---

## Lisensi

&copy; 2025 Muhammad Sayyid Habibie. All Rights Reserved.

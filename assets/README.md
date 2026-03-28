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
- Tab menu admin bisa digeser horizontal di layar HP
- Upload CV dalam format PDF, PNG, atau JPG
- Tombol Download CV
- Form contact terhubung langsung ke WhatsApp

---

## Struktur File

```
portfolio/
├── assets/
│   ├── image.png       # Foto profil utama
│   ├── img1.jpg        # Foto testimonial 1
│   ├── img2.jpg        # Foto testimonial 2
│   └── img3.jpg        # Foto testimonial 3
├── index.html          # Struktur halaman utama
├── style.css           # Semua styling & responsive
├── script.js           # Navigasi, scroll reveal, skill bar, contact WA
├── admin2.js           # Panel admin & manajemen konten
├── cv.pdf              # File CV (letakkan di sini)
└── README.md
```

---

## Cara Update Foto

Foto disimpan di folder `assets/`. Untuk mengganti foto:

1. Buka repo di **github.com**
2. Masuk ke folder `assets/`
3. Klik file yang ingin diganti → klik ikon pensil atau "Upload files"
4. Upload foto baru dengan **nama yang sama** (`image.png`, `img1.jpg`, dst)
5. Commit changes

> Atau bisa juga lewat panel edit di website — foto tersimpan sementara di browser (localStorage).

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

**Tab yang tersedia di panel edit:**

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
| CV | Upload file CV (PDF / PNG / JPG, maks 5MB) |

> Di layar HP, tab menu panel bisa digeser ke kiri/kanan.

> Perubahan tersimpan di `localStorage` browser. Gunakan tombol **Reset ke Default** untuk mengembalikan semua konten ke semula.

---

## Teknologi

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 | Styling, animasi, responsive |
| JavaScript (Vanilla) | Interaktivitas & admin panel |
| Boxicons | Icon library |
| LocalStorage | Penyimpanan data konten & CV |
| WhatsApp API | Pengiriman pesan dari form contact |

---

## Lisensi

&copy; 2025 Muhammad Sayyid Habibie. All Rights Reserved.

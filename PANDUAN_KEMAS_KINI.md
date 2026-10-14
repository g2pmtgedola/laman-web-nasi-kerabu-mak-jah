# PANDUAN KEMAS KINI & PANDUAN PENTADBIR (ADMIN CMS)
## NASI KERABU MAK JAH

Panduan ini menerangkan cara menggunakan sistem **Log Masuk Pentadbir (Admin CMS)** dan pembaikan fungsi pesanan WhatsApp laman web Nasi Kerabu Mak Jah.

---

## 1. LOG MASUK PENTADBIR (ADMIN LOGIN)

Anda boleh log masuk sebagai pentadbir pada bila-bila masa terus dari laman web untuk mengubah teks, harga, serta memuat naik gambar makanan anda sendiri:

| Medan | Maklumat Akses |
| :--- | :--- |
| **Lokasi Butang Login** | 1. Butang `🔑 Login Admin` pada bar notis atas.<br>2. Butang `🔑 Login` pada bahagian navigasi header (sebelah butang Pesanan). |
| **ID Pengguna** | `admin` |
| **Kata Laluan** | `123456` |

Setelah berjaya log masuk:
- **Bar Kawalan Admin** berwarna gelap dengan indikator hijau `● MOD ADMIN AKTIF (admin)` akan muncul di bahagian atas laman web.
- Setiap kad makanan akan memaparkan butang pintas `✏️ Ubah Hidangan`.
- Panel Pengurusan Kandungan (CMS) akan dibuka secara automatik.

---

## 2. CARA MENGUBAH DATA & MEMUAT NAIK GAMBAR SENDIRI (CMS)

Panel CMS mengandungi 4 bahagian utama:

### ① Ubah Menu & Muat Naik Gambar Makanan Sendiri (Tab: 🍽️ Ubah Menu)
1. Pilih hidangan yang ingin diubah daripada menu pilihan (cth: *Nasi Kerabu Ayam Berempah*, *Daging Bakar*, dsb.).
2. Anda boleh mengubah:
   - Nama hidangan, skrip kaligrafi, dan tajuk utama.
   - Kategori hidangan.
   - Harga (masukkan nombor seperti `9.50` untuk memaparkan RM 9.50, atau kosongkan jika masih *Akan Dikemas Kini*).
   - Warna tema kad makanan.
   - Penerangan hidangan.
3. **Memuat Naik Gambar Sendiri:**
   - Klik butang **"Pilih Fail"** di bawah bahagian *Muat Naik Gambar Makanan Anda Sendiri*.
   - Pilih gambar hidangan dari komputer atau telefon anda.
   - Gambar akan dimampatkan secara automatik ke saiz web berkualiti tinggi dan dipratonton.
   - Klik butang **"💾 Simpan Hidangan Ini"**. Gambar dan butiran hidangan akan dikemas kini serta-merta pada kad di laman web!

### ② Tukar Gambar Hero Laman Utama (Tab: 🌟 Gambar Hero Utama)
1. Buka tab *Gambar Hero Utama*.
2. Klik **"Pilih Fail"** untuk memilih gambar hidangan utama sebenar masakan Nasi Kerabu Mak Jah.
3. Klik **"🌟 Gunakan Sebagai Gambar Hero"**. Gambar di bahagian atas laman web akan bertukar serta-merta!

### ③ Maklumat Perniagaan & WhatsApp (Tab: 🏢 Maklumat Perniagaan)
1. Masukkan nombor WhatsApp pemilik (cth: `0123456789`).
2. Tandakan kotak **"Sahkan nombor ini aktif untuk pesanan terus"** untuk membolehkan pelanggan terus membuka aplikasi WhatsApp secara automatik.
3. Kemas kini waktu operasi, alamat premis khusus, dan URL media sosial.
4. Klik **"💾 Simpan Maklumat Perniagaan"**.

### ④ Sandaran & Reset (Tab: 💾 Sandaran & Reset)
- **Muat Turun Data JSON:** Simpan sandaran semua menu dan gambar yang telah anda ubah.
- **Reset Semula Ke Data Asal:** Memadam perubahan tersimpan dan kembali ke tetapan asal.

---

## 3. PEMBAIKAN BUTANG "JANA PESANAN WHATSAPP"

Masalah butang tidak berfungsi sebelum ini telah diperbaiki sepenuhnya:

### Punca Masalah Terdahulu:
- Butang pesanan sebelum ini dikunci (*disabled*) apabila troli kosong, menyebabkan klik pengguna tidak menghasilkan sebarang respon walaupun pengguna telah menulis permintaan khas (seperti *"sambal asing"*).

### Penyelesaian & Penambahbaikan:
1. **Butang Sentiasa Aktif:** Butang `JANA PESANAN WHATSAPP` kini sentiasa aktif dan boleh diklik pada bila-bila masa.
2. **Sokongan Nota Pesanan:** Jika pelanggan menulis nota khas (seperti *"sambal asing"*), sistem akan menjana format pesanan dengan menyertakan nota tersebut walaupun tiada hidangan yang ditambah.
3. **Tutup Troli Automatik:** Apabila diklik, troli akan ditutup dan modal pratonton pesanan WhatsApp dibuka dengan kemas.
4. **Pilihan Hantar Terus:** Disediakan butang **`📲 Teruskan Ke WhatsApp (wa.me)`** untuk membuka WhatsApp serta-merta, dan butang **`📋 Salin Format Mesej`** untuk menyalin teks pesanan.

# Kalkulator ELECTRE

Kalkulator ELECTRE adalah aplikasi web yang dirancang untuk membantu pengguna dalam mengambil keputusan multi-kriteria menggunakan metode ELECTRE I. Aplikasi ini memungkinkan pengguna untuk memasukkan daftar alternatif, kriteria beserta bobot dan tipenya (benefit/cost), serta nilai kinerja masing-masing alternatif terhadap setiap kriteria. Berdasarkan input tersebut, aplikasi akan melakukan serangkaian perhitungan untuk menghasilkan peringkat alternatif terbaik.

## Deskripsi

Metode ELECTRE (ELimination Et Choix Traduisant la REalité) adalah salah satu metode populer dalam analisis keputusan multi-kriteria (MCDM). Aplikasi ini mengimplementasikan langkah-langkah inti dari metode ELECTRE I, termasuk:

- Normalisasi matriks keputusan.
- Pembobotan matriks normalisasi.
- Perhitungan matriks concordance dan discordance.
- Penentuan threshold concordance dan discordance.
- Pembentukan matriks dominan concordance, discordance, dan agregat.
- Perangkingan alternatif berdasarkan skor dominasi.

Aplikasi ini dibangun dengan antarmuka yang intuitif agar pengguna dapat dengan mudah memasukkan data dan melihat hasil perhitungan secara bertahap.

## Teknologi yang Digunakan

- **Framework Frontend**: [Next.js](https://nextjs.org/) (React Framework)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Bahasa Pemrograman**: JavaScript
- **Manajemen State**: React Hooks (useState, useEffect, useCallback, useMemo) & Custom Hooks
- **Deployment**: [Vercel](https://vercel.com/) (atau platform hosting pilihan Anda)
- **Version Control**: Git & GitHub

## Fitur

- **Input Dinamis**:
  - Menambah dan menghapus alternatif.
  - Mengubah nama alternatif.
  - Menambah dan menghapus kriteria.
  - Mengubah nama, bobot, dan tipe (benefit/cost) kriteria.
- **Input Matriks Kinerja**: Memasukkan nilai kinerja untuk setiap pasangan alternatif dan kriteria.
- **Perhitungan ELECTRE I Otomatis**:
  - Menampilkan langkah-langkah perhitungan secara detail:
    - Tabel nilai awal.
    - Matriks normalisasi.
    - Matriks normalisasi terbobot.
    - Matriks concordance.
    - Matriks discordance.
    - Nilai threshold concordance dan discordance.
    - Matriks dominan concordance.
    - Matriks dominan discordance.
    - Matriks agregat dominan.
  - Menampilkan hasil akhir berupa peringkat alternatif beserta skor dominasinya.
- **Validasi Input**: Memberikan pesan error jika input tidak sesuai (misalnya, nilai kosong, bobot tidak valid).
- **Antarmuka Responsif**: Tampilan yang menyesuaikan dengan berbagai ukuran layar.
- **Data Awal Contoh**: Menyediakan data awal untuk memudahkan pengguna mencoba aplikasi.

## Instruksi Setup Lokal

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone Repositori**:

    ```bash
    git clone https://github.com/USERNAME_ANDA/NAMA_REPOSITORI_ANDA.git
    cd NAMA_REPOSITORI_ANDA
    ```

    Ganti `USERNAME_ANDA` dan `NAMA_REPOSITORI_ANDA` dengan detail repositori Anda.

2.  **Install Dependencies**:
    Pastikan Anda memiliki Node.js dan npm (atau Yarn) terinstal.

    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Jalankan Development Server**:

    ```bash
    npm run dev
    # atau
    yarn dev
    ```

4.  **Buka Aplikasi**:
    Buka browser Anda dan navigasi ke `http://localhost:3000` (atau port lain yang ditampilkan di terminal).

## Penjelasan Dukungan AI (Tahap Pengembangan)

Selama tahap pengembangan proyek Kalkulator ELECTRE ini, dukungan dari model AI (seperti Gemini Code Assist) dimanfaatkan untuk beberapa aspek, termasuk:

- **Refaktorisasi Kode**: Membantu dalam memecah komponen besar menjadi komponen yang lebih kecil dan lebih mudah dikelola (misalnya, `InputSection`, `OutputSection`, `DataTable`).
- **Pembuatan Custom Hooks**: Memberikan panduan dan struktur awal untuk mengekstrak logika stateful ke dalam custom hooks (`useElectreInputs`, `useElectreCalculation`) guna meningkatkan keterbacaan dan reusabilitas kode di komponen utama.
- **Debugging dan Pemecahan Masalah**: Memberikan saran untuk mengatasi error, seperti masalah path impor, error ESLint (misalnya, variabel tidak terpakai, entitas HTML yang tidak di-escape), dan masalah konfigurasi.
- **Optimasi dan Peningkatan Kualitas Kode**: Memberikan masukan terkait konvensi penamaan, struktur kode, dan praktik terbaik dalam pengembangan React dan Next.js.
- **Generasi Kode Boilerplate**: Membantu dalam pembuatan struktur awal untuk file atau fungsi tertentu.
- **Pembuatan Dokumentasi**: Memberikan draf awal untuk file `README.md` ini dan penjelasan mengenai bagian-bagian kode.
- **Konfigurasi Proyek**: Memberikan panduan terkait konfigurasi `.gitignore` untuk memastikan hanya file yang relevan yang masuk ke version control.

Dukungan AI berperan sebagai asisten coding yang membantu mempercepat proses pengembangan, meningkatkan kualitas kode, dan memberikan solusi atas tantangan teknis yang muncul.

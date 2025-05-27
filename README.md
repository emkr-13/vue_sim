# Vue SIM

Aplikasi Vue 3 dengan TypeScript untuk manajemen toko dan produk.

## Struktur Proyek

```
src/
├── assets/        # Aset statis (gambar, font, dll)
├── components/    # Komponen Vue yang dapat digunakan kembali
│   ├── dashboard/ # Komponen khusus untuk dashboard
│   └── profile/   # Komponen khusus untuk profil
├── layouts/       # Layout aplikasi (Auth, Dashboard)
├── router/        # Konfigurasi router Vue
├── services/      # Layanan API dan logika bisnis
├── stores/        # Pinia stores untuk state management
├── types/         # TypeScript type definitions
└── views/         # Halaman aplikasi
```

## Installation

1. Clone this repository

```bash
git clone https://github.com/emkr-13/vue_sim.git
cd vue_login
```

2. Setup environment

```bash
cp .env.example .env
```

3. Install dependencies

```bash
npm install
```

4. Run development server

```bash
npm run dev
```

5. Build untuk produksi

```bash
npm run build
```

## Backend Setup

The backend for this application is available at [backend-bun-sim](https://github.com/emkr-13/backend-bun-sim.git)

1. Clone the backend repository

```bash
git clone https://github.com/emkr-13/backend-bun-sim.git
cd backend-bun-sim
```

2. Follow the installation instructions in the backend repository

## Fitur Utama

- Autentikasi pengguna
- Dashboard admin
- Manajemen kategori dan toko
- Manajemen produk
- Laporan dan statistik

## Teknologi yang Digunakan

- Vue 3
- TypeScript
- Pinia untuk state management
- Vue Router
- Vite sebagai build tool

## Additional Resources

Learn more about Vue 3 `<script setup>` SFCs in the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup).

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

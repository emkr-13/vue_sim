# Panduan Pengembangan

## Struktur Proyek

Proyek ini menggunakan struktur modular untuk memudahkan pengembangan dan pemeliharaan:

### Components

Komponen dibagi menjadi beberapa kategori:

- Komponen UI umum (DataTable, Pagination, ModalDialog)
- Komponen form (CategoryForm, StoreForm)
- Komponen dashboard (Header, Sidebar)
- Komponen profile (ProfileModal)

Semua komponen dapat diimpor dari file index.ts:

```ts
import { DataTable, Pagination, DashboardHeader } from "@/components";
```

### Views

Views adalah halaman utama aplikasi yang terhubung dengan router. Setiap view dapat menggunakan komponen yang sesuai.

Semua views dapat diimpor dari file index.ts:

```ts
import { LoginView, DashboardView } from "@/views";
```

### Services

Services menangani komunikasi dengan API dan logika bisnis. Setiap service fokus pada satu domain (auth, categories, stores, dll).

Semua services dapat diimpor dari file index.ts:

```ts
import { authService, categoriesService } from "@/services";
```

### Stores

Stores menggunakan Pinia untuk manajemen state. Setiap store fokus pada satu domain (auth, categories, stores).

Semua stores dapat diimpor dari file index.ts:

```ts
import { useAuthStore, useCategoriesStore } from "@/stores";
```

## Panduan Pengembangan

### Menambahkan Komponen Baru

1. Buat file komponen di folder yang sesuai (misalnya `src/components/NewComponent.vue`)
2. Ekspor komponen di file index.ts yang sesuai
3. Gunakan komponen di view atau komponen lain

### Menambahkan View Baru

1. Buat file view di folder `src/views` (misalnya `src/views/NewView.vue`)
2. Ekspor view di file `src/views/index.ts`
3. Tambahkan route di `src/router/index.ts`

### Menambahkan Service Baru

1. Buat file service di folder `src/services` (misalnya `src/services/newService.ts`)
2. Ekspor service di file `src/services/index.ts`
3. Gunakan service di view atau store

### Menambahkan Store Baru

1. Buat file store di folder `src/stores` (misalnya `src/stores/newStore.ts`)
2. Ekspor store di file `src/stores/index.ts`
3. Gunakan store di view atau komponen

## Konvensi Kode

- Gunakan TypeScript untuk semua file
- Gunakan Composition API dengan `<script setup>` untuk komponen Vue
- Definisikan tipe untuk semua props, refs, dan state
- Gunakan alias `@/` untuk import dari root folder
- Gunakan PascalCase untuk nama komponen
- Gunakan camelCase untuk nama variabel dan fungsi
- Gunakan kebab-case untuk nama file komponen dan view

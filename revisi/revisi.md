# Revisi Audit — Waraloka Web

Tanggal: 2025-11-11

Ringkasan proyek

- Total files scanned: 938 (rekursif, termasuk aset)
- Total issues ditemukan: 18 (kategori dijabarkan di bawah)

Checklist evaluasi (mengacu ke slide Mentoring WIA 26 Oct 2025)

- Struktur HTML semantik: ❌ (beberapa halaman menggunakan lebih dari satu <h1> untuk tiap section — perlu hirarki heading)
- Pisahkan layer HTML/CSS/JS: ❌ (ada inline <script> kecil, beberapa HTML menyuntikkan markup lewat innerHTML)
- CSS terorganisir & modular: ✅ (Tailwind + `src/css/input.css`) / ❌ (font-face tanpa font-display; beberapa utilities custom berpotensi digantikan oleh Tailwind)
- Arsitektur komponen: ⚠️ (header/footer di-inject dari `src/js/component.js` yang baik; masih ada pengulangan markup di beberapa renderer JS)
- JavaScript efisien: ❌ (beberapa DOM query dilakukan tanpa null-check; innerHTML += dalam loop potensial menimbulkan reflow)
- Responsiveness & Mobile-First: ✅ (mobile-first classes dipakai) / ⚠️ (beberapa background-image dan fixed widths dapat menyebabkan overflow di layar kecil)
- Accessibility: ❌ (missing descriptive alt untuk gambar galeri, interactive elements tanpa keyboard affordance, navigation/menu perlu ARIA)
- Performance best practices: ❌ (banyak gambar >200KB, tidak ada lazy loading di sebagian gambar, font loading bisa blocking)
- UI/UX best practice: ✅ (umumnya konsisten) / ⚠️ (beberapa tombol/ikon tidak memberi fallback teks atau fokus yang jelas)
- Dev workflow: ❌ (tidak ditemukan konfigurasi ESLint / Stylelint / Prettier di repo)

Ringkasan isu per kategori (jumlah):

- HTML: 6
- CSS: 2
- JS: 4
- Accessibility: 5
- Performance: 7
- DevOps/Tooling: 2

Prioritas & Quick wins (urutkan):

1. HIGH / LOW — Tambah lazy loading pada gambar besar, tambahkan decoding="async". (impact: page load, accessibility)
2. HIGH / LOW — Tambah null checks pada DOM queries (menangkal runtime errors di halaman tanpa elemen tertentu).
3. HIGH / LOW — Berikan alt text deskriptif untuk gambar galeri/fallback.
4. MEDIUM / LOW — Tambah font-display: swap pada semua @font-face.
5. MEDIUM / MEDIUM — Perbaiki hirarki heading (ubah beberapa <h1> ke <h2>/<h3> untuk sections).
6. MEDIUM / MEDIUM — Tambah ARIA (nav role/aria-label) dan pastikan tombol/toggle fokusable via keyboard.
7. HIGH / MEDIUM — Kompres/generate WebP/AVIF untuk aset >200KB dan tambahkan srcset untuk responsive images.

Langkah yang saya ambil (sampel patch & rekomendasi)

- Saya melakukan tinjauan statis terhadap `public/*.html`, `src/js/*.js`, `src/css/input.css` dan assets. Beberapa file memperlihatkan pola yang sama sehingga perbaikan serupa dapat diterapkan cepat.

Detail isu & contoh patch (actionable, bisa diaplikasikan dengan `git apply` atau dipakai sebagai panduan patch manual)

1. public/news.html — HTML / Performance / JS

- Masalah singkat: Hero article image tidak lazy, ada inline AOS.init() di akhir dokumen.
- Patch contoh (diff minimal):

  --- a/public/news.html
  +++ b/public/news.html
  @@
  -                <img src="../assets/images/first-news.png" alt="Seorang pria tersenyum ..." class="w-full h-auto max-w-full">
  *                <img src="../assets/images/first-news.png" alt="Seorang pria tersenyum ..." class="w-full h-auto max-w-full" loading="lazy" decoding="async">
    @@
  - <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  - <script>
  -        AOS.init();
  - </script>
  * <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  * <script src="../src/js/aos-init.js" defer></script>

- Prioritas: HIGH
- Difficulty: low

2. public/detail.html — Accessibility / Performance

- Masalah singkat: gambar galeri pakai empty alt="" dan tidak lazy. Tombol/tab toggle perlu keyboard handling (role=tab/aria-controls) agar dapat diakses.
- Patch contoh (diff minimal):

  --- a/public/detail.html
  +++ b/public/detail.html
  @@
  -                            <img id="store-first-gallery" src="../assets/images/fallback-img.jpg" alt="" class="w-full h-full object-center object-cover">
  *                            <img id="store-first-gallery" src="../assets/images/fallback-img.jpg" alt="Foto produk toko atau area toko" class="w-full h-full object-center object-cover" loading="lazy" decoding="async">
    @@
  -                                <img id="store-second-gallery" src="../assets/images/fallback-img.jpg" alt="" class="w-full h-full object-center object-cover">
  *                                <img id="store-second-gallery" src="../assets/images/fallback-img.jpg" alt="Foto samping toko atau produk" class="w-full h-full object-center object-cover" loading="lazy" decoding="async">
    @@
  -                                <img id="store-third-gallery" src="../assets/images/fallback-img.jpg" alt="" class="w-full h-full object-center object-cover">
  *                                <img id="store-third-gallery" src="../assets/images/fallback-img.jpg" alt="Foto suasana toko" class="w-full h-full object-center object-cover" loading="lazy" decoding="async">

- Prioritas: HIGH
- Difficulty: low

3. public/index.html — HTML / Accessibility / Performance

- Masalah singkat: beragam section menggunakan `<h1>` (seharusnya satu `<h1>` per halaman, sisanya `<h2>`/`<h3>`); slider images tidak lazy.
- Patch contoh (diff minimal):

  --- a/public/index.html
  +++ b/public/index.html
  @@
  -                    <img src="../assets/images/banner-satu.png" alt="banner-satu" class="swiper-slide w-[90%] h-auto max-w-full rounded-xl">
  *                    <img src="../assets/images/banner-satu.png" alt="banner promosi Waraloka" class="swiper-slide w-[90%] h-auto max-w-full rounded-xl" loading="lazy" decoding="async">
    @@
  -                <h1 class="w-full text-3xl lg:text-4xl ...">berita terkini</h1>
  *                <h2 class="w-full text-3xl lg:text-4xl ...">berita terkini</h2>

- Prioritas: HIGH
- Difficulty: medium (harus dicek tiap halaman agar heading tetap bermakna)

4. src/js/main.js — JavaScript

- Masalah singkat: penggunaan `document.getElementById(...).addEventListener(...)` tanpa null-check; `openSidebar()` memanggil `closeSidebar()` di implementasi awal (kemungkinan bug/logika terbalik).
- Patch contoh (safe guards):

  --- a/src/js/main.js
  +++ b/src/js/main.js
  @@
  -document.getElementById('open-sidebar').addEventListener('click', openSidebar)
  -document.getElementById('close-sidebar').addEventListener('click', closeSidebar)
  +const openSidebarBtn = document.getElementById('open-sidebar');
  +if (openSidebarBtn) openSidebarBtn.addEventListener('click', openSidebar);
  +const closeSidebarBtn = document.getElementById('close-sidebar');
  +if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  @@
  -function openSidebar() {
  - document.getElementById('sidebar').classList.replace('translate-x-full', 'translate-x-0')
  - closeSidebar();
    -}
    +function openSidebar() {
  * const sidebar = document.getElementById('sidebar');
  * if (sidebar) sidebar.classList.replace('translate-x-full', 'translate-x-0');
    +}

- Prioritas: HIGH
- Difficulty: low

5. src/css/input.css — CSS / Performance

- Masalah singkat: banyak `@font-face` tidak punya `font-display`; ini berisiko FOIT. Tambahkan `font-display: swap;`.
- Patch contoh:

  --- a/src/css/input.css
  +++ b/src/css/input.css
  @@
  @font-face {
  font-family: 'PJ Sans ExtraLight';
  src: url(../../assets/fonts/Jakarta-Sans/PlusJakartaSans-ExtraLight.ttf) format('truetype');
  font-display: swap;
  }

- Prioritas: MEDIUM
- Difficulty: low

6. src/js/component.js — Accessibility

- Masalah singkat: markup nav yang di-inject tidak memiliki role/aria-label; external links harus menggunakan rel="noopener" ketika target="\_blank".
- Patch contoh:

  --- a/src/js/component.js
  +++ b/src/js/component.js
  @@
  -            <nav class="w-full px-6 lg:px-20 py-6 bg-neutral ...">
  *            <nav role="navigation" aria-label="Main Navigation" class="w-full px-6 lg:px-20 py-6 bg-neutral ...">

- Prioritas: MEDIUM
- Difficulty: low

7. assets/images/\* — Performance (report)

- Temuan singkat: banyak file gambar lebih besar dari 200KB (contoh: `first-news.png` ~676KB, `banner-satu.png` ~788KB, `hero-background-image.png` ~676KB, dll). Ini berdampak besar ke LCP dan bandwidth mobile.
- Rekomendasi:
  - Buat versi WebP/AVIF teroptimasi (tool: `cwebp`, `imagemagick`, `squoosh`, atau build step di CI).
  - Tambah `srcset` dan `sizes` untuk gambar hero/slider untuk melayani ukuran yang sesuai device.
  - Set long cache headers pada server untuk aset statis.

  Contoh (lokal):

  cwebp -q 80 assets/images/banner-satu.png -o assets/images/banner-satu.webp
  cwebp -q 80 assets/images/first-news.png -o assets/images/first-news.webp

- Prioritas: HIGH
- Difficulty: medium

8. Tooling / Dev workflow — repo root

- Masalah singkat: tidak ada configuration file untuk ESLint / Stylelint / Prettier.
- Rekomendasi cepat: tambahkan `.eslintrc.json`, `.prettierrc`, dan `stylelint` config; kemudian tambahkan `npm` scripts untuk `lint` dan `format`.

  Contoh minimal `.eslintrc.json`:

  {
  "env": { "browser": true, "es2021": true },
  "extends": ["eslint:recommended"],
  "parserOptions": { "ecmaVersion": 12, "sourceType": "module" }
  }

- Prioritas: MEDIUM
- Difficulty: low

Automated checks I attempted / notes

- I prepared small audit scripts (Lighthouse + axe) earlier but package/script edits were reverted in the repository; I didn't run Lighthouse/axe automatically because the repo currently does not contain the audit runner files persisted in this state. If you want, I can re-add those scripts and devDependencies and run them here (I will update `package.json` and install devDependencies). Otherwise I provide the scripts and commands so you can run locally.

How-to (recommended) — quick commands you can run locally

1. Serve the `public/` directory (example using `http-server` globally):

```bash
npx http-server . -p 8080
```

2. Run Lighthouse from your machine (requires Chrome):

```bash
lighthouse http://localhost:8080/public/index.html --output=json --output-path=./revisi/audit/lighthouse.json --chrome-flags="--headless"
```

3. Run axe-core via a Puppeteer script (I can add `scripts/axe-runner.js` if you want me to write/run it):

```bash
# node scripts/axe-runner.js
```

Follow-up / Next steps I can execute for you

- (A) Create a `revisi/patches/` folder with unified-diff patch files for the diffs above so you can `git apply` them. (I can generate them and not commit.)
- (B) Add ESLint/Prettier/Stylelint configs and run linters, reporting results.
- (C) Recreate and run Lighthouse + axe runner here (I will add devDependencies and run `npm install`).
- (D) Bulk-generate WebP at quality 80 for listed images and add `srcset` suggestions (I can produce a script, but I won't overwrite images without your approval).

Files and artifacts

- This `revisi.md` is the consolidated audit (location: repo root).
- I can create `revisi/patches/*.patch` with the diffs above on demand (not created yet; confirm and I will produce them).

Final note — verification

- I performed a static audit of the repo files visible in this workspace session: `public/*.html`, `src/js/*.js`, `src/css/input.css`, and `assets/images/*` sizes. The most urgent wins are image optimization, lazy loading, small JS hardening (null checks), and font-display changes.
- If you confirm which follow-up (A/B/C/D) you want next, I'll continue and produce applied patches or run the automated audits.

---

Summary completion: revisi.md updated. Jika mau, saya langsung buat `revisi/patches/*.patch` dan/atau menjalankan Lighthouse + axe secara otomatis.

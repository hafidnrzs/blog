---
title: 'Akhirnya Jadi Juga Blog Baru'
description: 'Setelah berpindah-pindah dari WordPress, Hashnode, hingga dev.to, akhirnya aku punya rumah sendiri di internet.'
pubDate: 2026-03-01
heroImage: 'https://media.hafidnrzs.com/new-blog.jpg'
---

Pertama kali aku mulai menulis di **WordPress**. Waktu itu aku merasa WordPress adalah pilihan paling masuk akal, tidak perlu ngoding, banyak plugin, dan tinggal fokus menulis saja. Namun, WordPress.com sekarang tidak gratis, self-host WordPress pun perlu biaya sewa web hosting yang lumayan tiap bulannya.

Lalu, aku pindah ke **Hashnode**. Platform ini gratis dan mudah digunakan. Cuma, setiap kali mengakses Hashnode selalu dihadapkan dengan security check dan loading halaman yang lama. Akhirnya aku mencari-cari platform blog lainnya.

Ada beberapa opsi, yaitu **Substack**, **dev.to**, dan **Medium**. Aku mengincar platform yang menyediakan fitur _code snippet_ dan pembaca sesama developer. Pilihanku jatuh ke **dev.to** karena komunitasnya aktif dan tulisan lebih mudah ditemukan orang. Kamu bisa akses blog-ku di https://dev.to/hafidnrzs.

Walaupun begitu, aku masih merasa ini bukan _rumah_, dan akhirnya memutuskan untuk membangun sendiri.

## Mengapa Astro?

Setelah berbagai pertimbangan, aku memutuskan membangun blog menggunakan **Astro**.

![Logo Astro](https://media.hafidnrzs.com/astro-logo.webp)

Astro adalah framework JavaScript yang dirancang khusus untuk membuat website yang berfokus pada konten, seperti blog.[^1] Ia menggunakan pendekatan <abbr title="Static Site Generation">SSG</abbr>, artinya halaman di-_generate_ saat build, bukan saat ada request masuk.

> "Ship less JavaScript" adalah prinsip utama Astro. Secara default, Astro tidak mengirimkan JavaScript ke browser sama sekali, kecuali memintanya secara eksplisit.

Ini yang membuatnya menarik bagiku.

[^1]: Astro pertama kali dirilis secara publik pada tahun 2021 dan dengan cepat mendapat perhatian besar di komunitas web developer karena pendekatannya yang unik dalam mengurangi JavaScript yang dikirim ke browser.

## Tech Stack yang Digunakan

1. **Astro** - framework utama
2. **CSS murni** - untuk styling halaman
3. **Markdown** - untuk konten blog
   - Frontmatter untuk metadata
   - MDX untuk konten yang lebih dinamis (mungkin ke depannya)
4. **GitHub** - untuk version control
5. **Cloudflare** - untuk deployment

Aku sengaja tidak menggunakan TailwindCSS atau framework CSS apapun. Ini yang paling menyenangkan sekaligus menyiksa, sebagai tantangan agar bisa memahami CSS secara mendalam.

## Cara Menulis Artikel dengan Astro dan Markdown

Setiap artikel di Astro ditulis menggunakan Markdown dan disimpan di folder `src/content/blog`. Untuk memformat teks, aku bisa menggunakan berbagai syntax seperti **tebal**, _miring_, atau `kode inline`.

Markdown juga bisa me-render keyboard shortcut, seperti <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>. Atau bahkan potongan kode seperti

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

## Mengapa Penting Punya Blog Sendiri?

Menulis di platform orang lain itu ibarat menyewa kos. Bisa tinggal di sana, tapi banyak aturan ketat, dan sewaktu-waktu bisa diusir. Punya blog sendiri berarti punya <mark>rumah sendiri</mark> di internet. Konten sepenuhnya milik sendiri. Desain bisa diatur dengan bebas.

Blog-ku di **dev.to** tetap dipakai, tetapi akan fokus pada konten-konten bahasa Inggris dan blog ini untuk semua dev-log dan tulisan berbahasa Indonesia.

Saat ini blog ada di versi 1<sup>st</sup> iteration, masih tahap awal dan nantinya akan banyak perubahan.

Terima kasih sudah mampir ke rumah baruku. Seperti air (H<sub>2</sub>O), tulisan di sini akan terus mengalir dan berubah bentuk sesuai kebutuhan.

Sampai jumpa di artikel berikutnya.

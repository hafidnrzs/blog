---
title: 'Finally, I added the attribution to Claude in the commit messages and PR description'
description: 'Welcome back, Co-Authored-By: Claude...'
pubDate: 2026-09-18
heroImage: 'https://media.hafidnrzs.com/claude-attribution.webp'
---

Sekarang, tahun 2026, Large Language Model (LLM) sudah berkembang dengan kecepatan yang belum pernah terbayangkan sebelumnya. Sering kali kita menyebut "AI" untuk menggeneralisasi model LLM ini. Model-model AI sudah bisa generate code yang sangat bagus, layak dipakai untuk aplikasi production.

Sudah banyak coding agent yang digunakan oleh banyak programmer. Dari versi web ChatGPT, GitHub Copilot yang terintegrasi dengan IDE, sampai command line interface (CLI) seperti Codex, Claude Code, dan masih banyak lainnya.

Saya biasanya pakai Claude Code untuk membantu ngoding.

Jika kita meminta Claude untuk menggunakan Git untuk commit perubahan, dia akan menambahkan `Co-Authored-By: Claude...` di akhir commit message dan akhirnya Claude jadi salah satu kontributor di repository GitHub kalian. Selamat!

Awalnya, saya cukup terganggu dengan adanya tambahan itu. Saya cari cara untuk menonaktifkannya dan akhirnya nemu caranya dari sini (https://code.claude.com/docs/en/settings-reference#attribution).

Edit `~/.claude/settings.json` dan tambahkan field commit dan pr, lalu isi dengan string kosong.

```json
{
  "attribution": {
    "commit": "",
    "pr": "",
    "sessionUrl": false
  }
}
```

Akhirnya commit message menjadi bersih. Saya menggunakan Claude Code untuk generate code, menulis commit message otomatis, buat Pull Request, dan tidak ada jejak nama Claude di sana.

Happy ending...?

Ternyata, tidak demikian. Saya berubah pikiran setelah menjalankannya setelah beberapa bulan.

## Mengapa saya memutuskan untuk menambahkan kembali AI attribution itu?

AI menghasilkan jumlah kode yang sangat banyak dan cepat. Dengan volume dan kecepatan seperti ini akhirnya timbul masalah juga.

Saya sering menemukan komentar di kode berupa _wall of text_ menggunakan bahasa yang sulit dipahami. Tertulis bahasa Indonesia atau bahasa Inggris, tetapi bukan seperti cara manusia menulis. Kalau sudah sering baca tulisan hasil generate AI pasti bakal tahu bedanya. Sering juga disebut, "AI banget ini".

Contohnya seperti commit message di bawah. Diambil dari salah satu project yang saya kerjakan.

```
Hide Buy Now on your own listing

Three unrelated presentation fixes that all landed in the same pass.

A seller opening their own listing was offered Buy Now and Chat with
Seller. Neither does anything useful for them, and Buy Now would have
walked them into paying themselves. isOwnProduct already gated the chat
button; it now gates both buy controls, and the mobile section drops the
padding that only existed to clear the fixed buy bar.

Sold thumbnails were greyscale at 40% opacity, which read as a broken or
still-loading image rather than a listing that has already gone. They are
now simply darkened, so the item stays recognisable.

On a phone the three landing-page reviews were a column, which buried the
second and third under a scroll nobody makes. They are now one swipeable
row: the card is centred, its neighbours peek in from both edges, and
dots below say where you are. It advances every five seconds until the
reader scrolls it themselves, and holds still for prefers-reduced-motion.
The row breaks out of the section padding so a neighbouring card runs off
the screen edge instead of being sliced short of it, and the section
gained the bottom padding it never had, which had left See All Reviews
sitting on the footer's rule.
```

Jujur, Inggris saya ga sejago itu untuk bisa menulis paragraf sedetail dan serapi itu.
Manusia normal juga saya yakin tidak akan menulis seperti itu. Sudah lelah mengerjakan kode, tidak ada waktu dan tenaga untuk menyusun sastra dalam bentuk commit message.

Masalah lainnya juga muncul, seperti AI tidak mengikuti convention dan aturan yang sudah ditentukan di repo, tidak menggunakan pattern yang sudah ada di proyek, dan beberapa kode juga secara kualitas jelek dan tidak optimal.

Worst case scenario, jika 6 bulan ke depan, saya ditanya kembali tentang commit yang dilakukan pada hari, tanggal, jam tertentu dan ternyata itu sepenuhnya dibuat oleh AI. Bagaimana saya bisa menjawabnya kalau ternyata potongan kode itu menimbulkan masalah di server production di kemudian hari dan `git blame` menunjuk ke saya pribadi?
Biasanya saat bekerja penuh dengan AI, saya hanya melihat secara garis besar apa yang dikerjakan saat itu, mengerjakan 1 Pull Request yang isinya bisa belasan commit terpisah, dan by default mengecek satu per satu commit dan mengecek perbedaan baris tiap commit itu malah menjadi bottleneck tersendiri.

Dari berbagai temuan itu, saya berpikiran untuk mengembalikan penanda bahwa itu AI-generated.

Penambahan attribution pada commit yang dibuat oleh AI juga memberi tahu informasi lebih lanjut seperti model AI yang digunakan. Contohnya sebagai berikut:

```
Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
```

Dari keterangan di atas, diketahui bahwa kode itu ditulis oleh model Claude Opus 5. Reviewer bisa tahu model apa yang digunakan untuk membantu penulisan kode. Kalau code-nya kebetulan jelek dan model yang dipakai ternyata memang "model murah" orang bisa saja bilang, "Oh, pantes AI slop, bukan pakai model frontier ternyata."

Semua kembali lagi, integritas dan kejujuran adalah hal utama dalam melakukan semua pekerjaan.

Ga perlu malu, sekarang kamu udah ga ngoding manual juga kan?

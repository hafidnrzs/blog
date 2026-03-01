---
title: 'Model Context Protocol (MCP): Arsitektur, Komponen, dan Project Sederhana'
description: 'Bayangkan kamu sedang mengerjakan proyek dan data tersebar di spreadsheet, Notion, beberapa API eksternal dan harus diintegrasikan. Gimana caranya?'
pubDate: 2025-08-12
heroImage: 'https://media.hafidnrzs.com/mcp-illustration.jpg'
---

Bayangkan kamu sedang mengerjakan proyek penting di laptop. Ada data perusahaan yang tersimpan di spreadsheet, catatan rapat di Notion, beberapa API eksternal yang harus diintegrasikan, dan baris-baris kode yang perlu diperbaiki di code editor.

Umumnya workflow waktu memanfaatkan AI itu bolak-balik buka ChatGPT atau Claude, menjelaskan konteksnya, copy-paste data, lalu balik lagi ke code editor. Proses ini tidak hanya memakan waktu, tetapi juga rentan menimbulkan miskomunikasi, terlebih jika AI tidak memiliki akses langsung ke sumber data yang dimaksud.

Pada November 2024, Anthropic, perusahaan di balik Claude, merilis **Model Context Protocol** sebagai proyek open-source ([https://www.anthropic.com/news/model-context-protocol](https://www.anthropic.com/news/model-context-protocol)). Protokol ini dirancang sebagai standar baru untuk menghubungkan asisten AI dengan sistem tempat data berada:

- repositori konten seperti Notion dan Google Docs,
- perangkat bisnis seperti CRM dan ERP,
- hingga lingkungan pengembangan seperti VSCode.

MCP itu ibarat kabel "USB-C" di aplikasi AI. MCP menjadi konektor serbaguna yang menghubungkan berbagai sistem dan sumber data ke AI. Dengan protokol ini, AI tidak lagi terisolasi dalam chat, melainkan dapat langsung berinteraksi dengan database, API, IDE, maupun repository.

**Mengapa MCP?**

Pertama, _<mark>Large Language Model </mark>_ <mark>(LLM) tidak dapat mengakses sumber data eksternal secara langsung</mark>. Tanpa koneksi ke database perusahaan atau API aplikasi lain, LLM hanya mengandalkan pengetahuan yang dimiliki saat pelatihan, sehingga jawabannya sering tidak sesuai kondisi terkini dan berisiko menghasilkan _hallucination_, yaitu memberi informasi palsu yang tampak meyakinkan.

Kedua, <mark>alur kerja antara IDE dan AI kerap terputus</mark>. Developer biasanya harus bolak-balik dari _code editor_ ke platform AI, seperti ChatGPT, menulis prompt, lalu menyalin kembali hasilnya ke IDE. MCP mengatasi hambatan ini dengan menghadirkan AI langsung di lingkungan kerja.

Masalah lainnya adalah <mark>tidak ada standar untuk koneksi AI ke </mark> _<mark>tools</mark>_. Sebelum MCP, setiap integrasi memiliki cara berbeda untuk menghubungkan AI dengan sistem eksternal, membuat adopsi AI di berbagai platform menjadi lambat. Dengan adanya MCP sebagai protokol universal, semua klien yang mendukungnya dapat langsung memanfaatkan koneksi yang sama.

**Hubungan MCP dengan LLM, AI Agent, dan IDE Extensions**

**LLM** berperan sebagai "otak" yang memproses bahasa alami dan menghasilkan respons. **MCP** menjadi jembatan penghubung LLM dengan berbagai _tools_ dan _data source_. **AI Agent** memanfaatkan MCP untuk menjalankan perintah yang memerlukan data atau aksi di luar LLM itu sendiri. Sementara itu, **ekstensi IDE** seperti Claude Code, Roo Code, atau GitHub Copilot Chat bertindak sebagai MCP Client yang berinteraksi dengan MCP Server untuk mengambil data, mengeksekusi tools, atau memanggil API. Beberapa MCP Server populer yang banyak digunakan antara lain GitHub, Google Drive, dan Notion, yang membuka akses langsung bagi AI untuk berkolaborasi dengan data di platform tersebut.

## Arsitektur MCP

Model Context Protocol (MCP) mengikuti pola arsitektur _client-server_, di mana MCP Server menyediakan _capability_ tertentu dan MCP Client memanfaatkannya.

### MCP Server

Pada sisi server, terdapat tiga komponen utama

1. **Tools**: fungsi atau aksi yang dapat dijalankan server, misalnya pencarian data atau pembuatan entri baru.
2. **Resources**: berperan sebagai penyedia data mentah atau informasi yang dapat diakses oleh _tools_ atau langsung oleh client.
3. **Prompts**: instruksi atau skenario siap pakai yang dirancang untuk memandu LLM menggunakan _tools_ dan _resources_ secara efektif

### MCP Client

Di sisi client, terdapat beberapa fitur penting.

1. **Roots**: menentukan direktori atau lokasi file yang diizinkan untuk diakses server, mengikuti prinsip _least privilege_.
2. **Sampling**: memungkinkan server meminta klien untuk melakukan panggilan ke LLM guna menghasilkan respons atau melengkapi output.
3. **Elicitation**: memungkinkan server meminta input langsung dari pengguna melalui klien, baik untuk konfirmasi maupun pengisian data.

### Transport Layer

Komunikasi antara MCP Client dan MCP Server berlangsung melalui _transport layer_ yang fleksibel. Protokol MCP mendukung:

- **STDIO**, yang sederhana dan cepat untuk koneksi lokal, serta
- **HTTP** untuk komunikasi jarak jauh atau integrasi dengan layanan berbasis web.

### JSON-RPC

Di atas _transport layer_, MCP menggunakan **JSON-RPC** sebagai _base protocol_, menyediakan format standar untuk permintaan (_request_) dan balasan (_response_) antara client dan server secara stateless.

_Remote Procedure Call_ (RPC) adalah metode komunikasi antar proses yang memungkinkan sebuah program memanggil fungsi atau prosedur yang berada di komputer/proses lain, seolah-olah fungsi tersebut berjalan secara lokal. Dalam konteks MCP, RPC digunakan agar MCP Client dapat memanggil fungsi di MCP Server, misalnya `search_flights`, lalu menerima hasilnya kembali.

Struktur umum pesan JSON-RPC adalah sebagai berikut:

**1\. Request**

```json
{
  "jsonrpc": "2.0",
  "method": "add",
  "params": {
    "a": 10,
    "b": 5
  },
  "id": 42
}
```

- **jsonrpc**: versi protokol (MCP menggunakan `"2.0"`).
- **method**: nama fungsi/prosedur yang ingin dipanggil di server.
- **params**: parameter yang dikirim ke fungsi tersebut.
- **id**: identitas unik permintaan, untuk mencocokkan respons.

**2\. Response**

```json
{
  "jsonrpc": "2.0",
  "result": 15,
  "error": {}, // if error
  "id": 42
}
```

- **result**: hasil dari eksekusi fungsi.
- **error** _(opsional)_: jika terjadi kesalahan, berisi detail error menggantikan `result`.
- **id**: untuk memastikan respons sesuai dengan permintaan.

## Menggunakan MCP Server: Flight Booking

**Prasyarat**

- [Git](https://git-scm.com/downloads)
- [uv (Python package manager)](https://docs.astral.sh/uv/)
- [Visual Studio Code](https://code.visualstudio.com/)
- Roo Code (VSCode extension)

Sebelum memulai mencoba menggunakan MCP Server untuk pertama kali. Pastikan untuk menginstall semua prasyarat di atas.

Panduan ini adalah penerapan dari tutorial dari KodeKloud: [MCP Tutorial: Build Your First MCP Server and Client from Scratch (Free Labs)](https://www.youtube.com/watch?v=RhTiAOGwbYE&t=79s).

Repositori proyek dapat diunduh dari GitHub: [hafidnrzs/kodekloud-mcp](https://github.com/hafidnrzs/kodekloud-mcp/).

### 1\. Clone repository project

Buka Terminal atau Command Prompt, lalu jalankan perintah berikut:

```bash
git clone https://github.com/hafidnrzs/kodekloud-mcp.git
```

Setelah proses selesai, buka folder hasil unduhan menggunakan **Visual Studio Code**.

### 2\. Konfigurasi Roo Code dan model

Buka ekstensi **Roo Code** di Visual Studio Code. Secara default, Roo Code masih perlu dikonfigurasi sebelum digunakan.

#### 2.1. Daftar dan Buat API Key di OpenRouter

1. Kunjungi [https://openrouter.ai/settings/keys](https://openrouter.ai/settings/keys)
2. Klik **Create API Key**.
3. Namai API Key bebas. Misalnya `mcp-key`
4. Salin API Key yang sudah dibuat dan simpan di tempat aman. Perlakukan seperti password. Jangan dibagikan ke publik.

#### 2.2. Tambahkan Profile di Roo Code

Tampilan awal ekstensi Roo Code yang sudah terinstal seperti ini. Namun, masih perlu dikonfigurasi sebelum dapat menggunakannya.

![Tampilan awal Roo Code](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0wbuokg91kk5pqliewtu.png)

- Pada Roo Code, klik **Add Profile**.
  - Isi pengaturan sebagai berikut:
  - **Name**: `deepseek-free` (atau nama sesuai keinginan)
  - **API Provider**: `OpenAI Compatible`
  - **Base URL**: [`https://openrouter.ai/api/v1`](https://openrouter.ai/api/v1)
  - **API Key**: Paste API Key yang tadi dibuat
  - **Model**: `deepseek/deepseek-chat-v3-0324:free`

![Konfigurasi profil Roo Code](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/47htzv7r9ahr10zd3t2d.png)

- Klik **Save**.

### 3\. Konfigurasi MCP Server di Roo Code

1. Buka menu **MCP Servers** di Roo Code.

![Buka menu MCP Servers di Roo Code](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n19rqm5z4tewr7ibord0.png)

2. Klik **Edit Project MCP**.
3. Akan terbuka file `mcp.json`. Isi dengan konfigurasi berikut:

```json
{
  "mcpServers": {
    "flight-booking": {
      "command": "uv",
      "args": ["run", "python", "server.py"],
      "cwd": "D:/aegislabs/kodekloud-mcp/flight-booking-server"
    }
  }
}
```

> **Catatan:** Ganti nilai `cwd` sesuai dengan lokasi folder proyek di komputermu.

4. Simpan file `mcp.json`.
5. Klik **Refresh MCP Servers** di Roo Code. Pastikan ikon hijau muncul pada `flight-booking` yang menandakan server aktif.

### Mencoba Prompt di MCP Client

Setelah server aktif, bisa mencoba menjalankan prompt di chat Roo Code:

**Memanggil tools:**

```bash
Search for flights from LAX to JFK using the flight-booking server
```

![Panggil tools di Roo Code](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/189ysv94g8mwtzklj4b0.png)

**Mengakses resources:**

```bash
Get airport information using the flight-booking MCP server
```

![Akses resource di Roo Code](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dbcwn8h8srde67xb5sd8.png)

**Menjalankan booking:**

```bash
Book flight FL123 for John Doe using flight-booking server
```

---

**❓Punya pertanyaan, saran, atau menemukan bagian yang perlu diperbaiki? Silakan tulis di kolom komentar, aku dengan senang hati menanggapi. Terima kasih sudah mengikuti panduan ini sampai selesai**

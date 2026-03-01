---
title: 'Data Leakage pada Machine Learning'
description: 'Ternyata selama ini aku salah dalam training model machine learning'
pubDate: 2025-04-03
heroImage: 'https://media.hafidnrzs.com/data-leakage-machine-learning.jpg'
---

Ada suatu utas di Threads yang bilang kalau sering banget _mentee-mentee_ melakukan kesalahan basic.

![Threads post dari math_adventurer](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4x0k1kpm50sv7c88tk4y.png)

Urutannya sepertinya sudah sesuai: Exploratory Data Analysis (EDA), preprocessing, split dataset, buat model, dan evaluasi. Penasaran dong salahnya ada di mana?

Setelah menyimak beberapa jawaban, ternyata masalahnya ada di data testing yang seharusnya tidak diketahui oleh model saat training, tetapi justru sudah bocor ke dalam data training. Dalam Machine Learning, ini disebut **Data Leakage**.

Di [artikel Medium ini](https://medium.com/@speaktoharisudhan/data-leakage-in-machine-leaning-c382b65f4c09) dijelaskan lebih lengkap tentang Data Leakage. Masalah ini tergolong dalam _Train-Test Contamination_ di mana informasi pada data testing, seperti nilai rata-rata, itu sudah terhitung saat proses standarisasi. Jadi, model sudah tahu sebaran data testing selama melakukan pelatihan.

<img src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/htr22r3m9h6beaxu5xi8.png" alt="Test set nyontek train set" style="max-width: 600px;" />

Lebih lengkapnya, ini adalah formula untuk melakukan standarisasi. Diperlukan data mean (rata-rata) dan deviasi standar.

![Standard deviation formula](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6683paynx7zhyvx6sipe.png)

Jika proses standarisasi dilakukan sebelum memisahkan data menjadi train dan test set, maka nilai rata-rata dan deviasi standar dihitung dari keseluruhan data. Hal ini menyebabkan model secara ga langsung _mengintip_ informasi dari data testing saat proses training.

Agar tidak terjadi kebocoran, langkah yang benar yaitu: pisahkan dulu data menjadi train dan test set. Kemudian, fit scaler hanya pada data training, dan gunakan scaler itu untuk mentransformasi saat proses testing. Dengan begitu, model tetap "buta" terhadap data testing selama proses pelatihan.

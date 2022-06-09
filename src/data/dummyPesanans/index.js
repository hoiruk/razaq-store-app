import {
    KurmaSukari,
    KurmaZuhdi,
    ParfumeLovely,
    ParfumeDalal,
    Kurma,
    Parfume

  } from '../../assets';
  
  export const dummyPesanans = [
    {
      id: 1,
      tanggalPemesanan: 'Jumat, 10 September 2020',
      status: 'keranjang',
      totalHarga: 120000,
      berat: 1,
      pesanans: [
        {
          id: 1,
          product: {
            id: 1,
            nama: 'Kurma Zuhdi',
            gambar: [KurmaZuhdi],
            liga: {
              id: 2,
              nama: 'Kurma',
              gambar: Kurma,
            },
            harga: 40000,
            berat: 300,
            jenis: "Kurma Zuhdi",
            ready: true
          },
          jumlahPesan: 1,
          totalHarga: 40000,
          keterangan: null,
        },
        {
          id: 2,
          product: {
            id: 2,
            nama: "PARFUM LOVELY",
            gambar: [ParfumeLovely],
            kategori: {
                id: 3,
                nama: "Parfume",
                gambar: Parfume,
            },
            harga: 15000,
            berat: 15,
            jenis: "Parfum Lovely",
            ready: true
          },
          jumlahPesan: 2,
          totalHarga: 30000,
          keterangan: null,
          ukuran: "L"
        }
      ]
    },
    {
      id: 2,
      tanggalPemesanan: 'Jumat, 18 September 2020',
      status: 'lunas',
      totalHarga: 100000,
      berat: 0.75,
      pesanans: [
        {
          id: 1,
          product: {
            id: 5,
            nama: "PARFUM DALAL",
        gambar: [ParfumeDalal],
        kategori: {
            id: 3,
            nama: "Parfume",
            gambar: Parfume,
        },
        harga: 15000,
        berat: 15,
        jenis: "Parfum Dalal",
        ready: true
          },
          jumlahPesan: 1,
          totalHarga: 20000,
          keterangan: "Parfum Dibungkus bubble wrap.",
          ukuran: "L"
        },
        {
          id: 2,
          product: {
            id: 7,
            nama: "KURMA SUKARI",
        gambar: [KurmaSukari],
        kategori: {
            id: 1,
            nama: "Kurma",
            gambar: Kurma,
        },
        harga: 40000,
        berat: 300,
        jenis: "Kurma Sukari",
        ready: true
          },
          jumlahPesan: 2,
          totalHarga: 80000,
          keterangan: "mohon dikirim secepatnya",
          ukuran: "M"
        }
      ]
    }
  ];
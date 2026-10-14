/**
 * KONFIGURASI PUSAT PERNIAGAAN — NASI KERABU MAK JAH
 * 
 * Pusat tetapan maklumat rasmi perniagaan bagi Nasi Kerabu Mak Jah.
 * Sebarang kemas kini maklumat seperti nombor telefon, URL media sosial,
 * dan alamat premis hendaklah dibuat di fail ini.
 */

const BUSINESS_CONFIG = {
  // 1. Identiti Perniagaan
  name: "Nasi Kerabu Mak Jah",
  slogan: "Keenakan Tradisi, Rasa Yang Dirindui",
  businessType: "Jualan nasi kerabu dan makanan tradisional Melayu",
  tagline: "Sajian Nasi Kerabu Bunga Telang Asli & Masakan Tradisional Melayu di Sungai Petani",

  // 2. Lokasi
  location: {
    short: "Sungai Petani, Kedah",
    full: "Sungai Petani, Kedah, Malaysia",
    exactAddress: null, // Alamat premis/gerai khusus belum diberikan
    mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=Sungai+Petani,+Kedah,+Malaysia",
    note: "Alamat premis/gerai khusus akan dikemas kini sebaik sahaja disahkan oleh pemilik perniagaan."
  },

  // 3. Waktu Operasi
  operatingHours: {
    display: "2.00 petang – 11.00 malam",
    heroText: "2.00 petang – 11.00 malam",
    fullText: "Setiap hari: 2.00 petang – 11.00 malam",
    ownerNotice: "Maklumat waktu operasi ini adalah berdasarkan maklumat yang diberikan pemilik. Jadual hari operasi mingguan dan status cuti rasmi akan dikemas kini selepas disahkan.",
    // Jangan menyatakan "dibuka sekarang" secara automatik kerana jadual cuti belum disahkan
    enableLiveStatusBadge: false 
  },

  // 4. WhatsApp & Pesanan
  whatsapp: {
    // Nombor yang diberikan oleh pemilik: 012-345678 (6 digit selepas awalan - belum lengkap)
    rawInput: "012-345678",
    // Nombor antarabangsa sebenar (cth: "60123456789") — Dikosongkan sehingga disahkan lengkap
    internationalNumber: "", 
    // Status pengesahan: false (Jangan anggap sah secara automatik)
    isVerified: false,
    verificationStatusText: "Nombor WhatsApp (012-345678) masih dalam semakan pengesahan format lengkap.",
    actionNotice: "Nombor WhatsApp rasmi sedang disahkan oleh pemilik perniagaan sebelum talian pesanan terus diaktifkan."
  },

  // 5. Media Sosial (Nama Akaun Sahaja — Jangan Mereka Pautan Profil)
  socialMedia: {
    facebook: {
      platform: "Facebook",
      accountName: "nasi kerabu mak jah",
      url: null, // Pautan profil sebenar belum disahkan
      handle: "@nasi kerabu mak jah",
      icon: "facebook"
    },
    tiktok: {
      platform: "TikTok",
      accountName: "nasi kerabu mak jah",
      url: null, // Pautan profil sebenar belum disahkan
      handle: "@nasi kerabu mak jah",
      icon: "tiktok"
    },
    instagram: {
      platform: "Instagram",
      accountName: "nasi kerabu mak jah",
      url: null, // Pautan profil sebenar belum disahkan
      handle: "@nasi kerabu mak jah",
      icon: "instagram"
    }
  },

  // 6. Penafian & Standard Gambar Makanan
  disclaimers: {
    stockPhotoNotice: "Gambar yang dipaparkan adalah tujuan ilustrasi cadangan sajian tradisional dan bukan gambar rasmi hidangan Nasi Kerabu Mak Jah sehingga gambar sebenar dimuat naik oleh pihak pemilik.",
    pricingNotice: "Harga belum ditetapkan secara rasmi. Semua harga dipaparkan sebagai 'Harga akan dikemas kini' tanpa anggaran palsu."
  },

  // 7. Senarai Semak Penerbitan (Maklumat Diperlukan Sebelum Go-Live)
  pendingVerification: [
    {
      id: "whatsapp",
      title: "Pengesahan Nombor WhatsApp Lengkap",
      current: "012-345678 (kurang digit untuk nombor Malaysia)",
      actionNeeded: "Berikan nombor telefon mudah alih lengkap (cth: 012-345 6789) dalam format antarabangsa."
    },
    {
      id: "address",
      title: "Alamat Premis / Gerai Terperinci",
      current: "Sungai Petani, Kedah (Carian kawasan umum)",
      actionNeeded: "Berikan nombor kedai, nama jalan, poskod atau pautan pin Google Maps tepat premis jualan."
    },
    {
      id: "schedule",
      title: "Jadual Hari Operasi & Cuti Mingguan",
      current: "2.00 petang – 11.00 malam",
      actionNeeded: "Sahkan sama ada beroperasi setiap hari atau mempunyai hari cuti tertentu (contohnya: Cuti Isnin/Jumaat)."
    },
    {
      id: "menu_prices",
      title: "Senarai Harga Rasmi Menu",
      current: "Harga akan dikemas kini",
      actionNeeded: "Bekalkan senarai harga bagi setiap set Nasi Kerabu, lauk sampingan dan minuman."
    },
    {
      id: "social_urls",
      title: "URL Pautan Profil Media Sosial",
      current: "Nama akaun: 'nasi kerabu mak jah' (FB, TikTok, IG)",
      actionNeeded: "Berikan URL lengkap profil rasmi Facebook, TikTok dan Instagram."
    },
    {
      id: "dish_photos",
      title: "Gambar Asli Masakan Mak Jah",
      current: "Ilustrasi visual cadangan sajian",
      actionNeeded: "Muat naik gambar sebenar hidangan yang dimasak oleh Nasi Kerabu Mak Jah."
    }
  ]
};

// Eksport untuk kegunaan skrip laman web
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BUSINESS_CONFIG;
}

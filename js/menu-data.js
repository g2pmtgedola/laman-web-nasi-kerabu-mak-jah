/**
 * DATA MENU RASMI — NASI KERABU MAK JAH
 * 
 * Struktur data bagi konsep reka bentuk berinspirasikan paparan kontemporari:
 * - Cursive Script Modifier (scriptName) + Bold Main Title (boldName)
 * - Kad bertema warna unik (themeColor)
 * - Bekas hidangan terapung (pop-out image)
 * - Lencana status harga bulat bergaris putus-putus
 * - Pematuhan ketat integriti: tiada harga rekaan (price: null)
 */

const MENU_CATEGORIES = [
  { id: "all", name: "Semua Menu", icon: "utensils" },
  { id: "nasi-kerabu", name: "Sajian Nasi Kerabu", icon: "bowl-rice" },
  { id: "lauk-pauk", name: "Lauk Tradisional", icon: "drumstick-bite" },
  { id: "sampingan", name: "Ulam & Sampingan", icon: "leaf" },
  { id: "minuman", name: "Minuman Tradisional", icon: "glass-water" }
];

const MENU_ITEMS = [
  // Kategori: Sajian Nasi Kerabu
  {
    id: "nk-ayam-berempah",
    name: "Nasi Kerabu Ayam Berempah",
    scriptName: "Ayam Berempah",
    boldName: "Nasi Kerabu",
    category: "nasi-kerabu",
    categoryName: "Sajian Nasi Kerabu",
    description: "Nasi biru bunga telang harum dihidang bersama ayam goreng berempah panas rangup, ulam-ulaman segar kampung, sambal kelapa sangai, kuah tumis beraroma dan keropok keping.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/dish_ayam_berempah.jpg",
    badge: "Pilihan Utama",
    themeColor: "#4d7c0f", // Olive Leaf Green
    rating: "4.9",
    ratingText: "Resepi Asli Bunga Telang"
  },
  {
    id: "nk-daging-bakar",
    name: "Nasi Kerabu Daging Bakar",
    scriptName: "Daging Bakar",
    boldName: "Nasi Kerabu",
    category: "nasi-kerabu",
    categoryName: "Sajian Nasi Kerabu",
    description: "Kombinasi nasi biru asli bersama hirisan daging lembu bakar beraroma asap, kuah tumis pekat, ulaman daun kesum, bunga kantan, sambal kelapa dan keropok.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_daging_bakar.svg",
    badge: "Resepi Tradisi",
    themeColor: "#d97706", // Warm Spiced Mustard/Amber
    rating: "4.9",
    ratingText: "Aroma Arang Warisan"
  },
  {
    id: "nk-ikan-celup",
    name: "Nasi Kerabu Ikan Celup Tepung",
    scriptName: "Ikan Celup",
    boldName: "Nasi Kerabu",
    category: "nasi-kerabu",
    categoryName: "Sajian Nasi Kerabu",
    description: "Sajian nasi kerabu autentik disajikan dengan ikan segar yang disalut adunan tepung rempah digoreng rangup keemasan, lengkap dengan ulaman dan kuah tumis khas.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_ikan_celup.svg",
    badge: "Tradisi Pantai Timur",
    themeColor: "#0284c7", // Turquoise / Biru Kerabu
    rating: "4.8",
    ratingText: "Ikan Segar Rangup"
  },
  {
    id: "nk-kambing-bakar",
    name: "Nasi Kerabu Kambing Bakar",
    scriptName: "Kambing Bakar",
    boldName: "Nasi Kerabu",
    category: "nasi-kerabu",
    categoryName: "Sajian Nasi Kerabu",
    description: "Set istimewa dengan perapan daging kambing bakar lembut berperisa rempah warisan, disajikan lengkap bersama ramuan nasi kerabu tradisi.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_kambing_bakar.svg",
    badge: "Sajian Istimewa",
    themeColor: "#0f766e", // Deep Teal
    rating: "4.9",
    ratingText: "Perapan Rempah Warisan"
  },
  {
    id: "nk-biasa-telur-masin",
    name: "Nasi Kerabu Biasa Telur Masin",
    scriptName: "Telur Masin",
    boldName: "Nasi Kerabu",
    category: "nasi-kerabu",
    categoryName: "Sajian Nasi Kerabu",
    description: "Hidangan asas nasi kerabu biru bunga telang disempurnakan dengan separuh telur itik masin, keropok ikan, kuah tumis, ulam segar kampung dan sambal kelapa beraroma.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_telur_masin.svg",
    badge: "Klasik Asli",
    themeColor: "#15803d", // Leaf Green
    rating: "4.8",
    ratingText: "Klasik Bunga Telang"
  },

  // Kategori: Lauk Tradisional
  {
    id: "lauk-ayam-berempah",
    name: "Ayam Goreng Berempah (Sekeping)",
    scriptName: "Goreng Berempah",
    boldName: "Ayam Panas",
    category: "lauk-pauk",
    categoryName: "Lauk Tradisional",
    description: "Ayam segar diperap serai, kunyit, ketumbar dan rempah tradisi, digoreng garing dengan taburan serdak rempah wangi menyelerakan.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/dish_ayam_berempah.jpg",
    badge: "Lauk Panas Garing",
    themeColor: "#b45309", // Spiced Gold
    rating: "4.9",
    ratingText: "Serdak Rempah Wangi"
  },
  {
    id: "lauk-daging-bakar",
    name: "Daging Bakar Tradisional (Sajian)",
    scriptName: "Perap Arang",
    boldName: "Daging Bakar",
    category: "lauk-pauk",
    categoryName: "Lauk Tradisional",
    description: "Daging lembu lembut diperap rempah rahsia Mak Jah dan dibakar arang sehingga naik aroma asap yang memikat selera.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_daging_porsi.svg",
    badge: "Aroma Arang",
    themeColor: "#991b1b", // Rich Maroon
    rating: "4.9",
    ratingText: "Sos Colek Tradisi"
  },
  {
    id: "lauk-ikan-celup",
    name: "Ikan Celup Tepung Rangup",
    scriptName: "Celup Tepung",
    boldName: "Ikan Rangup",
    category: "lauk-pauk",
    categoryName: "Lauk Tradisional",
    description: "Ikan segar digoreng panas dengan bancuhan tepung bersalut rempah rangup keemasan.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_ikan_goreng.svg",
    badge: "Rangup Panas",
    themeColor: "#0369a1", // Ocean Blue
    rating: "4.8",
    ratingText: "Tepung Rangup Kuning"
  },

  // Kategori: Ulam & Sampingan
  {
    id: "samp-solok-lada",
    name: "Solok Lada Asli",
    scriptName: "Warisan Asli",
    boldName: "Solok Lada",
    category: "sampingan",
    categoryName: "Ulam & Sampingan",
    description: "Lada hijau segar disumbat adunan isi ikan, kelapa parut dan santan pekat berempah. Pelengkap tradisi wajib bagi penggemar nasi kerabu.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_solok_lada.svg",
    badge: "Warisan Asli",
    themeColor: "#166534", // Deep Green
    rating: "4.9",
    ratingText: "Kelapa & Isi Ikan"
  },
  {
    id: "samp-keropok",
    name: "Keropok Ikan Keping (1 Peket)",
    scriptName: "Ikan Segar",
    boldName: "Keropok Keping",
    category: "sampingan",
    categoryName: "Ulam & Sampingan",
    description: "Keropok keping kaya rasa ikan segar, digoreng kembang dan rangup.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_keropok.svg",
    badge: "Kudapan",
    themeColor: "#b45309", // Warm Amber
    rating: "4.8",
    ratingText: "Rangup Asli"
  },
  {
    id: "samp-telur-masin",
    name: "Telur Masin Rebus (Sebiji)",
    scriptName: "Telur Itik",
    boldName: "Telur Masin",
    category: "sampingan",
    categoryName: "Ulam & Sampingan",
    description: "Telur itik masin dengan kuning telur berpasir dan berlemak, direbus segar setiap hari.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_telur_itik.svg",
    badge: "Pelengkap",
    themeColor: "#0e7490", // Teal Blue
    rating: "4.8",
    ratingText: "Kuning Berlemak"
  },

  // Kategori: Minuman Tradisional
  {
    id: "minum-teh-ais-madu",
    name: "Teh Ais Madu Kelantan",
    scriptName: "Buih Madu",
    boldName: "Teh Ais",
    category: "minuman",
    categoryName: "Minuman Tradisional",
    description: "Teh susu ditarik pekat dengan buih berkrim manis beraroma madu asli yang menyegarkan dahaga.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_teh_ais.svg",
    badge: "Penyejuk Tekak",
    themeColor: "#c2410c", // Tea Terracotta
    rating: "4.9",
    ratingText: "Tarik Pekat Berbuih"
  },
  {
    id: "minum-sirap-selasih",
    name: "Air Sirap Limau Selasih",
    scriptName: "Limau Nipis",
    boldName: "Sirap Selasih",
    category: "minuman",
    categoryName: "Minuman Tradisional",
    description: "Minuman sirap mawar wangi dipadukan dengan perahan limau nipis segar dan biji selasih sejumput rasa tradisi.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_sirap_limau.svg",
    badge: "Segar Sejuk",
    themeColor: "#be123c", // Rose Pink
    rating: "4.8",
    ratingText: "Aroma Mawar Asli"
  },
  {
    id: "minum-kopi-kampung",
    name: "Kopi Kampung Ais Kaw",
    scriptName: "Biji Tempatan",
    boldName: "Kopi Ais Kaw",
    category: "minuman",
    categoryName: "Minuman Tradisional",
    description: "Kopi hitam biji tempatan dibancuh pekat kaw dengan susu pekat manis aroma tradisional.",
    price: null,
    priceStatus: "Akan Dikemas Kini",
    priceSubnote: "Harga Sah Pemilik",
    image: "assets/images/menu_kopi_ais.svg",
    badge: "Aroma Pekat",
    themeColor: "#451a03", // Deep Roasted Coffee
    rating: "4.9",
    ratingText: "Bancuhan Kaw Tradisi"
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MENU_CATEGORIES, MENU_ITEMS };
}

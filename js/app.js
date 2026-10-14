/**
 * APLIKASI UTAMA — NASI KERABU MAK JAH (KONSEP KONTEMPORARI + SISTEM CMS ADMIN)
 * 
 * Mengendalikan:
 * 1. Troli Pesanan & Pembaikan Butang "Jana Pesanan WhatsApp" (Sentiasa responsif)
 * 2. Log Masuk Pentadbir (ID: admin, Kata Laluan: 123456)
 * 3. CMS Pentadbir: Ubah data perniagaan, menu, harga, dan muat naik gambar sendiri
 * 4. Pengoptimuman & pemampatan gambar automatik ke storan tempatan (localStorage)
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. Muat Data Tersimpan dari LocalStorage (Jika Pernah Diubah Oleh Admin)
  // --------------------------------------------------------------------------
  let appConfig = Object.assign({}, BUSINESS_CONFIG);
  let appMenu = [...MENU_ITEMS];

  try {
    const savedCustomConfig = localStorage.getItem('nkmj_custom_config');
    if (savedCustomConfig) {
      appConfig = JSON.parse(savedCustomConfig);
    }
    const savedCustomMenu = localStorage.getItem('nkmj_custom_menu');
    if (savedCustomMenu) {
      appMenu = JSON.parse(savedCustomMenu);
    }
  } catch (err) {
    console.warn('Gagal membaca data tersimpan dari localStorage:', err);
  }

  // --------------------------------------------------------------------------
  // 2. Keadaan Aplikasi & Troli Pesanan
  // --------------------------------------------------------------------------
  const state = {
    cart: [],
    activeCategory: 'all',
    searchQuery: '',
    isAdmin: sessionStorage.getItem('nkmj_admin_auth') === 'true',
    selectedEditingDishId: appMenu[0] ? appMenu[0].id : null
  };

  try {
    const savedCart = localStorage.getItem('nkmj_cart');
    if (savedCart) {
      state.cart = JSON.parse(savedCart);
    }
  } catch (e) {
    console.warn('Gagal membaca troli:', e);
  }

  // --------------------------------------------------------------------------
  // 3. Elemen DOM
  // --------------------------------------------------------------------------
  const menuGridEl = document.getElementById('menuGrid');
  const searchInputEl = document.getElementById('menuSearchInput');
  const categoryTabsEl = document.getElementById('categoryTabs');
  const cartTriggerBtns = document.querySelectorAll('.js-cart-trigger');
  const cartBadgeEls = document.querySelectorAll('.js-cart-badge');
  const orderDrawerBackdrop = document.getElementById('orderDrawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerItemsListEl = document.getElementById('drawerItemsList');
  const drawerEmptyStateEl = document.getElementById('drawerEmptyState');
  const orderNotesInput = document.getElementById('orderNotesInput');
  const btnGenerateOrder = document.getElementById('btnGenerateOrder');
  const toastNoticeEl = document.getElementById('toastNotice');

  // Carousel
  const btnCarouselPrev = document.getElementById('carouselPrev');
  const btnCarouselNext = document.getElementById('carouselNext');

  // WhatsApp Modal
  const whatsappModal = document.getElementById('whatsappModal');
  const whatsappModalClose = document.getElementById('whatsappModalClose');
  const whatsappPreviewText = document.getElementById('whatsappPreviewText');
  const btnCopyOrderText = document.getElementById('btnCopyOrderText');
  const btnDirectSendWhatsApp = document.getElementById('btnDirectSendWhatsApp');
  const btnTestVerifiedNumber = document.getElementById('btnTestVerifiedNumber');
  const testNumberInput = document.getElementById('testNumberInput');

  // Social Modal & Checklist Modal
  const socialModal = document.getElementById('socialModal');
  const socialModalClose = document.getElementById('socialModalClose');
  const socialPlatformNameEl = document.getElementById('socialPlatformName');
  const socialAccountNameEl = document.getElementById('socialAccountName');
  const checklistModal = document.getElementById('checklistModal');
  const checklistModalClose = document.getElementById('checklistModalClose');
  const checklistItemsList = document.getElementById('checklistItemsList');

  // Admin Elements
  const adminTopBar = document.getElementById('adminTopBar');
  const btnOpenCMS = document.getElementById('btnOpenCMS');
  const btnAdminLogout = document.getElementById('btnAdminLogout');
  const adminLoginModal = document.getElementById('adminLoginModal');
  const adminLoginClose = document.getElementById('adminLoginClose');
  const adminLoginForm = document.getElementById('adminLoginForm');
  const adminLoginUser = document.getElementById('adminLoginUser');
  const adminLoginPass = document.getElementById('adminLoginPass');
  const adminLoginError = document.getElementById('adminLoginError');

  // CMS Modal & Form Elements
  const adminCMSModal = document.getElementById('adminCMSModal');
  const adminCMSClose = document.getElementById('adminCMSClose');
  const cmsSelectDish = document.getElementById('cmsSelectDish');
  const cmsDishName = document.getElementById('cmsDishName');
  const cmsDishCategory = document.getElementById('cmsDishCategory');
  const cmsDishScript = document.getElementById('cmsDishScript');
  const cmsDishBold = document.getElementById('cmsDishBold');
  const cmsDishPrice = document.getElementById('cmsDishPrice');
  const cmsDishColor = document.getElementById('cmsDishColor');
  const cmsDishDesc = document.getElementById('cmsDishDesc');
  const cmsDishFileInput = document.getElementById('cmsDishFileInput');
  const cmsDishPreviewImg = document.getElementById('cmsDishPreviewImg');
  const btnSaveCurrentDish = document.getElementById('btnSaveCurrentDish');

  // Hero CMS
  const cmsHeroFileInput = document.getElementById('cmsHeroFileInput');
  const cmsHeroPreviewImg = document.getElementById('cmsHeroPreviewImg');
  const btnSaveHeroImage = document.getElementById('btnSaveHeroImage');

  // Business CMS
  const cmsBizName = document.getElementById('cmsBizName');
  const cmsBizSlogan = document.getElementById('cmsBizSlogan');
  const cmsBizWA = document.getElementById('cmsBizWA');
  const cmsBizWAVerified = document.getElementById('cmsBizWAVerified');
  const cmsBizLoc = document.getElementById('cmsBizLoc');
  const cmsBizHours = document.getElementById('cmsBizHours');
  const cmsBizAddress = document.getElementById('cmsBizAddress');
  const cmsBizFB = document.getElementById('cmsBizFB');
  const cmsBizTT = document.getElementById('cmsBizTT');
  const cmsBizIG = document.getElementById('cmsBizIG');
  const btnSaveBusinessConfig = document.getElementById('btnSaveBusinessConfig');

  // Settings & Reset
  const btnExportJSON = document.getElementById('btnExportJSON');
  const btnResetAllData = document.getElementById('btnResetAllData');

  // Mobile Nav
  const navHamburgerBtn = document.getElementById('navHamburgerBtn');
  const navMenuMobile = document.getElementById('navMenuMobile');

  // --------------------------------------------------------------------------
  // 4. Aplikasi UI Bersifat Dinamik Berdasarkan appConfig
  // --------------------------------------------------------------------------
  function applyConfigToDOM() {
    // Kemas kini gambar hero jika ada gambar muat naik tersimpan
    const savedHeroImg = localStorage.getItem('nkmj_custom_hero');
    if (savedHeroImg) {
      document.querySelectorAll('.hero-dish-image-wrapper img').forEach(img => {
        img.src = savedHeroImg;
      });
      if (cmsHeroPreviewImg) cmsHeroPreviewImg.src = savedHeroImg;
    }

    // Kemas kini pautan WhatsApp di header
    const phoneDisplay = appConfig.whatsapp && appConfig.whatsapp.rawInput ? appConfig.whatsapp.rawInput : '012-345678';
    document.querySelectorAll('.nav-call-pill span:last-child').forEach(el => {
      el.textContent = `CALL / WA: ${phoneDisplay}`;
    });

    // Kemas kini tahun semasa footer
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
  }

  // --------------------------------------------------------------------------
  // 5. Paparan Kad Makanan Pop-Out (Menepati Reka Bentuk Rujukan)
  // --------------------------------------------------------------------------
  function renderMenu() {
    if (!menuGridEl) return;

    const filteredItems = appMenu.filter(item => {
      const matchCategory = state.activeCategory === 'all' || item.category === state.activeCategory;
      const matchSearch = state.searchQuery === '' || 
        item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        (item.scriptName && item.scriptName.toLowerCase().includes(state.searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });

    if (filteredItems.length === 0) {
      menuGridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: #4b5563;">
          <p style="font-size: 1.2rem; font-weight: 800; color: #2b180d;">Tiada hidangan dijumpai</p>
          <p style="font-size: 0.95rem; margin-top: 0.35rem;">Sila cuba kata kunci carian lain atau pilih tab kategori berbeza.</p>
        </div>
      `;
      return;
    }

    menuGridEl.innerHTML = filteredItems.map(item => {
      const cardColor = item.themeColor || '#506b1e';
      const priceText = item.price ? `RM ${parseFloat(item.price).toFixed(2)}` : 'KEMAS KINI';
      const subPriceText = item.price ? 'Harga Sah' : 'Sah Pemilik';

      return `
        <article class="popout-food-card" style="background-color: ${cardColor};" data-id="${item.id}">
          <!-- Butang Edit Khas Admin -->
          <button type="button" class="admin-card-edit-btn js-admin-edit-dish" data-id="${item.id}" title="Ubah Hidangan Ini">
            ✏️ Ubah Hidangan
          </button>

          <!-- Bekas Makanan Terapung (Pop-Out Dish Container) -->
          <div class="popout-dish-container">
            <div class="dish-box-inner">
              <img src="${item.image}" alt="${item.name}" loading="lazy" />
            </div>

            <!-- Lencana Harga / Status Bulat Bergaris Putus-Putus -->
            <div class="card-circular-stamp" aria-label="Status Harga">
              <span class="card-stamp-label">HARGA</span>
              <span class="card-stamp-status">${priceText}</span>
              <span class="card-stamp-sub">${subPriceText}</span>
            </div>
          </div>

          <!-- Teks Tipografi Dwi-Gaya: Script Cursive + Bold Title -->
          <div class="card-script-name">${item.scriptName || item.badge || 'Sajian Tradisi'}</div>
          <h3 class="card-bold-name">${item.boldName || item.name}</h3>

          <!-- Penilaian Bintang -->
          <div class="card-rating-row">
            <span class="card-stars">★★★★★</span>
            <span class="card-rating-num">${item.rating || '4.9'}</span>
          </div>

          <!-- Penerangan -->
          <p class="card-description-text">${item.description}</p>

          <!-- Butang Gelap Gaya Rujukan (ORDER NOW) -->
          <button type="button" class="card-order-btn-dark btn-add-order" data-id="${item.id}" aria-label="Pesan ${item.name}">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
            ORDER NOW
          </button>
        </article>
      `;
    }).join('');

    // Event listeners butang ORDER NOW
    menuGridEl.querySelectorAll('.btn-add-order').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.getAttribute('data-id');
        addToCart(itemId);
      });
    });

    // Event listeners butang Edit Admin pada kad
    menuGridEl.querySelectorAll('.js-admin-edit-dish').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.currentTarget.getAttribute('data-id');
        openCMSForDish(itemId);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Pengurusan Troli Pesanan & PEMBAIKAN BUTANG JANA PESANAN
  // --------------------------------------------------------------------------
  function saveCart() {
    try {
      localStorage.setItem('nkmj_cart', JSON.stringify(state.cart));
    } catch (e) {
      console.warn('Gagal menyimpan troli:', e);
    }
    updateCartUI();
  }

  function addToCart(itemId) {
    const item = appMenu.find(m => m.id === itemId);
    if (!item) return;

    const existingIndex = state.cart.findIndex(c => c.id === itemId);
    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += 1;
    } else {
      state.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1
      });
    }

    saveCart();
    showToast(`"${item.name}" dimasukkan ke pesanan.`);
  }

  function updateQuantity(itemId, delta) {
    const itemIndex = state.cart.findIndex(c => c.id === itemId);
    if (itemIndex === -1) return;

    state.cart[itemIndex].quantity += delta;
    if (state.cart[itemIndex].quantity <= 0) {
      state.cart.splice(itemIndex, 1);
    }
    saveCart();
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartBadgeEls.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'inline-block' : 'none';
    });

    if (!drawerItemsListEl || !drawerEmptyStateEl) return;

    // PENTING: Jangan lumpuhkan (disable) butang btnGenerateOrder!
    // Walaupun troli belum dipilih item, pengguna boleh menghantar pertanyaan atau nota pesanan (cth: "sambal asing").
    if (btnGenerateOrder) {
      btnGenerateOrder.disabled = false;
    }

    if (state.cart.length === 0) {
      drawerItemsListEl.innerHTML = '';
      drawerEmptyStateEl.style.display = 'flex';
    } else {
      drawerEmptyStateEl.style.display = 'none';

      drawerItemsListEl.innerHTML = state.cart.map(item => `
        <div class="drawer-item-row">
          <div>
            <h4 class="drawer-item-name">${item.name}</h4>
            <span class="drawer-item-price-note">${item.price ? `RM ${parseFloat(item.price).toFixed(2)}` : 'Harga akan dikemas kini'}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <button type="button" class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Kurangkan">-</button>
            <span style="font-weight: 800; min-width: 20px; text-align: center;">${item.quantity}</span>
            <button type="button" class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Tambah">+</button>
          </div>
        </div>
      `).join('');

      drawerItemsListEl.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const action = e.currentTarget.getAttribute('data-action');
          const id = e.currentTarget.getAttribute('data-id');
          updateQuantity(id, action === 'inc' ? 1 : -1);
        });
      });
    }
  }

  // --------------------------------------------------------------------------
  // 7. Penjanaan Mesej Pesanan WhatsApp
  // --------------------------------------------------------------------------
  function generateOrderMessage() {
    const today = new Date().toLocaleDateString('ms-MY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let message = `*PESANAN NASI KERABU MAK JAH*\n`;
    message += `📍 Lokasi: ${appConfig.location ? appConfig.location.short : 'Sungai Petani, Kedah'}\n`;
    message += `📅 Tarikh: ${today}\n\n`;
    message += `*SENARAI PESANAN PILIHAN:*\n`;

    if (state.cart.length > 0) {
      let hasCalculatedTotal = true;
      let totalSum = 0;

      state.cart.forEach(item => {
        if (item.price && !isNaN(item.price)) {
          const sub = parseFloat(item.price) * item.quantity;
          totalSum += sub;
          message += `• ${item.quantity}x ${item.name} (RM ${sub.toFixed(2)})\n`;
        } else {
          hasCalculatedTotal = false;
          message += `• ${item.quantity}x ${item.name} (Harga akan disahkan)\n`;
        }
      });

      if (hasCalculatedTotal && totalSum > 0) {
        message += `\n*Jumlah Anggaran:* RM ${totalSum.toFixed(2)}\n`;
      } else {
        message += `\n*Status Jumlah:* Tertakluk kepada pengesahan harga oleh Nasi Kerabu Mak Jah\n`;
      }
    } else {
      message += `• Pertanyaan Menu / Tempahan Makanan\n`;
    }

    const notes = orderNotesInput ? orderNotesInput.value.trim() : '';
    if (notes) {
      message += `\n*Nota / Permintaan Khas:* ${notes}\n`;
    }

    message += `\n_Pesanan ini dijana daripada laman web rasmi Nasi Kerabu Mak Jah._`;
    return message;
  }

  // --------------------------------------------------------------------------
  // 8. Pengendalian Tindakan Klik WhatsApp
  // --------------------------------------------------------------------------
  function handleWhatsAppAction() {
    // Tutup drawer troli dengan serta-merta supaya paparan jelas
    if (orderDrawerBackdrop) {
      orderDrawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }

    const message = generateOrderMessage();
    const isVerified = appConfig.whatsapp && appConfig.whatsapp.isVerified;
    const phone = appConfig.whatsapp && (appConfig.whatsapp.internationalNumber || appConfig.whatsapp.rawInput);

    if (isVerified && phone) {
      // Jika telah disahkan oleh admin, buka terus WhatsApp
      let cleanPhone = phone.replace(/[^0-9]/g, '');
      if (cleanPhone.startsWith('0')) cleanPhone = '6' + cleanPhone;
      const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
      showToast('Membuka WhatsApp untuk menghantar pesanan...');
    } else {
      // Jika nombor belum disahkan, buka modal pratonton pesanan
      openWhatsAppModal(message);
    }
  }

  function openWhatsAppModal(message) {
    if (!whatsappModal || !whatsappPreviewText) return;
    whatsappPreviewText.textContent = message;
    whatsappModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeWhatsAppModal() {
    if (!whatsappModal) return;
    whatsappModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // 9. Pemampat Gambar Automatik (HTML5 Canvas)
  // Menjimatkan storan localStorage (Menukar 5MB-10MB foto ke ~120KB)
  // --------------------------------------------------------------------------
  function compressImageFile(file, maxWidth, quality, callback) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        callback(dataUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // --------------------------------------------------------------------------
  // 10. Sistem Log Masuk Pentadbir (Admin Login)
  // ID: admin, Password: 123456
  // --------------------------------------------------------------------------
  function checkAdminSession() {
    if (state.isAdmin) {
      document.body.classList.add('admin-mode-active');
      if (adminTopBar) adminTopBar.style.display = 'block';
    } else {
      document.body.classList.remove('admin-mode-active');
      if (adminTopBar) adminTopBar.style.display = 'none';
    }
  }

  function openLoginModal() {
    if (!adminLoginModal) return;
    if (adminLoginError) adminLoginError.style.display = 'none';
    adminLoginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLoginModal() {
    if (!adminLoginModal) return;
    adminLoginModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = adminLoginUser.value.trim();
      const pass = adminLoginPass.value.trim();

      // PENGESAHAN KREDENSIAL: admin / 123456
      if (user === 'admin' && pass === '123456') {
        state.isAdmin = true;
        sessionStorage.setItem('nkmj_admin_auth', 'true');
        checkAdminSession();
        closeLoginModal();
        renderMenu();
        openCMSModal();
        showToast('Log masuk berjaya! Mod Admin kini aktif.');
      } else {
        if (adminLoginError) {
          adminLoginError.textContent = 'ID atau kata laluan salah. Sila gunakan ID: admin dan Kata Laluan: 123456';
          adminLoginError.style.display = 'block';
        }
      }
    });
  }

  if (btnAdminLogout) {
    btnAdminLogout.addEventListener('click', () => {
      state.isAdmin = false;
      sessionStorage.removeItem('nkmj_admin_auth');
      checkAdminSession();
      renderMenu();
      if (adminCMSModal) adminCMSModal.classList.remove('active');
      showToast('Admin telah log keluar.');
    });
  }

  // --------------------------------------------------------------------------
  // 11. Panel Pengurusan Kandungan (Admin CMS)
  // --------------------------------------------------------------------------
  function openCMSModal() {
    if (!adminCMSModal) return;
    populateCMSDishes();
    populateCMSBusiness();
    adminCMSModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openCMSForDish(dishId) {
    openCMSModal();
    // Buka tab menu & pilih hidangan
    document.querySelectorAll('.cms-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.cms-tab-pane').forEach(p => p.classList.remove('active'));
    const tabMenuBtn = document.querySelector('.cms-tab-btn[data-tab="tab-menu"]');
    const tabMenuPane = document.getElementById('tab-menu');
    if (tabMenuBtn && tabMenuPane) {
      tabMenuBtn.classList.add('active');
      tabMenuPane.classList.add('active');
    }
    if (cmsSelectDish) {
      cmsSelectDish.value = dishId;
      loadDishIntoCMS(dishId);
    }
  }

  // Tab switching dalam CMS
  document.querySelectorAll('.cms-tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.getAttribute('data-tab');
      document.querySelectorAll('.cms-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.cms-tab-pane').forEach(p => p.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const pane = document.getElementById(targetTab);
      if (pane) pane.classList.add('active');
    });
  });

  // Isi senarai hidangan dalam CMS
  function populateCMSDishes() {
    if (!cmsSelectDish) return;
    cmsSelectDish.innerHTML = appMenu.map(d => `
      <option value="${d.id}">${d.name} (${d.categoryName || d.category})</option>
    `).join('');

    const firstDish = appMenu[0];
    if (firstDish) {
      loadDishIntoCMS(firstDish.id);
    }
  }

  function loadDishIntoCMS(dishId) {
    const dish = appMenu.find(d => d.id === dishId);
    if (!dish) return;

    state.selectedEditingDishId = dishId;
    if (cmsDishName) cmsDishName.value = dish.name || '';
    if (cmsDishCategory) cmsDishCategory.value = dish.category || 'nasi-kerabu';
    if (cmsDishScript) cmsDishScript.value = dish.scriptName || '';
    if (cmsDishBold) cmsDishBold.value = dish.boldName || '';
    if (cmsDishPrice) cmsDishPrice.value = dish.price !== null && dish.price !== undefined ? dish.price : '';
    if (cmsDishColor) cmsDishColor.value = dish.themeColor || '#506b1e';
    if (cmsDishDesc) cmsDishDesc.value = dish.description || '';
    if (cmsDishPreviewImg) cmsDishPreviewImg.src = dish.image || '';
  }

  if (cmsSelectDish) {
    cmsSelectDish.addEventListener('change', (e) => {
      loadDishIntoCMS(e.target.value);
    });
  }

  // Muat naik gambar hidangan menu
  if (cmsDishFileInput) {
    cmsDishFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        showToast('Memproses & memampatkan gambar hidangan...');
        compressImageFile(file, 800, 0.85, (compressedDataUrl) => {
          if (cmsDishPreviewImg) cmsDishPreviewImg.src = compressedDataUrl;
          showToast('Gambar sedia! Klik "Simpan Hidangan Ini" untuk menetapkannya.');
        });
      }
    });
  }

  // Simpan perubahan hidangan
  if (btnSaveCurrentDish) {
    btnSaveCurrentDish.addEventListener('click', () => {
      const dishIndex = appMenu.findIndex(d => d.id === state.selectedEditingDishId);
      if (dishIndex === -1) return;

      const rawPrice = cmsDishPrice.value.trim();
      const parsedPrice = rawPrice === '' ? null : parseFloat(rawPrice.replace(/[^0-9.]/g, ''));

      appMenu[dishIndex] = Object.assign({}, appMenu[dishIndex], {
        name: cmsDishName.value.trim() || appMenu[dishIndex].name,
        category: cmsDishCategory.value,
        categoryName: cmsDishCategory.options[cmsDishCategory.selectedIndex].text,
        scriptName: cmsDishScript.value.trim() || appMenu[dishIndex].scriptName,
        boldName: cmsDishBold.value.trim() || appMenu[dishIndex].boldName,
        price: isNaN(parsedPrice) ? null : parsedPrice,
        priceStatus: parsedPrice ? `RM ${parsedPrice.toFixed(2)}` : 'Akan Dikemas Kini',
        themeColor: cmsDishColor.value,
        description: cmsDishDesc.value.trim(),
        image: cmsDishPreviewImg.src || appMenu[dishIndex].image
      });

      // Simpan ke localStorage
      try {
        localStorage.setItem('nkmj_custom_menu', JSON.stringify(appMenu));
        renderMenu();
        showToast(`Hidangan "${appMenu[dishIndex].name}" berjaya dikemas kini!`);
      } catch (err) {
        alert('Gagal menyimpan ke localStorage. Saiz storan mungkin terhad: ' + err);
      }
    });
  }

  // Muat naik & simpan gambar Hero utama
  if (cmsHeroFileInput) {
    cmsHeroFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        showToast('Memproses gambar hero...');
        compressImageFile(file, 1200, 0.88, (compressedDataUrl) => {
          if (cmsHeroPreviewImg) cmsHeroPreviewImg.src = compressedDataUrl;
          showToast('Gambar hero sedia! Klik "Gunakan Sebagai Gambar Hero".');
        });
      }
    });
  }

  if (btnSaveHeroImage) {
    btnSaveHeroImage.addEventListener('click', () => {
      const newHeroImg = cmsHeroPreviewImg.src;
      if (!newHeroImg) return;

      try {
        localStorage.setItem('nkmj_custom_hero', newHeroImg);
        document.querySelectorAll('.hero-dish-image-wrapper img').forEach(img => {
          img.src = newHeroImg;
        });
        showToast('Gambar Hero Laman Utama berjaya ditukar!');
      } catch (err) {
        alert('Gagal menyimpan gambar hero: ' + err);
      }
    });
  }

  // Isi & simpan data perniagaan
  function populateCMSBusiness() {
    if (cmsBizName) cmsBizName.value = appConfig.name || '';
    if (cmsBizSlogan) cmsBizSlogan.value = appConfig.slogan || '';
    if (cmsBizWA) cmsBizWA.value = (appConfig.whatsapp && appConfig.whatsapp.rawInput) || '';
    if (cmsBizWAVerified) cmsBizWAVerified.checked = !!(appConfig.whatsapp && appConfig.whatsapp.isVerified);
    if (cmsBizLoc) cmsBizLoc.value = (appConfig.location && appConfig.location.short) || '';
    if (cmsBizHours) cmsBizHours.value = (appConfig.operatingHours && appConfig.operatingHours.display) || '';
    if (cmsBizAddress) cmsBizAddress.value = (appConfig.location && appConfig.location.exactAddress) || '';
    if (cmsBizFB) cmsBizFB.value = (appConfig.socialMedia && appConfig.socialMedia.facebook && appConfig.socialMedia.facebook.url) || '';
    if (cmsBizTT) cmsBizTT.value = (appConfig.socialMedia && appConfig.socialMedia.tiktok && appConfig.socialMedia.tiktok.url) || '';
    if (cmsBizIG) cmsBizIG.value = (appConfig.socialMedia && appConfig.socialMedia.instagram && appConfig.socialMedia.instagram.url) || '';
  }

  if (btnSaveBusinessConfig) {
    btnSaveBusinessConfig.addEventListener('click', () => {
      const cleanWA = cmsBizWA.value.trim().replace(/[^0-9]/g, '');
      let intWA = cleanWA;
      if (intWA.startsWith('0')) intWA = '6' + intWA;

      appConfig = {
        name: cmsBizName.value.trim() || 'Nasi Kerabu Mak Jah',
        slogan: cmsBizSlogan.value.trim() || 'Keenakan Tradisi, Rasa Yang Dirindui',
        location: {
          short: cmsBizLoc.value.trim() || 'Sungai Petani, Kedah',
          full: 'Sungai Petani, Kedah, Malaysia',
          exactAddress: cmsBizAddress.value.trim() || null
        },
        operatingHours: {
          display: cmsBizHours.value.trim() || '2.00 petang – 11.00 malam'
        },
        whatsapp: {
          rawInput: cmsBizWA.value.trim(),
          internationalNumber: intWA,
          isVerified: cmsBizWAVerified.checked
        },
        socialMedia: {
          facebook: { platform: 'Facebook', handle: '@nasi kerabu mak jah', url: cmsBizFB.value.trim() || null },
          tiktok: { platform: 'TikTok', handle: '@nasi kerabu mak jah', url: cmsBizTT.value.trim() || null },
          instagram: { platform: 'Instagram', handle: '@nasi kerabu mak jah', url: cmsBizIG.value.trim() || null }
        }
      };

      try {
        localStorage.setItem('nkmj_custom_config', JSON.stringify(appConfig));
        applyConfigToDOM();
        showToast('Maklumat perniagaan berjaya disimpan!');
      } catch (err) {
        alert('Gagal menyimpan maklumat perniagaan: ' + err);
      }
    });
  }

  // Reset Semua Data
  if (btnResetAllData) {
    btnResetAllData.addEventListener('click', () => {
      if (confirm('Adakah anda pasti ingin memadam semua data tersimpan dan kembali ke data asal?')) {
        localStorage.removeItem('nkmj_custom_config');
        localStorage.removeItem('nkmj_custom_menu');
        localStorage.removeItem('nkmj_custom_hero');
        alert('Semua data telah direset. Laman akan disegarkan semula.');
        window.location.reload();
      }
    });
  }

  // Eksport JSON
  if (btnExportJSON) {
    btnExportJSON.addEventListener('click', () => {
      const backupData = {
        config: appConfig,
        menu: appMenu,
        exportedAt: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nasi-kerabu-mak-jah-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Fail JSON berjaya dimuat turun!');
    });
  }

  // --------------------------------------------------------------------------
  // 12. Toast Notification Helper
  // --------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(text) {
    if (!toastNoticeEl) return;
    toastNoticeEl.textContent = text;
    toastNoticeEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNoticeEl.classList.remove('show');
    }, 3200);
  }

  // --------------------------------------------------------------------------
  // 13. Pengikatan Acara Tambahan (Carousel, Modals, Carian)
  // --------------------------------------------------------------------------

  // Carian
  if (searchInputEl) {
    searchInputEl.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      renderMenu();
    });
  }

  // Tab Kategori
  if (categoryTabsEl) {
    categoryTabsEl.querySelectorAll('.showcase-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        categoryTabsEl.querySelectorAll('.showcase-tab-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.activeCategory = e.currentTarget.getAttribute('data-category');
        renderMenu();
      });
    });
  }

  // Carousel
  if (btnCarouselPrev && btnCarouselNext && menuGridEl) {
    btnCarouselPrev.addEventListener('click', () => {
      menuGridEl.scrollBy({ left: -320, behavior: 'smooth' });
    });
    btnCarouselNext.addEventListener('click', () => {
      menuGridEl.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // Buka / Tutup Troli
  cartTriggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (orderDrawerBackdrop) {
        orderDrawerBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (drawerCloseBtn && orderDrawerBackdrop) {
    drawerCloseBtn.addEventListener('click', () => {
      orderDrawerBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (orderDrawerBackdrop) {
    orderDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === orderDrawerBackdrop) {
        orderDrawerBackdrop.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // PENTING: Butang Jana Pesanan WhatsApp dari Troli
  if (btnGenerateOrder) {
    btnGenerateOrder.addEventListener('click', handleWhatsAppAction);
  }

  // Butang WhatsApp di Hero & Navbar
  document.querySelectorAll('.js-whatsapp-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      handleWhatsAppAction();
    });
  });

  // Salin Format Mesej
  if (btnCopyOrderText && whatsappPreviewText) {
    btnCopyOrderText.addEventListener('click', () => {
      navigator.clipboard.writeText(whatsappPreviewText.textContent).then(() => {
        showToast('Mesej pesanan berjaya disalin ke papan klip!');
      });
    });
  }

  // Butang Hantar Terus ke WhatsApp (wa.me) dari modal
  if (btnDirectSendWhatsApp && whatsappPreviewText) {
    btnDirectSendWhatsApp.addEventListener('click', () => {
      const message = whatsappPreviewText.textContent;
      const phone = appConfig.whatsapp && (appConfig.whatsapp.internationalNumber || appConfig.whatsapp.rawInput);
      let cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
      if (cleanPhone.startsWith('0')) cleanPhone = '6' + cleanPhone;

      let waUrl;
      if (cleanPhone && cleanPhone.length >= 10) {
        waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
      } else {
        // Jika nombor belum ada, buka WhatsApp untuk kongsi/pilih kenalan
        waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
      }
      window.open(waUrl, '_blank');
      showToast('Membuka aplikasi WhatsApp...');
    });
  }

  // Ujian Nombor WhatsApp
  if (btnTestVerifiedNumber && testNumberInput) {
    btnTestVerifiedNumber.addEventListener('click', () => {
      const rawNumber = testNumberInput.value.trim();
      if (!rawNumber) {
        alert('Sila masukkan nombor telefon yang sah.');
        return;
      }
      let cleaned = rawNumber.replace(/[^0-9]/g, '');
      if (cleaned.startsWith('0')) cleaned = '6' + cleaned;
      else if (!cleaned.startsWith('60')) cleaned = '60' + cleaned;

      const message = generateOrderMessage();
      const testUrl = `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
      window.open(testUrl, '_blank');
      showToast(`Membuka WhatsApp ke nombor (+${cleaned}).`);
    });
  }

  // Tutup Modal WhatsApp
  if (whatsappModalClose) whatsappModalClose.addEventListener('click', closeWhatsAppModal);
  if (whatsappModal) {
    whatsappModal.addEventListener('click', (e) => {
      if (e.target === whatsappModal) closeWhatsAppModal();
    });
  }

  // Buka Modal Login Admin
  document.querySelectorAll('.js-open-login').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.isAdmin) {
        openCMSModal();
      } else {
        openLoginModal();
      }
    });
  });

  if (adminLoginClose) adminLoginClose.addEventListener('click', closeLoginModal);
  if (adminLoginModal) {
    adminLoginModal.addEventListener('click', (e) => {
      if (e.target === adminLoginModal) closeLoginModal();
    });
  }

  // Buka CMS Modal
  if (btnOpenCMS) {
    btnOpenCMS.addEventListener('click', openCMSModal);
  }
  if (adminCMSClose) adminCMSClose.addEventListener('click', () => {
    if (adminCMSModal) adminCMSModal.classList.remove('active');
    document.body.style.overflow = '';
  });
  if (adminCMSModal) {
    adminCMSModal.addEventListener('click', (e) => {
      if (e.target === adminCMSModal) {
        adminCMSModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Pautan Senarai Semak Penerbitan
  document.querySelectorAll('.js-open-checklist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!checklistModal || !checklistItemsList) return;

      checklistItemsList.innerHTML = BUSINESS_CONFIG.pendingVerification.map((item, index) => `
        <div style="background: #faf8f5; border: 1px solid #e5e7eb; border-radius: 12px; padding: 1rem;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.4rem;">
            <h4 style="font-size: 0.95rem; font-weight: 800; color: #2b180d;">
              ${index + 1}. ${item.title}
            </h4>
            <span style="font-size: 0.7rem; font-weight: 700; background: #fee2e2; color: #dc2626; padding: 0.15rem 0.55rem; border-radius: 9999px;">
              Perlu Tindakan
            </span>
          </div>
          <p style="font-size: 0.82rem; color: #6b7280; margin-bottom: 0.35rem;">
            <strong>Status Semasa:</strong> ${item.current}
          </p>
          <p style="font-size: 0.85rem; color: #e59838; font-weight: 700;">
            👉 <strong>Tindakan Pemilik:</strong> ${item.actionNeeded}
          </p>
        </div>
      `).join('');

      checklistModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (checklistModalClose) checklistModalClose.addEventListener('click', () => {
    if (checklistModal) checklistModal.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Media Sosial
  document.querySelectorAll('.js-social-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const platform = e.currentTarget.getAttribute('data-platform');
      const social = (appConfig.socialMedia && appConfig.socialMedia[platform]) || (BUSINESS_CONFIG.socialMedia && BUSINESS_CONFIG.socialMedia[platform]);
      if (social && social.url) {
        window.open(social.url, '_blank');
      } else {
        if (socialPlatformNameEl) socialPlatformNameEl.textContent = (social && social.platform) || platform;
        if (socialAccountNameEl) socialAccountNameEl.textContent = (social && social.handle) || '@nasi kerabu mak jah';
        if (socialModal) {
          socialModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      }
    });
  });

  if (socialModalClose) {
    socialModalClose.addEventListener('click', () => {
      if (socialModal) socialModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Hamburger Toggle
  if (navHamburgerBtn && navMenuMobile) {
    navHamburgerBtn.addEventListener('click', () => {
      navMenuMobile.classList.toggle('open');
    });
    navMenuMobile.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenuMobile.classList.remove('open');
      });
    });
  }

  // --------------------------------------------------------------------------
  // 14. Inisialisasi Awal
  // --------------------------------------------------------------------------
  applyConfigToDOM();
  checkAdminSession();
  renderMenu();
  updateCartUI();
});

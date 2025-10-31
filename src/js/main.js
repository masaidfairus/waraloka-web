let sidebar = document.getElementById('sidebar');
let tab_informasi = document.getElementById('tabinfo');
let tab_produk = document.getElementById('tabproduk');
let info_button = document.getElementById('infobutton');
let produk_button = document.getElementById('produkbutton');

function openSide() {
  sidebar.classList.replace('translate-x-full', 'translate-x-0')
}

function closeSide() {
  sidebar.classList.replace('translate-x-0', 'translate-x-full')
}

function info() {
  tab_informasi.classList.replace('absolute', 'relative');
  tab_informasi.classList.replace('invisible', 'visible');
  
  tab_produk.classList.replace('relative', 'absolute');
  tab_produk.classList.replace('visible', 'invisible');

  info_button.classList.replace('text-primary-text/60', 'text-primary')
  produk_button.classList.replace('text-primary', 'text-primary-text/60')
}

function produk() {
  tab_produk.classList.replace('absolute', 'relative');
  tab_produk.classList.replace('invisible', 'visible');
  
  tab_informasi.classList.replace('relative', 'absolute');
  tab_informasi.classList.replace('visible', 'invisible');

  info_button.classList.replace('text-primary', 'text-primary-text/60')
  produk_button.classList.replace('text-primary-text/60', 'text-primary')
}

const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },

  speed: 1500,
  spaceBetween: 30,
  centeredSlides: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

const customPagination = document.querySelectorAll('.swiper-pagination i');

// Update warna berdasarkan slide aktif
swiper.on('slideChange', () => {
  // Reset semua jadi abu-abu
  customPagination.forEach(dot => dot.classList.remove('text-primary-text'));
  customPagination.forEach(dot => dot.classList.add('text-gray-200'));

  // Ambil index aktif dari swiper (looped slides bikin perlu modifikasi)
  const realIndex = swiper.realIndex; // ini penting buat loop mode

  // Tambah warna aktif
  if (customPagination[realIndex]) {
    customPagination[realIndex].classList.remove('text-gray-200');
    customPagination[realIndex].classList.add('text-primary-text');
  }
});

// Tambahin event biar bisa diklik manual juga
customPagination.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    swiper.slideToLoop(index); // biar bisa loncat ke slide yang diklik
  });
});
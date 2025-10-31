let sidebar = document.getElementById('sidebar');

function openSide() {
    sidebar.classList.replace('translate-x-full', 'translate-x-0')
}

function closeSide() {
    sidebar.classList.replace('translate-x-0', 'translate-x-full')
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
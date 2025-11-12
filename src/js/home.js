import {
  getStoresData,
  renderUniqueStore,
  renderCategoryStore,
  getCategoriesArray,
} from "./component.js";

import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

function renderCategoriesOption(stores) {
  let categoriesHTML = ``;
  const categorySelector = document.getElementById("category-selector");
  const categories = getCategoriesArray(stores);
  for (let category of categories) {
    categoriesHTML += `
            <option class="text-primary-text text-base text-left font-pj-sans-regular capitalize" value="${category}">${category}</option>
        `;
  }
  categorySelector.innerHTML += categoriesHTML;
}

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },

  speed: 1500,
  spaceBetween: 30,
  centeredSlides: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const customPagination = document.querySelectorAll(".swiper-pagination i");

// Update warna berdasarkan slide aktif
swiper.on("slideChange", () => {
  // Reset semua jadi abu-abu
  customPagination.forEach((dot) => dot.classList.remove("text-primary-text"));
  customPagination.forEach((dot) => dot.classList.add("text-gray-200"));

  // Ambil index aktif dari swiper (looped slides bikin perlu modifikasi)
  const realIndex = swiper.realIndex; // ini penting buat loop mode

  // Tambah warna aktif
  if (customPagination[realIndex]) {
    customPagination[realIndex].classList.remove("text-gray-200");
    customPagination[realIndex].classList.add("text-primary-text");
  }
});

// Tambahin event biar bisa diklik manual juga
customPagination.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    swiper.slideToLoop(index); // biar bisa loncat ke slide yang diklik
  });
});

async function initHomePage() {
  const storesData = await getStoresData();
  const nearbyStoresWrapper = document.getElementById("nearby-stores-wrapper");
  renderUniqueStore(storesData, nearbyStoresWrapper, 5);
  renderCategoryStore(storesData, "Makanan & Minuman", 5);
  renderCategoriesOption(storesData);
}

document.addEventListener("DOMContentLoaded", initHomePage);

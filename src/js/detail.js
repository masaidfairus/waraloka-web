import { getStoresData } from './component.js';
import { renderUniqueStore } from './component.js';

const recommendedStoresWrapper = document.getElementById('recommended-stores-wrapper');
const storeOwnerModalEl = document.getElementById('store-owner-modal');
const storeNumberModalEl = document.getElementById('store-number-modal');
const storeLocationModalEl = document.getElementById('store-location-modal');
const storeNameBreadcrumbEl = document.getElementById('store-name-breadcrumb');
const storeNameHeadingEl = document.getElementById('store-name-heading');
const storeOpeningTimesEl = document.getElementById('store-opening-times');
const storeBenchmarkInfoEl = document.getElementById('store-benchmark-info');
const storeCategoryEl = document.getElementById('store-category');
const storeFirstGalleryEl = document.getElementById('store-first-gallery');
const storeSecondGalleryEl = document.getElementById('store-second-gallery');
const storeThirdGalleryEl = document.getElementById('store-third-gallery');
const storeDescriptionEl = document.getElementById('store-description');
const storeProductsWrapper = document.getElementById('store-products-wrapper');
const storeEmbedMapsEl = document.getElementById('store-embed-maps');
const storeMapsLinkEl = document.getElementById('store-maps-link');
const storeOwnerEl = document.getElementById('store-owner');
const storeTimesDetail = document.getElementById('store-times-detail');
const storeCalendarLink = document.getElementById('store-calendar-link');
const sideContentEl = document.getElementById('side-content');
const sideSectionEl = document.getElementById('side-section');
const infoTabEl = document.getElementById('tab-info');
const productTabEl = document.getElementById('tab-product');
const infoBtn = document.getElementById('info-btn');
const productBtn = document.getElementById('product-btn');
const modalSectionEl = document.getElementById('modal');
const modalCard = document.getElementById('modal-card');

document.getElementById('open-modal-btn').addEventListener('click', openModal);
document.getElementById('close-modal-btn').addEventListener('click', closeModal);
document.getElementById('close-sidebar-btn').addEventListener('click', openSidebar);
document.getElementById('close-sidebar-btn').addEventListener('click', closeSidebar);
infoBtn.addEventListener('click', openInfoTab);
productBtn.addEventListener('click', openProductTab);

function extractIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function renderDetailStore(stores, storeId) {
  const targetStore = stores.find((store) => store.id == storeId);
  document.getElementsByTagName('title')[0].textContent = `${targetStore.name} | Waraloka - UMKM Directory`

  renderStoreProducts(targetStore.products);
  renderStoreGallery(targetStore.images.gallery);
  renderStoreInfo(targetStore);
}

function renderStoreProducts(products) {
  let productHTML = '';
  products.forEach((product) => {
    productHTML += `
            <div class="w-full p-5 border-2 border-zinc-300 rounded-lg gap-4 overflow-hidden flex flex-col justify-between items-center">
                <img src="${product.productImg ?? '../assets/images/fallback-img.jpg'}" alt="${product.alt}" class="w-full h-50 lg:h-60 max-w-full rounded-lg object-center object-cover shadow-sm">
                <div class="w-full flex justify-between items-start">
                    <h2 class="text-primary-text text-xl lg:text-2xl text-left font-bold capitalize font-pj-sans-medium">${product.name}</h2>
                    <span class="text-primary-text/60 text-base text-right font-normal capitalize font-pj-sans-regular">rp ${product.price}</span>
                </div>
                <p class="w-full text-primary-text/60 text-justify text-base capitalize font-inter">${product.description}</p>
            </div>`;
  });
  storeProductsWrapper.innerHTML = productHTML;
}

function renderStoreGallery(gallery) {
  storeFirstGalleryEl.src = gallery[0].image ?? '../assets/images/fallback-img.jpg';
  storeFirstGalleryEl.alt = gallery[0].alt ?? 'Tidak Ada Gambar';
  storeSecondGalleryEl.src = gallery[1].image ?? '../assets/images/fallback-img.jpg';
  storeSecondGalleryEl.alt = gallery[1].alt ?? 'Tidak Ada Gambar';
  storeThirdGalleryEl.src = gallery[2].image ?? '../assets/images/fallback-img.jpg';
  storeThirdGalleryEl.alt = gallery[2].alt ?? 'Tidak Ada Gambar';
}

function renderStoreInfo(store) {
  const openingTimesText = store.openingTimes
    ? `${store.openingTimes.days} | ${store.openingTimes.hours}`
    : 'Tidak Diketahui';
  storeNameBreadcrumbEl.textContent = store.name ?? 'Tidak Ada Nama';
  storeNameHeadingEl.textContent = store.name ?? 'Tidak Ada Nama';
  storeOwnerEl.textContent = store.ownerName ?? 'N/A';
  storeOwnerModalEl.textContent = store.ownerName ?? 'N/A';
  storeNumberModalEl.textContent = store.contacts?.phone ?? 'Tidak Ada Kontak';
  storeOpeningTimesEl.textContent = openingTimesText;
  storeTimesDetail.textContent = openingTimesText;
  storeCategoryEl.textContent = store.category ?? 'Tidak Ada Kategori';
  storeDescriptionEl.textContent = store.description ?? 'Tidak Ada Deskripsi';
  storeLocationModalEl.textContent = store.location.address ?? 'Tidak Diketahui';
  storeBenchmarkInfoEl.textContent = store.location.benchmark ?? 'Tidak Ada Patokan Toko';
  storeEmbedMapsEl.src = store.location.mapsEmbedLink ?? 'https://www.google.com/maps/';
  storeMapsLinkEl.href = store.location.mapsLink ?? 'https://www.google.com/maps/';
  storeCalendarLink.href = store.location.calendarLink ?? 'https://calendar.google.com/calendar';
}

function openSidebar() {
  sideSectionEl.classList.replace('translate-x-full', 'translate-x-0');
  sideContentEl.classList.replace('overflow-y-none', 'overflow-y-scroll');

  closeSidebar();
}

function closeSidebar() {
  sideSectionEl.classList.replace('translate-x-0', 'translate-x-full');
  sideContentEl.classList.replace('overflow-y-scroll', 'overflow-y-none');
}

function openModal() {
  modalSectionEl.classList.replace('invisible', 'visible');

  if (modalCard.classList.contains('hide-model')) {
    modalCard.classList.replace('hide-model', 'show-model');
  } else {
    modalCard.classList.add('show-model');
  }
}

function closeModal() {
  modalCard.classList.replace('show-model', 'hide-model');

  setTimeout(() => {
    modalSectionEl.classList.replace('visible', 'invisible');
  }, 400);
}

function openInfoTab() {
  infoTabEl.classList.replace('absolute', 'relative');
  infoTabEl.classList.replace('invisible', 'visible');

  productTabEl.classList.replace('relative', 'absolute');
  productTabEl.classList.replace('visible', 'invisible');

  infoBtn.classList.replace('text-primary-text/60', 'text-primary');
  productBtn.classList.replace('text-primary', 'text-primary-text/60');
}

function openProductTab() {
  productTabEl.classList.replace('absolute', 'relative');
  productTabEl.classList.replace('invisible', 'visible');

  infoTabEl.classList.replace('relative', 'absolute');
  infoTabEl.classList.replace('visible', 'invisible');

  infoBtn.classList.replace('text-primary', 'text-primary-text/60');
  productBtn.classList.replace('text-primary-text/60', 'text-primary');
}

async function initStores() {
  const storesData = await getStoresData();
  const idValue = extractIdFromUrl();
  renderUniqueStore(storesData, recommendedStoresWrapper, 5);
  renderDetailStore(storesData, idValue);
}

document.addEventListener('DOMContentLoaded', initStores);

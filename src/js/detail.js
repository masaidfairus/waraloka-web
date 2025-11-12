import { getStoresData, renderUniqueStore } from "./component.js";

const domElements = {
  recommendedStoresWrapper: null,
  storeOwnerModalEl: null,
  storeNumberModalEl: null,
  storeLocationModalEl: null,
  storeNameBreadcrumbEl: null,
  storeNameHeadingEl: null,
  storeOpeningTimesEl: null,
  storeBenchmarkInfoEl: null,
  storeCategoryEl: null,
  storeFirstGalleryEl: null,
  storeSecondGalleryEl: null,
  storeThirdGalleryEl: null,
  storeDescriptionEl: null,
  storeProductsWrapper: null,
  storeEmbedMapsEl: null,
  storeMapsLinkEl: null,
  storeOwnerEl: null,
  storeTimesDetail: null,
  storeCalendarLink: null,
  sideContentEl: null,
  sideSectionEl: null,
  infoTabEl: null,
  productTabEl: null,
  infoBtn: null,
  productBtn: null,
  modalSectionEl: null,
  modalCard: null,
};
const recommendedStoresWrapper = document.getElementById(
  "recommended-stores-wrapper",
);
const sideContentEl = document.getElementById("side-content");
const sideSectionEl = document.getElementById("side-section");
const infoTabEl = document.getElementById("tab-info");
const productTabEl = document.getElementById("tab-product");
const infoBtn = document.getElementById("info-btn");
const productBtn = document.getElementById("product-btn");
const modalSectionEl = document.getElementById("modal");
const modalCard = document.getElementById("modal-card");
const link = document.createElement("link");

document.getElementById("open-modal-btn").addEventListener("click", openModal);
document
  .getElementById("close-modal-btn")
  .addEventListener("click", closeModal);
document
  .getElementById("open-sidebar-btn")
  .addEventListener("click", openSideContent);
document
  .getElementById("close-sidebar-btn")
  .addEventListener("click", closeSideContent);
infoBtn.addEventListener("click", openInfoTab);
productBtn.addEventListener("click", openProductTab);

function getElementKey(key, selector) {
  if (!domElements[key]) {
    domElements[key] = document.getElementById(selector);
  }
  return domElements[key];
}

function extractIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function renderDetailStore(stores, storeId) {
  const targetStore = stores.find((store) => store.id == storeId);
  document.getElementsByTagName("title")[0].textContent =
    `${targetStore.name} | Waraloka - UMKM Directory`;
  link.rel = "canonical";
  link.href = `https:/https://waraloka.pages.dev/${targetStore.name}`;

  renderStoreProducts(targetStore.products);
  renderStoreGallery(targetStore.images.gallery);
  renderStoreInfo(targetStore);
}

function renderStoreProducts(products) {
  const storeProductsWrapper = getElementKey(
    "storeProductsWrapper",
    "store-products-wrapper",
  );
  let productHTML = "";
  products.forEach((product) => {
    productHTML += `
            <div class="w-full p-5 border-2 border-zinc-300 rounded-lg gap-4 overflow-hidden flex flex-col justify-between items-center">
                <img src="${product.productImg ?? "../assets/images/fallback-img.jpg"}" alt="${product.alt}" class="w-full h-50 lg:h-60 max-w-full rounded-lg object-center object-cover shadow-sm">
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
  const storeGalleryEl = [
    getElementKey("storeFirstGalleryEl", "store-first-gallery"),
    getElementKey("storeSecondGalleryEl", "store-second-gallery"),
    getElementKey("storeThirdGalleryEl", "store-third-gallery"),
  ];

  storeGalleryEl[0].src =
    gallery[0].image ?? "../assets/images/fallback-img.jpg";
  storeGalleryEl[0].alt = gallery[0].alt ?? "Tidak Ada Gambar";
  storeGalleryEl[1].src =
    gallery[1].image ?? "../assets/images/fallback-img.jpg";
  storeGalleryEl[1].alt = gallery[1].alt ?? "Tidak Ada Gambar";
  storeGalleryEl[2].src =
    gallery[2].image ?? "../assets/images/fallback-img.jpg";
  storeGalleryEl[2].alt = gallery[2].alt ?? "Tidak Ada Gambar";
}

function renderStoreInfo(store) {
  const storeDetail = {
    nameBreadcrumb: getElementKey(
      "storeNameBreadcrumbEl",
      "store-name-breadcrumb",
    ),
    openTimes: getElementKey("storeOpeningTimesEl", "store-opening-times"),
    nameHeading: getElementKey("storeNameHeadingEl", "store-name-heading"),
    owner: getElementKey("storeOwnerEl", "store-owner"),
    ownerModal: getElementKey("storeOwnerModalEl", "store-owner-modal"),
    numberModal: getElementKey("storeNumberModalEl", "store-number-modal"),
    timesDetail: getElementKey("storeTimesDetail", "store-times-detail"),
    category: getElementKey("storeCategoryEl", "store-category"),
    description: getElementKey("storeDescriptionEl", "store-description"),
    locationModal: getElementKey(
      "storeLocationModalEl",
      "store-location-modal",
    ),
    benchmarkInfo: getElementKey(
      "storeBenchmarkInfoEl",
      "store-benchmark-info",
    ),
    embedMaps: getElementKey("storeEmbedMapsEl", "store-embed-maps"),
    mapsLink: getElementKey("storeMapsLinkEl", "store-maps-link"),
    calendarLink: getElementKey("storeCalendarLink", "store-calendar-link"),
  };

  const openingTimesText = store.openingTimes
    ? `${store.openingTimes.days} | ${store.openingTimes.hours}`
    : "Tidak Diketahui";

  storeDetail.nameBreadcrumb.textContent = store.name ?? "Tidak Ada Nama";
  storeDetail.nameHeading.textContent = store.name ?? "Tidak Ada Nama";
  storeDetail.owner.textContent = store.ownerName ?? "N/A";
  storeDetail.ownerModal.textContent = store.ownerName ?? "N/A";
  storeDetail.numberModal.textContent =
    store.contacts?.phone ?? "Tidak Ada Kontak";
  storeDetail.openTimes.textContent = openingTimesText;
  storeDetail.timesDetail.textContent = openingTimesText;
  storeDetail.category.textContent = store.category ?? "Tidak Ada Kategori";
  storeDetail.description.textContent =
    store.description ?? "Tidak Ada Deskripsi";
  storeDetail.locationModal.textContent =
    store.location?.address ?? "Tidak Diketahui";
  storeDetail.benchmarkInfo.textContent =
    store.location?.benchmark ?? "Tidak Ada Patokan Toko";
  storeDetail.embedMaps.src =
    store.location?.mapsEmbedLink ?? "https://www.google.com/maps/";
  storeDetail.mapsLink.href =
    store.location?.mapsLink ?? "https://www.google.com/maps/";
  storeDetail.calendarLink.href =
    store.location?.calendarLink ?? "https://calendar.google.com/calendar";
}

function openSideContent() {
  sideSectionEl.classList.replace("translate-x-full", "translate-x-0");
  sideContentEl.classList.replace("overflow-y-none", "overflow-y-scroll");
}

function closeSideContent() {
  sideSectionEl.classList.replace("translate-x-0", "translate-x-full");
  sideContentEl.classList.replace("overflow-y-scroll", "overflow-y-none");
}

function openModal() {
  modalSectionEl.classList.replace("invisible", "visible");

  if (modalCard.classList.contains("hide-model")) {
    modalCard.classList.replace("hide-model", "show-model");
  } else {
    modalCard.classList.add("show-model");
  }
}

function closeModal() {
  modalCard.classList.replace("show-model", "hide-model");

  setTimeout(() => {
    modalSectionEl.classList.replace("visible", "invisible");
  }, 400);
}

function openInfoTab() {
  infoTabEl.classList.replace("absolute", "relative");
  infoTabEl.classList.replace("invisible", "visible");

  productTabEl.classList.replace("relative", "absolute");
  productTabEl.classList.replace("visible", "invisible");

  infoBtn.classList.replace("text-primary-text/60", "text-primary");
  productBtn.classList.replace("text-primary", "text-primary-text/60");
}

function openProductTab() {
  productTabEl.classList.replace("absolute", "relative");
  productTabEl.classList.replace("invisible", "visible");

  infoTabEl.classList.replace("relative", "absolute");
  infoTabEl.classList.replace("visible", "invisible");

  infoBtn.classList.replace("text-primary", "text-primary-text/60");
  productBtn.classList.replace("text-primary-text/60", "text-primary");
}

async function initStores() {
  const storesData = await getStoresData();
  const idValue = extractIdFromUrl();
  renderUniqueStore(storesData, recommendedStoresWrapper, 5);
  renderDetailStore(storesData, idValue);
}

document.addEventListener("DOMContentLoaded", initStores);

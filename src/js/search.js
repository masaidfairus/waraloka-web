import {
  getStoresData,
  getCategoriesArray,
  createStoreCardHTML,
} from "./component.js";

function getSearchParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    name: params.get("name") || "",
    category: params.get("category") || "",
  };
}

function renderStore(stores, element) {
  let storesHTML = ``;
  storesHTML = stores.map((store) => createStoreCardHTML(store)).join("");
  element.innerHTML = storesHTML;
}

function renderStoreCategories(stores) {
  let categoriesHTML = ``;
  const categoriesWrapper = document.getElementById("store-categories-wrapper");
  const categories = getCategoriesArray(stores);
  for (let category of categories) {
    categoriesHTML += `
            <div class="inline-grid items-start">
                <input
                    type="radio"
                    id="${category}"
                    name="category"
                    value="${category}"
                    class="hidden peer">

                <label
                    for="${category}"
                    class="w-full py-3
                        bg-neutral border-2 border-zinc-300 rounded-lg hover:bg-primary hover:text-white
                        text-primary-text text-center font-medium capitalize cursor-pointer
                        peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary
                        transition-all duration-300">
                    ${category}
                </label>
            </div>
        `;
  }
  categoriesWrapper.innerHTML = categoriesHTML;
}

async function initSearchPage() {
  const searchParams = getSearchParams();
  const resultsWrapper = document.getElementById("search-results-wrapper");
  const queryDisplay = document.getElementById("search-query-display");

  queryDisplay.textContent = `Hasil pencarian untuk '${searchParams.name}' di ${searchParams.category || "Semua Kategori"}`;

  const allStores = await getStoresData();

  const filteredStores = allStores.filter((store) => {
    const nameMatch = store.name
      .toLowerCase()
      .includes(searchParams.name.toLowerCase());

    const categoryMatch = searchParams.category
      ? store.category === searchParams.category
      : true;

    return nameMatch && categoryMatch;
  });

  renderStoreCategories(allStores);

  if (filteredStores.length > 0) {
    renderStore(filteredStores, resultsWrapper);
  } else {
    resultsWrapper.outerHTML = `
        <div class="w-full pt-10 flex justify-center items-center flex-col gap-6">
                <i class="fa-solid fa-magnifying-glass text-6xl text-primary"></i>
                <p>Tidak ditemukan toko yang cocok dengan kriteria pencarian.</p>
            </div>`;
  }
}

document.addEventListener("DOMContentLoaded", initSearchPage);

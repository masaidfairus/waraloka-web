import { getStoresData } from './component.js';

function renderStore(stores, element) {
  let storesHTML = ``;
  stores.forEach((store) => {
    storesHTML += `
        <a href="detail.html?id=${store.id}" class="w-full gap-3 flex flex-col justify-center items-start">
            <img src="${store.images.thumbnail.image}" alt="${store.images.thumbnail.alt}" class="w-full h-50 max-w-full rounded-xl object-cover object-center">
            <div class="gap-1 flex flex-col justify-center items-start">
                <h2 class="text-primary-text text-lg text-left font-pj-sans-semibold capitalize tracking-wide">${store.name}</h2>
                <p class="text-primary-text/60 text-base text-left font-inter-regular capitalize tracking-wide">${store.category}</p>
            </div>
        </a>        
        `;
  });
  element.innerHTML = storesHTML;
}

async function initStoresPage() {
  const storesData = await getStoresData();
  const storesWrapper = document.getElementById('stores-wrapper');
  renderStore(storesData, storesWrapper);
}

document.addEventListener('DOMContentLoaded', initStoresPage);

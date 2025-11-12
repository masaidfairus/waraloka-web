import { getStoresData, createStoreCardHTML } from "./component.js";

function renderStore(stores, element) {
  let storesHTML = ``;
  storesHTML = stores.map((store) => createStoreCardHTML(store)).join("");
  element.innerHTML = storesHTML;
}

async function initStoresPage() {
  const storesData = await getStoresData();
  const storesWrapper = document.getElementById("stores-wrapper");
  renderStore(storesData, storesWrapper);
}

document.addEventListener("DOMContentLoaded", initStoresPage);

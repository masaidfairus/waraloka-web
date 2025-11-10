import { getStoresData } from "./component.js";
import { renderUniqueStore } from "./component.js";
import { renderCategoryStore } from "./component.js";
import { getCategoriesArray } from "./component.js";

function renderCategoriesOption(stores) {
    let categoriesHTML = ``
    const categorySelector = document.getElementById('category-selector')
    const categories = getCategoriesArray(stores)
    for (let category of categories) {
        categoriesHTML += `
            <option class="text-primary-text text-base text-left font-pj-sans-regular capitalize" value="${category}">${category}</option>
        `
    }
    categorySelector.innerHTML += categoriesHTML
}

async function initHomePage() {
    const storesData = await getStoresData()
    const nearbyStoresWrapper = document.getElementById('nearby-stores-wrapper')
    renderUniqueStore(storesData, nearbyStoresWrapper, 5)
    renderCategoryStore(storesData, "Makanan & Minuman", 5)
    renderCategoriesOption(storesData)
}

document.addEventListener('DOMContentLoaded', initHomePage)

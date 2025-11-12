const header = document.getElementById('header');
const footer = document.getElementById('footer');

export async function getStoresData() {
  try {
    const response = await fetch('../src/data/store-data.json');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to load store data:', error);
  }
}

export function getCategoriesArray(stores) {
  const categoriesArray = [];
  for (let store of stores) {
    if (!categoriesArray.includes(store.category)) {
      categoriesArray.push(store.category);
    }
  }
  return categoriesArray;
}

export function renderUniqueStore(stores, wrapperElement, index) {
  const shuffledArray = [...stores];
  let wrapperHTML = '';

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  const randomItems = shuffledArray.slice(0, index);
  randomItems.forEach((store) => {
    wrapperHTML += `
        <a href="detail.html?id=${store.id}" class="w-[19.45rem] lg:w-70 gap-3 flex flex-col justify-center items-start">
            <img src="${store.images.thumbnail.image}" alt="${store.images.thumbnail.alt}" class="w-full h-50 max-w-full rounded-xl object-cover object-center" loading="lazy" decoding="async">
            <div class="gap-1 flex flex-col justify-center items-start">
                <h2 class="text-primary-text text-lg text-left font-pj-sans-semibold capitalize tracking-wide">${store.name}</h2>
                <p class="text-primary-text/60 text-base text-left font-inter-regular capitalize tracking-wide">${store.category}</p>
            </div>
        </a>        
        `;
  });
  wrapperElement.innerHTML = wrapperHTML;
}

export function renderCategoryStore(stores, category, index) {
  const filterCategory = stores.filter((store) => store.category === category);
  const limitedStores = filterCategory.slice(0, index);
  let storesHTML = ``;
  limitedStores.forEach((store) => {
    storesHTML += `
        <a href="detail.html?id=${store.id}" class="w-[19.45rem] lg:w-70 gap-3 flex flex-col justify-center items-start">
            <img src="${store.images.thumbnail.image}" alt="${store.images.thumbnail.alt}" class="w-full h-50 max-w-full rounded-xl object-cover object-center" loading="lazy" decoding="async">
            <div class="gap-1 flex flex-col justify-center items-start">
                <h2 class="text-primary-text text-lg text-left font-pj-sans-semibold capitalize tracking-wide">${store.name}</h2>
                <p class="text-primary-text/60 text-base text-left font-inter-regular capitalize tracking-wide">${store.category}</p>
            </div>
        </a>        
        `;
  });
  document.getElementById('favorite-stores-wrapper').innerHTML = storesHTML;
}

header.classList = 'w-full relative z-10';
header.innerHTML = `
            <nav aria-label="Main Navigation" class="w-full px-6 lg:px-20 py-6 bg-neutral shadow-sm shadow-black/20 fixed flex justify-between items-center">
                <a href="index.html" class="w-max h-auto absolute left-6 lg:static">
                    <img src="../assets/images/Waraloka-Logo.svg" alt="" class="w-40 h-auto max-w-full">
                </a>

                <ul class="gap-8 flex font-inter-medium justify-center items-center invisible lg:visible">
                    <li><a href="index.html" class="text-primary-text text-base text-center font-medium capitalize">beranda</a></li>
                    <li><a href="index.html#testimonial" class="text-primary-text/60 text-base text-center font-medium capitalize">testimoni</a></li>
                    <li><a href="index.html#news" class="text-primary-text/60 text-base text-center font-medium capitalize">berita</a></li>
                    <li><a href="index.html#about-us" class="text-primary-text/60 text-base text-center font-medium capitalize">tentang kami</a></li>
                </ul>

                <a id="open-sidebar" class="w-12 h-12 bg-primary rounded-xl text-white text-2xl absolute right-6 visible lg:invisible flex justify-center items-center">
                    <i class="fa-solid fa-bars"></i>
                </a>
            </nav>

            <aside id="sidebar" class="w-80 h-screen py-6 px-8 bg-zinc-300/50 backdrop-blur-xs fixed right-0 top-0 gap-12 flex flex-col justify-start items-start translate-x-full transition-all duration-300">
                <div class="w-full flex justify-end items-center">

                    <a id="close-sidebar" class="w-12 h-12 bg-primary rounded-xl text-white text-2xl flex justify-center items-center">
                        <i class="fa-solid fa-xmark"></i>
                    </a>
                </div>

                <ul class="w-full gap-3 font-inter-medium flex flex-col justify-center items-start">
                    <li><a href="index.html" class="text-primary-text text-lg text-center font-semibold capitalize">beranda</a></li>
                    <li><a href="index.html#testimonial" class="text-primary-text/60 text-lg text-center font-semibold capitalize">testimoni</a></li>
                    <li><a href="index.html#news" class="text-primary-text/60 text-lg text-center font-semibold capitalize">berita</a></li>
                    <li><a href="index.html#about-us" class="text-primary-text/60 text-lg text-center font-semibold capitalize">tentang kami</a></li>
                </ul>
            </aside>
`;

footer.classList = 'w-full flex flex-col justify-center items-center';
footer.innerHTML = `
        <div class="w-full py-8 border-y-2 border-y-zinc-400 gap-10 flex flex-col justify-center items-center">
            <div class="w-full px-8 lg:px-28 gap-6 lg:gap-0 grid lg:flex grid-cols-2 lg:grid-cols-0 justify-between items-start">
                <ul class="gap-3 flex flex-col justify-center items-start">
                    <li><a href="#" class="text-primary-text text-left text-xs lg:text-sm font-semibold uppercase tracking-wide">menggunakan waraloka</a></li>
                    <li><a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">penawaran terbaik</a></li>
                    <li><a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">tempat penawaran terbaik</a></li>
                    <li><a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">promo</a></li>
                    <li><a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">pusat bantuan</a></li>
                    <li><a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">kebijakan privasi</a></li>
                    <li><a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">syarat dan ketentuan</a></li>
                </ul>
                <ul class="gap-3 flex flex-col justify-center items-start">
                    <li><a href="#" class="text-primary-text text-left text-xs lg:text-sm font-semibold uppercase tracking-wide">informasi</a></li>
                    <li><a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">publish acara di waraloka</a></li>
                    <li><a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">solusi untuk pemilik tempat</a></li>
                    <li><a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">unduh brosur</a></li>
                    <li><a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">manajer pengalaman waraloka</a></li>
                    <li><a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">titik penjualan</a></li>
                </ul>
                <ul class="gap-3 flex flex-col justify-center items-start">
                    <li><a href="index.html" class="text-primary-text text-left text-xs lg:text-sm font-semibold uppercase tracking-wide">bertemu waraloka</a></li>
                    <li><a href="index.html#about-us" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">tentang kami</a></li>
                    <li><a href="index.html#testimonial" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">testimoni</a></li>
                    <li><a href="index.html#news" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">berita</a></li>
                </ul>
                <div class="gap-8 flex flex-col justify-center items-start">
                    <ul class=" gap-3 flex flex-col justify-center items-start">
                        <li class="text-primary-text text-left text-xs lg:text-sm font-semibold uppercase tracking-wide">layanan pelanggan (WA):</li>
                        <li><a href="https://wa.me/+6288229900877" class="text-primary text-left text-xs lg:text-sm font-regular underline capitalize tracking-wide">+62 882-2990-0877</a></li>
                    </ul>

                    <ul class=" gap-3 flex flex-col justify-center items-start">
                        <li class="text-primary-text text-left text-xs lg:text-sm font-semibold uppercase tracking-wide">kantor waraloka:</li>
                        <li class="w-full lg:w-50 text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">Jl. KH. Abdul Hamid, Gn. Sari, Kec. Pamijahan, Kabupaten Bogor, Jawa Barat 16810</li>
                    </ul>
                </div>
            </div>

            <a href="index.html" class="w-max h-auto">
                <img src="../assets/images/Waraloka-Logo.svg" alt="" class="w-50 lg:w-70 h-auto max-w-full">
            </a>

            <div class="w-full gap-3 flex flex-col justify-center items-center">
                <h2 class="w-full text-primary-text text-center text-sm lg:text-base font-medium uppercase">social media kami:</h2>
                <div class="text-primary-text/60 text-2xl lg:text-3xl gap-6 lg:gap-4 flex justify-center items-center">
                    <a href="https://instagram.com" target="_blank" rel="noopener" title="instagram-link"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://x.com" target="_blank" rel="noopener" title="twitter-link"><i class="fa-brands fa-x-twitter"></i></a>
                    <a href="https://facebook.com" target="_blank" rel="noopener" title="facebook-link"><i class="fa-brands fa-facebook-f"></i></a>
                </div>
            </div>
        </div>

        <div class="w-full py-6 flex justify-center items-center">
            <p class="text-primary-text text-center text-sm lg:text-base font-pj-sans-regular capitalize tracking-wide">waraloka &copy; 2025. all rights reserved.</p>
        </div>
`;

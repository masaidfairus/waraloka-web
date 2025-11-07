const header = document.getElementById('header')
const footer = document.getElementById('footer')

header.classList = "w-full relative z-10"
header.innerHTML = `
            <nav class="w-full px-6 lg:px-20 py-6 bg-neutral shadow-sm shadow-black/20 fixed flex justify-between items-center">
                <a href="index.html" class="w-max h-auto invisible lg:visible">
                    <img src="../assets/images/Waraloka-Logo.svg" alt="Waraloka-Logo" class="w-40 h-auto max-w-full">
                </a>

                <div class="gap-8 flex justify-center items-center invisible lg:visible">
                    <a href="index.html" class="text-primary-text text-base text-center font-medium tracking-wide capitalize">beranda</a>
                    <a href="index.html#testimoni" class="text-primary-text/60 text-base text-center font-medium tracking-wide capitalize">testimoni</a>
                    <a href="index.html#berita" class="text-primary-text/60 text-base text-center font-medium tracking-wide capitalize">berita</a>
                    <a href="index.html#tentang-kami" class="text-primary-text/60 text-base text-center font-medium tracking-wide capitalize">tentang kami</a>
                </div>

                <a id="open-side" class="w-12 h-12 bg-primary rounded-xl text-white text-2xl absolute right-6 visible lg:invisible flex justify-center items-center">
                    <i class="fa-solid fa-bars"></i>
                </a>
            </nav>

            <aside id="sidebar" class="w-80 h-screen py-6 px-8 bg-zinc-300/50 backdrop-blur-xs fixed right-0 top-0 gap-12 flex flex-col justify-start items-start translate-x-full transition-all duration-300">
                <div class="w-full gap-8 flex justify-between items-center">
                    <a href="index.html" class="w-max h-auto">
                        <img src="../assets/images/Waraloka-Logo.svg" alt="Waraloka-Logo" class="w-40 h-auto max-w-full">
                    </a>

                    <a id="close-side" class="w-12 h-12 bg-primary rounded-xl text-white text-2xl flex justify-center items-center">
                        <i class="fa-solid fa-xmark"></i>
                    </a>
                </div>

                <div class="w-full gap-3 flex flex-col justify-center items-start">
                    <a href="index.html" class="text-primary-text text-lg text-center font-medium tracking-wide capitalize">beranda</a>
                    <a href="index.html#testimoni" class="text-primary-text/60 text-lg text-center font-medium tracking-wide capitalize">testimoni</a>
                    <a href="index.html#berita" class="text-primary-text/60 text-lg text-center font-medium tracking-wide capitalize">berita</a>
                    <a href="index.html#tentang-kami" class="text-primary-text/60 text-lg text-center font-medium tracking-wide capitalize">tentang kami</a>
                </div>
            </aside>
`

document.getElementById('open-side').addEventListener('click', openSide)
document.getElementById('close-side').addEventListener('click', closeSide)

function openSide() {
  document.getElementById('sidebar').classList.replace('translate-x-full', 'translate-x-0')

  closeSidebar();
}

function closeSide() {
  document.getElementById('sidebar').classList.replace('translate-x-0', 'translate-x-full')
}

footer.classList = "w-full flex flex-col justify-center items-center"
footer.innerHTML = `
        <div class="w-full py-8 border-y-2 border-y-zinc-400 gap-10 flex flex-col justify-center items-center">
            <div class="w-full px-8 lg:px-28 gap-6 lg:gap-0 grid lg:flex grid-cols-2 lg:grid-cols-0 justify-between items-start">
                <div class="gap-3 flex flex-col justify-center items-start">
                    <a href="#" class="text-primary-text text-left text-xs lg:text-sm font-semibold uppercase tracking-wide">menggunakan waraloka</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">penawaran terbaik</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">tempat penawaran terbaik</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">promo</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">pusat bantuan</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">kebijakan privasi</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">syarat dan ketentuan</a>
                </div>
                <div class="gap-3 flex flex-col justify-center items-start">
                    <a href="#" class="text-primary-text text-left text-xs lg:text-sm font-semibold uppercase tracking-wide">informasi</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">publish acara di waraloka</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">solusi untuk pemilik tempat</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">unduh brosur</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">manajer pengalaman waraloka</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">titik penjualan</a>
                </div>
                <div class="gap-3 flex flex-col justify-center items-start">
                    <a href="#" class="text-primary-text text-left text-xs lg:text-sm font-semibold uppercase tracking-wide">bertemu waraloka</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">tentang kami</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">testimoni</a>
                    <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">berita</a>
                </div>
                <div class="gap-8 flex flex-col justify-center items-start">
                    <div class=" gap-3 flex flex-col justify-center items-start">
                        <a href="#" class="text-primary-text text-left text-xs lg:text-sm font-semibold uppercase tracking-wide">layanan pelanggan (WA):</a>
                        <a href="#" class="text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">+62 882-2990-0877</a>
                    </div>

                    <div class=" gap-3 flex flex-col justify-center items-start">
                        <a href="#" class="text-primary-text text-left text-xs lg:text-sm font-semibold uppercase tracking-wide">kantor waraloka:</a>
                        <a href="#" class="w-30 lg:w-50 text-primary-text/60 text-left text-xs lg:text-sm font-regular capitalize tracking-wide">Jl. KH. Abdul Hamid, Gn. Sari, Kec. Pamijahan, Kabupaten Bogor, Jawa Barat 16810</a>
                    </div>
                </div>
            </div>

            <a href="index.html" class="w-max h-auto">
                <img src="../assets/images/Waraloka-Logo.svg" alt="Waraloka-Logo" class="w-50 lg:w-70 h-auto max-w-full">
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
            <h1 class="text-primary-text text-center text-sm lg:text-base font-pj-sans-regular capitalize tracking-wide">waraloka &copy; 2025. all rights reserved.</h1>
        </div>
`
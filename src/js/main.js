const openSidebarBtn = document.getElementById('open-sidebar');
if (openSidebarBtn) openSidebarBtn.addEventListener('click', openSidebar);
const closeSidebarBtn = document.getElementById('close-sidebar');
if (closeSidebar) closeSidebarBtn.addEventListener('click', closeSidebar);

function openSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.replace('translate-x-full', 'translate-x-0');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.replace('translate-x-0', 'translate-x-full');
}
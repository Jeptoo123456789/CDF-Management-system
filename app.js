const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.view');
const breadcrumb = document.querySelector('#breadcrumb-current');
const sidebar = document.querySelector('#sidebar');
const toast = document.querySelector('#toast');
const modalBackdrop = document.querySelector('#modal-backdrop');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function openView(viewName) {
  const target = document.querySelector(`#${viewName}-view`);
  if (!target) return;
  views.forEach((view) => view.classList.toggle('active', view === target));
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.view === viewName));
  const activeItem = document.querySelector(`.nav-item[data-view="${viewName}"]`);
  breadcrumb.textContent = activeItem ? activeItem.querySelector('span:nth-child(2)').textContent : viewName;
  sidebar.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-view-target]').forEach((button) => {
  button.addEventListener('click', () => openView(button.dataset.viewTarget));
});
navItems.forEach((item) => item.addEventListener('click', () => openView(item.dataset.view)));
document.querySelector('#mobile-menu').addEventListener('click', () => sidebar.classList.toggle('open'));

document.querySelector('#new-action').addEventListener('click', () => openView('bursaries'));
document.querySelector('#open-application').addEventListener('click', () => modalBackdrop.classList.add('open'));
document.querySelector('#modal-close').addEventListener('click', () => modalBackdrop.classList.remove('open'));
modalBackdrop.addEventListener('click', (event) => {
  if (event.target === modalBackdrop) modalBackdrop.classList.remove('open');
});

document.querySelector('#submit-application').addEventListener('click', () => {
  const name = document.querySelector('#student-name').value.trim() || 'New student';
  modalBackdrop.classList.remove('open');
  showToast(`${name}'s application was created and is ready for verification.`);
});

document.querySelector('#approve-application').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.innerHTML = 'Disbursement queued <span>✓</span>';
  button.style.background = '#4b9475';
  document.querySelector('.pill.review').textContent = 'Disbursing';
  document.querySelector('.pill.review').className = 'pill success';
  showToast('Application approved. Payment request queued securely.');
});

document.querySelector('#decline-application').addEventListener('click', () => {
  showToast('A reason is required before declining an application.');
});

document.querySelector('#accept-evidence').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.innerHTML = 'Proof accepted <span>✓</span>';
  button.style.background = '#4b9475';
  showToast('Evidence accepted and queued for public publication.');
});

document.querySelector('#reject-evidence').addEventListener('click', () => {
  showToast('Add a review reason before rejecting this evidence.');
});

document.querySelectorAll('.subnav-item').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.subnav-item').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    showToast(`Showing ${tab.textContent.trim().replace(/\d+$/, '').trim().toLowerCase()}.`);
  });
});

document.querySelectorAll('.segmented button').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.segmented button').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    showToast(`Filtered to ${tab.textContent}.`);
  });
});

document.querySelectorAll('.period-button, .filter-button, .switcher-button, .user-chip').forEach((button) => {
  button.addEventListener('click', () => showToast('Filter controls are ready for the connected data service.'));
});

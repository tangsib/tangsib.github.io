document.addEventListener('DOMContentLoaded', function(){
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  toggle && toggle.addEventListener('click', ()=> nav.classList.toggle('show'));

  // Smooth scroll for anchor links (enhanced)
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if(nav.classList.contains('show')) nav.classList.remove('show');
      }
    });
  });

  // Set current year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Avatar modal: open on click, close on overlay / button / ESC
  const avatar = document.querySelector('.avatar');
  const avatarImg = document.querySelector('.avatar-img');
  const modal = document.getElementById('avatar-modal');
  const modalImg = modal && modal.querySelector('.modal-img');
  const modalClose = modal && modal.querySelector('.modal-close');

  function openModal(){
    if(!modal) return;
    // set image src from avatar
    if(avatarImg && modalImg){ modalImg.src = avatarImg.src; }
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    // focus close for keyboard users
    modalClose && modalClose.focus();
  }

  function closeModal(){
    if(!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  avatar && avatar.addEventListener('click', openModal);
  // Also attach to the image itself in case events target the <img>
  avatarImg && avatarImg.addEventListener('click', openModal);
  modalClose && modalClose.addEventListener('click', closeModal);
  modal && modal.addEventListener('click', function(e){
    if(e.target && e.target.dataset && e.target.dataset.close) closeModal();
  });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeModal(); });
});

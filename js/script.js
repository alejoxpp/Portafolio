function goToSection(event, el) {
	event.preventDefault();
	const target = document.querySelector(el.getAttribute('href'));
	if (target) {
		target.scrollIntoView({ behavior: 'smooth' });
	}
}

function openMenu() {
  const menu = document.getElementById('menu-options')
  menu.classList.toggle('is-active')
}

AOS.init();

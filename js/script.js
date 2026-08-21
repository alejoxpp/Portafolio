// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil + accesibilidad (aria-expanded)
function openMenu() {
  const menu = document.getElementById('menu-options');
  const expanded = menu.classList.toggle('is-active');
  document.querySelector('.burguer-menu').setAttribute('aria-expanded', String(expanded));
}

// Navegación suave por anclas
function goToSection(event, el) {
  event.preventDefault();
  const target = document.querySelector(el.getAttribute('href'));
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Modo oscuro / claro
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.getAttribute('data-theme') === 'dark';
  const next = isDark ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  const icon = document.querySelector('#themeToggle i');
  icon.classList.toggle('fa-moon', isDark);
  icon.classList.toggle('fa-sun', !isDark);
  try { localStorage.setItem('theme', next); } catch (e) {}
}

// Restaurar tema guardado
(function initTheme() {
  try {
    const saved = localStorage.getItem('theme');
    const icon = document.querySelector('#themeToggle i');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  } catch (e) {}
})();

// Botón "Volver arriba"
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    toTop.classList.add('show');
  } else {
    toTop.classList.remove('show');
  }
});
toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Resaltar sección activa en el menú
const navLinks = document.querySelectorAll('#menu-options a');
const sections = document.querySelectorAll('main section[id]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((a) => a.classList.remove('active'));
      const link = document.querySelector('#menu-options a[href="#' + entry.target.id + '"]');
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-50% 0px -50% 0px' });
sections.forEach((s) => observer.observe(s));

// Formulario de contacto -> mailto prefijado
document.getElementById('contactForm').addEventListener('submit', function (ev) {
  ev.preventDefault();
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  const subject = encodeURIComponent('Mensaje de ' + name);
  const body = encodeURIComponent('Nombre: ' + name + '\nEmail: ' + email + '\n\n' + message);
  window.location.href = 'mailto:josealejandroperezpabon24@gmail.com?subject=' + subject + '&body=' + body;
});

// Animaciones AOS
AOS.init();

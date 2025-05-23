const statusBar = document.getElementById('status-bar');
    const navItems = document.querySelectorAll('.head-links .nav-item');
    const mainContent = document.querySelector('main');
    let statusTimeout;

    // Show the status message for a short time then hide
    function showTemporaryStatus(message, online) {
      clearTimeout(statusTimeout);
      statusBar.textContent = message;
      statusBar.classList.add('visible');
      if (online) {
        statusBar.classList.remove('offline');
        statusBar.classList.add('online');
      } else {
        statusBar.classList.remove('online');
        statusBar.classList.add('offline');
      }

      statusTimeout = setTimeout(() => {
        statusBar.classList.remove('visible');
      }, 3000);
    }

    // Set online/offline state and manage page content & nav
    function setOnlineStatus(online) {
      if (online) {
        showTemporaryStatus("You are Online", true);
        document.querySelector('header').classList.remove('disabled');
        mainContent.classList.remove('disabled');
      } else {
        showTemporaryStatus("You are Offline - Content disabled", false);
        document.querySelector('header').classList.add('disabled');
        mainContent.classList.add('disabled');
        removeActiveClasses();
      }
    }

    function removeActiveClasses() {
      navItems.forEach(item => item.classList.remove('active'));
    }

    function scrollToSection(id) {
      if (!navigator.onLine) return;
      const section = document.getElementById(id);
      if (section) {
        section.focus({preventScroll:true});
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        if (!navigator.onLine) return;
        removeActiveClasses();
        item.classList.add('active');
        scrollToSection(item.dataset.target);
      });
      item.addEventListener('keydown', e => {
        if (!navigator.onLine) return;
        if(e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });

    // Highlight nav based on scroll position only when online
    window.addEventListener('scroll', () => {
      if (!navigator.onLine) return;
      let current = '';
      const sections = document.querySelectorAll('main .section');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 95;
        if(pageYOffset >= sectionTop) current = section.id;
      });
      if(current) {
        removeActiveClasses();
        const activeNav = document.querySelector(`.head-links .nav-item[data-target="${current}"]`);
        if(activeNav) activeNav.classList.add('active');
      }
    });

    // Listen to online/offline events
    window.addEventListener('online', () => {
      setOnlineStatus(true);
      removeActiveClasses();
      if (navItems.length > 0) navItems[0].classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('offline', () => {
      setOnlineStatus(false);
    });

    // On load, start hidden and show status briefly if desired
    setOnlineStatus(navigator.onLine);
    if (navigator.onLine && navItems.length > 0) {
      navItems[0].classList.add('active');
    }
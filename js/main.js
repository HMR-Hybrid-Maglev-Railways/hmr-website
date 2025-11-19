// HMR Website — extracted scripts (migrated from inline <script> in index.html)
// Date: 2025-11-13

document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      '.fade-in, .reveal-card'
    )
    .forEach((el) => {
      observer.observe(el);
    });

  // (removed unused animateCounter)

  function createBarChart(canvasId, labels, data, axisLabel, dataLabel) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const styles = getComputedStyle(document.documentElement);
    const textColor = styles.getPropertyValue('--text-light').trim() || '#E6E8EF';
    const gridColor = 'rgba(255, 255, 255, 0.12)';
    const barFills = [
      'rgba(239, 68, 68, 0.75)', // red
      'rgba(250, 204, 21, 0.75)', // yellow
      'rgba(52, 211, 153, 0.75)', // green
    ];

    // Size canvas for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const cssW = canvas.clientWidth || (canvas.parentElement ? canvas.parentElement.clientWidth : 320);
    const cssH = canvas.clientHeight || 260;
    canvas.width = Math.max(1, Math.floor(cssW * dpr));
    canvas.height = Math.max(1, Math.floor(cssH * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Chart area
    const margin = { top: 18, right: 20, bottom: 44, left: 46 };
    const width = cssW - margin.left - margin.right;
    const height = cssH - margin.top - margin.bottom;
    const originX = margin.left;
    const originY = margin.top;

    // Clear
    ctx.clearRect(0, 0, cssW, cssH);

    // Axes and grid
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, originY + height);
    ctx.lineTo(originX + width, originY + height);
    ctx.stroke();

    // Y scale
    const maxVal = Math.max(...data) * 1.1;
    const yScale = height / maxVal;
    const yTicks = 4;
    ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    for (let i = 1; i <= yTicks; i++) {
      const val = (maxVal / yTicks) * i;
      const y = originY + height - val * yScale;
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.beginPath();
      ctx.moveTo(originX, y);
      ctx.lineTo(originX + width, y);
      ctx.stroke();
      ctx.fillStyle = textColor;
      ctx.fillText(Math.round(val).toString(), originX - 6, y);
    }

    // Bars
    const count = labels.length;
    const slot = width / count;
    const barWidth = Math.min(64, slot * 0.6);
    for (let i = 0; i < count; i++) {
      const xCenter = originX + slot * i + slot / 2;
      const barHeight = data[i] * yScale;
      const x = xCenter - barWidth / 2;
      const y = originY + height - barHeight;
      ctx.fillStyle = barFills[i % barFills.length];
      ctx.beginPath();
      const r = 6; // rounded top corners
      const bw = barWidth;
      const bh = Math.max(1, barHeight);
      const radius = Math.min(r, bw / 2, bh);
      // Rounded rectangle path (top corners rounded)
      ctx.moveTo(x, y + bh);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.lineTo(x + bw - radius, y);
      ctx.quadraticCurveTo(x + bw, y, x + bw, y + radius);
      ctx.lineTo(x + bw, y + bh);
      ctx.closePath();
      ctx.fill();

      // X labels
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(labels[i], xCenter, originY + height + 8);
    }

    // Axis title (y)
    ctx.save();
    ctx.translate(12, originY + height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.fillStyle = textColor;
    ctx.font = 'bold 14px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';
    ctx.fillText(axisLabel, 0, 0);
    ctx.restore();
  }

  function renderSpeedProblemChart() {
    createBarChart(
      'speedProblemChart',
      ['Plane', 'Bus', 'Train'],
      [839, 80, 150],
      'Speed (km/h)',
      'Average Speed'
    );
  }

  function renderCO2ProblemChart() {
    createBarChart(
      'co2ProblemChart',
      ['Plane', 'Bus', 'Train'],
      [154, 30, 3],
      'CO2 (g/km per passenger)',
      'CO2 Emissions'
    );
  }

  function renderCapacityProblemChart() {
    createBarChart(
      'capacityProblemChart',
      ['Plane', 'Bus', 'Train'],
      [180, 40, 800],
      'Passenger Capacity',
      'Max Passengers'
    );
  }

  function renderTimeProblemChart() {
    createBarChart(
      'timeProblemChart',
      ['Plane', 'Bus', 'Train'],
      [120, 20, 20],
      'Access Time (Minutes)',
      'Average Access Time'
    );
  }

  // =============================
  // Problem slider + Chart.js v4
  // (lazy‑loaded libs + deferred init for performance)
  // =============================
  const problem = {
    inited: false,
  };

  // Lightweight script loader (UMD bundles)
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      // If already present, resolve immediately
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error(`Failed to load ${src}`));
      document.head.appendChild(s);
    });
  }

  async function ensureProblemLibs() {
    const needsSwiper = typeof window.Swiper === 'undefined';
    const needsChart = typeof window.Chart === 'undefined';
    if (!needsSwiper && !needsChart) return;
    const tasks = [];
    if (needsSwiper) tasks.push(loadScript('https://unpkg.com/swiper@11/swiper-bundle.min.js'));
    if (needsChart) tasks.push(loadScript('https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js'));
    await Promise.all(tasks);
  }

  function initProblemSection() {
    if (problem.inited) return;
    const swiperContainer = document.querySelector('.problem-swiper');
    if (!swiperContainer || typeof window.Chart === 'undefined' || typeof window.Swiper === 'undefined') {
      return; // container or libs missing
    }

    // Helper to read themed colors
    function getTheme() {
      const styles = getComputedStyle(document.documentElement);
      const text = styles.getPropertyValue('--text-light').trim() || '#E6E8EF';
      const grid = 'rgba(255,255,255,0.12)';
      const primary = styles.getPropertyValue('--accent-color').trim() || '#7B68EE';
      const secondary = 'rgba(255,255,255,0.45)';
      const secondaryBorder = 'rgba(255,255,255,0.65)';
      return { text, grid, primary, secondary, secondaryBorder };
    }

    // Map values to green (good) → red (bad) colors
    function valueColors(values, invert = false) {
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = Math.max(0.00001, max - min);
      const bgs = [];
      const borders = [];
      for (const v of values) {
        let norm = (v - min) / range; // 0..1, higher = larger value
        if (invert) norm = 1 - norm;  // lower is better
        // Hue 0 (red) → 120 (green)
        const h = 120 * norm;
        const bg = `hsla(${h.toFixed(1)}, 70%, 52%, 0.82)`;
        const bd = `hsla(${h.toFixed(1)}, 85%, 60%, 1)`;
        bgs.push(bg);
        borders.push(bd);
      }
      return { backgrounds: bgs, borders };
    }

    function makeBarChart(canvasId, yTitle, values, unit, invert = false) {
      const el = document.getElementById(canvasId);
      if (!el) return null;
      const { text, grid } = getTheme();
      const labels = ['Plane', 'Bus', 'Train'];
      const { backgrounds: bg, borders: border } = valueColors(values, invert);
      return new Chart(el, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: yTitle,
              data: values,
              backgroundColor: bg,
              borderColor: border,
              borderWidth: 2,
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label(ctx) {
                  const val = ctx.parsed.y;
                  return `${ctx.label}: ${val}${unit ? ' ' + unit : ''}`;
                },
              },
            },
          },
          scales: {
            x: {
              ticks: { color: text },
              grid: { display: false },
            },
            y: {
              beginAtZero: true,
              ticks: { color: text },
              grid: { color: grid },
              title: { display: true, text: yTitle, color: text },
            },
          },
          animation: {
            duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 500,
          },
        },
      });
    }

    const charts = { speed: null, co2: null, access: null, capacity: null };
    const slideNames = ['speed', 'co2', 'access', 'capacity'];

    function indexFromHash(hash) {
      if (typeof hash !== 'string' || !hash) return null;
      const match = hash.match(/^#problem(?:\/(\w+))?$/i);
      if (!match || !match[1]) return null;
      const name = match[1].toLowerCase();
      const idx = slideNames.indexOf(name);
      return idx >= 0 ? idx : null;
    }

    function setHashForIndex(idx) {
      const name = slideNames[idx];
      if (!name) return;
      const newHash = `#problem/${name}`;
      // Avoid scroll jump by using History API
      try { history.replaceState(null, '', newHash); } catch (_) { /* no-op */ }
    }
    function initChartByIndex(idx) {
      switch (idx) {
        case 0:
          if (!charts.speed) charts.speed = makeBarChart('speedChart', 'Average Speed (km/h)', [839, 80, 150], 'km/h', false);
          break;
        case 1:
          if (!charts.co2) charts.co2 = makeBarChart('co2Chart', 'CO₂ (g/km per passenger)', [154, 68, 3], 'g/km', true);
          break;
        case 2:
          if (!charts.access) charts.access = makeBarChart('accessChart', 'Access Time (minutes)', [120, 20, 20], 'min', true);
          break;
        case 3:
          if (!charts.capacity) charts.capacity = makeBarChart('capacityChart', 'Passenger Capacity', [180, 40, 800], '', false);
          break;
      }
    }

    // Initialize Swiper with coverflow, keyboard, and rewind (wrap without clones)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const requestedInitialIndex = indexFromHash(location.hash);
    const swiper = new Swiper(swiperContainer, {
      loop: false, // avoid duplicated IDs in cloned slides (charts)
      rewind: true, // wrap around without cloning
      centeredSlides: true,
      slidesPerView: 1,
      breakpoints: {
        1024: { slidesPerView: 1.1 },
      },
      spaceBetween: 24,
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 10,
        stretch: 0,
        depth: 120,
        modifier: 1,
        slideShadows: false,
      },
      speed: prefersReduced ? 0 : 300,
      autoHeight: true,
      keyboard: { enabled: true, onlyInViewport: true, pageUpDown: false },
      a11y: { enabled: true },
    });

    // If URL requested a specific slide, jump there immediately (no animation)
    if (requestedInitialIndex !== null && requestedInitialIndex !== (swiper.realIndex || 0)) {
      swiper.slideTo(requestedInitialIndex, 0);
    }

    // Disable mousewheel/trackpad control for the slider (let the page scroll instead)
    if (swiper.mousewheel && typeof swiper.mousewheel.disable === 'function') {
      try { swiper.mousewheel.disable(); } catch (_) { /* no-op */ }
    }

    // Click any non-active slide to make it active
    const slideEls = Array.from(swiper.slides);
    swiperContainer.addEventListener('click', (e) => {
      const slideEl = e.target.closest('.swiper-slide');
      if (!slideEl || !swiperContainer.contains(slideEl)) return;
      if (slideEl.classList.contains('swiper-slide-active')) return; // already active
      const idx = slideEls.indexOf(slideEl);
      if (idx >= 0) {
        swiper.slideTo(idx);
      }
    });

    // Tiles wiring (tabs above the slider)
    const tilesContainer = document.querySelector('.problem-tiles');
    const tiles = tilesContainer ? Array.from(tilesContainer.querySelectorAll('.problem-tile')) : [];

    const goTo = (i) => {
      if (swiper.params.loop && typeof swiper.slideToLoop === 'function') {
        swiper.slideToLoop(i);
      } else {
        swiper.slideTo(i);
      }
    };

    function updateTiles(activeIndex, moveFocus = false) {
      if (!tiles.length) return;
      tiles.forEach((tile, i) => {
        const isActive = i === activeIndex;
        tile.classList.toggle('is-active', isActive);
        tile.setAttribute('aria-selected', String(isActive));
        tile.setAttribute('tabindex', isActive ? '0' : '-1');
      });
      if (moveFocus && tiles[activeIndex]) tiles[activeIndex].focus();
    }

    tiles.forEach((tile, i) => {
      tile.addEventListener('click', () => {
        goTo(i);
      });
      tile.addEventListener('keydown', (e) => {
        const key = e.key;
        if (key === 'Enter' || key === ' ') {
          e.preventDefault();
          goTo(i);
        } else if (key === 'ArrowRight') {
          e.preventDefault();
          const ni = (i + 1) % tiles.length;
          updateTiles(ni, true);
          goTo(ni);
        } else if (key === 'ArrowLeft') {
          e.preventDefault();
          const pi = (i - 1 + tiles.length) % tiles.length;
          updateTiles(pi, true);
          goTo(pi);
        }
      });
    });

    // Init the first visible chart and lazy-init others on slide change
    initChartByIndex(swiper.realIndex || 0);
    if (swiper.params.autoHeight && typeof swiper.updateAutoHeight === 'function') {
      swiper.updateAutoHeight(0);
    }

    // Announce active slide to assistive tech
    const live = document.getElementById('problem-live');
    const labels = ['Speed', 'CO₂', 'Access', 'Capacity'];
    const announce = (idx) => {
      if (!live) return;
      const name = labels[idx] || `Slide ${idx + 1}`;
      live.textContent = `Showing: ${name}`;
    };
    announce(swiper.realIndex || 0);

    swiper.on('slideChange', () => {
      const idx = swiper.realIndex || 0;
      initChartByIndex(idx);
      updateTiles(idx, false);
      if (swiper.params.autoHeight && typeof swiper.updateAutoHeight === 'function') {
        swiper.updateAutoHeight(prefersReduced ? 0 : 250);
      }
      announce(idx);
      setHashForIndex(idx);
    });

    // (Removed data-table toggle listener; tables were removed from slides)

    // React to URL changes (back/forward or external hash updates)
    window.addEventListener('hashchange', () => {
      const idx = indexFromHash(location.hash);
      if (idx === null) return;
      swiper.slideTo(idx);
      const section = document.getElementById('problem');
      if (section) {
        try { section.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) { /* no-op */ }
      }
    });

    problem.inited = true;
  }

  // Defer loading libs + init until the section approaches viewport
  (function deferProblemInit() {
    const container = document.querySelector('#problem');
    if (!container) return;
    const kickoff = async () => {
      try {
        await ensureProblemLibs();
        initProblemSection();
      } catch (err) {
        // swallow; section will remain static content
      }
    };
    // If URL deep-links to a specific Problem slide, initialize immediately and scroll into view
    if (typeof location.hash === 'string' && /^#problem\//i.test(location.hash)) {
      kickoff();
      try { container.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (_) { /* no-op */ }
      return;
    }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            io.disconnect();
            kickoff();
          }
        });
      }, { root: null, rootMargin: '200px', threshold: 0.01 });
      io.observe(container);
    } else {
      // Fallback: init after DOM load
      kickoff();
    }
  })();

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    const firstLink = () => mobileMenu.querySelector('a, button, [tabindex]:not([tabindex="-1"])');
    let closeTimeoutId = null;
    // Track whether we applied scrollbar compensation
    let sbApplied = false;

    function isOpen() {
      return mobileMenu.classList.contains('is-open');
    }

    function openMenu() {
      if (isOpen()) return;
      clearTimeout(closeTimeoutId);
      // Compute scrollbar width and expose it via CSS var to prevent layout shift
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      if (sbw > 0) {
        document.documentElement.style.setProperty('--sb-comp', `${sbw}px`);
        sbApplied = true;
      } else {
        document.documentElement.style.removeProperty('--sb-comp');
        sbApplied = false;
      }
      mobileMenu.classList.remove('hidden');
      // Allow display to apply before animating (Safari stability)
      requestAnimationFrame(() => {
        mobileMenu.classList.add('is-open');
      });
      mobileMenuBtn.classList.add('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
      mobileMenuBtn.setAttribute('aria-label', 'Close menu');
      document.body.classList.add('menu-open');
      const fl = firstLink();
      if (fl && typeof fl.focus === 'function') {
        setTimeout(() => fl.focus(), 10);
      }
    }

    function closeMenu() {
      if (!isOpen()) return;
      mobileMenu.classList.remove('is-open');
      mobileMenuBtn.classList.remove('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMenuBtn.setAttribute('aria-label', 'Open menu');
      // After animation ends, hide element to remove from flow
      const onTransitionEnd = (e) => {
        if (e && e.target !== mobileMenu) return;
        mobileMenu.classList.add('hidden');
        // Now that the overlay is fully closed, unlock scroll and clear compensation
        document.body.classList.remove('menu-open');
        if (sbApplied) {
          document.documentElement.style.removeProperty('--sb-comp');
          sbApplied = false;
        }
        mobileMenu.removeEventListener('transitionend', onTransitionEnd);
      };
      mobileMenu.addEventListener('transitionend', onTransitionEnd);
      // Fallback timeout in case transitionend doesn't fire
      closeTimeoutId = setTimeout(() => {
        if (!isOpen()) {
          mobileMenu.classList.add('hidden');
          document.body.classList.remove('menu-open');
          if (sbApplied) {
            document.documentElement.style.removeProperty('--sb-comp');
            sbApplied = false;
          }
        }
      }, 300);
      // Return focus to the button for accessibility
      setTimeout(() => mobileMenuBtn.focus(), 0);
    }

    mobileMenuBtn.addEventListener('click', () => {
      if (isOpen()) closeMenu();
      else openMenu();
    });

    // Close menu on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        e.preventDefault();
        closeMenu();
      }
    });

    // Close menu when any overlay link is clicked
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        // Allow default anchor navigation, then close
        closeMenu();
      });
    });

    // Ensure correct state on resize (closing overlay on md+)
    const mql = window.matchMedia('(min-width: 768px)');
    function handleResize(e) {
      if (e.matches) {
        // moving to desktop layout, force close
        mobileMenu.classList.remove('is-open');
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.classList.remove('is-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Open menu');
        document.body.classList.remove('menu-open');
        document.documentElement.style.removeProperty('--sb-comp');
        sbApplied = false;
      }
    }
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handleResize);
    } else if (typeof mql.addListener === 'function') {
      // Safari <14
      mql.addListener(handleResize);
    }
  }

  // Subteam browser (tabs) setup
  setupSubteamTabs();

  function setupSubteamTabs() {
    const tabsContainer = document.getElementById('subteam-tabs');
    const panelsContainer = document.getElementById('subteam-panels');
    if (!tabsContainer || !panelsContainer) return;

    const tabs = Array.from(tabsContainer.querySelectorAll('[role="tab"]'));
    const panels = Array.from(panelsContainer.querySelectorAll('[role="tabpanel"]'));

    // Keep ARIA orientation accurate across breakpoints
    function updateTablistOrientation() {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches;
      tabsContainer.setAttribute('aria-orientation', isDesktop ? 'vertical' : 'horizontal');
    }
    updateTablistOrientation();
    window.addEventListener('resize', updateTablistOrientation);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function centerTabInView(tabEl) {
      if (!tabEl || !tabsContainer) return;
      // Only attempt on horizontal/scrollable layouts
      const isMobileLayout = window.matchMedia('(max-width: 767.98px)').matches;
      const isScrollable = tabsContainer.scrollWidth > tabsContainer.clientWidth + 4;
      if (!(isMobileLayout && isScrollable)) return;

      try {
        tabEl.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      } catch (e) {
        // Fallback for older browsers
        const tabRect = tabEl.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();
        const offset = (tabRect.left + tabRect.right) / 2 - (containerRect.left + containerRect.right) / 2;
        tabsContainer.scrollLeft += offset;
      }
    }

    function activate(id, focusTab = false, updateHash = true) {
      tabs.forEach((tab) => {
        const isTarget = tab.dataset.target === id || tab.id === `tab-${id}`;
        tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
        tab.tabIndex = isTarget ? 0 : -1;
        tab.classList.toggle('is-active', isTarget);
      });

      panels.forEach((panel) => {
        const isTarget = panel.id === `panel-${id}`;
        if (isTarget) {
          panel.removeAttribute('hidden');
          panel.classList.add('is-active');
          // If using reveal animations, ensure it becomes visible when activated
          if (panel.classList.contains('reveal-card')) {
            panel.classList.add('visible');
          }
        } else {
          panel.setAttribute('hidden', '');
          panel.classList.remove('is-active');
        }
      });

      if (updateHash) {
        const newHash = `#team-${id}`;
        if (history.replaceState) {
          history.replaceState(null, '', newHash);
        } else {
          location.hash = newHash; // fallback
        }
      }

      if (focusTab) {
        const activeTab = tabs.find((t) => t.dataset.target === id);
        if (activeTab) activeTab.focus();
      }

      // Ensure the active tab is visible/centered on mobile scrollable tab row
      const activeTab = tabs.find((t) => t.dataset.target === id);
      if (activeTab) centerTabInView(activeTab);
    }

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => activate(tab.dataset.target, false, true));

      tab.addEventListener('keydown', (e) => {
        const { key } = e;
        if (key === 'ArrowRight' || key === 'ArrowDown') {
          e.preventDefault();
          const next = (idx + 1) % tabs.length;
          tabs[next].focus();
        } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
          e.preventDefault();
          const prev = (idx - 1 + tabs.length) % tabs.length;
          tabs[prev].focus();
        } else if (key === 'Home') {
          e.preventDefault();
          tabs[0].focus();
        } else if (key === 'End') {
          e.preventDefault();
          tabs[tabs.length - 1].focus();
        } else if (key === 'Enter' || key === ' ') {
          e.preventDefault();
          activate(tab.dataset.target, false, true);
        }
      });
    });

    // Initialize from hash if present
    const match = location.hash.match(/^#team-(.+)$/);
    if (match && tabs.some((t) => t.dataset.target === match[1])) {
      activate(match[1], false, false);
    } else {
      // Default to the first marked active or the first tab
      const first = tabs.find((t) => t.classList.contains('is-active')) || tabs[0];
      if (first) activate(first.dataset.target, false, false);
    }

    // After initial activation, center the active tab in view on mobile
    const initiallyActive = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    if (initiallyActive) centerTabInView(initiallyActive);
  }
});

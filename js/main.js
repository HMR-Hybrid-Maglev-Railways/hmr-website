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

        const id = entry.target.id;
        const isChart = id === 'speedProblemChart' || id === 'co2ProblemChart' || id === 'capacityProblemChart' || id === 'timeProblemChart';
        if (isChart) {
          if (id === 'speedProblemChart') renderSpeedProblemChart();
          else if (id === 'co2ProblemChart') renderCO2ProblemChart();
          else if (id === 'capacityProblemChart') renderCapacityProblemChart();
          else if (id === 'timeProblemChart') renderTimeProblemChart();
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      '.fade-in, .reveal-card, #speedProblemChart, #co2ProblemChart, #capacityProblemChart, #timeProblemChart'
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

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('#mobile-menu a, nav a').forEach((link) => {
      link.addEventListener('click', () => {
        if (link.hash !== '') {
          if (mobileMenu.contains(link)) {
            mobileMenu.classList.add('hidden');
          }
        }
      });
    });
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

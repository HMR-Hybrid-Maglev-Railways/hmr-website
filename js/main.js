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

        if (entry.target.classList.contains('animated-counter')) {
          animateCounter(entry.target);
        }

        if (entry.target.id === 'speedProblemChart') {
          renderSpeedProblemChart();
        }
        if (entry.target.id === 'co2ProblemChart') {
          renderCO2ProblemChart();
        }
        if (entry.target.id === 'capacityProblemChart') {
          renderCapacityProblemChart();
        }
        if (entry.target.id === 'timeProblemChart') {
          renderTimeProblemChart();
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      '.fade-in, .reveal-card, .animated-counter, #speedProblemChart, #co2ProblemChart, #capacityProblemChart, #timeProblemChart'
    )
    .forEach((el) => {
      observer.observe(el);
    });

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        el.textContent = target;
      } else {
        el.textContent = Math.round(current);
      }
    }, stepTime);
  }

  function createBarChart(canvasId, labels, data, axisLabel, dataLabel) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const textColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--text-light')
      .trim();
    const accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-color')
      .trim();

    const containerWidth = canvas.parentElement?.clientWidth || window.innerWidth;
    const tickFontSize = containerWidth < 380 ? 11 : containerWidth < 640 ? 12 : 14;

    /* global Chart */
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: dataLabel,
            data: data,
            backgroundColor: [
              'rgba(239, 68, 68, 0.7)', // red-500
              'rgba(250, 204, 21, 0.7)', // yellow-400
              'rgba(52, 211, 153, 0.7)', // green-400
            ],
            borderColor: [
              'rgba(239, 68, 68, 1)',
              'rgba(250, 204, 21, 1)',
              'rgba(52, 211, 153, 1)',
            ],
            borderWidth: 1,
            categoryPercentage: 0.75,
            barPercentage: 0.75,
          },
        ],
      },
      options: {
        indexAxis: 'x',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 8,
            right: 18,
            bottom: 30,
            left: 12,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: axisLabel,
              color: textColor,
              font: { size: 16, weight: 'bold' },
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
            },
            ticks: {
              color: textColor,
              font: { size: tickFontSize },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: textColor,
              font: { size: tickFontSize },
              maxRotation: 0,
              autoSkip: false,
            },
          },
        },
        elements: {
          bar: {
            borderRadius: 6,
          },
        },
      },
    });
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
});

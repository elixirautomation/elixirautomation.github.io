(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

  const header = $('[data-header]');
  const nav = $('[data-nav]');
  const navToggle = $('[data-nav-toggle]');
  const themeToggle = $('[data-theme-toggle]');
  const toast = $('[data-toast]');
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
    themeToggle?.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#07111d' : '#f5f8fa');
  }

  function toggleTheme() {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  }

  setTheme(root.dataset.theme || 'dark');
  themeToggle?.addEventListener('click', toggleTheme);

  function closeNav() {
    nav?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }

  navToggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  $$('.site-nav a').forEach(link => link.addEventListener('click', closeNav));

  const updateHeader = () => header?.classList.toggle('scrolled', scrollY > 18);
  updateHeader();
  addEventListener('scroll', updateHeader, { passive: true });

  const revealElements = $$('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(element => element.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px' });
    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
      revealObserver.observe(element);
    });
  }

  const navLinks = $$('.site-nav a');
  const trackedSections = navLinks.map(link => $(link.hash)).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${visible.target.id}`));
    }, { rootMargin: '-25% 0px -60%', threshold: [0.05, 0.25, 0.5] });
    trackedSections.forEach(section => sectionObserver.observe(section));
  }

  const rotatingWords = ['observable.', 'explainable.', 'resilient.', 'scalable.'];
  const rotatingWord = $('[data-rotating-word]');
  if (rotatingWord && !reducedMotion) {
    let index = 0;
    setInterval(() => {
      rotatingWord.animate([
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-10px)' }
      ], { duration: 240, fill: 'forwards' }).finished.then(() => {
        index = (index + 1) % rotatingWords.length;
        rotatingWord.textContent = rotatingWords[index];
        rotatingWord.animate([
          { opacity: 0, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 320, fill: 'forwards' });
      });
    }, 2800);
  }

  const agentLogs = [
    'sentinel.ingest → analyze → explain',
    'mcp.spec → generate → validate',
    'signals.logs + traces + performance',
    'agentcore.runtime → tool → evidence'
  ];
  const agentLog = $('[data-agent-log]');
  if (agentLog && !reducedMotion) {
    let logIndex = 0;
    setInterval(() => {
      logIndex = (logIndex + 1) % agentLogs.length;
      agentLog.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards' }).finished.then(() => {
        agentLog.textContent = agentLogs[logIndex];
        agentLog.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 260, fill: 'forwards' });
      });
    }, 2400);
  }

  const metricRow = $('.metric-row');
  if (metricRow && !reducedMotion && 'IntersectionObserver' in window) {
    let animated = false;
    const counterObserver = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || animated) return;
      animated = true;
      $$('[data-count]', metricRow).forEach(element => {
        const target = Number(element.dataset.count);
        const suffix = element.dataset.suffix || '';
        const start = performance.now();
        const duration = 900;
        const tick = now => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = `${Math.round(target * eased)}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      counterObserver.disconnect();
    }, { threshold: 0.6 });
    counterObserver.observe(metricRow);
  }

  if (!reducedMotion && matchMedia('(pointer: fine)').matches) {
    const glow = $('.cursor-glow');
    addEventListener('pointermove', event => {
      if (!glow) return;
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });

    $$('.tilt-card').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave', () => card.style.transform = '');
    });
  }

  $$('[data-print]').forEach(button => button.addEventListener('click', () => print()));
  $('[data-copy-email]')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('abhilash04sharma@gmail.com');
      showToast('Email copied to clipboard');
    } catch {
      location.href = 'mailto:abhilash04sharma@gmail.com';
    }
  });

  const dialog = $('[data-command-dialog]');
  const commandOpen = $('[data-command-open]');
  const commandInput = $('[data-command-input]');
  const commandButtons = $$('[data-command], [data-command-action]', dialog);
  const commandEmpty = $('.command-empty', dialog);

  function openCommand() {
    if (!dialog?.open) dialog?.showModal();
    commandInput.value = '';
    filterCommands('');
    requestAnimationFrame(() => commandInput?.focus());
  }
  function closeCommand() { dialog?.close(); }
  function filterCommands(query) {
    const normalized = query.trim().toLowerCase();
    let visibleCount = 0;
    commandButtons.forEach(button => {
      const visible = button.textContent.toLowerCase().includes(normalized);
      button.hidden = !visible;
      if (visible) visibleCount++;
    });
    commandEmpty.hidden = visibleCount > 0;
  }
  function runCommand(button) {
    const target = button.dataset.command;
    const action = button.dataset.commandAction;
    closeCommand();
    if (target) $(target)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    if (action === 'theme') toggleTheme();
    if (action === 'print') print();
  }

  commandOpen?.addEventListener('click', openCommand);
  commandInput?.addEventListener('input', event => filterCommands(event.target.value));
  commandInput?.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      const firstVisible = commandButtons.find(button => !button.hidden);
      if (firstVisible) runCommand(firstVisible);
    }
  });
  commandButtons.forEach(button => button.addEventListener('click', () => runCommand(button)));
  dialog?.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    if (outside) closeCommand();
  });
  addEventListener('keydown', event => {
    const commandShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
    const slashShortcut = event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
    if (commandShortcut || slashShortcut) { event.preventDefault(); openCommand(); }
    if (event.key === 'Escape' && dialog?.open) closeCommand();
  });

  const careerTimeline = $('[data-career-timeline]');
  const careerItems = $$('.career-item', careerTimeline || document);
  const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

  if (careerItems.length && (reducedMotion || !('requestAnimationFrame' in window))) {
    careerItems.forEach(item => item.classList.add('in-view'));
  }

  let scrollTicking = false;
  const renderScrollEffects = () => {
    scrollTicking = false;
    const scrollRange = document.documentElement.scrollHeight - innerHeight;
    root.style.setProperty('--page-progress', scrollRange > 0 ? clamp(scrollY / scrollRange).toFixed(4) : '1');

    if (!careerTimeline || reducedMotion || !careerItems.length) return;

    const timelineRect = careerTimeline.getBoundingClientRect();
    const focusY = innerHeight * 0.58;
    const nodeCenters = careerItems.map(item => {
      const node = $('.career-node', item) || item;
      const nodeRect = node.getBoundingClientRect();
      return nodeRect.top + nodeRect.height / 2;
    });
    const firstNode = nodeCenters[0];
    const lastNode = nodeCenters[nodeCenters.length - 1];
    const lineDistance = Math.max(lastNode - firstNode, 1);
    const lineProgress = clamp((focusY - firstNode) / lineDistance);

    careerTimeline.style.setProperty('--timeline-progress', lineProgress.toFixed(4));
    careerTimeline.style.setProperty('--timeline-line-start', `${Math.max(firstNode - timelineRect.top, 0).toFixed(1)}px`);
    careerTimeline.style.setProperty('--timeline-line-end', `${Math.max(timelineRect.bottom - lastNode, 0).toFixed(1)}px`);

    let closestIndex = -1;
    let closestDistance = Infinity;
    const revealStart = innerHeight * 0.94;
    const revealDistance = Math.max(innerHeight * 0.34, 220);

    careerItems.forEach((item, index) => {
      const nodeCenter = nodeCenters[index];
      const rawProgress = clamp((revealStart - nodeCenter) / revealDistance);
      const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
      const direction = index % 2 === 0 ? 1 : -1;
      const offsetX = direction * (1 - easedProgress) * 54;
      const offsetY = (1 - easedProgress) * 18;

      item.style.setProperty('--timeline-opacity', (0.12 + easedProgress * 0.88).toFixed(3));
      item.style.setProperty('--timeline-x', `${offsetX.toFixed(2)}px`);
      item.style.setProperty('--timeline-y', `${offsetY.toFixed(2)}px`);
      item.style.setProperty('--timeline-scale', (0.975 + easedProgress * 0.025).toFixed(4));
      item.style.setProperty('--timeline-node-scale', (0.35 + easedProgress * 0.65).toFixed(3));
      item.classList.toggle('in-view', rawProgress > 0.02);
      item.classList.toggle('is-past', nodeCenter <= focusY);

      const distance = Math.abs(nodeCenter - focusY);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    careerItems.forEach((item, index) => {
      item.classList.toggle('is-focused', index === closestIndex && closestDistance < innerHeight * 0.34);
    });
  };

  const requestScrollEffects = () => {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(renderScrollEffects);
  };

  addEventListener('scroll', requestScrollEffects, { passive: true });
  addEventListener('resize', requestScrollEffects, { passive: true });
  renderScrollEffects();

  $('[data-year]').textContent = new Date().getFullYear();
})();

// ── Typing Animation Engine ──────────────────────────
class TerminalSequence {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  add(fn) {
    this.queue.push(fn);
    return this;
  }

  async run() {
    if (this.running) return;
    this.running = true;
    for (const fn of this.queue) {
      await fn();
    }
    this.running = false;
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function typeText(element, text, speed = 55) {
  for (let i = 0; i < text.length; i++) {
    element.textContent += text[i];
    await wait(speed + Math.random() * 30);
  }
  element.classList.add('done');
}

function show(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

// ── Run the sequence ─────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
  const seq = new TerminalSequence();

  // 1. neofetch
  seq.add(async () => {
    await wait(600);
    const promptText = document.querySelector('#prompt-neofetch .prompt-text');
    await typeText(promptText, 'neofetch');
    await wait(300);
    show('neofetch');
  });

  // 2. npm ls
  seq.add(async () => {
    await wait(800);
    show('prompt-npm');
    const promptText = document.querySelector('#prompt-npm .prompt-text');
    await typeText(promptText, 'npm ls --depth=0');
    await wait(300);
    show('projects');

    // Stagger project items
    const items = document.querySelectorAll('.project-item');
    for (const item of items) {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-10px)';
    }
    for (let i = 0; i < items.length; i++) {
      await wait(150);
      items[i].style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      items[i].style.opacity = '1';
      items[i].style.transform = 'translateX(0)';
    }
  });

  // 3. contact
  seq.add(async () => {
    await wait(800);
    show('prompt-contact');
    const promptText = document.querySelector('#prompt-contact .prompt-text');
    await typeText(promptText, 'echo $CONTATO');
    await wait(300);
    show('contact');

    // Stagger contact links
    const links = document.querySelectorAll('.contact-link');
    for (const link of links) {
      link.style.opacity = '0';
      link.style.transform = 'translateY(8px)';
    }
    for (let i = 0; i < links.length; i++) {
      await wait(200);
      links[i].style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      links[i].style.opacity = '1';
      links[i].style.transform = 'translateY(0)';
    }
  });

  // 4. final cursor
  seq.add(async () => {
    await wait(500);
    show('prompt-cursor');
  });

  seq.run();
});

// spawn drifting petals
function spawnPetals() {
  const interval = setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "rose-petal";
    // random start across the flowers area
    const startX = Math.random() * window.innerWidth;
    const drift = (Math.random() * 240) - 120;
    petal.style.left = `${startX}px`;
    petal.style.top = `-10vh`;
    petal.style.width = `${10 + Math.random() * 18}px`;
    petal.style.height = `${12 + Math.random() * 22}px`;
    petal.style.borderRadius = "60% 40% 60% 40%";
    petal.style.background = "radial-gradient(circle at 40% 40%, #ff9fb2, #ff4d6d, #b3002d)";
    petal.style.opacity = 0.95;
    petal.style.position = "fixed";
    petal.style.zIndex = 6;
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    petal.style.setProperty("--petal-x", `${drift}px`);
    petal.style.animation = `petalFall ${3 + Math.random() * 6}s linear forwards`;
    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 10000);
  }, 360);
  return interval;
}

// add dew drops inside each flower
function addDewDrops() {
  document.querySelectorAll(".flower").forEach(flower => {
    for (let i = 0; i < 5; i++) {
      const dew = document.createElement("div");
      dew.className = "dew-drop";
      dew.style.left = `${10 + Math.random() * 60 - 20}px`;
      dew.style.top = `${10 + Math.random() * 40 - 20}px`;
      dew.style.position = "absolute";
      dew.style.width = `${4 + Math.random() * 6}px`;
      dew.style.height = dew.style.width;
      flower.appendChild(dew);
    }
  });
}

// Run enhancements when the page removes .not-loaded (flowers reveal)
const launchObserver = new MutationObserver((mutations) => {
  if (!document.body.classList.contains("not-loaded")) {
    // spawn content once
    spawnRoses();
    addDewDrops();
    const petalInterval = spawnPetals();
    const birdInterval = spawnBirdsLoop();
    // show ribbon & music after small delay so scene settles
    setTimeout(showRibbonAndMusic, 1200);

    // stop observing after launch
    launchObserver.disconnect();

    // cleanup: optionally stop intervals after some time (optional)
    setTimeout(() => clearInterval(petalInterval), 30000); // stop petals after 30s
    setTimeout(() => clearInterval(birdInterval), 60000); // stop birds after 60s
  }
});

launchObserver.observe(document.body, { attributes: true });

// spawn birds periodically
function spawnBirdOnce() {
  const root = document.getElementById("birds-root");
  const bird = document.createElement("div");
  bird.className = "bird";
  bird.style.left = `${-8}vw`;
  bird.style.top = `${12 + Math.random() * 20}vh`;
  root.appendChild(bird);

  // remove after animation completes ~6s
  setTimeout(() => root.removeChild(bird), 7000);
}

function spawnBirdsLoop() {
  spawnBirdOnce();
  return setInterval(spawnBirdOnce, 8000);
}

// show ribbon message & try play music
function showRibbonAndMusic() {
  const ribbon = document.getElementById("ribbonMsg");
  if (ribbon) ribbon.style.display = "block";
  const audio = document.getElementById("bgMusic");
  if (audio) {
    audio.play().catch(() => {
      // auto-play blocked: try to unmute on first user interaction
      const onFirst = () => {
        audio.play().catch(()=>{});
        window.removeEventListener('pointerdown', onFirst);
      };
      window.addEventListener('pointerdown', onFirst);
    });
  }
}

// toggle message panel
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('msgBtn');
  const panel = document.getElementById('msgPanel');
  if (!btn || !panel) return;

  let open = false;
  btn.addEventListener('click', (e) => {
    open = !open;
    panel.classList.toggle('show', open);
    panel.setAttribute('aria-hidden', !open);
  });

  // close when clicking outside
  document.addEventListener('click', (e) => {
    if (!open) return;
    if (btn.contains(e.target) || panel.contains(e.target)) return;
    open = false;
    panel.classList.remove('show');
    panel.setAttribute('aria-hidden', 'true');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const questionBox = document.getElementById("questionBox");
  const questionText = document.getElementById("questionText");
  const helloBox = document.querySelector(".hello-box");

  helloBox.style.display = "none"; // hide initially

  let noPressCount = 0;

  const questions = [
    "Are you sure you're not pretty?",
    "Think again… maybe you are 😌",
    "Come on… you look good!",
    "Stop pressing no 😭",
    "You're literally adorable tho 💔",
    "No? Really??",
    "You're cute and you know it!",
    "Just accept it already 😭🙏",
    "Okay last chance!"
  ];

  // NO BUTTON LOGIC
  noBtn.addEventListener("click", () => {
    noPressCount++;

    // FIRST 9 TIMES → move + change question
    if (noPressCount <= 9) {
      questionText.textContent = questions[noPressCount - 1];

      const newX = (Math.random() * 100 - 100);
      const newY = (Math.random() * 400 - 200);
      noBtn.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    // 10th PRESS → convert NO to YES (but DO NOT finish immediately)
    if (noPressCount === 10) {
      questionText.textContent = "Okay now tell the truth 💔💔";

      noBtn.textContent = "Yes";
      noBtn.classList.remove("no");
      noBtn.classList.add("yes");
      noBtn.style.transform = "none";

      yesBtn.classList.add("yes");
      yesBtn.textContent = "Yes";

      return; // IMPORTANT: stop here so the box stays visible
    }

    // 11th CLICK → now this YES ends the sequence
    if (noPressCount > 10) {
      finishSequence();
    }
  });

  // YES BUTTON LOGIC
  yesBtn.addEventListener("click", () => {
    finishSequence();
  });

  function finishSequence() {
    // hide question box
    questionBox.style.display = "none";

    document.getElementById("ribbonMsg").style.display = "block";

    // show hello box
    helloBox.style.display = "flex";

    // trigger flower animation
    document.body.classList.remove("not-loaded");
  }
});

/* 🌹 SPAWN FLOATING PETALS */
function spawnPetals() {
  setInterval(() => {
    const petal = document.createElement("div");
    petal.classList.add("rose-petal");

    const startX = Math.random() * window.innerWidth;
    const drift = (Math.random() * 200) - 100;

    petal.style.left = `${startX}px`;
    petal.style.setProperty("--petal-x", `${drift}px`);
    petal.style.animationDuration = `${4 + Math.random() * 4}s`;

    document.body.appendChild(petal);

    setTimeout(() => petal.remove(), 8000);
  }, 350);
}

/* 🌹 Add dew drops around each flower */
function addDewDrops() {
  document.querySelectorAll(".flower").forEach(flower => {
    for (let i = 0; i < 5; i++) {
      const dew = document.createElement("div");
      dew.classList.add("dew-drop");
      dew.style.left = `${Math.random() * 60 - 20}px`;
      dew.style.top = `${Math.random() * 60 - 20}px`;
      flower.appendChild(dew);
    }
  });
}

/* 🌹 Create many roses rising from ground */

function spawnRoses() {
  const container = document.querySelector(".flowers");
  if (!container) return;
  const template = container.querySelector(".flower");
  if (!template) return;

  // spawn a cluster of 5-6 roses centered inside the container
  const count = 6;
  for (let i = 0; i < count; i++) {
    const clone = template.cloneNode(true);

    // make it positioned absolutely in the container and center-clustered
    clone.classList.add("rose-cluster");
    clone.style.position = "absolute";

    // small spread around center using calc based on 50%
    const offset = (Math.random() * 140) - 70; // -70px .. +70px
    clone.style.left = `calc(50% + ${offset}px)`;

    // start a little below ground for rising effect
    clone.style.bottom = "-22px";

    // alternate the moving-flower classes so clones sway
    const animClass = `flower--${(i % 3) + 1}`;
    clone.classList.add(animClass);

    // Stagger inner animations so they bloom/sway naturally
    const line = clone.querySelector('.flower__line');
    if (line) line.style.animationDelay = `${0.2 + i * 0.12}s`;
    const leafs = clone.querySelector('.flower__leafs');
    if (leafs) leafs.style.animationDelay = `${0.9 + i * 0.12}s`;
    clone.querySelectorAll('.flower__light').forEach((el, idx) => {
      el.style.animationDelay = `${0.3 + i * 0.07 + idx * 0.05}s`;
    });

    // tiny rotation/scale variation
    const r = (Math.random() * 6) - 3;
    const s = 0.96 + Math.random() * 0.08;
    clone.style.transform = `rotate(${r}deg) scale(${s})`;

    // append
    container.appendChild(clone);
  }
}




/* 🌹 Trigger all cute effects only when flowers are revealed */
document.body.classList.contains("not-loaded"); // once removed → run effects



function spawnBirds() {
  const bird = document.createElement("div");
  bird.classList.add("bird");
  bird.style.left = `${10 + Math.random() * 80}vw`;

  document.body.appendChild(bird);
}


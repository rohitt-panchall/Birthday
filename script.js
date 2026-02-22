(function () {
  // Countdown ends at exactly 12:00 AM (midnight) on 2nd March 2026, IST.
  const COUNTDOWN_END_IST = new Date('2026-03-02T00:00:00+05:30');

  // Set to true to allow clicking "Let's celebrate" before the countdown ends (for testing).
  const DEV_ALWAYS_ENABLE_BUTTON = true;

  const countdownScreen = document.getElementById('countdown-screen');
  const mainContent = document.getElementById('main-content');
  const countdownHeadingEl = document.getElementById('countdown-heading');
  const countdownTextEl = document.getElementById('countdown-text');
  const countdownTimerEl = document.getElementById('countdown-timer');
  const btnCelebrate = document.getElementById('btn-celebrate');
  const hoursEl = document.getElementById('countdown-hours');
  const minsEl = document.getElementById('countdown-mins');
  const secsEl = document.getElementById('countdown-secs');

  const cuteTexts = [
    'Something sweet is coming… 🎂',
    'Your day is almost here! 💕',
    'Get ready for something special ✨',
    'Counting the moments till we celebrate you 🌸',
    'Can’t wait to make your day amazing 🎈',
    'The best day of the year is coming! 🎉',
    'You deserve the happiest birthday ever 💝',
    'Soon we’ll be celebrating you! 🧁',
    'Every second closer to your special day 🌟',
    'Birthday magic loading… ✨',
  ];

  let celebrationUnlocked = false;

  function updateCountdown() {
    if (celebrationUnlocked && !DEV_ALWAYS_ENABLE_BUTTON) {
      return;
    }

    const now = new Date();
    const diff = COUNTDOWN_END_IST - now;

    if (diff <= 0) {
      unlockCelebrate();
      return;
    }

    const totalSecs = Math.floor(diff / 1000);
    const secs = totalSecs % 60;
    const totalMins = Math.floor(totalSecs / 60);
    const mins = totalMins % 60;
    const totalHours = Math.floor(totalMins / 60);

    hoursEl.textContent = String(totalHours);
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  function runFirecrackerEffect() {
    const colors = ['firecracker-spark--gold', 'firecracker-spark--orange', 'firecracker-spark--white', 'firecracker-spark--violet'];
    const overlay = document.createElement('div');
    overlay.className = 'firecracker-overlay';

    var flash = document.createElement('div');
    flash.className = 'firecracker-flash';
    overlay.appendChild(flash);

    const sparks = [];
    const w = window.innerWidth;
    const h = window.innerHeight;

    function addBurst(originXPercent, originYPercent, delayMs, count) {
      const ox = (originXPercent / 100) * w;
      const oy = (originYPercent / 100) * h;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const dist = 60 + Math.random() * 200;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        const spark = document.createElement('div');
        spark.className = 'firecracker-spark ' + colors[Math.floor(Math.random() * colors.length)];
        spark.style.left = ox + 'px';
        spark.style.top = oy + 'px';
        overlay.appendChild(spark);
        sparks.push({
          el: spark,
          ox: ox,
          oy: oy,
          dx: dx,
          dy: dy,
          startTime: Date.now() + delayMs + Math.random() * 80,
        });
      }
    }

    addBurst(50, 50, 0, 70);
    addBurst(20, 20, 80, 25);
    addBurst(80, 20, 100, 25);
    addBurst(20, 80, 120, 25);
    addBurst(80, 80, 140, 25);
    addBurst(10, 50, 60, 18);
    addBurst(90, 50, 90, 18);

    document.body.appendChild(overlay);

    const duration = 1400;
    function tick() {
      const now = Date.now();
      let anyActive = false;
      sparks.forEach(function (s) {
        if (now < s.startTime) {
          anyActive = true;
          return;
        }
        const elapsed = now - s.startTime;
        if (elapsed >= duration) {
          s.el.style.opacity = '0';
          return;
        }
        anyActive = true;
        const t = elapsed / duration;
        const ease = 1 - Math.pow(1 - t, 2);
        const moveX = s.dx * ease;
        const moveY = s.dy * ease;
        const opacity = 1 - t;
        s.el.style.transform = 'translate(-50%, -50%) translate(' + moveX + 'px, ' + moveY + 'px)';
        s.el.style.opacity = String(opacity);
      });
      if (anyActive) requestAnimationFrame(tick);
      else overlay.remove();
    }
    requestAnimationFrame(tick);
    setTimeout(function () {
      if (overlay.parentNode) overlay.remove();
    }, 3000);
  }

  function unlockCelebrate() {
    if (celebrationUnlocked) return;
    celebrationUnlocked = true;

    runFirecrackerEffect();

    // Change texts to birthday message
    if (countdownHeadingEl) {
      countdownHeadingEl.textContent = 'Happy Birthday DUGGUU!!';
    }
    if (countdownTextEl) {
      countdownTextEl.textContent = 'Tap the button to celebrate 💕';
    }

    // Fade out the timer a bit (optional visual)
    if (countdownTimerEl) {
      countdownTimerEl.style.opacity = '0.4';
    }

    // Enable the button
    if (btnCelebrate) {
      btnCelebrate.disabled = false;
      btnCelebrate.classList.remove('btn-celebrate--disabled');
    }
  }

  function rotateCuteText() {
    let i = 0;
    countdownTextEl.textContent = cuteTexts[0];
    setInterval(function () {
      i = (i + 1) % cuteTexts.length;
      countdownTextEl.style.opacity = '0';
      setTimeout(function () {
        countdownTextEl.textContent = cuteTexts[i];
        countdownTextEl.style.opacity = '1';
      }, 400);
    }, 4000);
  }

  function spawnHeartsAroundButton(btn) {
    const hearts = ['💜', '💕', '💗'];
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * 2 * Math.PI;
      const dx = Math.cos(angle) * 70;
      const dy = Math.sin(angle) * 70;
      const span = document.createElement('span');
      span.textContent = hearts[i % hearts.length];
      span.className = 'heart-burst';
      span.style.cssText =
        'position:fixed;left:' + cx + 'px;top:' + cy + 'px;font-size:1.2rem;pointer-events:none;z-index:999;' +
        'transform:translate(-50%,-50%);animation:heartBurst 1s ease-out forwards;' +
        '--dx:' + dx + 'px;--dy:' + dy + 'px;';
      document.body.appendChild(span);
      setTimeout(function () { span.remove(); }, 1000);
    }
  }

  function openCelebration() {
    if (!celebrationUnlocked && !DEV_ALWAYS_ENABLE_BUTTON) {
      return;
    }

    runFirecrackerEffect();
    if (btnCelebrate) spawnHeartsAroundButton(btnCelebrate);
    setTimeout(function () {
      countdownScreen.classList.add('hidden');
      mainContent.classList.add('visible');
      runConfetti();
    }, 900);
  }

  btnCelebrate.addEventListener('click', openCelebration);

  var btnSurprise = document.querySelector('.btn-surprise');
  var surpriseScreen = document.getElementById('surprise-screen');
  var btnCloseSurprise = document.getElementById('btn-close-surprise');

  if (btnSurprise && surpriseScreen) {
    btnSurprise.addEventListener('click', function () {
      surpriseScreen.classList.remove('hidden');
    });
  }

  var btnLights = document.getElementById('btn-lights');
  var sliceHint = document.getElementById('slice-hint');
  var cakeTouchZone = document.getElementById('cake-touch-zone');
  var yayyyText = document.getElementById('yayyy-text');
  var birthdayAgainText = document.getElementById('birthday-again-text');

  if (btnLights && surpriseScreen) {
    btnLights.addEventListener('click', function () {
      surpriseScreen.classList.add('night-mode');
      if (sliceHint) sliceHint.classList.remove('slice-hint-visible');
      if (cakeTouchZone) cakeTouchZone.classList.remove('cake-sliced');
      if (yayyyText) yayyyText.classList.remove('yayyy-visible');
      if (birthdayAgainText) birthdayAgainText.classList.remove('birthday-again-visible');
      setTimeout(function () {
        if (sliceHint) sliceHint.classList.add('slice-hint-visible');
      }, 5000);
    });
  }

  function triggerCakeSlice() {
    if (!cakeTouchZone || cakeTouchZone.classList.contains('cake-sliced')) return;
    cakeTouchZone.classList.add('cake-sliced');
    if (sliceHint) sliceHint.classList.remove('slice-hint-visible');
    if (yayyyText) yayyyText.classList.add('yayyy-visible');
    setTimeout(function () {
      if (birthdayAgainText) birthdayAgainText.classList.add('birthday-again-visible');
    }, 2000);
  }

  if (cakeTouchZone) {
    var sliceStartX = null;
    var sliceStartY = null;
    var pointerDown = false;

    function handleSliceStart(clientX, clientY) {
      if (!surpriseScreen.classList.contains('night-mode')) return;
      var rect = cakeTouchZone.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
        sliceStartX = clientX;
        sliceStartY = clientY;
        pointerDown = true;
      }
    }

    function handleSliceMove(clientX, clientY) {
      if (!pointerDown || sliceStartX === null) return;
      var rect = cakeTouchZone.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      if ((sliceStartX < centerX && clientX > centerX) || (sliceStartX > centerX && clientX < centerX)) {
        pointerDown = false;
        sliceStartX = null;
        triggerCakeSlice();
      }
    }

    function handleSliceEnd() {
      pointerDown = false;
      sliceStartX = null;
    }

    cakeTouchZone.addEventListener('touchstart', function (e) {
      handleSliceStart(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    cakeTouchZone.addEventListener('touchmove', function (e) {
      handleSliceMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
    cakeTouchZone.addEventListener('touchend', handleSliceEnd);

    cakeTouchZone.addEventListener('mousedown', function (e) {
      handleSliceStart(e.clientX, e.clientY);
    });
    cakeTouchZone.addEventListener('mousemove', function (e) {
      handleSliceMove(e.clientX, e.clientY);
    });
    cakeTouchZone.addEventListener('mouseup', handleSliceEnd);
    cakeTouchZone.addEventListener('mouseleave', handleSliceEnd);
  }

  var btnPlayMusic = document.getElementById('btn-play-music');
  var birthdayAudio = document.getElementById('birthday-audio');
  if (btnPlayMusic && birthdayAudio) {
    btnPlayMusic.addEventListener('click', function () {
      if (birthdayAudio.paused) {
        birthdayAudio.play().catch(function () {});
        btnPlayMusic.textContent = '⏸ Pause music';
      } else {
        birthdayAudio.pause();
        btnPlayMusic.textContent = '🎵 Play music';
      }
    });
  }

  if (btnCloseSurprise && surpriseScreen) {
    btnCloseSurprise.addEventListener('click', function () {
      surpriseScreen.classList.add('hidden');
      surpriseScreen.classList.remove('night-mode');
      if (birthdayAgainText) birthdayAgainText.classList.remove('birthday-again-visible');
      var audio = document.getElementById('birthday-audio');
      if (audio) { audio.pause(); audio.currentTime = 0; }
      if (btnLights) btnLights.textContent = '💡Turn off the lights💡';
      var pm = document.getElementById('btn-play-music');
      if (pm) pm.textContent = '🎵 Play music';
    });
  }

  // Initial setup
  updateCountdown();
  setInterval(updateCountdown, 1000);
  rotateCuteText();

  if (DEV_ALWAYS_ENABLE_BUTTON && btnCelebrate) {
    btnCelebrate.disabled = false;
    btnCelebrate.classList.remove('btn-celebrate--disabled');
  }

  // Simple canvas confetti
  function runConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#e8ddf5', '#d4b8e8', '#c4b0e8', '#9b7dd4', '#7c5cbf', '#f0ebfa'];
    const pieces = [];
    const count = 80;

    for (let i = 0; i < count; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        w: Math.random() * 8 + 4,
        h: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 6,
        vy: -(Math.random() * 8 + 4),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let anyActive = false;
      pieces.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2;
        p.rotation += p.rotationSpeed;

        if (p.y < canvas.height + 20) anyActive = true;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.y < canvas.height ? 1 : 0;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      if (anyActive) {
        requestAnimationFrame(draw);
      } else {
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 0.5s ease';
      }
    }

    draw();
  }

  window.addEventListener('resize', function () {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  });
})();

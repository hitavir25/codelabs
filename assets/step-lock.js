/**
 * Step-Lock for Google Codelabs (Strict Mode)
 *
 * Enforces that students MUST complete each section before moving forward:
 *   1. Minimum reading time (based on word count) — Next button shows countdown
 *   2. Scroll to bottom of section content — ensures full reading
 *   3. Both conditions must be met before Next activates
 *   4. All future sidebar steps are locked
 *   5. Direct URL access and keyboard shortcuts are blocked
 *   6. Progress is saved in localStorage per codelab
 *
 * HitaVirTech — https://github.com/hitavir25/codelabs
 */
(function () {
  'use strict';

  var RETRY_MS = 300;
  var MAX_RETRIES = 50;
  var MIN_READ_SEC = 15;
  var MAX_READ_SEC = 120;
  var WORDS_PER_MIN = 200;

  var retries = 0;

  function boot() {
    var codelab = document.querySelector('google-codelab');
    if (!codelab || !codelab.shadowRoot) {
      if (++retries < MAX_RETRIES) setTimeout(boot, RETRY_MS);
      return;
    }
    run(codelab);
  }

  /* ================================================================ */
  /*  MAIN                                                            */
  /* ================================================================ */

  function run(codelab) {
    var root = codelab.shadowRoot;
    var id = codelab.getAttribute('id') ||
      location.pathname.replace(/[^a-z0-9]/gi, '_');
    var KEY = 'codelab-strict:' + id;

    /* ---- blocking flag prevents recursive observer triggers ---- */
    var blocking = false;
    var lastValid = 0;

    /* ---- per-step completion state ---- */
    var ticker = null;      // setInterval handle
    var timeLeft = 0;       // seconds remaining
    var timerDone = false;
    var scrollDone = false;
    var ioObserver = null;  // IntersectionObserver for scroll detection

    /* ============================================================ */
    /*  STORAGE                                                     */
    /* ============================================================ */

    function maxCompleted() {
      return parseInt(localStorage.getItem(KEY) || '-1', 10);
    }

    function saveCompleted(step) {
      if (step > maxCompleted()) localStorage.setItem(KEY, String(step));
    }

    function sel() {
      return parseInt(codelab.getAttribute('selected') || '0', 10);
    }

    /* ============================================================ */
    /*  DOM HELPERS                                                  */
    /* ============================================================ */

    function nextBtn() { return root.querySelector('#next'); }
    function doneBtn() { return root.querySelector('#done'); }
    function allStepEls() { return codelab.querySelectorAll('google-codelab-step'); }

    function wordCount(el) {
      return (el.textContent || '').trim().split(/\s+/).length;
    }

    function readSeconds(stepEl) {
      var words = wordCount(stepEl);
      var sec = Math.ceil((words / WORDS_PER_MIN) * 60);
      return Math.max(MIN_READ_SEC, Math.min(sec, MAX_READ_SEC));
    }

    /* ============================================================ */
    /*  TOAST                                                       */
    /* ============================================================ */

    function toast(msg) {
      var el = document.getElementById('sl-toast');
      if (el) el.remove();
      el = document.createElement('div');
      el.id = 'sl-toast';
      el.textContent = msg;
      el.style.cssText =
        'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);' +
        'background:#d32f2f;color:#fff;padding:14px 32px;border-radius:8px;' +
        'font-size:14px;font-weight:500;z-index:10000;white-space:nowrap;' +
        'font-family:"Google Sans",Roboto,Arial,sans-serif;' +
        'box-shadow:0 6px 20px rgba(0,0,0,.35);animation:slIn .3s ease;';
      document.body.appendChild(el);
      setTimeout(function () {
        el.style.opacity = '0';
        el.style.transition = 'opacity .3s';
        setTimeout(function () { el.remove(); }, 350);
      }, 3000);
    }

    /* ============================================================ */
    /*  FLOATING STATUS BADGE  (timer / scroll prompt)              */
    /* ============================================================ */

    function badge(text, icon) {
      var el = document.getElementById('sl-badge');
      if (!el) {
        el = document.createElement('div');
        el.id = 'sl-badge';
        el.style.cssText =
          'position:fixed;bottom:24px;right:110px;padding:10px 22px;' +
          'border-radius:24px;font-size:14px;font-weight:600;z-index:10000;' +
          'font-family:"Google Sans",Roboto,Arial,sans-serif;' +
          'box-shadow:0 4px 14px rgba(0,0,0,.3);display:flex;align-items:center;' +
          'gap:8px;transition:background .3s,color .3s;';
        document.body.appendChild(el);
      }
      if (icon === 'timer') {
        el.style.background = '#1a73e8';
        el.style.color = '#fff';
      } else if (icon === 'scroll') {
        el.style.background = '#f9a825';
        el.style.color = '#333';
      }
      el.textContent = text;
      el.style.display = 'flex';
    }

    function hideBadge() {
      var el = document.getElementById('sl-badge');
      if (el) el.style.display = 'none';
    }

    /* ============================================================ */
    /*  NEXT / DONE BUTTON CONTROL                                  */
    /* ============================================================ */

    function disableForward() {
      var n = nextBtn();
      if (n) {
        n.style.opacity = '0.35';
        n.style.pointerEvents = 'none';
        n.style.cursor = 'not-allowed';
        n.title = 'Complete this section first';
      }
      var d = doneBtn();
      if (d) {
        d.style.opacity = '0.35';
        d.style.pointerEvents = 'none';
        d.style.cursor = 'not-allowed';
      }
    }

    function enableForward() {
      var n = nextBtn();
      if (n) {
        n.style.opacity = '1';
        n.style.pointerEvents = 'auto';
        n.style.cursor = 'pointer';
        n.title = '';
      }
      var d = doneBtn();
      if (d) {
        d.style.opacity = '1';
        d.style.pointerEvents = 'auto';
        d.style.cursor = 'pointer';
      }
    }

    /* ============================================================ */
    /*  STEP ENTER — start timer + scroll watcher                   */
    /* ============================================================ */

    function enterStep(idx) {
      /* cleanup previous step watchers */
      if (ticker) { clearInterval(ticker); ticker = null; }
      if (ioObserver) { ioObserver.disconnect(); ioObserver = null; }
      timerDone = false;
      scrollDone = false;

      /* already completed → free navigation */
      if (idx <= maxCompleted()) {
        enableForward();
        hideBadge();
        return;
      }

      /* disable forward buttons immediately */
      disableForward();

      var steps = allStepEls();
      var step = steps[idx];
      if (!step) { enableForward(); hideBadge(); return; }

      /* --- TIMER --- */
      timeLeft = readSeconds(step);
      badge('\u23F3 Read for ' + timeLeft + 's ...', 'timer');

      ticker = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(ticker);
          ticker = null;
          timerDone = true;
          checkDone(idx);
        } else {
          badge('\u23F3 Read for ' + timeLeft + 's ...', 'timer');
        }
      }, 1000);

      /* --- SCROLL DETECTION via IntersectionObserver --- */
      var last = step.lastElementChild;
      var stepRect = step.getBoundingClientRect();
      var needsScroll = step.scrollHeight > stepRect.height + 80;

      if (!last || !needsScroll) {
        /* short content — no scrolling needed */
        scrollDone = true;
      } else {
        ioObserver = new IntersectionObserver(function (entries) {
          if (entries[0] && entries[0].isIntersecting) {
            scrollDone = true;
            ioObserver.disconnect();
            ioObserver = null;
            checkDone(idx);
          }
        }, { threshold: 0.25 });
        ioObserver.observe(last);
      }
    }

    function checkDone(idx) {
      if (timerDone && scrollDone) {
        /* SECTION COMPLETE */
        saveCompleted(idx);
        enableForward();
        hideBadge();
        lockSidebar();
      } else if (timerDone && !scrollDone) {
        badge('\u2B07\uFE0F  Scroll down to finish this section', 'scroll');
      }
      /* if only scrollDone but timer still running, badge already shows timer */
    }

    /* ============================================================ */
    /*  SIDEBAR LOCKING                                             */
    /* ============================================================ */

    function lockSidebar() {
      var mc = maxCompleted();
      var items = root.querySelectorAll('#drawer ol li');
      if (!items.length) { setTimeout(lockSidebar, 500); return; }

      var total = items.length;

      items.forEach(function (li, i) {
        var a = li.querySelector('a');
        if (!a) return;

        /* clean old badges */
        var old1 = a.querySelector('.sl-i');
        if (old1) old1.remove();

        if (i > mc + 1) {
          /* ---- LOCKED ---- */
          a.style.opacity = '0.25';
          a.style.pointerEvents = 'none';
          a.style.cursor = 'not-allowed';
          a.style.filter = 'grayscale(1)';
          a.setAttribute('aria-disabled', 'true');
          a.setAttribute('tabindex', '-1');
          a.title = 'Complete previous sections to unlock';
          var sp = document.createElement('span');
          sp.className = 'sl-i';
          sp.setAttribute('aria-hidden', 'true');
          sp.textContent = ' \uD83D\uDD12';
          sp.style.cssText = 'font-size:11px;margin-left:4px;filter:none;';
          a.appendChild(sp);
        } else {
          /* ---- UNLOCKED ---- */
          a.style.opacity = '1';
          a.style.pointerEvents = 'auto';
          a.style.cursor = 'pointer';
          a.style.filter = 'none';
          a.removeAttribute('aria-disabled');
          a.removeAttribute('tabindex');
          a.title = '';

          if (i <= mc) {
            var ch = document.createElement('span');
            ch.className = 'sl-i';
            ch.setAttribute('aria-hidden', 'true');
            ch.textContent = ' \u2705';
            ch.style.cssText = 'font-size:11px;margin-left:4px;';
            a.appendChild(ch);
          }
        }
      });

      progressBar(mc, total);
    }

    /* ============================================================ */
    /*  PROGRESS BAR                                                */
    /* ============================================================ */

    function progressBar(mc, total) {
      var title = root.querySelector('#codelab-title');
      if (!title) return;
      var bar = title.querySelector('#sl-bar');
      if (!bar) {
        bar = document.createElement('div');
        bar.id = 'sl-bar';
        bar.style.cssText =
          'position:absolute;bottom:0;left:0;width:100%;height:4px;' +
          'background:rgba(255,255,255,0.15);';
        var fill = document.createElement('div');
        fill.id = 'sl-fill';
        fill.style.cssText =
          'height:100%;background:#4caf50;transition:width .4s ease;' +
          'border-radius:0 2px 2px 0;';
        bar.appendChild(fill);
        title.style.position = 'relative';
        title.appendChild(bar);
      }
      var fill = bar.querySelector('#sl-fill');
      if (fill && total > 1) {
        fill.style.width = Math.min(((mc + 1) / total) * 100, 100) + '%';
      }
    }

    /* ============================================================ */
    /*  NAVIGATION GUARD                                            */
    /* ============================================================ */

    function goTo(step) {
      blocking = true;
      codelab.setAttribute('selected', String(step));
      if (location.hash !== '#' + step) location.hash = '#' + step;
      setTimeout(function () {
        blocking = false;
        enterStep(step);
        lockSidebar();
      }, 200);
    }

    /* ---- MutationObserver on selected attribute ---- */

    new MutationObserver(function () {
      if (blocking) return;
      var s = sel();
      var mc = maxCompleted();

      if (s > mc + 1) {
        /* trying to jump ahead — BLOCK */
        toast('\uD83D\uDD12 Complete the current section before skipping ahead!');
        goTo(lastValid);
        return;
      }

      /* allowed (backward or to current frontier) */
      lastValid = s;
      enterStep(s);
      lockSidebar();
    }).observe(codelab, { attributes: true, attributeFilter: ['selected'] });

    /* ---- hashchange guard ---- */

    window.addEventListener('hashchange', function () {
      if (blocking) return;
      var h = parseInt((location.hash || '#0').replace('#', ''), 10) || 0;
      if (h > maxCompleted() + 1) {
        toast('\uD83D\uDD12 Complete previous sections first!');
        goTo(lastValid);
      }
    });

    /* ---- keyboard guard (arrow right / down) ---- */

    document.addEventListener('keydown', function (e) {
      var s = sel();
      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && s > maxCompleted()) {
        e.preventDefault();
        e.stopPropagation();
        toast('\uD83D\uDD12 Finish reading this section first!');
      }
    }, true);

    /* ---- click guard: intercept Next/Done when disabled ---- */

    document.addEventListener('click', function (e) {
      var s = sel();
      if (s > maxCompleted()) {
        /* current step not yet completed */
        var path = e.composedPath ? e.composedPath() : [];
        for (var i = 0; i < path.length; i++) {
          var el = path[i];
          if (el.id === 'next' || el.id === 'done') {
            e.preventDefault();
            e.stopImmediatePropagation();
            if (!timerDone) {
              toast('\u23F3 Read through this section — ' + timeLeft + 's remaining');
            } else if (!scrollDone) {
              toast('\u2B07\uFE0F Scroll to the bottom to finish this section');
            }
            return;
          }
        }
      }
    }, true);

    /* ============================================================ */
    /*  INITIAL SETUP                                               */
    /* ============================================================ */

    var init = sel();
    var mc = maxCompleted();

    if (init > mc + 1) {
      /* landed on locked step via direct URL */
      goTo(0);
    } else {
      lastValid = init;
      enterStep(init);
    }

    lockSidebar();

    /* periodic re-lock for shadow DOM re-renders */
    setInterval(lockSidebar, 3000);
  }

  /* ================================================================ */
  /*  CSS                                                             */
  /* ================================================================ */

  var css = document.createElement('style');
  css.textContent =
    '@keyframes slIn{from{opacity:0;transform:translate(-50%,20px)}' +
    'to{opacity:1;transform:translate(-50%,0)}}';
  document.head.appendChild(css);

  /* ================================================================ */
  /*  BOOT                                                            */
  /* ================================================================ */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

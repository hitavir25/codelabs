/**
 * Step-Lock for Google Codelabs (Strict Mode)
 *
 * Enforces sequential step completion — students MUST:
 *   1. Spend minimum reading time (calculated from word count)
 *   2. Scroll to the bottom of the section content
 *   3. Both conditions met before Next button activates
 *
 * All UI elements are in the LIGHT DOM (no shadow root).
 *
 * DOM structure:
 *   google-codelab
 *     #drawer > ol > li > a[href="#N"]        ← sidebar links
 *     #codelab-title                          ← title bar
 *     #main > #steps                          ← step content
 *     #main > #controls > #fabs
 *       #next-step                            ← Next button
 *       #previous-step                        ← Back button
 *       #done                                 ← Done button (last step)
 *     #arrow-back                             ← top-left back arrow
 *   google-codelab-step[label][step]          ← individual steps
 *
 * HitaVirTech — https://github.com/hitavir25/codelabs
 */
(function () {
  'use strict';

  var RETRY_MS = 300;
  var MAX_RETRIES = 60;
  var MIN_READ_SEC = 15;
  var MAX_READ_SEC = 120;
  var WORDS_PER_MIN = 200;

  /* ---- ADMIN BYPASS ---- */
  var ADMIN_EMAILS = [
    'iamawannadole@gmail.com'
  ];

  var _isAdmin = false;
  function isAdmin() { return _isAdmin; }

  function detectAdmin(cb) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/cdn-cgi/access/get-identity', true);
    xhr.timeout = 3000;
    xhr.onload = function () {
      try {
        var data = JSON.parse(xhr.responseText);
        var email = (data.email || '').toLowerCase();
        if (email && ADMIN_EMAILS.indexOf(email) !== -1) {
          _isAdmin = true;
        }
      } catch (e) { /* not admin */ }
      cb();
    };
    xhr.onerror = xhr.ontimeout = function () { cb(); };
    xhr.send();
  }

  var retries = 0;

  function boot() {
    var codelab = document.querySelector('google-codelab');
    var drawer = document.querySelector('#drawer');
    var nextStep = document.querySelector('#next-step');

    if (!codelab || !drawer || !nextStep) {
      if (++retries < MAX_RETRIES) setTimeout(boot, RETRY_MS);
      return;
    }
    detectAdmin(function () { run(codelab); });
  }

  /* ================================================================ */

  function run(codelab) {
    var id = codelab.getAttribute('id') ||
      location.pathname.replace(/[^a-z0-9]/gi, '_');
    var KEY = 'codelab-lock:' + id;

    var blocking = false;
    var lastValid = 0;

    /* per-step state */
    var ticker = null;
    var timeLeft = 0;
    var timerDone = false;
    var scrollDone = false;

    /* ============================================================ */
    /*  STORAGE                                                     */
    /* ============================================================ */

    function maxCompleted() {
      return parseInt(localStorage.getItem(KEY) || '-1', 10);
    }

    function saveCompleted(step) {
      if (step > maxCompleted()) localStorage.setItem(KEY, String(step));
    }

    function getSel() {
      return parseInt(codelab.getAttribute('selected') || '0', 10);
    }

    /* ============================================================ */
    /*  DOM HELPERS  (light DOM — no shadowRoot)                     */
    /* ============================================================ */

    function nextBtn()  { return document.querySelector('#next-step'); }
    function doneBtn()  { return document.querySelector('#done'); }
    function prevBtn()  { return document.querySelector('#previous-step'); }
    function drawerLinks() { return document.querySelectorAll('#drawer ol li a'); }
    function stepEls()  { return document.querySelectorAll('google-codelab-step'); }
    function stepsBox() { return document.querySelector('#steps'); }

    function wordCount(el) {
      return (el.textContent || '').trim().split(/\s+/).length;
    }

    function readSec(stepEl) {
      var w = wordCount(stepEl);
      var s = Math.ceil((w / WORDS_PER_MIN) * 60);
      return Math.max(MIN_READ_SEC, Math.min(s, MAX_READ_SEC));
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
        'background:#c62828;color:#fff;padding:14px 32px;border-radius:8px;' +
        'font-size:14px;font-weight:500;z-index:10000;white-space:nowrap;' +
        'font-family:"Google Sans",Roboto,Arial,sans-serif;' +
        'box-shadow:0 6px 20px rgba(0,0,0,.35);animation:slIn .3s ease;';
      document.body.appendChild(el);
      setTimeout(function () {
        el.style.opacity = '0';
        el.style.transition = 'opacity .3s';
        setTimeout(function () { el.remove(); }, 350);
      }, 3500);
    }

    /* ============================================================ */
    /*  STATUS BADGE  (countdown / scroll prompt)                   */
    /* ============================================================ */

    function badge(text, type) {
      var el = document.getElementById('sl-badge');
      if (!el) {
        el = document.createElement('div');
        el.id = 'sl-badge';
        el.style.cssText =
          'position:fixed;bottom:28px;right:120px;padding:12px 24px;' +
          'border-radius:28px;font-size:14px;font-weight:600;z-index:10000;' +
          'font-family:"Google Sans",Roboto,Arial,sans-serif;' +
          'box-shadow:0 4px 14px rgba(0,0,0,.3);display:flex;' +
          'align-items:center;gap:8px;transition:all .3s ease;';
        document.body.appendChild(el);
      }
      el.textContent = text;
      el.style.display = 'flex';
      if (type === 'timer') {
        el.style.background = '#1565c0';
        el.style.color = '#fff';
      } else if (type === 'scroll') {
        el.style.background = '#f57f17';
        el.style.color = '#fff';
      } else if (type === 'done') {
        el.style.background = '#2e7d32';
        el.style.color = '#fff';
        setTimeout(function () { el.style.display = 'none'; }, 2000);
      }
    }

    function hideBadge() {
      var el = document.getElementById('sl-badge');
      if (el) el.style.display = 'none';
    }

    /* ============================================================ */
    /*  FORWARD BUTTON CONTROL                                      */
    /* ============================================================ */

    function disableForward() {
      var n = nextBtn();
      if (n) {
        n.style.opacity = '0.3';
        n.style.pointerEvents = 'none';
        n.style.cursor = 'not-allowed';
        n.title = 'Complete this section first';
      }
      var d = doneBtn();
      if (d) {
        d.style.opacity = '0.3';
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
    /*  ENTER STEP — start timer + scroll watch                     */
    /* ============================================================ */

    function enterStep(idx) {
      /* cleanup */
      if (ticker) { clearInterval(ticker); ticker = null; }
      timerDone = false;
      scrollDone = false;

      /* ---- ADMIN BYPASS: no timer, no scroll lock ---- */
      if (isAdmin()) {
        saveCompleted(idx);
        enableForward();
        hideBadge();
        return;
      }

      /* already completed → free to navigate */
      if (idx <= maxCompleted()) {
        enableForward();
        hideBadge();
        return;
      }

      /* lock forward */
      disableForward();

      var steps = stepEls();
      var step = steps[idx];
      if (!step) { enableForward(); hideBadge(); return; }

      /* ---- TIMER ---- */
      timeLeft = readSec(step);
      badge('\u23F3 Read this section — ' + timeLeft + 's remaining', 'timer');

      ticker = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
          clearInterval(ticker);
          ticker = null;
          timerDone = true;
          checkDone(idx);
        } else {
          badge('\u23F3 Read this section — ' + timeLeft + 's remaining', 'timer');
        }
      }, 1000);

      /* ---- SCROLL DETECTION ---- */
      /* The scroll container is the google-codelab-step element itself
         (overflow-y: auto), NOT #steps (overflow: hidden).
         Listen for scroll events on the active step element. */
      var scrollTarget = step;  /* google-codelab-step[selected] */
      if (scrollTarget.scrollHeight <= scrollTarget.clientHeight + 80) {
        /* Content fits without scrolling — skip scroll requirement */
        scrollDone = true;
      } else {
        var scrollHandler = function () {
          var atBottom = scrollTarget.scrollTop + scrollTarget.clientHeight
                         >= scrollTarget.scrollHeight - 100;
          if (atBottom) {
            scrollDone = true;
            scrollTarget.removeEventListener('scroll', scrollHandler);
            checkDone(idx);
          }
        };
        scrollTarget.addEventListener('scroll', scrollHandler);
        /* Check immediately in case already at bottom */
        setTimeout(scrollHandler, 500);
      }
    }

    function checkDone(idx) {
      if (timerDone && scrollDone) {
        saveCompleted(idx);
        enableForward();
        badge('\u2705 Section complete! You may proceed.', 'done');
        lockSidebar();
      } else if (timerDone && !scrollDone) {
        badge('\u2B07\uFE0F Scroll down to finish reading this section', 'scroll');
      }
    }

    /* ============================================================ */
    /*  SIDEBAR LOCKING                                             */
    /* ============================================================ */

    function lockSidebar() {
      var mc = maxCompleted();
      var links = drawerLinks();
      if (!links.length) { setTimeout(lockSidebar, 500); return; }

      var total = links.length;

      /* Admin gets all steps unlocked */
      if (isAdmin()) mc = total - 1;

      links.forEach(function (a, i) {
        /* remove old icons */
        var old = a.querySelector('.sl-i');
        if (old) old.remove();

        if (i > mc + 1) {
          /* ---- LOCKED ---- */
          a.style.opacity = '0.25';
          a.style.pointerEvents = 'none';
          a.style.cursor = 'not-allowed';
          a.style.filter = 'grayscale(1)';
          a.style.userSelect = 'none';
          a.setAttribute('aria-disabled', 'true');
          a.setAttribute('tabindex', '-1');
          a.title = 'Complete previous sections to unlock';

          var lock = document.createElement('span');
          lock.className = 'sl-i';
          lock.textContent = ' \uD83D\uDD12';
          lock.style.cssText = 'font-size:11px;margin-left:4px;filter:none;';
          a.appendChild(lock);
        } else {
          /* ---- UNLOCKED ---- */
          a.style.opacity = '1';
          a.style.pointerEvents = 'auto';
          a.style.cursor = 'pointer';
          a.style.filter = 'none';
          a.style.userSelect = 'auto';
          a.removeAttribute('aria-disabled');
          a.removeAttribute('tabindex');
          a.title = '';

          if (i <= mc) {
            var chk = document.createElement('span');
            chk.className = 'sl-i';
            chk.textContent = ' \u2705';
            chk.style.cssText = 'font-size:11px;margin-left:4px;';
            a.appendChild(chk);
          }
        }
      });

      progressBar(mc, total);
    }

    /* ============================================================ */
    /*  PROGRESS BAR                                                */
    /* ============================================================ */

    function progressBar(mc, total) {
      var title = document.querySelector('#codelab-title');
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
          'height:100%;background:#4caf50;transition:width .5s ease;' +
          'border-radius:0 2px 2px 0;';
        bar.appendChild(fill);
        /* Do NOT change title.style.position — it is position:fixed
           and changing it breaks the page layout. Fixed elements are
           already a containing block for absolute children. */
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
      }, 250);
    }

    /* ---- MutationObserver: watch "selected" attribute ---- */

    new MutationObserver(function () {
      if (blocking) return;
      var s = getSel();
      var mc = maxCompleted();

      if (!isAdmin() && s > mc + 1) {
        toast('\uD83D\uDD12 Complete the current section before skipping ahead!');
        goTo(lastValid);
        return;
      }

      lastValid = s;
      enterStep(s);
      lockSidebar();
    }).observe(codelab, { attributes: true, attributeFilter: ['selected'] });

    /* ---- hashchange guard ---- */

    window.addEventListener('hashchange', function () {
      if (blocking || isAdmin()) return;
      var h = parseInt((location.hash || '#0').replace('#', ''), 10) || 0;
      if (h > maxCompleted() + 1) {
        toast('\uD83D\uDD12 You must complete previous sections first!');
        goTo(lastValid);
      }
    });

    /* ---- keyboard guard ---- */

    document.addEventListener('keydown', function (e) {
      if (isAdmin()) return;
      var s = getSel();
      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && s > maxCompleted()) {
        e.preventDefault();
        e.stopPropagation();
        if (!timerDone) {
          toast('\u23F3 Finish reading — ' + timeLeft + 's remaining');
        } else if (!scrollDone) {
          toast('\u2B07\uFE0F Scroll to the bottom to continue');
        }
      }
    }, true);

    /* ---- click guard on forward buttons ---- */

    document.addEventListener('click', function (e) {
      if (isAdmin()) return;
      var s = getSel();
      if (s > maxCompleted()) {
        var target = e.target;
        /* walk up to check if click is on next-step, done, or a locked drawer link */
        var node = target;
        while (node && node !== document.body) {
          if (node.id === 'next-step' || node.id === 'done') {
            e.preventDefault();
            e.stopImmediatePropagation();
            if (!timerDone) {
              toast('\u23F3 Read this section — ' + timeLeft + 's remaining');
            } else if (!scrollDone) {
              toast('\u2B07\uFE0F Scroll to the bottom to finish this section');
            }
            return false;
          }
          /* blocked sidebar link */
          if (node.tagName === 'A' && node.getAttribute('aria-disabled') === 'true') {
            e.preventDefault();
            e.stopImmediatePropagation();
            toast('\uD83D\uDD12 Complete current section first!');
            return false;
          }
          node = node.parentElement;
        }
      }
    }, true);

    /* ---- drawer click guard (also catches completed-step sidebar access) ---- */

    document.addEventListener('click', function (e) {
      if (isAdmin()) return;
      var target = e.target;
      var node = target;
      while (node && node !== document.body) {
        if (node.tagName === 'A' && node.parentElement &&
            node.parentElement.parentElement &&
            node.parentElement.parentElement.parentElement &&
            node.parentElement.parentElement.parentElement.id === 'drawer') {
          var href = node.getAttribute('href') || '';
          var stepNum = parseInt(href.replace('#', ''), 10);
          if (!isNaN(stepNum) && stepNum > maxCompleted() + 1) {
            e.preventDefault();
            e.stopImmediatePropagation();
            toast('\uD83D\uDD12 Complete section ' + (maxCompleted() + 2) + ' first!');
            return false;
          }
          break;
        }
        node = node.parentElement;
      }
    }, true);

    /* ============================================================ */
    /*  INITIAL SETUP                                               */
    /* ============================================================ */

    var initSel = getSel();
    var mc = maxCompleted();

    if (initSel > mc + 1) {
      goTo(0);
    } else {
      lastValid = initSel;
      enterStep(initSel);
    }

    lockSidebar();

    /* periodic re-lock for dynamic re-renders */
    setInterval(lockSidebar, 2500);
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

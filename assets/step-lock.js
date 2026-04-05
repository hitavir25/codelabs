/**
 * Step-Lock for Google Codelabs
 * Enforces sequential step completion — users must complete each section
 * before accessing the next one. Progress is saved in localStorage.
 *
 * HitaVirTech — https://github.com/hitavir25/codelabs
 */
(function () {
  'use strict';

  var MAX_RETRIES = 50;
  var RETRY_MS = 300;
  var retryCount = 0;
  var blocking = false;
  var lastValidStep = 0;

  function init() {
    var codelab = document.querySelector('google-codelab');
    if (!codelab || !codelab.shadowRoot) {
      if (++retryCount < MAX_RETRIES) setTimeout(init, RETRY_MS);
      return;
    }

    var codelabId = codelab.getAttribute('id') ||
      location.pathname.replace(/[^a-z0-9]/gi, '_');
    var STORAGE_KEY = 'codelab-progress:' + codelabId;

    /* ---- State helpers ---- */

    function getMaxReached() {
      return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
    }

    function saveMaxReached(step) {
      if (step > getMaxReached()) {
        localStorage.setItem(STORAGE_KEY, String(step));
      }
    }

    function getSelected() {
      return parseInt(codelab.getAttribute('selected') || '0', 10);
    }

    /* ---- Navigation ---- */

    function navigateTo(step) {
      blocking = true;
      codelab.setAttribute('selected', String(step));
      if (location.hash !== '#' + step) {
        location.hash = '#' + step;
      }
      setTimeout(function () {
        blocking = false;
        applyLocks();
      }, 200);
    }

    /* ---- Toast notification ---- */

    function showToast(message) {
      var existing = document.getElementById('step-lock-toast');
      if (existing) existing.remove();

      var toast = document.createElement('div');
      toast.id = 'step-lock-toast';
      toast.innerHTML = message;
      toast.style.cssText =
        'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);' +
        'background:#d32f2f;color:#fff;padding:14px 32px;border-radius:8px;' +
        'font-size:14px;font-weight:500;font-family:"Google Sans",Roboto,Arial,sans-serif;' +
        'z-index:10000;box-shadow:0 6px 20px rgba(0,0,0,.35);white-space:nowrap;' +
        'animation:stepLockFadeIn .3s ease;';
      document.body.appendChild(toast);

      setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity .3s ease';
        setTimeout(function () { toast.remove(); }, 350);
      }, 3000);
    }

    /* ---- Lock / Unlock sidebar steps ---- */

    function applyLocks() {
      var max = getMaxReached();
      var root = codelab.shadowRoot;
      if (!root) return;

      var items = root.querySelectorAll('#drawer ol li');
      if (!items.length) {
        setTimeout(applyLocks, 500);
        return;
      }

      var totalSteps = items.length;

      items.forEach(function (li, i) {
        var a = li.querySelector('a');
        if (!a) return;

        // Clean up previous icons
        var oldLock = a.querySelector('.sl-lock');
        if (oldLock) oldLock.remove();
        var oldCheck = a.querySelector('.sl-check');
        if (oldCheck) oldCheck.remove();

        if (i > max + 1) {
          /* ---- LOCKED ---- */
          a.style.opacity = '0.3';
          a.style.pointerEvents = 'none';
          a.style.cursor = 'not-allowed';
          a.style.filter = 'grayscale(1)';
          a.setAttribute('aria-disabled', 'true');
          a.setAttribute('tabindex', '-1');
          a.title = 'Complete previous sections to unlock';

          var lock = document.createElement('span');
          lock.className = 'sl-lock';
          lock.setAttribute('aria-hidden', 'true');
          lock.textContent = ' \uD83D\uDD12';
          lock.style.cssText = 'font-size:11px;margin-left:4px;filter:none;';
          a.appendChild(lock);
        } else {
          /* ---- UNLOCKED ---- */
          a.style.opacity = '1';
          a.style.pointerEvents = 'auto';
          a.style.cursor = 'pointer';
          a.style.filter = 'none';
          a.removeAttribute('aria-disabled');
          a.removeAttribute('tabindex');
          a.title = '';

          // Add checkmark for completed steps (visited and moved past)
          if (i <= max) {
            var check = document.createElement('span');
            check.className = 'sl-check';
            check.setAttribute('aria-hidden', 'true');
            check.textContent = ' \u2705';
            check.style.cssText = 'font-size:11px;margin-left:4px;';
            a.appendChild(check);
          }
        }
      });

      // Update progress bar in the codelab title area
      updateProgressBar(root, max, totalSteps);
    }

    /* ---- Progress bar ---- */

    function updateProgressBar(root, max, total) {
      var titleEl = root.querySelector('#codelab-title');
      if (!titleEl) return;

      var bar = titleEl.querySelector('#sl-progress-bar');
      if (!bar) {
        var container = document.createElement('div');
        container.id = 'sl-progress-bar';
        container.style.cssText =
          'position:absolute;bottom:0;left:0;width:100%;height:4px;' +
          'background:rgba(255,255,255,0.2);';

        var fill = document.createElement('div');
        fill.id = 'sl-progress-fill';
        fill.style.cssText =
          'height:100%;background:#4caf50;transition:width .4s ease;border-radius:0 2px 2px 0;';

        container.appendChild(fill);
        titleEl.style.position = 'relative';
        titleEl.appendChild(container);
        bar = container;
      }

      var fill = bar.querySelector('#sl-progress-fill');
      if (fill && total > 1) {
        var pct = Math.min(((max + 1) / total) * 100, 100);
        fill.style.width = pct + '%';
      }
    }

    /* ---- Observe step changes ---- */

    var observer = new MutationObserver(function () {
      if (blocking) return;

      var sel = getSelected();
      var max = getMaxReached();

      if (sel > max + 1) {
        // BLOCKED — user tried to skip ahead
        showToast(
          '\uD83D\uDD12 Complete the current section before moving ahead!'
        );
        navigateTo(lastValidStep);
        return;
      }

      // Allowed navigation
      lastValidStep = sel;
      saveMaxReached(sel);
      applyLocks();
    });

    observer.observe(codelab, {
      attributes: true,
      attributeFilter: ['selected']
    });

    /* ---- Intercept direct URL hash changes ---- */

    window.addEventListener('hashchange', function () {
      if (blocking) return;

      var hash = parseInt((location.hash || '#0').replace('#', ''), 10) || 0;
      var max = getMaxReached();

      if (hash > max + 1) {
        showToast(
          '\uD83D\uDD12 Complete previous sections first!'
        );
        navigateTo(lastValidStep);
      }
    });

    /* ---- Keyboard navigation guard ---- */

    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        var sel = getSelected();
        var max = getMaxReached();
        if (sel >= max + 1) {
          e.preventDefault();
          e.stopPropagation();
          showToast(
            '\uD83D\uDD12 Complete the current section first!'
          );
        }
      }
    }, true);

    /* ---- Initial enforcement ---- */

    var initialStep = getSelected();
    var maxOnLoad = getMaxReached();

    if (initialStep > maxOnLoad + 1) {
      // User landed on a locked step via direct URL — redirect to start
      navigateTo(0);
    } else {
      lastValidStep = initialStep;
      saveMaxReached(initialStep);
    }

    applyLocks();

    // Re-apply locks periodically to handle shadow DOM re-renders
    setInterval(applyLocks, 3000);
  }

  /* ---- Inject animation CSS ---- */

  var style = document.createElement('style');
  style.textContent =
    '@keyframes stepLockFadeIn { ' +
    'from { opacity: 0; transform: translate(-50%, 20px); } ' +
    'to { opacity: 1; transform: translate(-50%, 0); } }';
  document.head.appendChild(style);

  /* ---- Boot ---- */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

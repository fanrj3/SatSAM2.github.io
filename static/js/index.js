window.HELP_IMPROVE_VIDEOJS = false;

// ── Copy BibTeX ────────────────────────────────────────────────
function copyBibTeX() {
    const bibtexElement = document.getElementById('bibtex-code');
    const button = document.querySelector('.copy-bibtex-btn');
    const copyText = button.querySelector('.copy-text');

    if (!bibtexElement) return;

    const text = bibtexElement.textContent;

    function showCopied() {
        button.classList.add('copied');
        copyText.textContent = 'Copied!';
        setTimeout(function () {
            button.classList.remove('copied');
            copyText.textContent = 'Copy';
        }, 2000);
    }

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(showCopied).catch(function () {
            fallbackCopy(text, showCopied);
        });
    } else {
        fallbackCopy(text, showCopied);
    }
}

function fallbackCopy(text, callback) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try { document.execCommand('copy'); } catch (e) { }
    document.body.removeChild(textArea);
    if (callback) callback();
}

// ── Scroll to Top ───────────────────────────────────────────────
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function () {
    var btn = document.querySelector('.scroll-to-top');
    if (!btn) return;
    if (window.pageYOffset > 300) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
});

// ── Carousel Init ───────────────────────────────────────────────
function initSimpleCarousel(containerId) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var items = Array.prototype.slice.call(container.querySelectorAll('.item'));
    if (items.length === 0) return;

    var current = 0;

    // Show only first item
    items.forEach(function (item, i) {
        item.style.display = i === 0 ? 'flex' : 'none';
    });

    // Prev button
    var prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-nav-btn prev';
    prevBtn.setAttribute('aria-label', 'Previous');
    prevBtn.innerHTML = '&#8249;';

    // Next button
    var nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-nav-btn next';
    nextBtn.setAttribute('aria-label', 'Next');
    nextBtn.innerHTML = '&#8250;';

    // Dots
    var dotsEl = document.createElement('div');
    dotsEl.className = 'carousel-dots';
    var dotEls = items.map(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', function () { goTo(i); });
        dotsEl.appendChild(dot);
        return dot;
    });

    function goTo(index) {
        items[current].style.display = 'none';
        dotEls[current].classList.remove('active');
        current = (index + items.length) % items.length;
        items[current].style.display = 'flex';
        dotEls[current].classList.add('active');
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); });

    container.style.position = 'relative';
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
    container.appendChild(dotsEl);
}

document.addEventListener('DOMContentLoaded', function () {
    initSimpleCarousel('image-carousel');
    initSimpleCarousel('video-carousel');
});

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
$(document).ready(function () {
    var options = {
        slidesToScroll: 1,
        slidesToShow: 1,
        loop: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    bulmaCarousel.attach('.carousel', options);
    bulmaSlider.attach();
});

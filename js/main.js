/* ============================================
   GAMGYULGUK - 감귤국 메인 스크립트
   ============================================ */

// ===== EmailJS 초기화 =====
// ★★★ 아래 3개 값을 본인의 EmailJS 계정 정보로 교체하세요 ★★★
const EMAILJS_PUBLIC_KEY = 'cwB-P_3W1FRsK3Fg2';
const EMAILJS_SERVICE_ID = 'service_wv1camd';
const EMAILJS_TEMPLATE_ID = 'template_xaxadi9';

(function () {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// ===== 이메일 전송 =====
function sendEmail(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const status = document.getElementById('formStatus');

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>&nbsp; 전송 중...';
    status.textContent = '';
    status.className = 'form-status';

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, '#contactForm')
        .then(function () {
            status.textContent = '문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다!';
            status.className = 'form-status success';
            document.getElementById('contactForm').reset();
        })
        .catch(function (error) {
            status.textContent = '전송에 실패했습니다. 이메일로 직접 문의해주세요.';
            status.className = 'form-status error';
            console.error('EmailJS Error:', error);
        })
        .finally(function () {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; 문의 보내기';
        });
}

// ===== 네비게이션 스크롤 효과 =====
window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== 모바일 메뉴 토글 =====
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// ===== 스크롤 페이드인 애니메이션 =====
var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(function (el) {
    fadeObserver.observe(el);
});

// ===== 숫자 카운터 애니메이션 =====
function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(function (counter) {
        var target = parseInt(counter.getAttribute('data-target'), 10);
        var duration = 2000;
        var start = performance.now();

        function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            counter.textContent = current.toLocaleString();
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    });
}

var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

var statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

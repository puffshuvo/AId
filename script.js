document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const start = window.pageYOffset;
        const targetPos = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const duration = 1200;
        let startTime = null;

        function scrollAnimation(currentTime) {
          if (!startTime) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          // Ease-in-out quint for smoother scrolling
          const ease = t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
          window.scrollTo(0, start + (targetPos - start) * ease(progress));
          if (timeElapsed < duration) requestAnimationFrame(scrollAnimation);
        }

        requestAnimationFrame(scrollAnimation);
      }
    });
  });


  const animateElements = document.querySelectorAll('.animate');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  });

  animateElements.forEach(element => {
    observer.observe(element);
  });

 
  document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      const mainImage = thumbnail.closest('.provision-images').querySelector('.main-image');
      const tempSrc = mainImage.src;
      mainImage.src = thumbnail.src;
      thumbnail.src = tempSrc;
      mainImage.classList.add('fade-in-image');
      setTimeout(() => {
        mainImage.classList.remove('fade-in-image');
      }, 1200);
    });
  });
});
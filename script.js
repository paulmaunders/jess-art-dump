document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('overlay');
  const illustrations = document.querySelectorAll('.illustration');
  let currentIndex = 0;

  const showImage = (index) => {
    const imgContainer = illustrations[index].closest('.image-container');
    const date = imgContainer.dataset.date;
    const src = illustrations[index].src;

    const overlayContent = document.createElement('div');
    overlayContent.className = 'overlay-content';

    const fullscreenImg = document.createElement('img');
    fullscreenImg.src = src;
    fullscreenImg.style.cursor = 'zoom-out';

    const dateText = document.createElement('div');
    dateText.className = 'date';
    dateText.textContent = date;

    overlayContent.appendChild(fullscreenImg);
    overlayContent.appendChild(dateText);

    overlay.innerHTML = ''; // Clear previous content
    overlay.appendChild(overlayContent);
    overlay.style.display = 'flex';

    fullscreenImg.addEventListener('click', () => {
      overlay.style.display = 'none';
      overlay.innerHTML = ''; // Clear current content
    });

    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
      overlay.innerHTML = ''; // Clear current content
    });
  };

  const showNextImage = () => {
    currentIndex = (currentIndex + 1) % illustrations.length;
    showImage(currentIndex);
  };

  const showPreviousImage = () => {
    currentIndex = (currentIndex - 1 + illustrations.length) % illustrations.length;
    showImage(currentIndex);
  };

  const handleTouchStart = (evt) => {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const handleTouchMove = (evt) => {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        /* left swipe */
        showNextImage();
      } else {
        /* right swipe */
        showPreviousImage();
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };

  illustrations.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentIndex = index;
      showImage(currentIndex);
    });
  });

  overlay.addEventListener('touchstart', handleTouchStart, false);
  overlay.addEventListener('touchmove', handleTouchMove, false);

  // Add moving hearts to the background
  const heartsContainer = document.querySelector('.hearts-container');
  for (let i = 0; i < 20; i++) {
    const heart = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    heart.setAttribute('viewBox', '0 0 32 29.6');
    heart.setAttribute('class', 'heart');
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${Math.random() * 100}%`;
    heart.style.animationDuration = `${5 + Math.random() * 10}s`;
    heart.innerHTML = `<path d="M23.6,0c-3.3,0-6.4,1.6-8.6,4.1C12.8,1.6,9.7,0,6.4,0C2.9,0,0,2.9,0,6.4C0,10.2,3.4,13,8.4,17.6 c3.1,2.8,5.7,5.3,7.6,7.4c1.9-2.1,4.5-4.6,7.6-7.4C28.6,13,32,10.2,32,6.4C32,2.9,29.1,0,25.6,0H23.6z"/>`;
    heartsContainer.appendChild(heart);
  }
});

let currentIndex = 0; // Global variable to track the current image index

document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');
  
    const illustrations = document.querySelectorAll('.illustration');
    illustrations.forEach((img, index) => {
      img.addEventListener('click', () => {
        currentIndex = index; // Set the current index on image click
        const date = img.closest('.image-container').dataset.date;
  
        const overlayContent = document.createElement('div');
        overlayContent.className = 'overlay-content';
  
        const fullscreenImg = document.createElement('img');
        fullscreenImg.src = img.src;
        fullscreenImg.style.cursor = 'zoom-out';
  
        const dateText = document.createElement('div');
        dateText.className = 'date';
        dateText.textContent = date;
  
        overlayContent.appendChild(fullscreenImg);
        overlayContent.appendChild(dateText);
  
        overlay.style.display = 'flex';
        overlay.appendChild(overlayContent);
  
        fullscreenImg.addEventListener('click', () => {
          overlay.removeChild(overlayContent);
          overlay.style.display = 'none';
        });
  
        overlay.addEventListener('click', () => {
          overlay.removeChild(overlayContent);
          overlay.style.display = 'none';
        });
      });
    });
  
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
  
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % illustrations.length; // Move to next image
        } else if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + illustrations.length) % illustrations.length; // Move to previous image
        }
        const img = illustrations[currentIndex];
        const overlay = document.getElementById('overlay');
        overlay.innerHTML = ''; // Clear existing overlay content
        const overlayContent = document.createElement('div');
        overlayContent.className = 'overlay-content';

        const fullscreenImg = document.createElement('img');
        fullscreenImg.src = img.src;
        fullscreenImg.style.cursor = 'zoom-out';

        const date = img.closest('.image-container').dataset.date;
        const dateText = document.createElement('div');
        dateText.className = 'date';
        dateText.textContent = date;

        overlayContent.appendChild(fullscreenImg);
        overlayContent.appendChild(dateText);

        overlay.style.display = 'flex';
        overlay.appendChild(overlayContent);

        fullscreenImg.addEventListener('click', () => {
          overlay.removeChild(overlayContent);
          overlay.style.display = 'none';
        });
    });
  });

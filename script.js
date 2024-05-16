document.addEventListener('DOMContentLoaded', function () {
  const illustrations = document.querySelectorAll('.illustration');
  illustrations.forEach((img) => {
    img.addEventListener('click', () => {
      const fullscreenImg = document.createElement('img');
      fullscreenImg.src = img.src;
      fullscreenImg.style.position = 'fixed';
      fullscreenImg.style.top = '50%';
      fullscreenImg.style.left = '50%';
      fullscreenImg.style.transform = 'translate(-50%, -50%)';
      fullscreenImg.style.maxWidth = '90%';
      fullscreenImg.style.maxHeight = '90%';
      fullscreenImg.style.zIndex = '1000';
      fullscreenImg.style.cursor = 'zoom-out';

      document.body.appendChild(fullscreenImg);

      fullscreenImg.addEventListener('click', () => {
        document.body.removeChild(fullscreenImg);
      });
    });
  });
});

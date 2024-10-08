const keyword = "skibidi";
let overlayDisplayed = false;
let overlay;
const overlayDuration = 2000;
const checkInterval = 1000;
const clickHideDuration = 1000;

function showGifOverlay() {
  if (overlayDisplayed) return;
  overlayDisplayed = true;

  overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.zIndex = '9999';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.pointerEvents = 'auto';

  const gif = document.createElement('img');
  gif.src = 'https://i.imgur.com/idLHpAp.gif';
  gif.style.maxWidth = '80%';
  gif.style.maxHeight = '80%';

  overlay.appendChild(gif);
  document.body.appendChild(overlay);

  setTimeout(() => {
    if (overlay && overlay.parentNode) {
      document.body.removeChild(overlay);
      overlayDisplayed = false;
    }
  }, overlayDuration);
}

function handleOverlayClick() {
  if (overlay && overlay.parentNode) {
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';

    setTimeout(() => {
      overlay.style.pointerEvents = 'auto';
      overlay.style.opacity = '1';
      
      if (document.body.innerText.toLowerCase().includes(keyword.toLowerCase())) {
        showGifOverlay();
      } else {
        if (overlay && overlay.parentNode) {
          document.body.removeChild(overlay);
          overlayDisplayed = false;
        }
      }
    }, clickHideDuration);
  }
}

function checkForKeyword() {
  const bodyText = document.body.innerText.toLowerCase();
  const lowerCaseKeyword = keyword.toLowerCase();
  console.log("Body Text:", bodyText);
  console.log("Checking for keyword...");

  if (bodyText.includes(lowerCaseKeyword) && !overlayDisplayed) {
    console.log("Keyword found!");
    showGifOverlay();
  }

  if (!bodyText.includes(lowerCaseKeyword) && overlayDisplayed) {
    overlayDisplayed = false;
  }
}

const observer = new MutationObserver((mutationsList) => {
  checkForKeyword();
});

observer.observe(document.body, { childList: true, subtree: true });
setInterval(checkForKeyword, checkInterval);
checkForKeyword();
document.body.addEventListener('click', handleOverlayClick);
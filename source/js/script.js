const grid = document.getElementsByClassName('grid')[0];
const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
const allGridItems = document.getElementsByClassName('grid-item');

function resizeGridItem(item){
  const rowSpan = Math.ceil((item.querySelector('img').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = `span ${+rowSpan}`;
}

function initProjects(){
  for (let index = 0; index < allGridItems.length; index++){
    if (!window['IntersectionObserver']) {
      loadImage(allGridItems[index]);
    } else {
      createObserver(allGridItems[index]);
    }
  }
}

function resizeAllGridItems() {
  for (let index = 0; index < allGridItems.length; index++){
    resizeGridItem(allGridItems[index]);
  }
}

function loadImage(element) {
  const imageElement = element.querySelector('img');

  imageElement.addEventListener('load', () => {
    setTimeout(() => element.classList.add('loaded'), 100);
    resizeGridItem(element);
  });
  imageElement.addEventListener('error', () => console.log('error'));
  imageElement.src = imageElement.dataset.src;
}

function createObserver(element) {
  const options = {
    root: null,
    threshold: '0'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        loadImage(element);
        observer.unobserve(element);
      }
    });
  }, options);

  observer.observe(element);
}

initProjects();


window.addEventListener('resize', resizeAllGridItems);
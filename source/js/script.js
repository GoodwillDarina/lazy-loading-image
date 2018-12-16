const grid = document.getElementsByClassName('grid')[0];
const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
const allItems = document.getElementsByClassName('grid-item');

function resizeGridItem(item){
  const rowSpan = Math.ceil((item.querySelector('img').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = `span ${+rowSpan}`;
}

function resizeAllGridItems(){
  for (let index = 0; index < allItems.length; index++){
    const img = new Image();
    img.src = allItems[index].querySelector('img').src;
    img.onload = function () {
      resizeGridItem(allItems[index]);
    };
  }
}

window.onload = resizeAllGridItems();
window.addEventListener('resize', resizeAllGridItems);
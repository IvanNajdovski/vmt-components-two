const gridQuerySelectorClass = ".k-grid-content";

export const setGridFilterIndicators = (gridElement) => {
  try {
    const columnHeaders = gridElement.current._header.element.querySelector("thead").childNodes[0].childNodes;
    columnHeaders.forEach((val) => {
      const columnMenuVrapper = val.childNodes[0].childNodes[0];
      let element = document.createElement("span");
      element.classList.add("k-icon");
      element.classList.add("k-i-filter");
      element.classList.add("filter-indicator");

      if (columnMenuVrapper) {
        columnMenuVrapper.prepend(element);
      }
    });
  } catch {
    console.error("Filter indicator cannot be inserted");
  }
};

export const moveGrid = (gridElement) => {
  if (!gridElement.current) return;
  const gridContent = gridElement.current.element.querySelector(gridQuerySelectorClass);
  setTimeout(() => {
    gridContent && gridContent.scrollLeft !== 0 ? (gridContent.scrollLeft -= 1) : (gridContent.scrollLeft += 1);
  }, 1000);
};
export const moveGridOnColumnReorder = (gridElement, areaEffect) => {
  if (!gridElement.current) return;
  const gridHeader = gridElement.current._header.element;
  const gridContent = gridElement.current.element.querySelector(gridQuerySelectorClass);
  const headerPosition = gridHeader.getBoundingClientRect();
  gridHeader.addEventListener("mousemove", (event) => {
    if (!document.querySelector(".k-drag-clue")) return;
    if (event.x + areaEffect > headerPosition.right) gridContent.scrollLeft += areaEffect;
    else if (event.x < areaEffect + headerPosition.left) gridContent.scrollLeft -= areaEffect;
  });
};

// The amount of pixels the user jumps through to the left or right in .k-grid-content
// when using the Scroll Left/Scroll Right buttons in the header of the Grid component.
export const gridScroll = (gridElement, direction) => {
  const gridScrolInterval = 600;
  const gridContent = gridElement.current.element.querySelector(gridQuerySelectorClass);
  direction === "left" ? (gridContent.scrollLeft -= gridScrolInterval) : (gridContent.scrollLeft += gridScrolInterval);
};

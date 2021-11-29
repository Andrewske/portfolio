export const handleTouchStart = ({ e, setTouchPosition }) => {
  const touchDownX = e.touches[0].clientX;
  const touchDownY = e.touches[0].clientY;
  console.log('setting', [touchDownX, touchDownY]);
  setTouchPosition([touchDownX, touchDownY]);
};

export const handleTouchEnd = ({
  e,
  touchPosition,
  setTouchPosition,
  handleClick,
}) => {
  if (touchPosition === null) {
    console.log('its null');
    return;
  }

  const currentTouchX = e.changedTouches[0].clientX;
  const diffX = touchPosition[0] - currentTouchX;

  const currentTouchY = e.changedTouches[0].clientY;
  const diffY = touchPosition[1] - currentTouchY;

  if (diffX > 25) {
    console.log('right');
    handleClick('right');
  }

  if (diffX < -25) {
    handleClick('left');
  }
  if (diffY > 25) {
    handleClick('down');
  }

  if (diffY < -25) {
    handleClick('up');
  }

  setTouchPosition(null);
};

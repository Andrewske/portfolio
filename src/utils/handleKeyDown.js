export const handleKeyDown = ({ e, handleClick }) => {
  switch (e.keyCode) {
    case (e.keyCode = 37):
      handleClick('left');
      break;
    case (e.keyCode = 38):
      handleClick('up');
      break;
    case (e.keyCode = 39):
      handleClick('right');
      break;
    case (e.keyCode = 40):
      handleClick('down');
      break;
    default:
      return;
  }
};

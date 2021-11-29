const pageChange = ({ type, current, setCurrent, pageOrder }) => {
  const findIndex = (number) => {
    let loc;
    for (let i = 0; i < pageOrder.length; i++) {
      let index = pageOrder[i].indexOf(number);
      if (index !== -1) {
        loc = [i, index];
      }
    }
    return loc;
  };

  let index = findIndex(current);
  switch (type) {
    case 'left':
      if (index[1] > 0) {
        index[1] = index[1] - 1;
      } else {
        index[1] = pageOrder[1].length - 1;
      }
      setCurrent(pageOrder[index[0]][index[1]]);
      break;
    case 'right':
      if (index[1] < pageOrder[index[0]].length - 1) {
        index[1] = index[1] + 1;
      } else {
        index[1] = 0;
      }
      setCurrent(pageOrder[index[0]][index[1]]);
      break;
    case 'up':
      if (index[0] > 0) {
        index[0] = index[0] - 1;
      } else {
        index[0] = pageOrder.length - 1;
      }
      if (pageOrder[index[0]].length - 1 < index[1]) {
        index[1] = index[1] - 1;
      }
      setCurrent(pageOrder[index[0]][index[1]]);
      break;
    case 'down':
      if (index[0] < pageOrder.length - 1) {
        index[0] = index[0] + 1;
      } else {
        index[0] = 0;
      }
      if (pageOrder[index[0]].length - 1 < index[1]) {
        index[1] = index[1] - 1;
      }
      setCurrent(pageOrder[index[0]][index[1]]);
      break;
    default:
      return;
  }
};

export default pageChange;

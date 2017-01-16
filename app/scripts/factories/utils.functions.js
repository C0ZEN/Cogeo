var Utils = {
  createArrayFromRange    : createArrayFromRange,
  getPercentRangeTickColor: getPercentRangeTickColor
};

function createArrayFromRange(start, interval, end) {
  var i     = start, length = end + 1;
  var array = [];
  for (; i < length; i += interval) {
    array.push(i);
  }
  return array;
}

function getPercentRangeTickColor(value) {
  var colors = ['#c0392b', '#e74c3c', '#d35400', '#e67e22', '#f39c12', '#f1c40f', '#27ae60', '#2ecc71'];
  var length = colors.length;
  return colors[parseInt(value * length / 100)];
}

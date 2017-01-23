var Utils = {
  createArrayFromRange    : createArrayFromRange,
  getPercentRangeTickColor: getPercentRangeTickColor,
  getKickedTimeList       : getKickedTimeList,
  getKickedTime           : getKickedTime
};

// Times for kicked time (in seconds)
var times = [], seconds = [300, 900, 1800, 3600, 43200, 86400, 259200, 604800];
for (var i = 0, length = seconds.length; i < length; i++) {
  times.push({
    time: seconds[i],
    key : 'other_time_' + seconds[i]
  });
}

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

function getKickedTimeList() {
  return times;
}

function getKickedTime(time) {
  for (var i = 0, length = times.length; i < length; i++) {
    if (times[i].time == time) return times[i];
  }
  return null;
}

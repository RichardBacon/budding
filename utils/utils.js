exports.makeRefObj = (list, key, value) => {
  const lookupObj = {};
  list.forEach((row) => {
    lookupObj[row[value]] = row[key];
  });
  return lookupObj;
};

exports.formatArray = (arrayToChange, lookUpObj, lookUpObj2) => {
  const formatOriginalArray = arrayToChange.map((snapshot) => {
    for (let key in lookUpObj) {
      if (snapshot.plant_id == key) {
        snapshot.plant_name = lookUpObj[key];
      }
    }
    return snapshot;
  });
  const formatOriginalArray2 = formatOriginalArray.map((snapshot) => {
    for (let key in lookUpObj2) {
      if (snapshot.plant_id == key) {
        snapshot.snapshot_count = lookUpObj2[key];
      }
    }
    return snapshot;
  });
  return formatOriginalArray2;
};

exports.getDayMonth = (dateToFormat) => {
  const words = dateToFormat.split('T');
  const dayMonthYear = words[0].split('-');
  const dayMonth = [dayMonthYear[2], dayMonthYear[1]].join('/');
  // console.log(dayMonth);
  return dayMonth;
};

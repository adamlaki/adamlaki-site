const moment = require('moment');

module.exports = value => {
  moment.locale('hu');
  const dateObject = moment(value);
  return dateObject.format('LL');
};

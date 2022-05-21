const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
  
    Object.keys(obj).map(key => {
      if (allowedFields.includes(key)) {
        newObj[key] = obj[key];
      }
    });
  
    return newObj;
  };
  
  module.exports = { filterObj };
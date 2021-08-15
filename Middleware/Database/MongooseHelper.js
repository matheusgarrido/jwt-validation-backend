const { mongoose } = require('./MongooseConfig');

//Convert array of JSON to filter
const generateFilter = (dataToFilter) => {
  const filter = {};
  dataToFilter.map((data) => {
    filter[data.field] = data.value;
  });
  return filter;
};

//Get model by name
const getModelByName = (model) => {
  return mongoose.model(model);
};

//FindOne
const findOne = async (model, filter) => {
  return await mongoose.model(model).findOne(filter);
};

module.exports = { mongoose, generateFilter, findOne, getModelByName };

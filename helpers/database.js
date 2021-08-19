const Database = require('../Middleware/Database/MongooseHelper');
const bcrypt = require('bcrypt');

const { mongoose } = Database;

//If this field exists
const isExistingField = async (modelName, dataToFilter) => {
  const filter = Database.generateFilter(dataToFilter);
  //Searching
  const duplicatedField = await Database.findOne(modelName, filter);
  return !!duplicatedField;
};

//If the unique key value is already in use
const isDuplicatedField = async (modelName, model, field) => {
  const filter = [{ field, value: model[field] }];
  return await isExistingField(modelName, filter);
};

//Get a hash code from a data
const hashData = async (data) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(data, salt);
};

const getSchemaFields = (modelName, formData) => {
  const schema = Database.getModelByName(modelName).schema;
  const data = {};
  Object.keys(schema.obj).map((field) => {
    data[field] = formData[field];
  });
  return data;
};

module.exports = {
  mongoose,
  isExistingField,
  isDuplicatedField,
  hashData,
  getSchemaFields,
};

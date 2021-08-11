const Database = require('./MongooseHandle');
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

module.exports = { mongoose, isExistingField, isDuplicatedField };

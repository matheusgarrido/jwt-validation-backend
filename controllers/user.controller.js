const UserModel = require('../Models/User.model');

exports.create = async (req, res) => {
  //Instancing user
  const user = new UserModel(req.body);

  //Validations
  user
    .validate()
    //If hasn't errors
    .then(async () => {
      try {
        await user.save();
        res.status(201).json({ error: false });
      } catch (e) {
        //Error while saving
        res.status(500).json({ error: true });
      }
    })
    //Has errors
    .catch(({ errors }) => {
      const errorList = {};
      Object.keys(errors).map((error) => {
        errorList[errors[error].path] = errors[error].message;
      });
      res.status(500).json({ error: true, errorList });
    });
};

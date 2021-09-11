exports.secretEmail = (email) => {
  const splittedEmail = email.split('@');
  const secretFirstPart = '*'.repeat(splittedEmail[0].length - 2);
  const lastIndex = splittedEmail[0].length - 1;
  const emailFirstPart =
    splittedEmail[0][0] + secretFirstPart + splittedEmail[0][lastIndex];
  return emailFirstPart + '@' + splittedEmail[1];
};

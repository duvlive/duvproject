export const updateUser = (user, data, part = 'Profile') => {
  const getMethod = `get${part}`;
  const setMethod = `set${part}`;
  return user[getMethod]().then(otherModels => {
    if (!otherModels) {
      return user[setMethod](data);
    }
    return otherModels.update(data).then(() => otherModels);
  });
};

export const updateUser = (user, data, part = 'Profile') => {
  const getMethod = `get${part}`;
  const setMethod = `set${part}`;
  return user[getMethod]().then(entertainerProfile => {
    if (!entertainerProfile) {
      return user[setMethod](data);
    }
    return entertainerProfile.update(data).then(() => entertainerProfile);
  });
};

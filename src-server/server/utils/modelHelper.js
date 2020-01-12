export const updateUser = (user, data, part='Profile') =>  {
  const getMethod = `get${part}`;
  const setMethod = `set${part}`
  return user[getMethod]()
    .then((userProfile) => {
      if (!userProfile) {
        return user[setMethod](data)
      }
    return userProfile
      .update(data)
      .then(() => userProfile);
  })
}
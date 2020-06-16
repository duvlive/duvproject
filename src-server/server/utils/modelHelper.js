export const updateUser = (user, data, part = 'Profile') => {
  const getMethod = `get${part}`;
  const setMethod = `set${part}`;
  return user[getMethod]().then((otherModels) => {
    if (!otherModels) {
      return user[setMethod](data);
    }
    return otherModels.update(data).then(() => otherModels);
  });
};

export const getAll = async (Model, options) => {
  // options  limit, offset, Model, where, include
  const offset = options.offset || 0;
  const limit = options.limit || 0;
  const where = options.where || {};
  const order = options.order || [['updatedAt', 'DESC']];
  const include = options.include || null;
  const attributes = options.attributes || null;
  const group = options.group || null;
  /**
   * Calculate the pagination
   * if the limits or offset is given in the request
   * calculate the pagination
   */

  if (!Model) {
    throw new Error('Model should be provided');
  }

  if (limit > 0 || offset > 0) {
    try {
      const data = await Model.findAndCountAll({
        where,
        limit,
        offset,
        order,
        include,
        attributes,
        distinct: true,
        group,
      });
      const total = data.count;
      const result = data.rows;
      const totalPage = Math.ceil(total / limit);
      let currentPage = Math.floor(offset / limit + 1);
      if (currentPage > totalPage) {
        currentPage = totalPage;
      }
      const pagination = { currentPage, limit, offset, total, totalPage };
      return { result, pagination };
    } catch (error) {
      throw error;
    }
  } else {
    try {
      const result = await Model.findAll({ where, include });
      return { result };
    } catch (error) {
      throw error;
    }
    // throw new Error('jfdslfaljdf not proviing');
  }
};

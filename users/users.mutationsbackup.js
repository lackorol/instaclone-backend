 const bcrypt = require('bcrypt');
 const client = require('../client.js');

 const Mutation = {
  createAccount: async (
    _,
    { firstName, lastName, username, email, password }
  ) => {
    const existingUser = await client.user.findFirst({  
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });
    console.log(existingUser);
    const uglyPassword = await bcrypt.hash(password, 10);
    console.log(uglyPassword);
    return client.user.create({
      data: { username, firstName, lastName, email, password: uglyPassword },
    });
  },
}

module.exports = {Mutation}
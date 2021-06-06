import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
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
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        console.log(uglyPassword);
        return client.user.create({
          data: {
            username,
            firstName,
            lastName,
            email,
            password: uglyPassword,
          },
        });
      } catch(e) {
        console.log(e);
        return e;
      }
    },
  },
};

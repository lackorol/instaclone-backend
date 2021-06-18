import client from "../../../client";
import { protectedResolver } from "../../users.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjs = [];
        if (caption) {
          const hashtags = caption.match(/#[\w]+/g);
          const hashtagObjs = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          })); /// parse caption
          // get or create Hashtags
          console.log(hashtagObjs);
        }
        // save photo with the parsed hashtags
        // add the photo to the hastags
        return client.photo.create({
          data: {
            file,
            caption,
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
            ...(hashtagObjs.length > 0 && {
              hashtags: {
                connectOrCreate: hashtagObjs,
              },
            }),
          },
        });
      }
    ),
  },
};

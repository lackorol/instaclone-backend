import client from "../../../client";
import { uploadToS3 } from "../../../shared/shared.utils";
import { protectedResolver } from "../../users.utils";
import { processHashtags } from "../photos.utils";

export default {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { loggedInUser }) => {
        let hashtagObjs = [];
        if (caption) {
          /// parse caption
          // get or create Hashtags
          hashtagObjs = processHashtags(caption);
          console.log(hashtagObjs);
        }
        // save photo with the parsed hashtags
        // add the photo to the hastags
        const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
        return client.photo.create({
          data: {
            file: fileUrl,
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

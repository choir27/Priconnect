import { PostOptionsInterface } from "../../../../../middleware/Interfaces";
import { getEmail } from "../../../../../middleware/Sessions";

export function findDuplicate(duplicateProps: PostOptionsInterface) {
  let duplicates = "";

  if (duplicateProps.post?.likes[0]) {
    const findDuplicate = duplicateProps.post?.likes?.find((like: string) => {
      const likeObject = JSON?.parse(like);

      if (
        likeObject?.id === duplicateProps.props?.user?.email ||
        likeObject?.id === getEmail()
      ) {
        return likeObject;
      }
    }) as string;

    if (findDuplicate) {
      duplicates = JSON?.parse(findDuplicate)?.id;
    }

    return duplicates;
  }
}

export function totalComment(commentArray: string[]) {
  let sum = 0;

  commentArray.forEach((comment: string) => {
    const commentObject = JSON.parse(comment);
    if (commentObject.comment) {
      sum++;
    }
  });

  return <span>{sum}</span>;
}

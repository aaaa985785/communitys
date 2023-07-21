import { request } from "../utils/request";

export async function createComment(content, postId) {
  await request("http://localhost:1337/api/comments", {
    method: "POST",
    body: {
      data: {
        content,
        post: postId,
      },
    },
  });
}

export async function loadComments(postId) {
  if (!postId) return [];
  const response = await request(
    "http://localhost:1337/api/comments?populate=*&filters[post][id][$eq]=" +
      postId
  );

  return response.data.map((comment) => {
    const result = comment?.attributes;
    return {
      id: comment?.id,
      content: result?.content,
      pubDate: result?.publishedAt,
      user: {
        id: result?.user?.data?.id,
        ...result?.user?.data?.attributes,
      },
    };
  });
}

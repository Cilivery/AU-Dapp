export const postSchema = {
  name: 'postImage',
  type: 'document',
  title: 'Post Image',
  fields: [
    {
      name: 'postImage',
      type: 'string',
      title: 'Post Image',
    },
    {
      name: 'timestamp',
      type: 'datetime',
      title: 'Timestamp',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'users' }],
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'users' }],
        },
      ],
      description: 'References to users who liked the post',
    },
    {
      name: 'dislikes',
      title: 'Dislikes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'users' }],
        },
      ],
      description: 'References to users who disliked the post',
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'commentText',
              type: 'string',
              title: 'Comment Text',
            },
            {
              name: 'author',
              type: 'reference',
              to: [{ type: 'users' }],
              title: 'Author',
            },
            {
              name: 'timestamp',
              type: 'datetime',
              title: 'Timestamp',
            },
          ],
        },
      ],
      description: 'Array of comments with author and timestamp',
    },
  ],
};

export const tweetSchema = {
  name: 'tweets',
  type: 'document',
  title: 'Tweets',
  fields: [
    {
      name: 'tweet',
      type: 'string',
      title: 'Tweet',
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
      name: 'image',
      title: 'Tweet Image',
      type: 'image',
      options: {
        hotspot: true, // Optional, allows the user to crop the image
      },
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
      initialValue: 0, // Start with 0 likes
    },
    {
      name: 'dislikes',
      title: 'Dislikes',
      type: 'number',
      initialValue: 0, // Start with 0 dislikes
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{ type: 'string' }], // Array of strings to store comments
      initialValue: [], // Start with an empty list of comments
    },
  ],
}

import PropTypes from 'prop-types';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import { FaRegComment } from 'react-icons/fa';
import { AiOutlineHeart, AiOutlineDislike } from 'react-icons/ai';
import { format } from 'timeago.js';
import { useState } from 'react';

const style = {
  wrapper: 'flex p-4 border-b border-[#38444d] bg-white text-black',
  profileImage: 'rounded-full h-[40px] w-[40px] object-cover',
  postMain: 'flex-1 px-4',
  headerDetails: 'flex items-center',
  name: 'font-bold mr-1 text-black',
  verified: 'text-[0.8rem] text-[#F9C74F]',
  handleAndTimeAgo: 'text-[#8899a6] ml-1',
  tweet: 'my-2 text-black',
  imageContainer: 'rounded-3xl my-2 w-full max-w-[500px]',
  image: 'w-full h-auto rounded-2xl',
  footer: 'flex justify-between items-center mt-4 text-[#8899a6]',
  footerIcon: 'rounded-full text-lg p-2 hover:bg-[#1e364a] transition-colors duration-200 flex items-center gap-1',
  commentSection: 'mt-4',
  commentInput: 'border rounded-md p-2 w-full bg-transparent text-black border-[#1e364a]',
  commentButton: 'bg-red-500 text-white p-2 rounded-md mt-2 hover:bg-red-700 transition-colors duration-200',
  commentItem: 'border-b pb-2 mb-2 text-black',
  commentTimestamp: 'text-sm text-gray-500',
  tokenButton: 'bg-red-500 text-white p-2 rounded-md hover:bg-green-700 transition-colors duration-200',
};

const Post = ({
  displayName,
  userName,
  text,
  avatar,
  timestamp,
  isProfileImageNft,
  imageUrl,
  likes: initialLikes,
  dislikes: initialDislikes,
  comments: initialComments,
}) => {
  const [profileImageLink] = useState(avatar);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [disliked, setDisliked] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    if (disliked) setDislikes(dislikes - 1);
    setLiked(!liked);
    setDisliked(false);
  };

  const handleDislike = () => {
    setDislikes(disliked ? dislikes - 1 : dislikes + 1);
    if (liked) setLikes(likes - 1);
    setDisliked(!disliked);
    setLiked(false);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, timestamp: new Date() }]);
      setNewComment('');
    }
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleSendToken = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install it to proceed.');
      return;
    }
  
    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  
      // Assume the first account as the sender
      const senderAddress = '0x93586D46365910F74228e149D37B2344A42D2fe0';
  
      // Example receiver address (you can replace it with your own wallet address)
      const receiverAddress = '0x93586D46365910F74228e149D37B2344A42D2fe0';
  
      // Create a dummy transaction object
      const transactionParameters = {
        to: receiverAddress, // Receiver's wallet address
        from: senderAddress, // Sender's wallet address (auto-detected by MetaMask)
        value: '0x2386F26FC10000', // Amount to send in wei (0.01 ETH in this case)
        gas: '0x5208', // Gas limit (in hexadecimal, 21000 is standard for simple transfers)
      };
  
      // Request MetaMask to initiate the transaction
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
  
      alert('Transaction submitted successfully!');
    } catch (error) {
      console.error('Failed to initiate transaction:', error);
      alert('Transaction failed. Please check the console for details.');
    }
  };
  

  return (
    <div className={style.wrapper}>
      <div>
        <img
          src={profileImageLink}
          alt={userName}
          className={
            isProfileImageNft
              ? `${style.profileImage} smallHex`
              : style.profileImage
          }
          onError={(e) => (e.target.src = '/fallback-avatar.png')}
        />
      </div>
      <div className={style.postMain}>
        <div>
          <span className={style.headerDetails}>
            <span className={style.name}>{displayName}</span>
            {isProfileImageNft && (
              <span className={style.verified}>
                <BsFillPatchCheckFill />
              </span>
            )}
            <span className={style.handleAndTimeAgo}>
              @{userName} • {format(new Date(timestamp).getTime())}
            </span>
          </span>
          <div className={style.tweet}>{text}</div>
        </div>
        {imageUrl && (
          <div className={style.imageContainer}>
            <img
              src={imageUrl}
              alt="Tweet image"
              className={style.image}
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
        )}
        <div className={style.footer}>
          <div className={style.footerIcon} onClick={handleShowComments}>
            <FaRegComment />
            <span>{comments.length}</span>
          </div>
          <div
            className={`${style.footerIcon} ${liked ? 'text-[#f91c80]' : ''}`}
            onClick={handleLike}
          >
            <AiOutlineHeart />
            <span>{likes}</span>
          </div>
          <div
            className={`${style.footerIcon} ${disliked ? 'text-[#f9a620]' : ''}`}
            onClick={handleDislike}
          >
            <AiOutlineDislike />
            <span>{dislikes}</span>
          </div>
          <button className={style.tokenButton} onClick={handleSendToken}>
            Send Token
          </button>
        </div>
        {showComments && (
          <div className={style.commentSection}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={style.commentInput}
            />
            <button onClick={handleAddComment} className={style.commentButton}>
              Comment
            </button>
            <div>
              {comments.map((comment, index) => (
                <div key={index} className={style.commentItem}>
                  <span className="font-bold">User:</span> {comment.text} <br />
                  <span className={style.commentTimestamp}>
                    {format(comment.timestamp)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Define PropTypes
Post.propTypes = {
  displayName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  isProfileImageNft: PropTypes.bool,
  imageUrl: PropTypes.string,
  likes: PropTypes.number,
  dislikes: PropTypes.number,
  comments: PropTypes.array,
};

// Provide default props for optional values
Post.defaultProps = {
  isProfileImageNft: false,
  imageUrl: null,
  likes: 0,
  dislikes: 0,
  comments: [],
};

export default Post;

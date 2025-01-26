import { useContext } from 'react';
import { TwitterContext } from '../../context/TwitterContext';
import TweetBox from './TweetBox';
import Post from '../Post';
import { BsStars } from 'react-icons/bs';

const style = {
  wrapper: `flex-[2] overflow-y-scroll bg-white text-black border border-[#003049] border-opacity-20`, // White background with black text and deep blue border with opacity
  header: `sticky top-0 bg-white z-10 p-4 flex justify-between items-center border-b border-[#003049] border-opacity-20`, // White header with a deep blue border at the bottom
  headerTitle: `text-xl font-bold text-black`, // Black text for header title
};

function Feed() {
  const { tweets } = useContext(TwitterContext);

  if (!tweets) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className={`${style.wrapper} no-scrollbar`}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <TweetBox />
      {tweets.length > 0 ? (
        tweets.map((tweet, index) => {
          const imageUrl = tweet.image || null; // Handle image URL directly

          return (
            <Post
              key={index}
              displayName={
                tweet.author.name === 'Unnamed'
                  ? `${tweet.author.walletAddress.slice(0, 4)}...${tweet.author.walletAddress.slice(41)}`
                  : tweet.author.name
              }
              userName={`${tweet.author.walletAddress.slice(0, 4)}...${tweet.author.walletAddress.slice(41)}`}
              text={tweet.tweet}
              avatar={tweet.author.profileImage}
              isProfileImageNft={tweet.author.isProfileImageNft}
              timestamp={tweet.timestamp}
              imageUrl={imageUrl} // Pass imageUrl to Post component
              likes={tweet.likes}  // Pass likes to Post component
              dislikes={tweet.dislikes}  // Pass dislikes to Post component
              comments={tweet.comments}  // Pass comments to Post component
            />
          );
        })
      ) : (
        <p className="text-center text-gray-500">No tweets to display</p>
      )}
    </div>
  );
}

export default Feed;

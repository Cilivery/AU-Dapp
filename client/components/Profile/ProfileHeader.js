import { useContext } from "react";
import { TwitterContext } from "../../context/TwitterContext";
import Post from "../Post";

const style = {
  wrapper: `flex-[2] overflow-y-scroll bg-white text-black border border-[#003049] border-opacity-20`, // White background with black text and deep blue border with opacity
  header: `sticky top-0 bg-white z-10 p-4 flex justify-between items-center border-b border-[#003049] border-opacity-20`, // White header with a deep blue border at the bottom
  headerTitle: `text-xl font-bold text-black`, // Black text for header title
};

const ProfileTweets = () => {
  const { currentAccount, currentUser } = useContext(TwitterContext);

  if (!currentUser?.tweets) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className={`${style.wrapper} no-scrollbar`}>
      <div className={style.header}>
        <div className={style.headerTitle}>{currentUser.name || "Profile"}</div>
      </div>
      {currentUser.tweets.length > 0 ? (
        [...currentUser.tweets] // Create a copy to avoid mutating the original array
          .reverse() // Reverse the array to show most recent first
          .map((tweet, index) => {
            const imageUrl = tweet.image || null; // Handle image URL directly

            return (
              <Post
                key={index}
                displayName={
                  currentUser.name === "Unnamed"
                    ? `${currentUser.walletAddress.slice(0, 4)}...${currentUser.walletAddress.slice(-4)}`
                    : currentUser.name
                }
                userName={`${currentAccount.slice(0, 4)}...${currentAccount.slice(-4)}`}
                text={tweet.tweet}
                avatar={currentUser.profileImage}
                isProfileImageNft={currentUser.isProfileImageNft}
                timestamp={tweet.timestamp}
                imageUrl={imageUrl} // Pass imageUrl to Post component
              />
            );
          })
      ) : (
        <p className="text-center text-gray-500">No tweets to display</p>
      )}
    </div>
  );
};

export default ProfileTweets;

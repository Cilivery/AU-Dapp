import { useState, useContext } from 'react';
import { TwitterContext } from '../../context/TwitterContext';
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs';
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri';
import { IoMdCalendar } from 'react-icons/io';
import { MdOutlineLocationOn } from 'react-icons/md';
import { client } from '../../lib/client';

const style = {
  wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4 bg-[#003049] text-white rounded-md`,
  tweetBoxLeft: `mr-4`, // No margin-top here to avoid affecting the text
  tweetBoxRight: `flex-1`,
  profileImage: `height-12 w-12 rounded-lg mt-2`, // Only the image is moved down
  inputField: `w-full h-full outline-none bg-transparent text-lg text-white rounded-md`,
  formLowerContainer: `flex items-start rounded-md`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2 text-[#C83F49]`,
  previewContainer: `mt-2 flex flex-wrap gap-2`,
  previewImage: `max-w-[100px] rounded-lg border border-[#38444d]`,
  submitGeneral: `px-6 py-2 rounded-2xl font-bold`,
  inactiveSubmit: `bg-[#C83F49] text-white rounded-lg`,
  activeSubmit: `bg-red-500 text-white hover:bg-red-700 rounded-lg`,
};


function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState('');
  const [tweetImage, setTweetImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { currentAccount, fetchTweets, currentUser } = useContext(TwitterContext);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTweetImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (image) => {
    const uploadedImage = await client.assets.upload('image', image);
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: uploadedImage._id,
      },
    };
  };

  const submitTweet = async (event) => {
    event.preventDefault();

    if (!tweetMessage && !tweetImage) return;

    const tweetId = `${currentAccount}_${Date.now()}`;
    let imageAssetRef = null;

    if (tweetImage) {
      imageAssetRef = await uploadImage(tweetImage);
    }

    const tweetDoc = {
      _type: 'tweets',
      _id: tweetId,
      tweet: tweetMessage,
      timestamp: new Date().toISOString(),
      author: {
        _key: tweetId,
        _ref: currentAccount,
        _type: 'reference',
      },
      ...(imageAssetRef && { image: imageAssetRef }),
    };

    await client.createIfNotExists(tweetDoc);

    await client
      .patch(currentAccount)
      .setIfMissing({ tweets: [] })
      .insert('after', 'tweets[-1]', [
        {
          _key: tweetId,
          _ref: tweetId,
          _type: 'reference',
        },
      ])
      .commit();

    await fetchTweets();
    resetForm();
  };

  const resetForm = () => {
    setTweetMessage('');
    setTweetImage(null);
    setImagePreview(null);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
        <img
          src={currentUser.profileImage}
          alt="Profile"
          className={
            currentUser.isProfileImageNft
              ? `${style.profileImage} smallHex`
              : style.profileImage
          }
        />
      </div>
      <div className={style.tweetBoxRight}>
        <form onSubmit={submitTweet}>
          <textarea
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            className={style.inputField}
          />
          <div className={style.formLowerContainer}>
            <div className={style.iconsContainer}>
              <label htmlFor="imageUpload">
                <BsCardImage className={style.icon} />
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <RiFileGifLine className={style.icon} />
              <RiBarChartHorizontalFill className={style.icon} />
              <BsEmojiSmile className={style.icon} />
              <IoMdCalendar className={style.icon} />
              <MdOutlineLocationOn className={style.icon} />
            </div>
            <button
              type="submit"
              disabled={!tweetMessage && !tweetImage}
              className={`${style.submitGeneral} ${
                tweetMessage || tweetImage
                  ? style.activeSubmit
                  : style.inactiveSubmit
              }`}
            >
              Post
            </button>
          </div>
          {imagePreview && (
            <div className={style.previewContainer}>
              <img
                src={imagePreview}
                alt="Preview"
                className={style.previewImage}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default TweetBox;

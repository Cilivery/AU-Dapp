import { news, whoToFollow } from '../../lib/static'
import { BiSearch } from 'react-icons/bi'

const style = {
  wrapper: `flex-[1] p-4 bg-white text-white`, // Deep blue background with white text
  searchBar: `flex items-center bg-white p-2 rounded-3xl text-black`, // Warm yellow background for search bar
  searchIcon: `text-[#003049] mr-2`, // Deep blue icon color for contrast
  inputBox: `bg-transparent outline-none text-[#003049]`, // Deep blue text for input
  section: `bg-[#003049] my-6 rounded-xl overflow-hidden`, // Deep blue background for sections with rounded corners
  title: `p-2 font-bold text-lg text-white`, // White title text for contrast
  showMore: `p-2 text-white text-sm cursor-pointer hover:bg-[#F94144]`, // White text with red hover effect for 'show more'
  item: `flex items-center p-3 my-2 hover:bg-[#F94144] cursor-pointer`, // Hover background changes to red
  newsItemLeft: `flex-1`,
  newsItemCategory: `text-white text-xs font-semibold`, // White text for category
  newsItemTitle: `text-sm font-bold text-white`, // White text for title
  newsItemRight: `w-1/5 ml-3`, // Space for right-side content
  newsItemImage: `rounded-xl h-14 w-14 object-cover`, // Image with rounded corners and consistent size
  followAvatarContainer: `w-1/6`, // Avatar container takes up 1/6th of the space
  followAvatar: `rounded-full h-[40px] w-[40px]`, // Avatar with rounded shape and set dimensions
  profileDetails: `flex-1`, // Profile details take remaining space
  name: `font-bold text-white`, // Bold white text for name
  handle: `text-white`, // White text for handle
  followButton: `bg-[#F94144] text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-[#DB3A3A]`, // Red button with white text and hover effect in darker red
};

function Widgets() {
  return (
    <div className={style.wrapper}>
      <div className={style.searchBar}>
        <BiSearch className={style.searchIcon} />
        <input
          placeholder='Search Twitter'
          type='text'
          className={style.inputBox}
        />
      </div>
      <div className={style.section}>
        <div className={style.title}>What's happening</div>
        {news.map((item, index) => (
          <div key={index} className={style.item}>
            <div className={style.newsItemLeft}>
              <div className={style.newsItemCategory}>{item.category}</div>
              <div className={style.newsItemTitle}>{item.title}</div>
            </div>
            <div className={style.newsItemRight}>
              <img
                src={item.image}
                alt={item.category}
                className={style.newsItemImage}
              />
            </div>
          </div>
        ))}
        <div className={style.showMore}>Show more</div>
      </div>
      <div className={style.section}>
        <div className={style.title}>Who to follow</div>
        {whoToFollow.map((item, index) => (
          <div key={index} className={style.item}>
            <div className={style.followAvatarContainer}>
              <img
                src={item.avatar}
                alt={item.handle}
                className={style.followAvatar}
              />
            </div>
            <div className={style.profileDetails}>
              <div className={style.name}>{item.name}</div>
              <div className={style.handle}>{item.handle}</div>
            </div>
            <div className={style.followButton}>Follow</div>
          </div>
        ))}
        <div className={style.showMore}>Show more</div>
      </div>
    </div>
  )
}

export default Widgets
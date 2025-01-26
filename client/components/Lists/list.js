import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { BsArrowLeftShort } from 'react-icons/bs'
import { useRouter } from 'next/router'

const style = {
  wrapper: `border-[#38444d] border-b sticky bg-[#19315c] text-white`, // Added background color for consistency and text color white
  header: `py-2 px-4 mt-2 flex items-center`, // Increased padding for better spacing
  primary: `bg-transparent outline-none font-bold text-white text-xl`, // Set text color to white
  secondary: `text-white text-xs`, // Changed secondary text color to white for visibility
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#d8d8d8] p-2 text-black`, // Increased padding and kept text black
  coverPhotoContainer: `flex items-center justify-center h-[20vh] overflow-hidden`,
  coverPhoto: `object-cover h-full w-full`,
  profileImageContainer: `w-full h-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center px-4`, // Centered profile image and adjusted padding
  profileImage: `object-cover rounded-full h-full w-[80px]`, // Set width for profile image to make it consistent
  profileImageNft: `object-cover h-full w-[80px]`, // Set width for NFT profile image
  profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  details: `px-4`,
  nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
  activeNav: `text-white`, // Active navigation item will have white text
};


const Lists = () => {
    const router = useRouter()
  return (
    <div className="flex flex-col w-full">
            <div className={style.header}>
    <div onClick={() => router.push('/')} className={style.backButton}>
      <BsArrowLeftShort />
    </div>
    <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-bold text-black">Lists</h2>
       
      </div>
      
   </div>
   {/* <button className="flex items-center text-gray-500 hover:text-blue-500">
          <FiSettings className="mr-1" /> Settings
        </button> */}
      <ul className="divide-y divide-gray-300">
        {/* <li className="py-4 px-4">
          <a href="/" className="flex items-center hover:text-blue-500">
            <div className="rounded-full  bg-gray-500 flex items-center justify-center">
            <img
            src="./profile/hemanth2.jpg"
            alt="Profile"
            className="rounded-full h-[40px] w-[40px]"
          />
            </div>
            <div className="ml-4 text-black">
              <h3 className="font-bold">B L Hemanth</h3>
              <p className="text-gray-500">@hemanthl</p>
              <p className="text-sm">Always Be humble</p>
            </div>
          </a>
        </li> */}
        
        <li className="py-4 px-4">
        <a href="/" className="flex items-center hover:text-blue-500">
            <div className="rounded-full  bg-gray-500 flex items-center justify-center">
            <img
            src="./profile/karthik.jpg"
            alt="Profile"
            className="rounded-full h-[40px] w-[40px]"
          />
            </div>
            <div className="ml-4 text-black">
              <h3 className="font-bold">Anwar Pasha</h3>
              <p className="text-gray-500">@anwarr</p>
              <p className="text-sm">Milk boy.</p>
            </div>
          </a>
        </li>
        <li className="py-4 px-4">
        <a href="/" className="flex items-center hover:text-blue-500">
            <div className="rounded-full  bg-gray-500 flex items-center justify-center">
            <img
            src="./profile/hrithik.jpg"
            alt="Profile"
            className="rounded-full h-[40px] w-[40px]"
          />
            </div>
            <div className="ml-4 text-black">
              <h3 className="font-bold">Srivalli</h3>
              <p className="text-gray-500">@batla</p>
              <p className="text-sm">Jai Pushpa.</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Lists;

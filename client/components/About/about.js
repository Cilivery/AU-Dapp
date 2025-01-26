
import React from 'react';
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { BsArrowLeftShort } from 'react-icons/bs'
import { useRouter } from 'next/router'

const style = {
  wrapper: `border-[#38444d] border-b sticky`,
  header: `py-1 px-3 mt-2 flex items-center ]`,
  primary: `bg-transparent outline-none font-bold text-black text-xl`,
  secondary: `text-[black] text-xs`,
  backButton: `text-3xl cursor-pointer mr-2 rounded-full hover:bg-[#d8d8d8] p-1 text-black `,
  coverPhotoContainer: `flex items-center justify-center h-[20vh] overflow-hidden`,
  coverPhoto: `object-cover h-full w-full`,
  profileImageContainer: `w-full h-[6rem] rounded-full mt-[-3rem] mb-2 flex justify-start items-center px-3 flex justify-between `,
  profileImage: `object-cover rounded-full h-full`,
  profileImageNft: `object-cover h-full`,
  profileImageMint: `bg-white text-black px-3 py-1 rounded-full hover:bg-[#8899a6] cursor-pointer`,
  details: `px-4`,
  nav: `flex justify-around mt-4 mb-2 text-xs font-semibold text-[#8899a6]`,
  activeNav: `text-black`,
}

const About=()=> {
  const router = useRouter()
  return (
    <div className="bg-gray-100  bg- white">
         <div className={style.header}>
    <div onClick={() => router.push('/')} className={style.backButton}>
      <BsArrowLeftShort />
    </div>
    <div className={style.details}>
      <div className={style.primary}>About   </div>
    
    </div>
  </div>
      <div className="container px-5 py-24 mx-auto ">
        <div className="text-center mb-20  ">
          <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4 ">
            Meet Our Team
          </h1>
          <p className="text-base leading-relaxed xl:w-30 lg:w-30 mx-auto text-black bg-[#c4c4c4] ">
           A visionary and innovative students who has developed a decentralized social media platform using blockchain technology. We are 4th year students pursuing Computer Science & Engineering at Anurag University. our passion for blockchain technology and social media has led him to create a platform that prioritizes the security and privacy of users' personal information. our platform is based on the Ethereum blockchain and is a decentralized application (Dapp). Through our project, we hopes to revolutionize the way we interact on social media and provide a more secure and private experience for users. Stay tuned for updates on our project and the future of decentralized social media!
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
  <div className="w-full md:w-1/2 xl:w-1/4 p-6 flex flex-col items-center">
    <img src="./profile/hemanth2.jpg" className="mb-4 rounded-lg shadow-lg" alt="Profile" />
    <div className="flex-grow">
      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Cilivery Nikhil</h2>
      <div className="flex mt-2 space-x-4">
        <a href="https://github.com/cilivery">
          <FaGithub className="text-black w-6 h-6" />
        </a>
        <a href=" "><FaInstagram className="text-black w-6 h-6" /></a>
        <a href=" "><FaLinkedin className="text-black w-6 h-6" /></a>
      </div>
    </div>
  </div>
  <div className="w-full md:w-1/2 xl:w-1/4 p-6 flex flex-col items-center">
    <img src="./profile/hrithik.jpg" className="mb-4 rounded-lg shadow-lg" alt="Profile" />
    <div className="flex-grow">
      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Srivalli Batla</h2>
      <div className="flex mt-2 space-x-4">
        <a href="https://github.com/">
          <FaGithub className="text-black w-6 h-6" />
        </a>
        <a href="https://www.instagram.com/">
          <FaInstagram className="text-black w-6 h-6" />
        </a>
        <a href="https://www.linkedin.com/in/thrishul-k-v-53b5261b2/">
          <FaLinkedin className="text-black w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
  <div className="w-full md:w-1/2 xl:w-1/4 p-6 flex flex-col items-center">
    <img src="./profile/karthik.jpg" className="mb-4 rounded-lg shadow-lg" alt="Profile" />
    <div className="flex-grow">
      <h2 className="text-gray-900 text-lg title-font font-medium mb-3">Anwar Pasha</h2>
      <div className="flex mt-2 space-x-4">
        <a href="https://github.com/Karthikreddyml">
          <FaGithub className="text-black w-6 h-6" />
        </a>
        <a href="https://instagram.com/karthikreddy_karti?igshid=OTk0YzhjMDVlZA==">
          <FaInstagram className="text-black w-6 h-6" />
        </a>
        <a href="https://www.linkedin.com/in/karthik-m-l-665815253">
          <FaLinkedin className="text-black w-6 h-6" />
        </a>
      </div>
    </div>
  </div>
</div>

  </div>
  {/* <div className='text-center mb-20 pl-[20px] pr-[20px]'  >
  <img src="./profile/Telusko.jpg" className="h-[500px] w-[600px] pl-[100px]" alt="telisko" />
  <p className="text-base leading-relaxed xl:w-30 lg:w-30 mx-auto text-black bg-[#c4c4c4] ">
   </p>
  </div>
  <div className='text-center mb-20 pl-[20px] pr-[20px]'  >
  <img src="./profile/Blockmeet .jpg" className="h-[500px] w-[600px] pl-[100px]" alt="telisko" />
  <p className="text-base leading-relaxed xl:w-30 lg:w-30 mx-auto text-black bg-[#c4c4c4] ">

   </p> </div> */}
</div>

);
}

export default  About
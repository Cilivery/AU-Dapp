import React from "react";


const ExplorePeople = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-lg font-bold text-black">Who to follow</h2>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <img
            src='./profile/hemanth2.jpg'
            alt="Profile"
            className="rounded-full h-[40px] w-[40px]"
          />
          <div>
            <p className="font-bold text-black">Cilivery Nikhil</p>
            <p className="text-gray-500 text-black">@cilivery_nikhil</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="./profile/karthik.jpg"
            alt="Profile"
            className="rounded-full h-[40px] w-[40px]"
          />
          <div>
            <p className="font-bold text-black">Anwar Pasha</p>
            <p className="text-gray-500 text-black">@anwar</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <img
            src="./profile/hrithik.jpg"
            alt="Profile"
            className="rounded-full h-[40px] w-[40px]"
          />
          <div>
            <p className="font-bold text-black">Srivalli</p>
            <p className="text-gray-500 text-black">@batla</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePeople;
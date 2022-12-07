import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function Widget() {
  return (
    <div className="col-span-2 w-full mt-2 hidden items-start px-2 md:inline">
      {/* Search */}
      <div className="flex items-center space-x-2 mb-5 rounded-full bg-gray-100 p-3">
        <AiOutlineSearch className="h-5 w-5 flex-shrink-0 text-gray-400" />
        <input
          className="bg-transparent outline-none"
          type="text"
          placeholder="Search Twitter"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="vercel"
        options={{ height: 1000 }}
      />
    </div>
  );
}

export default Widget;

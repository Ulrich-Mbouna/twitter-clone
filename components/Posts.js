import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";

export default function Posts({ post }) {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* Image */}
      <img
        src={post.userImg}
        alt="user-img"
        className="h-11 w-11 rounded-full mr-4"
      />

      {/* Right side */}
      <div className="">
        {/* Header */}

        <div className="flex items-center justify-between">
          {/* post info */}
          <div className="flex space-x-1 whitespace-nowrap items-center">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {post.name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{post.username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              {post.timestamp}
            </span>
          </div>
          {/* Dot icon */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* Post text */}
        <p className="text-gray-800 text-[15px] sm:text-base mb-2">
          {post.text}
        </p>
        {/* Post image */}
        <img className="rounded-2xl mr-2" src={post.img} alt="post image" />
        {/* Icons */}
        <div className="flex justify-between items-center text-gray-500 p-2">
          <ChatIcon className="h-9 hoverEffect w-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-9 hoverEffect w-9 p-2 hover:text-red-600 hover:bg-red-100" />
          <HeartIcon className="h-9 hoverEffect w-9 p-2 hover:text-red-600 hover:bg-red-100" />
          <ShareIcon className="h-9 hoverEffect w-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 hoverEffect w-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}

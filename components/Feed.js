import { SparklesIcon } from "@heroicons/react/outline";
import Index from "./Index";
import Posts from "./Posts";

export default function Feed() {
  const posts = [
    {
      id: "1",
      name: "Mbouna Ulrich",
      username: "MbounaU",
      userImg:
        "https://pbs.twimg.com/profile_images/1534979400004935682/U3qj17rS_400x400.jpg",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80",
      text: "Nice view",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      name: "Kamo Piekam",
      username: "Kamo",
      userImg:
        "https://scontent-iad3-1.xx.fbcdn.net/v/t39.30808-6/275664616_1517278738668214_4794277504275998867_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEjgZHM6YnO6eP7rF7LmC1VAjh4ID_T9QYCOHggP9P1Bibq-gFZgV03D67KCaJF4dCD7x1CSvu7YOHtcC-Ak5F0&_nc_ohc=jmaRf8H61oAAX9iabIm&_nc_ht=scontent-iad3-1.xx&oh=00_AT8fYjWIWNbXDgYuyGxnupQEZg8-uBWjLGUMcHdPg6qjzg&oe=63209737",
      img: "https://images.unsplash.com/photo-1647891938250-954addeb9c51?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      text: "Nice friendship",
      timestamp: "2 days ago",
    },
  ];
  return (
    <div className="xl:ml-[370px] border-x border-gray-200 xl:min-w-[576px] sm:ml-[73px] grow max-w-xl">
      <div className="flex py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer"> Home </h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Index />
      {posts.map((post) => (
        <Posts key={post.id} post={post} />
      ))}
    </div>
  );
}

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
        "https://media-exp1.licdn.com/dms/image/C5603AQFLXnnOmKc2CQ/profile-displayphoto-shrink_200_200/0/1640717934213?e=2147483647&v=beta&t=hyzPg1nX3O50JdYIi7cMG38rApzbeDH-izRLT7UROko",
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

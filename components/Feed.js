import { SparklesIcon } from "@heroicons/react/outline";
import Input from "./Input";
import Post from "./Post";
import {useEffect, useState} from "react";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore"
import {db} from "../firebase";
import { AnimatePresence, motion} from "framer-motion";
import LoginButton from "./LoginButton";

export default function Feed() {
  const [posts, setPosts] = useState([]);

 useEffect(() =>onSnapshot(query(collection(db, 'posts')), orderBy('timestamp','desc'), (snapshot)=> {
         setPosts(snapshot.docs)
       }), [])
  return (
    <div className="xl:ml-[370px] border-x border-gray-200 xl:min-w-[576px] sm:ml-[73px] grow max-w-xl">
      <div className="flex items-center justify-between space- py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer"> Home </h2>
         
        <div className="hoverEffect flex items-center justify-center px-0 w-9 h-9">
          <SparklesIcon className="h-5" />
        </div>
      </div>
      <Input />
        <AnimatePresence>
            {posts.map((post) => (
                <motion.div
                    key={post.id}
                    initial={{opacity: 0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{ duration: 1}}
                >
                    <Post id={post.id} key={post.id} post={post} />
                </motion.div>
            ))}
        </AnimatePresence>
    </div>
  );
}

import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFiled } from "@heroicons/react/solid"
import Moment from 'react-moment';
import 'moment/locale/fr';
import {collection, doc, onSnapshot, setDoc, deleteDoc} from 'firebase/firestore'
import {deleteObject, ref} from 'firebase/storage'
import {db, storage} from "../firebase";
import {signIn, useSession} from "next-auth/react";
import {useEffect, useState} from "react";

export default function Posts({ post }) {
  const { data: session } = useSession();
  const [likes, setLikes ] = useState([]);
  const [hasLiked, setHasLiked ] = useState(false);

  useEffect(() => {
    const unSubscribe = onSnapshot(
        collection(db, "posts", post.id, "likes"), (snapshot) => {
          setLikes(snapshot.docs)
        }
    )
  },[db])

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
  }, [likes])

  async function likePost() {
    if(session) {
      if(hasLiked) {
        await deleteDoc(doc(db, "posts",post.id, "likes", session?.user.uid))
      }
      else {
        await setDoc(doc(db, "posts", post.id, 'likes', session?.user.uid), {
          username: session.user.username,
        });
      }
    }
    else {
      await signIn();
    }
  }
  async function deletePost() {
    if(window.confirm("Are you sure you want to delete this post?")) {
      await deleteDoc(doc(db, "posts", post.id));
      await deleteObject(ref(storage, `posts/${post.id}/image`))
    }

  }

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* Image */}
      <img
        src={post.data().userImg}
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
              {post.data().name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{post.data().username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow locale="fr">{post.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          {/* Dot icon */}
          <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
        </div>

        {/* Post text */}
        <p className="text-gray-800 text-[15px] sm:text-base mb-2">
          {post.data().text}
        </p>
        {/* Post image */}
        <img className="rounded-2xl mr-2" src={post.data().image} alt="post image" />
        {/* Icons */}
        <div className="flex justify-between items-center text-gray-500 p-2">
          <ChatIcon className="h-9 hoverEffect w-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
          { session?.user.uid === post?.data().id && (
              <TrashIcon
                  onClick={deletePost}
                  className="h-9 hoverEffect w-9 p-2 hover:text-red-600 hover:bg-red-100"
              />
          ) }
          <div className="flex items-center">
            { hasLiked ? (
                    <HeartIconFiled
                        onClick={likePost}
                        className="h-9 hoverEffect w-9 p-2 text-red-600 hover:bg-red-100" />
                ) :
                <HeartIcon
                    onClick={likePost}
                    className="h-9 hoverEffect w-9 p-2 hover:text-red-600 hover:bg-red-100" />
            }
            { likes.length > 0 && (
                <span className={`${hasLiked && 'text-red-600'} text-sm select-none`}>{likes.length}</span>
            )}
          </div>
          <ShareIcon className="h-9 hoverEffect w-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 hoverEffect w-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  );
}

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
import {useRecoilState} from "recoil";
import { modalState, postIdlState } from "../atom/modalAtom";
import {useRouter} from "next/router";

export default function Post({ comment, commentId,originalPostId }) {
    const { data: session } = useSession();
    const [likes, setLikes ] = useState([]);
    const [hasLiked, setHasLiked ] = useState(false);
    const [open, setOpen] = useRecoilState(modalState);
    const [postId, setPostId] = useRecoilState(postIdlState);
    const router = useRouter();


    useEffect(() => {
        const unSubscribe = onSnapshot(
            collection(db, "posts", originalPostId, "comments", commentId, "likes"), (snapshot) => {
                setLikes(snapshot.docs)
            }
        )
    },[db, originalPostId, commentId]);

    useEffect(() => {
        setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1)
    }, [likes])

    async function likeComment() {
        if(session) {
            if(hasLiked) {
                await deleteDoc(doc(db, "posts",originalPostId,"comments", commentId, "likes", session?.user.uid))
            }
            else {
                await setDoc(doc(db, "posts", originalPostId, "comments", commentId , 'likes', session?.user.uid), {
                    username: session.user.username,
                });
            }
        }
        else {
            await signIn();
        }
    }
    async function deleteComment() {
        if(window.confirm("Are you sure you want to delete this comment?")) {
            await deleteDoc(doc(db, "posts", originalPostId, "comments", commentId));
        }

    }

    return (
        <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-20">
            {/* Image */}
            <img
                src={comment?.userImg}
                alt="user-img"
                className="h-11 w-11 rounded-full mr-4"
            />

            {/* Right side */}
            <div className="flex-1">
                {/* Header */}

                <div className="flex items-center justify-between">
                    {/* comment info */}
                    <div className="flex space-x-1 whitespace-nowrap items-center">
                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                            {comment?.name}
                        </h4>
                        <span className="text-sm sm:text-[15px]">@{comment?.username} - </span>
                        <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow locale="fr">{comment?.timestamp?.toDate()}</Moment>
            </span>
                    </div>
                    {/* Dot icon */}
                    <DotsHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-100 hover:text-sky-500 p-2" />
                </div>

                {/* comment text */}
                <p className="text-gray-800 text-[15px] sm:text-base mb-2">
                    {comment?.comment}
                </p>
                {/* Icons */}
                <div className="flex justify-between items-center text-gray-500 p-2">
                    <div className="flex items-center justify-center select-none">
                        <ChatIcon
                            onClick={async () => {
                                if(!session) {
                                    await signIn()
                                }
                                else {
                                    setPostId(originalPostId);
                                    setOpen(!open);
                                }
                            }}
                            className="h-9 hoverEffect w-9 p-2 hover:text-sky-500 hover:bg-sky-100" />
                    </div>
                    { session?.user.uid === comment?.userId && (
                        <TrashIcon
                            onClick={deleteComment}
                            className="h-9 hoverEffect w-9 p-2 hover:text-red-600 hover:bg-red-100"
                        />
                    ) }
                    <div className="flex items-center">
                        { hasLiked ? (
                                <HeartIconFiled
                                    onClick={likeComment}
                                    className="h-9 hoverEffect w-9 p-2 text-red-600 hover:bg-red-100" />
                            ) :
                            <HeartIcon
                                onClick={likeComment}
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

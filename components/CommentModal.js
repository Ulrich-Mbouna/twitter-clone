import { useRecoilState } from "recoil";
import { modalState, postIdlState } from "../atom/modalAtom"
import { AnimatePresence, motion } from "framer-motion";
import Modal from "react-modal"
import { XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import {collection, doc, onSnapshot, serverTimestamp, addDoc} from "firebase/firestore";
import Moment from "react-moment";
import { signOut, useSession } from "next-auth/react";
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import {useRouter} from "next/router";

export default function CommentModal() {
    const [open, setOpen] = useRecoilState(modalState);
    const [postId] = useRecoilState(postIdlState);
    const [post, setPost] = useState({});
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        onSnapshot(doc(db, "posts", postId), (snapshot) => {
            setPost(snapshot)
        });
    }, [postId, db])

    const sendComment = async () => {
        await addDoc(collection(db, "posts", postId, "comments"), {
            comment: input,
            name: session.user.name,
            username: session.user.username,
            userImg: session.user.image,
            timestamp: serverTimestamp()
        })

        setOpen(false);
        setInput("");
        await router.push(`/posts/${postId}`)
    }

    return (
        <div className="modal-content">
            {
                open && (
                    <Modal
                        isOpen={open}
                        onRequestClose={() => setOpen(false)}

                        className="
                    max-w-lg w-[90%] absolute top-24
                     left-[50%] translate-x-[-50%]
                     border-2
                     border-gray-200
                     bg-white rounded-xl shadow-md
                     "
                    >
                        <div className="p-1">
                            <div className="border-b border-gray-200 py-2 px-1.5">
                                <div className="hoverEffect h-9 w-9 flex items-center justify-center">
                                    <XIcon
                                        onClick={() => setOpen(false)}
                                        className="h-[22px] text-gray-700"
                                    />
                                </div>
                            </div>
                            {post && (
                                <>
                                    <div className="p-2 flex items-center space-x-1 relative">
                                        <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-300" />
                                        <img
                                            src={post?.data()?.userImg}
                                            alt="user-img"
                                            className="h-11 w-11 rounded-full mr-4"
                                        />
                                        <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
                                            {post?.data()?.name}
                                        </h4>
                                        <span className="text-sm sm:text-[15px]">@{post?.data()?.username} - </span>
                                        <span className="text-sm sm:text-[15px] hover:underline">
                                            <Moment fromNow locale="fr">{post?.data()?.timestamp?.toDate()}</Moment>
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-[15px] sm:text-[16px] ml-16 mb-2">{post?.data()?.text}</p>
                                    <div className="flex p-3 space-x-3">
                                        <img
                                            alt="user-img"
                                            className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
                                            src={session.user.image}
                                        />
                                        <div className="w-full divide-y divide-gray-200">
                                            <div className="">
                                                <textarea
                                                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                                                    rows="2"
                                                    placeholder="Tweet your reply"
                                                    value={input}
                                                    onChange={(e) => setInput(e.target.value)}>
                                                </textarea>
                                            </div>
                                            {selectedFile && (
                                                <div className="relative">
                                                    <XIcon className="h-7 text-black border absolute cursor-pointer border-white m-1 rounded-full"
                                                        onClick={(e) => setSelectedFile(null)}
                                                    />
                                                    <img src={selectedFile} className={`${loading && 'animate-pulse'}`} />
                                                </div>
                                            )}
                                            <div className="flex items-center justify-between pt-2.5">

                                                <div className="flex">
                                                    <div className=""
                                                         // onClick={() => filePickerRef.current.click()}
                                                    >
                                                        <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                                        {/*<input*/}
                                                        {/*    type="file"*/}
                                                        {/*    hidden ref={filePickerRef} onChange={addImageToPost}*/}
                                                        {/*/>*/}
                                                    </div>
                                                    <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                                                </div>
                                                <button
                                                    disabled={!input.trim()}
                                                    onClick={sendComment}
                                                    className="disabled:cursor-not-allowed bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
                                                    Reply
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Modal>
                )}

            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    exit={{ opacity: 1 }}
                >

                </motion.div>
            </AnimatePresence>
        </div>
    )
}
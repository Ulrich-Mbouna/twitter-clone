import { signOut} from "next-auth/react";
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";

import { useSession } from "next-auth/react";
import {useRef, useState} from "react";
import  { db, storage } from "../firebase"
import { addDoc, collection, serverTimestamp, updateDoc, doc } from 'firebase/firestore'
import { uploadString, getDownloadURL, ref } from 'firebase/storage'
import {XIcon} from "@heroicons/react/solid";

export default function Input() {
    const { data: session } = useSession();

    const [input, setInput] = useState('');
    const filePickerRef = useRef(null);
    const [selectedFile, setSelectedFile ] = useState(null)
    const [loading, setLoading] = useState(false);

//Function
    const sendPost = async () => {
        if(loading) return
        setLoading(true);
        const docRef = await addDoc(collection(db, "posts"), {
            id: session.user.uid,
            text: input,
            userImg: session.user.image,
            timestamp: serverTimestamp(),
            name: session.user.name,
            username: session.user.username
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`);
        if(selectedFile) {
            await uploadString(imageRef, selectedFile, "data_url" )
                .then(async () => {
                    const downloadURL= await getDownloadURL(imageRef);
                    await updateDoc(doc(db, "posts", docRef.id), {
                        image: downloadURL,
                    } )
                })
        }
        setInput('');
        setSelectedFile(null);
        setLoading(false);
    }
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    return (
       <>

           {session && (<div className="flex border-b border-gray-200 p-3 space-x-3">
               <img
                   alt="user-img"
                   className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
                   src={ session.user.image }
                   onClick={ signOut }
               />
               <div className="w-full divide-y divide-gray-200">
                   <div className="">
          <textarea
              className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
              rows="2"
              placeholder="What's happening ?"
              value={ input }
              onChange={ (e) => setInput(e.target.value)}
          ></textarea>
                   </div>
                   {selectedFile  && (
                       <div className="relative">
                           <XIcon className="h-7 text-black border absolute cursor-pointer border-white m-1 rounded-full"
                            onClick={ (e) => setSelectedFile(null)}
                           />
                           <img src={ selectedFile } className={`${loading && 'animate-pulse'}`}/>
                       </div>
                   )}
                   <div className="flex items-center justify-between pt-2.5">
                       {!loading && (
                           <>
                               <div className="flex">
                                   <div className="" onClick={() => filePickerRef.current.click()}>
                                       <PhotographIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                                       <input type="file" hidden ref={filePickerRef} onChange={addImageToPost}/>
                                   </div>
                                   <EmojiHappyIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100"/>
                               </div>
                               <button
                                   disabled={ !input.trim() }
                                   onClick={  sendPost }
                                   className="disabled:cursor-not-allowed bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">
                                   Tweet
                               </button>
                           </>
                       ) }

                   </div>
               </div>
           </div>)}
       </>

);
}


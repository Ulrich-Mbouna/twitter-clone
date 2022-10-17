import { SearchIcon } from "@heroicons/react/outline";
import { News } from './News'
import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";

export default function Widgets({ newsResults, randomUsersResults }) {
    const [articleNumber, setArticleNumber] = useState(3);
    const [randomUserNumber, setRandomUserNumber] = useState(3);
  return (
    <div className="xl:w-[600px]  hidden lg:inline ml-8 space-y-5">
      <div className="w-[90%] xl:w-[75%] sticky bg-white top-0 py-1.5 z-50">
        <div className="flex items-center p-3 bg-gray-200 rounded-full relative">
          <SearchIcon className="h-5 z-50 text-gray-500" />
          <input
            type="text"
            className="absolute inset-0 rounded-full pl-11 border-gray-500 focus:shadow-lg focus:bg-white bg-gray-100 text-gray-700"
            placeholder="Search Twitter"
           />
        </div>
      </div>

        <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
            <h4 className="font-bold text-xl px-4">What is happening</h4>
            <AnimatePresence>
                {newsResults.slice(0,articleNumber).map((article) => (
                    <motion.div
                        key={article.title}
                        initial={ { opacity: 0}}
                        animate={ { opacity: 1 } }
                        exit={{opacity: 0}}
                        transition={ { duration: 1 }}
                    >
                        <News key={article.id} article={article} />
                    </motion.div>
                ))}

            </AnimatePresence>

            <button onClick={() => setArticleNumber(articleNumber + 3)} className='text-blue-300 pl-4 pb-3 hover:text-blue-400'>Show more</button>
        </div>
        <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%] sticky top-16">
            <h4 className="font-bold text-xl px-4">Who to follow</h4>
            <AnimatePresence>
                {
                    randomUsersResults.slice(0,randomUserNumber).map((user, index) => (
                        <motion.div
                            key={user.login.username}
                            initial={ { opacity: 0}}
                            animate={ { opacity: 1 } }
                            exit={{opacity: 0}}
                            transition={ { duration: 1 }}
                        >
                            <div className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 transition duration-500 ease-out' key={user.login.username}>
                                <img className='rounded-full' width='40' src={user.picture.thumbnail} alt=""/>
                                <div className="truncate ml-4 leading-5">
                                    <h4 className='font-bold hover:underline text-[14px]'>{user.login.username}</h4>
                                    <h5 className='text-[13px] text-gray-500 truncate'>{user.name.first + " " + user.name.last}</h5>
                                </div>
                                <button className='ml-auto bg-black text-white rounded-full text-sm px-3.5 py-1.5 font-bold'>Follow</button>
                            </div>
                        </motion.div>
                    ))
                }
            </AnimatePresence>
            <button onClick={() => setRandomUserNumber(randomUserNumber + 3)} className='text-blue-300 pl-4 pb-3 hover:text-blue-400'>Show more</button>
        </div>
    </div>
  );
}

import {signIn, signOut, useSession} from "next-auth/react"
import {DotsHorizontalIcon} from "@heroicons/react/outline";
export default function LoginButton() {

    const {data: session} = useSession();

    return (
        <div>
            { session ? (
                    <>
                        {/*Button*/}
                        <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Tweet</button>

                        {/*Mini profile*/}
                        <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto" >
                            <img
                                onClick={ signOut }
                                src={ session.user.image }
                                alt="user image"
                                className = "h-10 w-10 rounded-full xl:mr-2"
                            />
                            <div className="leading-5 hidden xl:inline">
                                <h4 className="font-bold">{session.user.name}</h4>
                                <p className="text-gray-500">@{session.user.username}</p>
                            </div>
                            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline" />
                        </div>
                    </>
                ) :
                (
                    <button onClick={signIn} className="bg-blue-400 text-white rounded-full w-36 h-12 font-bold shadow-md hover:brightness-95 text-lg">Sign In</button>
                )
            }
        </div>
    )
}
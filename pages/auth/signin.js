import {getProviders, signIn } from "next-auth/react";

export default function signin({ providers }) {
    return  <div className='flex justify-center mt-20 space-x-4'>
        <img
            className='hidden md:inline-flex object-cover md:w-44 md:h-80 rotate-6'
            src="https://cdn.cms-twdigitalassets.com/content/dam/help-twitter/en/twitter-tips/desktop-assets/ch-01/ch12findphone.png.twimg.1920.png" alt="Twitter image inside  phone"/>
        <div className="">
            {
                Object.values(providers).map((provider) => (
                    <div className='flex flex-col items-center' key={provider.id}>
                        <img className='w-36 object-cover' src="https://help.twitter.com/content/dam/help-twitter/brand/logo.png" alt="twitter logo"/>
                        <h3 className='font-medium  text-2xl text-[#1da1f2]'>Msus Twitter Clone</h3>
                        <p className='text-center text-sm italic my-10'>This app is created for learning purposes</p>
                        <button onClick={ () => signIn(provider.id, {callbackUrl : '/'}) } className='bg-red-400 rounded-lg p-3  text-white hover:bg-red-500'>Sign In with { provider.name }</button>
                    </div>
                ))
            }
        </div>
    </div>
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        },
    }
}
import React from 'react'
import SQLDateParser from '../util/SQLDateParser'
import {FaRegThumbsUp } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
const ProfilePostTemplate = ({indx , post}) => {
    const navigate = useNavigate() 
    const navigateToPost=()=>{
        navigate(`/posts/${post.id}`)
    }
  return (
    <div
    className="w-full  flex flex-col justify-center items-center  bg-[#a69d85]  border-black my-4 p-2 hover:bg-rd hover:cursor-pointer"
    key={indx}
    onClick={navigateToPost}
  >
    <h1 className='font-bold text-md'>{post.title}</h1>

    <h1 className=''>{post.postText}</h1>
    
    <div className='w-full flex justify-between '>
    <h1>
      {SQLDateParser(post.createdAt).date}
      {SQLDateParser(post.createdAt).time}
    </h1>

    <div className='flex '>

    <FaRegThumbsUp  />
    <h1>{post.Likes.length}</h1>
    </div>
    
    </div>
  </div>
  )
}

export default ProfilePostTemplate
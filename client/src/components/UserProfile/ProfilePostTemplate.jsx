import React from 'react'
import SQLDateParser from '../util/SQLDateParser'
import {FaRegThumbsUp } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import ThemeContext from '../../Context/ThemeContext'
import { useContext } from 'react'
const ProfilePostTemplate = ({indx , post}) => {
    const navigate = useNavigate() 
    const navigateToPost=()=>{
        navigate(`/posts/${post.id}`)
    }

    const [theme , setTheme] = useContext(ThemeContext)

    const themeStyle =  theme ? "bg-[var(--light-1)] text-[var(--primary-dark)]" : "bg-[var(--dark-3)] text-[var(--primary-dark)]";

  return (
    <div
    className={`w-[90%] relative min-h-[8rem] ${themeStyle} flex flex-col justify-center items-center   my-4 p-2 hover:bg-rd hover:cursor-pointer shadow-lg rounded-lg box-content`}
    key={indx}
    onClick={navigateToPost}
  >
    <h1 className='font-bold text-md'>{post.title}</h1>


    <div className='relative min-h-[10rem] flex justify-center items-center mb-5'>
        <h1 className=''>{post.postText}</h1>
    </div>
    
    <div className='w-full flex justify-between '>
    <h1 className='absolute bottom-4'>
      {SQLDateParser(post.createdAt).date}
      {SQLDateParser(post.createdAt).time}
    </h1>

    <div className='absolute flex right-4 bottom-4'>
    <FaRegThumbsUp  />
    <h1>{post.Likes.length}</h1>
    </div>

    </div>
  </div>
  )
}

export default ProfilePostTemplate
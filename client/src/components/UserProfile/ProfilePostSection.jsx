import React from 'react'
import ProfilePostTemplate from './ProfilePostTemplate'
const ProfilePostSection = ({userPosts}) => {
    console.log(userPosts)
  return (
  <>
    <h1>پست ها</h1>
    <div className="w-screen flex flex-col justify-center items-center md:overflow-auto">
    {userPosts.length === 0
        ? "این کاربر پستی ندارد"
        : userPosts.map((post, indx) => (
            <ProfilePostTemplate {...{ post, indx }} />
        ))}
    </div>
  </>
  )
}

export default ProfilePostSection
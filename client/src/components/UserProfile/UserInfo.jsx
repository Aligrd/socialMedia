import React from 'react'
import SQLDateParser from '../util/SQLDateParser'
const UserInfo = (userData) => {

  return (
    <div className='w-full flex flex-col justify-center'>
        <h1 className='w-screen text-center'>اطلاعات کاربر :</h1>
          <div className="border border-1 border-red-200 p-10 text-right">            
            <div className="flex flex-row-reverse justify-evenly">
              <h1>: نام کاربر</h1>
              <h1>{userData.username} </h1>
            </div>
            <div className="flex flex-row-reverse justify-evenly">
              <h1>: شناسه کاربری</h1>
              <h1>{userData.id} </h1>
            </div>
            <div className="flex flex-row-reverse justify-evenly">
              <h1>: ایمیل</h1>
              <h1>{userData.email} </h1>
            </div>
            <div className="flex flex-row-reverse justify-evenly">
              <h1>: تاریخ ساخت</h1>
              <>
              <h1>{SQLDateParser(userData.createdAt).time}</h1>
              <h1>{SQLDateParser(userData.createdAt).date}</h1>
              </>
            </div>
          </div>
    </div>
  )
}

export default UserInfo
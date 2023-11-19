import React from "react";

const ChangePassword = ({
  showPassowrdUpdate,
  passwordData,
  setPasswordData,
  changePassword,
}) => {
  return (
    <>
      {showPassowrdUpdate && (
        <form
          className="absolute top-32 right-20 bg-blue-300 p-3 flex flex-col justify-center items-center gap-3"
          onSubmit={changePassword}
        >
          <div className="flex flex-row-reverse">
            <label htmlFor="">کلمه عبور فعلی</label>
            <input
              type="text"
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-row-reverse">
            <label htmlFor="">کلمه عبور جدید</label>
            <input
              type="text"
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-row-reverse">
            <label htmlFor="">کلمه عبور جدید</label>
            <input
              type="text"
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  repeatNewPassword: e.target.value,
                })
              }
            />
          </div>
          <button className="bg-teal-300 text-black p-3 rounded-lg cursor-pointer mb-1 border border-1 border-teal-300   hover:text-teal-600 hover:bg-white hover:border hover:border-1 hover:border-teal-300">
            تغییر کلمه عبور
          </button>
        </form>
      )}
    </>
  );
};

export default ChangePassword;

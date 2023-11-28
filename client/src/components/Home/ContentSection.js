import React from "react";
import AllPosts from "../../components/AllPosts";
const ContentSection = ({ postData }) => {
  return (
    <>
      <aside className="h-full w-full flex flex-col items-center  overflow-auto ">
        {postData.map((record, key) => (
          <AllPosts key={key} props={record} />
        ))}
      </aside>
    </>
  );
};

export default ContentSection;

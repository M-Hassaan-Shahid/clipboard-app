import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.paste);

  useEffect(() => {
    const paste = allPastes.find((p) => p._id === id);
    if (paste) {
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [id, allPastes]);


  return (
    <div className="flex flex-col items-center justify-center mt-7">
      <div className="flex flex-col justify-center gap-4">
        <input
          type="text"
          className="p-2 bg-gray-900 rounded-md border-1 w-[404px]"
       
          value={title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col justify-center items-center mt-5 rounded-md">
        <textarea
          value={value}
          rows={10}
          cols={50}
          disabled
          className="p-2.5 rounded-md border-1 bg-gray-900"
          
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;

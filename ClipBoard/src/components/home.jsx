import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToPaste, UpdateFromPaste } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const AllPastes = useSelector((state) => state.paste.paste);
  const dispatch = useDispatch();
  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      dispatch(UpdateFromPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }
    setTitle("");
    setValue("");
    setSearchParams({});
  }
  useEffect(() => {
    if (pasteId) {
      const paste = AllPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }

    return () => {
      setTitle("");
      setValue("");
    };
  }, [pasteId, AllPastes]);


  return (
    <div className="flex flex-col items-center justify-center mt-7">
      <div className="flex flex-col justify-center gap-4">
        <input
          type="text"
          className="p-2 bg-gray-900 rounded-md border-1 w-[404px]"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="flex mx-auto items-center justify-center rounded-md bg-blue-500 text-sm text-white w-40 h-10"
        >
          {pasteId ? "Update My Paste" : "Create Paste"}
        </button>
      </div>
      <div className="flex flex-col justify-center items-center mt-5 rounded-md">
        <textarea
          value={value}
          rows={10}
          cols={50}
          className="p-2.5 rounded-md border-1 bg-gray-900"
          placeholder="Enter your text here"
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;

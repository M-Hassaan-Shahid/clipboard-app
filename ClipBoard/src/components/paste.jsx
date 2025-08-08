import React from "react";
import { removeFromPaste, UpdateFromPaste } from "../redux/pasteSlice";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
const Paste = () => {
  const pastes = useSelector((state) => state.paste.paste);
  const [searchTerm, setSearchTerm] = React.useState("");
  const filterData = pastes.filter(
    (paste) =>
      paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paste.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center p-4 w-[100%]">
      <div>
        <input
          className="p-2 border w-[600px] rounded-lg mb-4"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        {filterData.length > 0 &&
          filterData.map((paste, idx) => (
            <div
              key={idx}
              className="border border-gray-300 p-4 mb-4 rounded-lg shadow-md w-[100%] md:w-[600px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1200px]"
            >
              <div>
                <h3>{paste.title}</h3>
              </div>
              <div>
                <p>{paste.content}</p>
              </div>
              <div className="flex justify-between mt-4">
                <button>
                  <NavLink to={`/?pasteId=${paste?._id}`}>Edit</NavLink>
                </button>
                <button>
                  <NavLink to={`/paste/${paste?._id}`}>View</NavLink>
                </button>
                <button
                  onClick={() => {
                    dispatch(removeFromPaste(paste?._id));
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success("Content copied to clipboard!");
                  }}
                >
                  Copy
                </button>
                <button
                  onClick={() => {
                    const url = `https://clipboard-app-six.vercel.app/paste/${paste._id}`;
                    navigator.clipboard.writeText(url);
                    toast.success("Shareable link copied to clipboard!");
                  }}
                >
                  Share
                </button>
              </div>
              <div>
                <p>{paste.createdAt}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;

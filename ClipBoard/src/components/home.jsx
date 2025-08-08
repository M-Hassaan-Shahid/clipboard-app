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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg">
              {pasteId ? (
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              ) : (
                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              )}
            </div>
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            {pasteId ? "Edit Paste" : "Create New Paste"}
          </h1>
          <p className="text-gray-300 text-sm sm:text-base px-4">
            {pasteId ? "Update your existing content" : "Share your text with the world"}
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-8">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span>Title</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full p-3 sm:p-4 pl-10 sm:pl-12 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-gray-500/50 text-sm sm:text-base"
                  placeholder="Enter a descriptive title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-200 mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Content</span>
              </label>
              <div className="relative">
                <textarea
                  value={value}
                  rows={window.innerWidth < 640 ? 10 : 15}
                  className="w-full p-3 sm:p-4 pt-10 sm:pt-12 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none hover:border-gray-500/50 font-mono text-xs sm:text-sm leading-relaxed"
                  placeholder="Paste your content here..."
                  onChange={(e) => setValue(e.target.value)}
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <button
                onClick={createPaste}
                className="group relative px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
                disabled={!title.trim() || !value.trim()}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {pasteId ? (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="hidden sm:inline">Update Paste</span>
                      <span className="sm:hidden">Update</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="hidden sm:inline">Create Paste</span>
                      <span className="sm:hidden">Create</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

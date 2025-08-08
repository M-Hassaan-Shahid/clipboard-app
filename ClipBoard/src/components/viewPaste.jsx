import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 sm:py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">View Paste</h1>
          <p className="text-gray-300 text-sm sm:text-base px-4">Read-only view of your saved content</p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-8">
          <div className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full p-3 sm:p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 cursor-not-allowed opacity-75 text-sm sm:text-base"
                value={title}
                disabled
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Content
              </label>
              <textarea
                value={value}
                rows={window.innerWidth < 640 ? 10 : 15}
                disabled
                className="w-full p-3 sm:p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none cursor-not-allowed opacity-75 font-mono text-xs sm:text-sm leading-relaxed"
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Content copied to clipboard!");
                }}
                className="px-4 sm:px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span className="hidden sm:inline">Copy Content</span>
                <span className="sm:hidden">Copy</span>
              </button>
              
              <button
                onClick={() => {
                  const url = `${window.location.origin}/paste/${id}`;
                  navigator.clipboard.writeText(url);
                  toast.success("Shareable link copied to clipboard!");
                }}
                className="px-4 sm:px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="hidden sm:inline">Share Link</span>
                <span className="sm:hidden">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;

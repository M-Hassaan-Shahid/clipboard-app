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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 sm:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">Your Pastes</h1>
          <p className="text-gray-300 text-sm sm:text-base px-4">Manage and organize your saved content</p>
        </div>

        <div className="mb-6 sm:mb-8 flex justify-center">
          <div className="relative w-full max-w-2xl">
            <input
              className="w-full p-3 sm:p-4 pl-10 sm:pl-12 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
              type="search"
              placeholder="Search pastes by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {filterData.length > 0 ? (
            filterData.map((paste, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-4 sm:p-6 hover:bg-white/15 transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 truncate">
                    {paste.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-3 font-mono bg-gray-800/30 p-2 sm:p-3 rounded-lg">
                    {paste.content.length > (window.innerWidth < 640 ? 100 : 150)
                      ? `${paste.content.substring(0, window.innerWidth < 640 ? 100 : 150)}...` 
                      : paste.content
                    }
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 mb-4">
                  <NavLink 
                    to={`/?pasteId=${paste?._id}`}
                    className="px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    <span className="hidden sm:inline">Edit</span>
                    <span className="sm:hidden">Edit</span>
                  </NavLink>
                  
                  <NavLink 
                    to={`/paste/${paste?._id}`}
                    className="px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="hidden sm:inline">View</span>
                    <span className="sm:hidden">View</span>
                  </NavLink>
                  
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Content copied to clipboard!");
                    }}
                    className="px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="hidden sm:inline">Copy</span>
                    <span className="sm:hidden">Copy</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      const url = `https://clipboard-app-six.vercel.app/paste/${paste._id}`;
                      navigator.clipboard.writeText(url);
                      toast.success("Shareable link copied to clipboard!");
                    }}
                    className="px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span className="hidden sm:inline">Share</span>
                    <span className="sm:hidden">Share</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      dispatch(removeFromPaste(paste?._id));
                    }}
                    className="px-3 sm:px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-1 sm:gap-2 col-span-2 sm:col-span-1"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="hidden sm:inline">Delete</span>
                    <span className="sm:hidden">Delete</span>
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs sm:text-sm text-gray-400 pt-4 border-t border-gray-700/50">
                  <span className="truncate">Created: {new Date(paste.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                  <span className="text-xs bg-gray-700/50 px-2 py-1 rounded-full self-start sm:self-auto">
                    {paste.content.length} characters
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-12 max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">No pastes found</h3>
                <p className="text-gray-400 mb-6">
                  {searchTerm ? 'No pastes match your search criteria.' : 'You haven\'t created any pastes yet.'}
                </p>
                <NavLink 
                  to="/"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
                >
                  Create Your First Paste
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;

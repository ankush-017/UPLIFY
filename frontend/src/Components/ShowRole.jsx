import React from 'react'

function ShowRole({ handleRoleSelection }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[200]">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[100%] max-w-lg animate-fade-in-up space-y-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Welcome! 👋</h2>
        <p className="text-gray-500">Let us know who you are to personalize your experience.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => handleRoleSelection("student")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            I'm a Student
          </button>
          <button
            onClick={() => handleRoleSelection("company")}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            I'm a Company
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowRole;
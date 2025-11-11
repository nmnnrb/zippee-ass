import React, { useEffect, useState } from 'react'
import Cards from './Cards';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

function Data() {
    const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [prevError, setPrevError] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

 useEffect(() => {
    authCheck();
  const intervalId = setInterval(authCheck, 60 * 1000);
  return () => clearInterval(intervalId);
}, []);

const authCheck = () => {
    console.log("Auth check running");
  const token = localStorage.getItem('token');
  if (!token){
    navigate("/login");
  }
 console.log("Token found:", token);
  try {
    const decoded = JSON.parse(atob(token));
    console.log("Decoded token:", decoded);
    if(decoded.expiry > Date.now()){
        console.log("Token is valid");
        setAuthenticated(true);
    }else{
        console.log("Token has expired");
        setAuthenticated(false);
        navigate("/login");
    }
  } catch (e) {
    setAuthenticated(false);
    navigate("/login");
  }
};
  const nextF = () => {
    setPage((prevPage) => prevPage + 1);
  }

    const prevF = () => {
      if(page>1){
        setPage((prevPage) => prevPage - 1);
      }else{
        setPrevError(true);
        setInterval(() => {
        setPrevError(false);
          
        },3000)
      }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
    navigate('/login'); } if (!authenticated) { return ( <div className="container mx-auto px-4 py-8"> <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> {Array.from({ length: 10 }).map((_, idx) => ( <div key={idx} className="bg-gray-200 animate-pulse rounded-lg border border-gray-300 shadow overflow-hidden my-4" > <div className="w-full h-48 bg-gray-300" />
          <div className="p-4">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-300 rounded w-full" />
            <div className="h-4 bg-gray-300 rounded w-5/6 mt-1" />
          </div>
        </div>
      ))}

    </div>
    </div>
  );
}


  return (
    
    <div className="min-h-screen bg-linear-to-r from-gray-300 via-cyan-50 to-red-200 flex flex-col">
       <nav className="w-full fixed top-0 left-0 z-10 bg-gradient-to-r from-gray-400 via-pink-200 to-red-400 py-3 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center shadow-sm">
            <span className="text-white font-extrabold">Z</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500">
            Zippee
          </h1>
        </div>

        {/* Search & Logout Section */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {/* Search Box */}
          <div className="flex items-center bg-white/30 rounded-md w-full sm:w-64 md:w-72 p-1">
            <div className="p-2">
              <svg
                className="w-5 h-5 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              id="search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your fav..."
              className="w-full bg-transparent text-gray-900 placeholder-gray-700 outline-none"
            />
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition duration-300 shadow-md"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>


      <main className="flex-1 py-3 px-4 mt-22 mb-15 overflow-y-auto">
        <Cards searchQuery={search} page={page} />
      </main>


   <footer className="fixed bottom-2 left-1/2 -translate-x-1/2 
  w-[90%] max-w-md 
  bg-gradient-to-r from-gray-800/60 via-pink-500/40 to-red-700/60
  backdrop-blur-md border border-white/20 rounded-xl 
  shadow-lg flex justify-between items-center 
  text-white text-lg font-medium px-6 py-3 select-none">
   <p className="absolute -top-4 bg-red-500/80 animate-pulse rounded-md px-3 left-0">{prevError && "You are already on the first page."}</p>
  <button className="px-5 py-2 bg-white/10 hover:cursor-pointer hover:bg-white/20 rounded-lg transition-all duration-300" onClick={prevF}>
    ⬅ Prev
  </button>

<p className="p-[0.5px] h-[30px] bg-gray-200 "></p>
  <button className="px-5 py-2 hover:cursor-pointer bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300" onClick={nextF}>
    Next ➡
  </button>
</footer>

    </div>
  );
}

export default Data;
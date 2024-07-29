import { useEffect, useState, useContext } from "react";

import { SupplyChainContext }  from "../context/SupplyChainContext";
import { Nav1, Nav2 } from "../components/index";

export default () => {
  const [state, setState] = useState(false);
  const {currentUser, connectWallet} = useContext(SupplyChainContext);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-btn") && !e.target.closest(".menu-content")) {
        setState(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-black">Penyaluran Bantuan Sosial</h1>
          </div>
         
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <p className="text-gray-700">{currentUser.slice(0, 42)}</p>
            ) : (
              <button
                onClick={() => connectWallet()}
                className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-700 rounded-full"
              >
                Hubungkan Wallet
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? <Nav1 /> : <Nav2 />}
            </button>
          </div>
        </div>
        {/* {state && (
          <div className="menu-content md:hidden">
            <div className="flex flex-col space-y-4 pb-4">
              {navigation.map((item, idx) => (
                <a
                  key={idx}
                  href={item.path}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {item.title}
                </a>
              ))}
              {currentUser ? (
                <p className="text-gray-700">{currentUser.slice(0, 42)}</p>
              ) : (
                <button
                  onClick={() => connectWallet()}
                  className="px-4 py-2 text-white bg-blue-800 hover:bg-gray-700 rounded-full"
                >
                  Hubungkan Akunnn
                </button>
              )}
            </div>
          </div>
        )} */}
      </div>
    </nav>
  );
}

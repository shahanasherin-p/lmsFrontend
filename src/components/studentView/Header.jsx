import { GraduationCap, TvMinimalPlay } from 'lucide-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { AuthContext } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';



const Header = () => {

    const navigate = useNavigate();
    const { resetCredentials } = useContext(AuthContext);
  

    const handleLogout=()=> {
        resetCredentials();
        sessionStorage.clear();
    }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md">
        <div className="flex items-center space-x-4">
          <Link to="/home" className="flex items-center hover:text-gray-200 transition-colors duration-200">
            <GraduationCap className="h-8 w-8 mr-2" />
            <span className="font-extrabold text-2xl">BRIGHTLEARN</span>
          </Link>
          <Button onClick={()=>navigate("/courses")} variant="ghost" className="text-sm md:text-base font-medium text-white hover:text-black transition-colors duration-200">
            Explore Courses
          </Button>
        </div>
        <div className="flex items-center space-x-6">
          <div onClick={() => navigate("/student-courses")} className="flex items-center cursor-pointer hover:text-gray-200 transition-colors duration-200">
            <span className="font-extrabold text-sm md:text-base">My Courses</span>
            <TvMinimalPlay className="w-8 h-8 ml-2" />
          </div>
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-transform transform hover:scale-105">
            Sign Out
          </Button>
        </div>
      </header>
    </>
  );
};

export default Header;

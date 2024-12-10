import { Button } from '@/components/ui/button';
import { courseCategories } from '@/config';
import { AuthContext } from '@/context/AuthContext';
import { StudentContext } from '@/context/StudentContext';
import { checkCoursePurchaseInfoAPI, fetchStudentViewCourseListAPI } from '@/services/allAPI';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const { studentViewCoursesList, setStudentViewCoursesList } = useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  const handleNavigateToCoursesPage = (getCurrentId) => {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/courses");
  };

  const fetchAllStudentViewCourses = async () => {
    const response = await fetchStudentViewCourseListAPI();
    if (response?.success) setStudentViewCoursesList(response?.data);
  };

  const handleCourseNavigate = async (getCurrentCourseId) => {
    const response = await checkCoursePurchaseInfoAPI(getCurrentCourseId, auth?.user?._id);
    if (response?.success) {
      navigate(response?.data ? `/course-progress/${getCurrentCourseId}` : `/course/details/${getCurrentCourseId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between py-12 px-6 lg:px-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <div className="lg:w-1/2">
          <h1 className="text-5xl font-extrabold leading-tight mb-6">Learning That Gets You</h1>
          <p className="text-lg mb-6">Empower yourself with skills for the present and the future. Start your journey today!</p>
          <Link to={'/courses'}>
            <Button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-lg transform hover:scale-105 transition">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-10">
          <img
            src="https://img.freepik.com/premium-photo/laptop-with-chairs-tablesconcept-online-courses_258219-272.jpg?w=1060"
            alt="Online Courses"
            className="w-full rounded-lg shadow-2xl"
          />
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-12 px-6 lg:px-16 bg-white">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Explore Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {courseCategories.map((categoryItem) => (
            <Button
              key={categoryItem.id}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg shadow-md transition-transform transform hover:scale-105"
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 px-6 lg:px-16 bg-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                key={courseItem?._id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transform hover:scale-105 transition cursor-pointer"
                onClick={() => handleCourseNavigate(courseItem?._id)}
              >
                <img
                  src={courseItem?.image}
                  alt={courseItem?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{courseItem?.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">By {courseItem?.instructorName}</p>
                  <p className="font-bold text-lg text-purple-600">${courseItem?.pricing}</p>
                </div>
              </div>
            ))
          ) : (
            <h3 className="text-gray-700 text-center font-semibold">No Courses Found</h3>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

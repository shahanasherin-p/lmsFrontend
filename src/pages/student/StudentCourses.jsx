import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AuthContext } from '@/context/AuthContext';
import { StudentContext } from '@/context/StudentContext';
import { fetchStudentBoughtCoursesAPI } from '@/services/allAPI';
import { Watch } from 'lucide-react';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentCourses = () => {
  const { auth } = useContext(AuthContext);
  const { studentBoughtCoursesList, setStudentBoughtCoursesList } = useContext(StudentContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentBoughtCourses();
  }, []);


  const fetchStudentBoughtCourses = async () => {
    const response = await fetchStudentBoughtCoursesAPI(auth?.user?.id);
    if (response?.success) {
      setStudentBoughtCoursesList(response?.data);
      
    }
  };


  

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">My Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {studentBoughtCoursesList && studentBoughtCoursesList.length > 0 ? (
          studentBoughtCoursesList.map((course) => (
            <Card
              key={course.id}
              className="flex flex-col border border-gray-200 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition"
            >
              <CardContent className="p-4 flex-grow">
                <img
                  src={course?.courseImage}
                  alt={course?.title}
                  className="h-52 w-full object-cover rounded-md mb-4"
                />
                <h3 className="font-bold text-lg text-gray-900 mb-1">{course?.title}</h3>
                <p className="text-sm text-gray-600">{course?.instructorName}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button
                  onClick={() => navigate(`/course-progress/${course?.courseId}`)}
                  className="w-full flex items-center justify-center bg-purple-600 text-white hover:bg-purple-700 font-medium rounded-md shadow transition"
                >
                  <Watch className="mr-2 h-4 w-4" />
                  Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center">
            <h2 className="text-xl font-bold text-gray-600">No Courses Found</h2>
            <p className="text-gray-500 mt-2">Start exploring and purchasing courses to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCourses;

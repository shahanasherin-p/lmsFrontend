import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config';
import { InstructorContext } from '@/context/InstructorContext';
import { deleteCourseAPI } from '@/services/allAPI';
import { Delete, Edit } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const InstructorCourses = ({ listOfCourses }) => {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  const [deletingCourseId, setDeletingCourseId] = useState(null);
  

  const handleDeleteCourse = async (courseId) => {
    // Confirm deletion
    const confirmDelete = window.confirm('Are you sure you want to delete this course?');
    if (!confirmDelete) return;

    try {
      // Set the course being deleted to show loading state
      setDeletingCourseId(courseId);

      // Call delete API
      await deleteCourseAPI(courseId);

      // Show success notification
      toast.success('Course deleted successfully');


    } catch (error) {
      // Show error notification
      toast.error(error.response?.data?.message || 'Failed to delete course');
      console.error(error);
    } finally {
      // Reset loading state
      setDeletingCourseId(null);
    }
  };



  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <Card className="shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-t-lg">
          <CardTitle className="text-2xl font-extrabold">All Courses</CardTitle>
          <Button
            onClick={() => {
              setCurrentEditedCourseId(null);
              setCourseLandingFormData(courseLandingInitialFormData);
              setCourseCurriculumFormData(courseCurriculumInitialFormData);
              navigate('/instructor/create-new-course');
            }}
            className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white px-5 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Create New Course
          </Button>
        </CardHeader>
        <CardContent className="p-6 bg-gray-50">
          <div className="overflow-x-auto">
            <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="p-4 text-left text-gray-700">Course</TableHead>
                  <TableHead className="p-4 text-left text-gray-700">Students</TableHead>
                  <TableHead className="p-4 text-left text-gray-700">Revenue</TableHead>
                  <TableHead className="p-4 text-right text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listOfCourses && listOfCourses.length > 0 ? (
                  listOfCourses.map((course) => (
                    <TableRow key={course._id} className="hover:bg-gray-100 transition-colors">
                      <TableCell className="p-4 font-medium text-gray-900">{course?.title}</TableCell>
                      <TableCell className="p-4 text-gray-700">{course?.students?.length}</TableCell>
                      <TableCell className="p-4 text-gray-700">${course?.students?.length * course?.pricing}</TableCell>
                      <TableCell className="p-4 text-right">
                        <Button
                          onClick={() => {
                            navigate(`/instructor/edit-course/${course?._id}`);
                          }}
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit className="h-6 w-6" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteCourse(course._id)}
                          variant="ghost"
                          size="sm"
                          disabled={deletingCourseId === course._id}
                          className="text-red-600 hover:text-red-800"
                        >
                          {deletingCourseId === course._id ? (
                            <span className="animate-spin">🔄</span>
                          ) : (
                            <Delete className="h-6 w-6" />
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="4" className="text-center p-4 text-gray-700">
                      No courses available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorCourses;

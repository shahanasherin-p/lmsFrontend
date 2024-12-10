import CourseCurriculum from '@/components/instructorView/courses/addNewCourses/CourseCurriculum'
import CourseLanding from '@/components/instructorView/courses/addNewCourses/CourseLanding'
import CourseSettings from '@/components/instructorView/courses/addNewCourses/CourseSettings'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from '@/config'
import { AuthContext } from '@/context/AuthContext'
import { InstructorContext } from '@/context/InstructorContext'
import { addNewCourseAPI, fetchInstructorCourseDetailsAPI, updateCourseByIdAPI } from '@/services/allAPI'
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddNewCourse = () => {

  const {
    courseLandingFormData,
    courseCurriculumFormData,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
    currentEditedCourseId,
    setCurrentEditedCourseId,
  } = useContext(InstructorContext);

  const { auth } = useContext(AuthContext);
  const navigate =useNavigate()
  const params =useParams()


  useEffect(() => {
    if (currentEditedCourseId !== null) fetchCurrentCourseDetails();
  }, [currentEditedCourseId]);

  useEffect(() => {
    if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
  }, [params?.courseId]);

  // console.log(params, currentEditedCourseId, "params");


   const fetchCurrentCourseDetails=async()=> {
    const response = await fetchInstructorCourseDetailsAPI(
      currentEditedCourseId
    );

    if (response?.success) {
      const setCourseFormData = Object.keys(
        courseLandingInitialFormData
      ).reduce((acc, key) => {
        acc[key] = response?.data[key] || courseLandingInitialFormData[key];

        return acc;
      }, {});

      console.log(setCourseFormData, response?.data, "setCourseFormData");
      setCourseLandingFormData(setCourseFormData);
      setCourseCurriculumFormData(response?.data?.curriculum);
    }

    // console.log(response, "response");
  }

  const isEmpty=(value) =>{
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return value === "" || value === null || value === undefined;
  }


  const validateFormData=() =>{
    for (const key in courseLandingFormData) {
      if (isEmpty(courseLandingFormData[key])) {
        return false;
      }
    }

    let hasFreePreview = false;

    for (const item of courseCurriculumFormData) {
      if (
        isEmpty(item.title) ||
        isEmpty(item.videoUrl) ||
        isEmpty(item.public_id)
      ) {
        return false;
      }

      if (item.freePreview) {
        hasFreePreview = true; 
      }
    }

    return hasFreePreview;
  }

  const handleCreateCourse=async() =>{
    const courseFinalFormData = {
      instructorId: auth?.user?._id,
      instructorName: auth?.user?.userName,
      date: new Date(),
      ...courseLandingFormData,
      students: [],
      curriculum: courseCurriculumFormData,
      isPublised: true,
    };

    const response =
      currentEditedCourseId !== null
        ? await updateCourseByIdAPI(
            currentEditedCourseId,
            courseFinalFormData
          )
        : 
      await addNewCourseAPI(courseFinalFormData);

    if (response?.success) {
      setCourseLandingFormData(courseLandingInitialFormData);
      setCourseCurriculumFormData(courseCurriculumInitialFormData);
      navigate(-1);
      setCurrentEditedCourseId(null);
    }

    console.log(courseFinalFormData, "courseFinalFormData");
  }



  return (
    <>
    <div className="container mx-auto p-4"> 
      <div className="flex justify-between">
            <h1 className="text-3xl font-extrabold mb-5">Create a new course</h1>
            <Button
            disabled={!validateFormData()}
            onClick={handleCreateCourse}
            className="text-sm tracking-wider font-bold px-8">
              SUBMIT
            </Button>
      </div>
      <Card>
        <CardContent>
            <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Add Course Details
                </TabsTrigger>
                <TabsTrigger value="settings">Course Image</TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculum/>               
              </TabsContent>
              <TabsContent value="course-landing-page">  
                <CourseLanding/>            
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettings/>
              </TabsContent>
            </Tabs>
            </div>
        </CardContent>
      </Card>
    </div>
    </>
  )
}

export default AddNewCourse
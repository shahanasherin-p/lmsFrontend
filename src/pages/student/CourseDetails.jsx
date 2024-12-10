import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import VideoPlayer from '@/components/VideoPlayer';
import { AuthContext } from '@/context/AuthContext';
import { StudentContext } from '@/context/StudentContext';
import { createPaymentAPI, fetchStudentViewCourseDetailsAPI } from '@/services/allAPI';
import { CheckCircle, Globe, Lock, PlayCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';

const CourseDetails = () => {

    const [displayCurrentVideoFreePreview, setDisplayCurrentVideoFreePreview] =useState(null)
    const [showFreePreviewDialog, setShowFreePreviewDialog] = useState(false);
    const [approvalUrl, setApprovalUrl] = useState("");


    const {
        studentViewCourseDetails,
        setStudentViewCourseDetails,
        currentCourseDetailsId,
        setCurrentCourseDetailsId,
        loadingState,
        setLoadingState,
    } = useContext(StudentContext);

    const { auth } = useContext(AuthContext);

    const location = useLocation();

    const {id} = useParams();

    useEffect(()=>{
     if (id) setCurrentCourseDetailsId(id);
    },[id])

    useEffect(()=>{
      if (currentCourseDetailsId !== null) fetchStudentViewCourseDetails();
    },[currentCourseDetailsId])

    useEffect(() => {
        if (!location.pathname.includes("course/details"))
          setStudentViewCourseDetails(null),
            setCurrentCourseDetailsId(null),
            setCoursePurchaseId(null);
    }, [location.pathname]);

    useEffect(() => {
        if (displayCurrentVideoFreePreview !== null) setShowFreePreviewDialog(true);
    }, [displayCurrentVideoFreePreview]);
    


    const handleSetFreePreview=(getCurrentVideoInfo) =>{
        console.log(getCurrentVideoInfo);
        setDisplayCurrentVideoFreePreview(getCurrentVideoInfo?.videoUrl);
    }

    const handleCreatePayment=async()=>{
      const paymentPayload = {
        userId: auth?.user?._id,
        userName: auth?.user?.userName,
        userEmail: auth?.user?.userEmail,
        orderStatus: "pending",
        paymentMethod: "paypal",
        paymentStatus: "initiated",
        orderDate: new Date(),
        paymentId: "",
        payerId: "",
        instructorId: studentViewCourseDetails?.instructorId,
        instructorName: studentViewCourseDetails?.instructorName,
        courseImage: studentViewCourseDetails?.image,
        courseTitle: studentViewCourseDetails?.title,
        courseId: studentViewCourseDetails?._id,
        coursePricing: studentViewCourseDetails?.pricing,
      };
  
      console.log(paymentPayload, "paymentPayload");
      const response = await createPaymentAPI(paymentPayload);
  
      if (response.success) {
        sessionStorage.setItem(
          "currentOrderId",
          JSON.stringify(response?.data?.orderId)
        );
        setApprovalUrl(response?.data?.approveUrl);
      }
    }
 

    const fetchStudentViewCourseDetails=async()=>{
        const response = await fetchStudentViewCourseDetailsAPI(currentCourseDetailsId);

        if (response?.success) {
            setStudentViewCourseDetails(response?.data);
            setLoadingState(false);
          } else {
            setStudentViewCourseDetails(null);
            setLoadingState(false);
          }
      
    }

    if (loadingState) return <Skeleton />;

    if (approvalUrl !== "") {
      window.location.href = approvalUrl;
    }

    
    const getIndexOfFreePreviewUrl =
    studentViewCourseDetails !== null
      ? studentViewCourseDetails?.curriculum?.findIndex(
          (item) => item.freePreview
        )
    : -1;


  return (
    <>
      <div className="container mx-auto p-4 mt-20 bg-gray-50">
    <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-8 rounded-t-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">
        {studentViewCourseDetails?.title}
      </h1>
      <p className="text-xl mb-4">{studentViewCourseDetails?.subtitle}</p>
      <div className="flex items-center space-x-4 mt-2 text-sm">
        <span>Created By {studentViewCourseDetails?.instructorName}</span>
        <span>Created On {studentViewCourseDetails?.date.split("T")[0]}</span>
        <span className="flex items-center">
          <Globe className="mr-1 h-4 w-4" />
          {studentViewCourseDetails?.primaryLanguage}
        </span>
        <span>
          {studentViewCourseDetails?.students.length}{" "}
          {studentViewCourseDetails?.students.length <= 1
            ? "Student"
            : "Students"}
        </span>
      </div>
    </div>
    <div className="flex flex-col md:flex-row gap-8 mt-8">
    
    <main className="flex-grow p-6 bg-gray-50">
  <Card className="mb-8 shadow-lg rounded-lg overflow-hidden">
    <CardHeader className="bg-gray-200 p-4 rounded-t-lg">
      <CardTitle className="text-lg font-semibold text-gray-800">
        What you will learn
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 bg-white rounded-b-lg">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studentViewCourseDetails?.objectives
          .split(",")
          .map((objective, index) => (
            <li key={index} className="flex items-start text-gray-700">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />
              <span>{objective.trim()}</span>
            </li>
          ))}
      </ul>
    </CardContent>
  </Card>

  <Card className="mb-8 shadow-lg rounded-lg overflow-hidden">
    <CardHeader className="bg-gray-200 p-4 rounded-t-lg">
      <CardTitle className="text-lg font-semibold text-gray-800">
        Course Description
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 bg-white rounded-b-lg text-gray-700">
      {studentViewCourseDetails?.description}
    </CardContent>
  </Card>

  <Card className="mb-8 shadow-lg rounded-lg overflow-hidden">
    <CardHeader className="bg-gray-200 p-4 rounded-t-lg">
      <CardTitle className="text-lg font-semibold text-gray-800">
        Course Curriculum
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4 bg-white rounded-b-lg">
      <ul>
        {studentViewCourseDetails?.curriculum?.map((curriculumItem, index) => (
          <li
            key={index}
            className={`flex items-center mb-4 ${
              curriculumItem?.freePreview ? "cursor-pointer hover:bg-gray-100" : "cursor-not-allowed opacity-50"
            }`}
            onClick={
              curriculumItem?.freePreview
                ? () => handleSetFreePreview(curriculumItem)
                : null
            }
          >
            {curriculumItem?.freePreview ? (
              <PlayCircle className="mr-2 h-4 w-4 text-blue-500" />
            ) : (
              <Lock className="mr-2 h-4 w-4 text-gray-400" />
            )}
            <span className={`text-gray-700 ${curriculumItem?.freePreview ? "" : "line-through"}`}>
              {curriculumItem?.title}
            </span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
</main>

    
    
    <aside className="w-full md:w-[500px]">
       <Card className="sticky top-4 shadow-lg transition-transform transform hover:scale-105">
       <CardContent className="p-8 bg-white rounded-lg shadow-md">
       <div className="aspect-video mb-6 rounded-lg overflow-hidden flex items-center justify-center bg-gray-200">
        <VideoPlayer
          url={
            getIndexOfFreePreviewUrl !== -1
              ? studentViewCourseDetails?.curriculum[
                  getIndexOfFreePreviewUrl
                ].videoUrl
              : ""
          }
          width="450px"
          height="200px"
        />
       </div>
        <div className="mb-4 text-center">
        <span className="text-4xl font-bold text-gray-800">
          ${studentViewCourseDetails?.pricing}
        </span>
        </div>
      <Button onClick={handleCreatePayment} className="w-full bg-green-600 text-white hover:bg-green-700 transition duration-200 ease-in-out rounded-lg shadow-lg transform hover:scale-105">
        Buy Now
      </Button>
      </CardContent>
      </Card>
    </aside>

    </div>
    <Dialog
      open={showFreePreviewDialog}
      onOpenChange={() => {
        setShowFreePreviewDialog(false);
        setDisplayCurrentVideoFreePreview(null);
      }}
    >
      <DialogContent className="w-[800px] shadow-lg">
        <DialogHeader className="bg-gray-200 p-4 rounded-t-lg">
          <DialogTitle className="text-lg font-semibold">
            Course Preview
          </DialogTitle>
        </DialogHeader>
        <div className="aspect-video mb-4 rounded-lg flex items-center justify-center bg-black">
          <VideoPlayer
            url={displayCurrentVideoFreePreview}
            width="450px"
            height="200px"
          />
        </div>
        <div className="flex flex-col gap-2">
          {studentViewCourseDetails?.curriculum
            ?.filter((item) => item.freePreview)
            .map((filteredItem) => (
              <p
                onClick={() => handleSetFreePreview(filteredItem)}
                className="cursor-pointer text-[16px] font-medium"
              >
                {filteredItem?.title}
              </p>
            ))}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="bg-gray-300 hover:bg-gray-400 text-black transition duration-150 ease-in-out"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      </Dialog>
    </div>
 </>

  )
}

export default CourseDetails
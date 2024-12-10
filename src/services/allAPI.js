import axiosInstance from "./commonAPI";



export const registerAPI=async(formData)=>{
    const {data} = await axiosInstance.post('/auth/register',{...formData});
    return data
}




export const loginAPI=async(formData)=>{
    const {data} = await axiosInstance.post('/auth/login',{...formData,role:'user'});
    return data
}

export const checkAuthAPI=async()=> {
    const { data } = await axiosInstance.get("/auth/check-auth");
  
    return data;
}

export const mediaUploadAPI=async(formData,onProgressCallback)=> {
    const { data } = await axiosInstance.post("/media/upload",formData,
        {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgressCallback(percentCompleted);
            },
          });
    
  
    return data;
}

export const mediaDeleteAPI=async(id) =>{
    const { data } = await axiosInstance.delete(`/media/delete/${id}`);
  
    return data;
}

// export const fetchInstructorCourseListAPI=async() =>{
//   const { data } = await axiosInstance.get(`/instructor/course/get`);

//   return data;
// }

export const fetchInstructorCourseListAPI = async () => {
  const token = sessionStorage.getItem("accessToken"); // Use the correct key

  if (!token) {
    throw new Error("Token is missing. User might not be logged in.");
  }

  try {
    const { data } = await axiosInstance.get(`/instructor/course/get`, {
      headers: {
        Authorization: `Bearer ${token}`, // Explicitly add the token to the request
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching instructor courses:", error);
    throw error;
  }
};


export  const addNewCourseAPI=async(formData)=> {
  const { data } = await axiosInstance.post(`/instructor/course/add`, formData);

  return data;
}

export const deleteCourseAPI = async (courseId) => {
  try {
    const { data } = await axiosInstance.delete(`/instructor/course/${courseId}`);
    return data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

export  const fetchInstructorCourseDetailsAPI=async(id) =>{
  const { data } = await axiosInstance.get(
    `/instructor/course/get/details/${id}`
  );

  return data;
}

export const updateCourseByIdAPI=async(id, formData)=> {
  const { data } = await axiosInstance.put(
    `/instructor/course/update/${id}`,
    formData
  );

  return data;
}


export const mediaBulkUploadAPI=async(formData, onProgressCallback)=> {
  const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

export const fetchStudentViewCourseListAPI=async(query)=> {
  const { data } = await axiosInstance.get(`/student/course/get?${query}`);

  return data;
}

export const fetchStudentViewCourseDetailsAPI=async(courseId)=> {
  const { data } = await axiosInstance.get(`/student/course/get/details/${courseId}`);

  return data;
}

export const createPaymentAPI=async(formData)=> {
  const { data } = await axiosInstance.post(`/student/order/create`, formData);

  return data;
}

export const captureAndFinalizePaymentAPI=async(
  paymentId,
  payerId,
  orderId
)=> {
  const { data } = await axiosInstance.post(`/student/order/capture`, {
    paymentId,
    payerId,
    orderId,
  });

  return data;
}

export const  checkCoursePurchaseInfoAPI=async(courseId, studentId)=> {
  const { data } = await axiosInstance.get(
    `/student/course/purchase-info/${courseId}/${studentId}`
  );

  return data;
}

export const fetchStudentBoughtCoursesAPI=async(studentId)=> {
  const { data } = await axiosInstance.get(
    `/student/courses-bought/get/${studentId}`
  );

  return data;
}

export const getCurrentCourseProgressAPI=async(userId, courseId)=> {
  const { data } = await axiosInstance.get(
    `/student/course-progress/get/${userId}/${courseId}`
  );

  return data;
}

export const  markLectureAsViewedAPI=async(userId, courseId, lectureId)=> {
  const { data } = await axiosInstance.post(
    `/student/course-progress/mark-lecture-viewed`,
    {
      userId,
      courseId,
      lectureId,
    }
  );

  return data;
}

export const resetCourseProgressAPI=async(userId, courseId)=> {
  const { data } = await axiosInstance.post(
    `/student/course-progress/reset-progress`,
    {
      userId,
      courseId,
    }
  );

  return data;
}
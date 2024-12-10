import MediaProgressBar from '@/components/MediaProgressBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InstructorContext } from '@/context/InstructorContext';
import { mediaUploadAPI } from '@/services/allAPI';
import React, { useContext } from 'react';

const CourseSettings = () => {
  const {
    courseLandingFormData, setCourseLandingFormData,
    mediaUploadProgress, setMediaUploadProgress,
    mediaUploadProgressPercentage, setMediaUploadProgressPercentage
  } = useContext(InstructorContext);

  const handleImageUploadChange = async (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      const imageFormData = new FormData();
      imageFormData.append("file", selectedImage);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadAPI(
          imageFormData,
          (percentCompleted) => setMediaUploadProgressPercentage(percentCompleted)
        );
        if (response.success) {
          setCourseLandingFormData({
            ...courseLandingFormData,
            image: response.data.url,
          });
          setMediaUploadProgress(false);
        }
      } catch (e) {
        console.log(e);
        setMediaUploadProgress(false);
      }
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-8 shadow-lg ">
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg ">
        <CardTitle className="text-lg font-bold">Course Settings</CardTitle>
      </CardHeader>
      {mediaUploadProgress && (
        <div className="p-4">
          <MediaProgressBar
            isMediaUploading={mediaUploadProgress}
            progress={mediaUploadProgressPercentage}
            className="mb-4"
          />
        </div>
      )}
      <CardContent className="p-4">
        {courseLandingFormData?.image ? (
          <div className="flex flex-col gap-3 items-center">
            <img
              src={courseLandingFormData.image}
              alt="Course"
              className="mb-4 rounded shadow-md max-w-full"
            />
            <Label className="text-gray-700 font-medium">Change Course Image</Label>
            <Input
              onChange={handleImageUploadChange}
              type="file"
              accept="image/*"
              className="mt-2 p-2 border rounded"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Label className="text-gray-700 font-medium">Upload Course Image</Label>
            <Input
              onChange={handleImageUploadChange}
              type="file"
              accept="image/*"
              className="mt-2 p-2 border rounded"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseSettings;

import MediaProgressBar from '@/components/MediaProgressBar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import VideoPlayer from '@/components/VideoPlayer'
import { courseCurriculumInitialFormData } from '@/config'
import { InstructorContext } from '@/context/InstructorContext'
import { mediaBulkUploadAPI, mediaDeleteAPI, mediaUploadAPI } from '@/services/allAPI'
import { Label } from '@radix-ui/react-label'
import { Upload } from 'lucide-react'
import React, { useContext, useRef } from 'react'

const CourseCurriculum = () => {
    const {courseCurriculumFormData, setCourseCurriculumFormData,
    mediaUploadProgress, setMediaUploadProgress,
    mediaUploadProgressPercentage, setMediaUploadProgressPercentage}=useContext(InstructorContext)
    
    const bulkUploadInputRef = useRef(null);


    const handleNewLecture=()=>{
        setCourseCurriculumFormData([
            ...courseCurriculumFormData,
            {
              ...courseCurriculumInitialFormData[0],
            },
          ]);
    }

    const handleCourseTitleChange=(e,currentIndex)=>{
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      title: e.target.value,
    };
    console.log(cpyCourseCurriculumFormData,"cpyCourseCurriculumFormData")
    setCourseCurriculumFormData(cpyCourseCurriculumFormData);

    }

    const handleFreePreviewChange=(currentValue, currentIndex)=>{
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        cpyCourseCurriculumFormData[currentIndex] = {
      ...cpyCourseCurriculumFormData[currentIndex],
      freePreview: currentValue,
    };

    setCourseCurriculumFormData(cpyCourseCurriculumFormData);
    }

    const handleSingleLectureUpload=async(e,currentIndex)=>{
        const selectedFile = e.target.files[0];

    if (selectedFile) {
      const videoFormData = new FormData();
      videoFormData.append("file", selectedFile);

      try {
        setMediaUploadProgress(true);
        const response = await mediaUploadAPI(
          videoFormData,setMediaUploadProgressPercentage
        );
        if (response.success) {
          let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: response?.data?.url,
            public_id: response?.data?.public_id,
          };
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
          setMediaUploadProgress(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    }

    const isCourseCurriculumFormDataValid=()=> {
        return courseCurriculumFormData .every((item) => {
          return (
            item &&
            typeof item === "object" &&
            item.title.trim() !== "" &&
            item.videoUrl.trim() !== ""
          );
        });
    }

    const handleOpenBulkUploadDialog=()=> {
      bulkUploadInputRef.current?.click();
    }

    const areAllCourseCurriculumFormDataObjectsEmpty=(arr)=> {
      return arr.every((obj) => {
        return Object.entries(obj).every(([key, value]) => {
          if (typeof value === "boolean") {
            return true;
          }
          return value === "";
        });
      });
    }

    const handleReplaceVideo=async(currentIndex)=> {
        let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
        const getCurrentVideoPublicId =
          cpyCourseCurriculumFormData[currentIndex].public_id;
    
        const deleteCurrentMediaResponse = await mediaDeleteAPI(
          getCurrentVideoPublicId
        );
    
        if (deleteCurrentMediaResponse?.success) {
          cpyCourseCurriculumFormData[currentIndex] = {
            ...cpyCourseCurriculumFormData[currentIndex],
            videoUrl: "",
            public_id: "",
          };
    
          setCourseCurriculumFormData(cpyCourseCurriculumFormData);
        }
    }

    const handleMediaBulkUpload=async(event) =>{
      const selectedFiles = Array.from(event.target.files);
      const bulkFormData = new FormData();
  
      selectedFiles.forEach((fileItem) => bulkFormData.append("files", fileItem));
  
      try {
        setMediaUploadProgress(true);
        const response = await mediaBulkUploadAPI(
          bulkFormData,
          setMediaUploadProgressPercentage
        );
  
        console.log(response, "bulk");
        if (response?.success) {
          let cpyCourseCurriculumFormdata =
            areAllCourseCurriculumFormDataObjectsEmpty(courseCurriculumFormData)
              ? []
              : [...courseCurriculumFormData];
  
          cpyCourseCurriculumFormdata = [
            ...cpyCourseCurriculumFormdata,
            ...response?.data.map((item, index) => ({
              videoUrl: item?.url,
              public_id: item?.public_id,
              title: `Lecture ${
                cpyCourseCurriculumFormdata.length + (index + 1)
              }`,
              freePreview: false,
            })),
          ];
          setCourseCurriculumFormData(cpyCourseCurriculumFormdata);
          setMediaUploadProgress(false);
        }
      } catch (e) {
        console.log(e);
      }
    }

    const handleDeleteLecture=async(currentIndex)=> {
      let cpyCourseCurriculumFormData = [...courseCurriculumFormData];
      const getCurrentSelectedVideoPublicId =
        cpyCourseCurriculumFormData[currentIndex].public_id;
  
      const response = await mediaDeleteAPI(getCurrentSelectedVideoPublicId);
  
      if (response?.success) {
        cpyCourseCurriculumFormData = cpyCourseCurriculumFormData.filter(
          (_, index) => index !== currentIndex
        );
  
        setCourseCurriculumFormData(cpyCourseCurriculumFormData);
      }
    }
    
    // console.log(courseCurriculumFormData) 
  return (
    <>
    <Card className="shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="flex flex-row justify-between items-center p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
            <CardTitle className="text-xl font-semibold">Create Course Curriculum</CardTitle>
            <div>
                <Input
                    type="file"
                    ref={bulkUploadInputRef}
                    accept="video/*"
                    multiple
                    className="hidden"
                    id="bulk-media-upload"
                    onChange={handleMediaBulkUpload}
                />
                <Button
                    as="label"
                    htmlFor="bulk-media-upload"
                    variant="outline"
                    className="cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-200 transition duration-150 ease-in-out"
                    onClick={handleOpenBulkUploadDialog}
                >
                    <Upload className="w-4 h-5 mr-2" />
                    Bulk Upload
                </Button>
            </div>
        </CardHeader>
        <CardContent className="p-4">
            <Button 
                disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress} 
                onClick={handleNewLecture} 
                className="mb-4 bg-blue-600 text-white hover:bg-blue-700 transition duration-150 ease-in-out"
            >
                Add Lecture
            </Button>
            {mediaUploadProgress && (
                <MediaProgressBar
                    isMediaUploading={mediaUploadProgress}
                    progress={mediaUploadProgressPercentage}
                />
            )}
            <div className="mt-4 space-y-4">
                {courseCurriculumFormData.map((curriculumItem, index) => (
                    <div key={index} className="border p-5 rounded-md bg-white shadow-sm hover:shadow-md transition duration-150 ease-in-out">
                        <div className="flex gap-5 items-center">
                            <h3 className="font-semibold text-lg">Lecture {index + 1}</h3>
                            <Input
                                name={`title-${index + 1}`}
                                placeholder="Enter lecture title"
                                className="max-w-xs border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                onChange={(e) => handleCourseTitleChange(e, index)}
                                value={courseCurriculumFormData[index]?.title}
                            />
                            <div className="flex items-center space-x-2">
                                <Switch
                                    onCheckedChange={(value) => handleFreePreviewChange(value, index)}
                                    checked={courseCurriculumFormData[index]?.freePreview}
                                    id={`freePreview-${index + 1}`}
                                />
                                <Label htmlFor={`freePreview-${index + 1}`} className="text-sm">Free Preview</Label>
                            </div>
                        </div>
                        <div className="mt-6">
                            {courseCurriculumFormData[index]?.videoUrl ? (
                                <div className="flex gap-3 items-center">
                                    <VideoPlayer
                                        url={courseCurriculumFormData[index]?.videoUrl}
                                        width="450px"
                                        height="200px"
                                    />
                                    <Button
                                        onClick={() => handleReplaceVideo(index)}
                                        className="bg-yellow-500 text-white hover:bg-yellow-600 transition duration-150 ease-in-out"
                                    >
                                        Replace Video
                                    </Button>
                                    <Button
                                        onClick={() => handleDeleteLecture(index)}
                                        className="bg-red-600 text-white hover:bg-red-700 transition duration-150 ease-in-out"
                                    >
                                        Delete Lecture
                                    </Button>
                                </div>
                            ) : (
                                <Input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => handleSingleLectureUpload(e, index)}
                                    className="mb-4 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
</>

  )
}

export default CourseCurriculum
import FormControls from '@/components/common-form/FormControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { courseLandingPageFormControls } from '@/config';
import { InstructorContext } from '@/context/InstructorContext';
import React, { useContext } from 'react';

const CourseLanding = () => {
  const { courseLandingFormData, setCourseLandingFormData } = useContext(InstructorContext);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6">
      <Card className="shadow-xl rounded-lg overflow-hidden border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Add Course Details</CardTitle>
        </CardHeader>
        <CardContent className="p-8 bg-white">
          <FormControls
            formControls={courseLandingPageFormControls}
            formData={courseLandingFormData}
            setFormData={setCourseLandingFormData}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseLanding;

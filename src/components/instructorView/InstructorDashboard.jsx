import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Users } from "lucide-react";

const InstructorDashboard = ({ listOfCourses }) => {
  const calculateTotalStudentsAndProfit = () => {
    const result = listOfCourses.reduce(
      (acc, course) => {
        const studentCount = course.students.length;
        acc.totalProfit += course.pricing * studentCount;

        course.students.forEach((student) => {
          const uniqueStudentKey = student.studentEmail; // For unique students
          const uniqueCourseKey = `${student.studentEmail}-${course.title}`; // For unique course-student combination

          // Track unique students for total count
          acc.studentSet.add(uniqueStudentKey);

          // Track unique course purchases per student
          if (!acc.uniqueStudentCourses.has(uniqueCourseKey)) {
            acc.uniqueStudentCourses.add(uniqueCourseKey);
            acc.studentList.push({
              courseTitle: course.title,
              studentName: student.studentName,
              studentEmail: student.studentEmail,
            });
          }
        });

        return acc;
      },
      {
        totalProfit: 0,
        uniqueStudentCourses: new Set(), // Ensure unique student-course combinations
        studentSet: new Set(), // Ensure unique students
        studentList: [],
      }
    );

    return {
      totalProfit: result.totalProfit,
      totalStudents: result.studentSet.size, // Unique student count
      studentList: result.studentList, // Unique student-course combinations
    };
  };

  const calculatedData = calculateTotalStudentsAndProfit();

  const config = [
    {
      icon: Users,
      label: "Total Students",
      value: calculatedData.totalStudents,
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: calculatedData.totalProfit,
    },
  ];

  return (
    <>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {config.map((item, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.label}
                </CardTitle>
                <item.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{item.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Students List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Student Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calculatedData.studentList.map((studentItem, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {studentItem.courseTitle}
                      </TableCell>
                      <TableCell>{studentItem.studentName}</TableCell>
                      <TableCell>{studentItem.studentEmail}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InstructorDashboard;

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { filterOptions, sortOptions } from '@/config'
import { AuthContext } from '@/context/AuthContext'
import { StudentContext } from '@/context/StudentContext'
import { checkCoursePurchaseInfoAPI, fetchStudentViewCourseListAPI } from '@/services/allAPI'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Courses = () => {
    const [sort, setSort] = useState("price-lowtohigh");
    const [filters, setFilters] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const {studentViewCoursesList,setStudentViewCoursesList,loadingState, setLoadingState }=useContext(StudentContext)
    const navigate=useNavigate()
    const {auth}=useContext(AuthContext)  

    useEffect(() => {
      const buildQueryStringForFilters = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(buildQueryStringForFilters));
    }, [filters]);
            
      
    useEffect(() => {
        setSort("price-lowtohigh");
        setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
      }, []);

    useEffect(() => {
        if (filters !== null && sort !== null)
          fetchAllStudentViewCourses(filters, sort);
    }, [filters, sort]);

    useEffect(() => {
        return () => {
          sessionStorage.removeItem("filters");
        };
    }, []);


    const createSearchParamsHelper=(filterParams)=> {
        const queryParams = [];
      
        for (const [key, value] of Object.entries(filterParams)) {
          if (Array.isArray(value) && value.length > 0) {
            const paramValue = value.join(",");
      
            queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
          }
        }
      
        return queryParams.join("&");
    }

    
    const fetchAllStudentViewCourses=async(filters, sort)=> {
        const query = new URLSearchParams({
          ...filters,
          sortBy: sort,
        });
        const response = await fetchStudentViewCourseListAPI(query);
        if (response?.success) {
          setStudentViewCoursesList(response?.data);
          setLoadingState(false);
        }
    }

    const handleFilterOnChange=(getSectionId, getCurrentOption)=> {
        let cpyFilters = { ...filters };
        const indexOfCurrentSeection =
          Object.keys(cpyFilters).indexOf(getSectionId);
    
        console.log(indexOfCurrentSeection, getSectionId);
        if (indexOfCurrentSeection === -1) {
          cpyFilters = {
            ...cpyFilters,
            [getSectionId]: [getCurrentOption.id],
          };
    
          console.log(cpyFilters);
        } else {
          const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
            getCurrentOption.id
          );
    
          if (indexOfCurrentOption === -1)
            cpyFilters[getSectionId].push(getCurrentOption.id);
          else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        }
    
        setFilters(cpyFilters);
        sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
    }

    const handleCourseNavigate=async(getCurrentCourseId)=> {
      const response = await checkCoursePurchaseInfoAPI(
        getCurrentCourseId,
        auth?.user?._id
      );
  
      if (response?.success) {
        if (response?.data) {
          navigate(`/course-progress/${getCurrentCourseId}`);
        } else {
          navigate(`/course/details/${getCurrentCourseId}`);
        }
      }
    }
    
    console.log(filters)
    

  return (
    <>
      <div className="container mx-auto p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-center">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 space-y-6 bg-white p-6 rounded-lg shadow-lg">
      {Object.keys(filterOptions).map((keyItem) => (
        <div key={keyItem}>
          <h3 className="font-bold text-lg mb-4">{keyItem.toUpperCase()}</h3>
          <div className="space-y-2">
            {filterOptions[keyItem].map((option) => (
              <Label key={option.id} className="flex items-center gap-3">
                <Checkbox
                        checked={
                          filters &&
                          Object.keys(filters).length > 0 &&
                          filters[keyItem] &&
                          filters[keyItem].indexOf(option.id) > -1
                        }
                        onCheckedChange={() =>
                          handleFilterOnChange(keyItem, option)
                        }
                      />
                {option.label}
              </Label>
            ))}
          </div>
        </div>
      ))}
      </aside>
      <main className="flex-1">
      <div className="flex justify-end items-center mb-6 gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 border-gray-300 hover:bg-gray-100 transition duration-150 ease-in-out"
            >
              <ArrowUpDownIcon className="h-4 w-4" />
              <span className="text-base font-medium">Sort By</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value)}>
              {sortOptions.map((sortItem) => (
                <DropdownMenuRadioItem key={sortItem.id} value={sortItem.id}>
                  {sortItem.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <span className="text-base text-gray-700 font-semibold">{studentViewCoursesList.length} Results</span>
      </div>
      <div className="space-y-6">
        {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
          studentViewCoursesList.map((courseItem) => (
            <Card
              key={courseItem?._id}
              className="cursor-pointer border rounded-lg shadow-lg bg-white hover:shadow-xl transition-transform transform hover:scale-105"
              onClick={() => handleCourseNavigate(courseItem?._id)}
            >
              <CardContent className="flex gap-6 p-6">
                <div className="w-48 h-32 flex-shrink-0">
                  <img src={courseItem?.image} className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl font-semibold mb-2">
                    {courseItem?.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mb-1">
                    Created By <span className="font-bold">{courseItem?.instructorName}</span>
                  </p>
                  <p className="text-base text-gray-600 mb-2">
                    {`${courseItem?.curriculum?.length} ${
                      courseItem?.curriculum?.length <= 1 ? "Lecture" : "Lectures"
                    } - ${courseItem?.level.toUpperCase()} Level`}
                  </p>
                  <p className="font-bold text-lg">${courseItem?.pricing}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : loadingState ? (
            <Skeleton />
          ) : (
          <h1 className="text-center font-extrabold text-3xl">No Courses Found</h1>
        )}
      </div>
    </main>
  </div>
</div>

    </>
  )
}

export default Courses
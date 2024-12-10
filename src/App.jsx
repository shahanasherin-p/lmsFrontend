import { Route, Routes } from 'react-router-dom'
import './App.css'
import Auth from './pages/Auth'
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import RouteGuard from './components/RouteGuard';
import Instructor from './pages/Instructor/Index';
import Student from './pages/student/Home';
import CommomLayout from './components/studentView/CommomLayout';
import Pnf from './pages/Pnf';
import AddNewCourse from './pages/Instructor/AddNewCourse';
import Courses from './pages/student/Courses';
import CourseDetails from './pages/student/CourseDetails';
import StudentCourses from './pages/student/StudentCourses';
import PaymentReturn from './pages/student/PaymentReturn';
import CourseProgress from './pages/student/CourseProgress';
import LandingPage from './components/LandingPage';

function App() {
  const { auth } = useContext(AuthContext);
  return (
    <>
      <Routes>
        
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<Auth />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<Instructor />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCourse />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

        <Route
          path="/instructor/edit-course/:courseId"
          element={
            <RouteGuard
              element={<AddNewCourse/>}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />
          }
        />
      <Route
        path="/"
        element={
          <RouteGuard
            element={<CommomLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >

        <Route path="" element={<Student />} />
        <Route path="home" element={<Student />} />
        <Route path="courses" element={<Courses />} />
        <Route path="course/details/:id" element={<CourseDetails />} />
        <Route path="payment-return" element={<PaymentReturn />} />
        <Route path="student-courses" element={<StudentCourses />} />
        <Route path="course-progress/:id" element={<CourseProgress />}/>

      </Route>

      <Route path="*" element={<Pnf />} />
      </Routes>
    </>
  )
}

export default App

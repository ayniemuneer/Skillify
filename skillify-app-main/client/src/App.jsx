import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import NavBar from "./components/student/NavBar";
import CourseAbout from "./pages/student/CourseAbout";
import Certificate from "./components/student/Certificate";
import MyCourses from "./components/educator/MyCourses";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";

const App = () => {

  const isEducatorRoute = useMatch('/educator/*')
const isCertificateRoute = useMatch('/courses/certificates/:id');

  return (
    <div className="text-default min-h-screen bg-white">
      {(!isEducatorRoute && !isCertificateRoute) && <NavBar/>}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/course-list' element={<CoursesList />}/>
        <Route path='/course-list/:input' element={<CoursesList />}/>
        <Route path='/course/:id' element={<CourseDetails />}/>
        <Route path='/course/coursedetails/:id' element={<CourseAbout />}/>
        <Route path='/my-enrollments' element={<MyEnrollments />}/>
        <Route path='/courses/certificates/:id' element={<Certificate />}/>
        <Route path='/player/:courseId' element={<Player />}/>
        <Route path='/loading/:path' element={<Loading />}/>
        <Route path='/educator' element = {<Educator/>}>
          <Route path='/educator' element={<Dashboard />}/>
          <Route path='/educator/my-courses' element={<MyCourses />}/>
        </Route>
      </Routes>
      <ToastContainer closeOnClick/>
    </div>
  )
}
export default App;
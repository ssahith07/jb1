import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import Shome from '../Pages/Shome'
import PostJob from "../Pages/PostJob";
import Signup from "../components/signup/Signup";
import Login from "../components/login/Login";
import MyJobs from "../Pages/MyJobs";
import EditJob from "../Pages/EditJob";
import JobDetails from "../Pages/JobDetails";
import About from "../Pages/About";
// import Passage from "../components/Passage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "/", element: <Passage /> },
      { path: "/", element: <Home/> },
      { path: "/S-home", element: <Shome/> },
      { path: "/sign-up", element: <Signup /> },
      { path: "/about", element: <About /> },
      { path: "/login", element: <Login /> },
      { path: "/post-job", element: <PostJob /> },
      { path: "/my-job", element: <MyJobs /> },
      { path: "edit-job/:id", 
      element: <EditJob />,
      loader:({params})=>fetch(`http://localhost:5000/all-jobs/${params.id}`) },
      {path: "job-details/:id",
      element: <JobDetails/>,
      }
    ],
  },
]);

export default routes;



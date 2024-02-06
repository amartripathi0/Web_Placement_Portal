import { Provider, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom'
import { store } from './redux/store';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;
function App() {


  return (
    <div className=' h-screen w-screen '>
      <ToastContainer
      bodyClassName={'text-[1vw] max-sm:text-sm'}     
      autoClose = {5000}
      style={{top:"9%" , 
     
      
      }
      
    }
      />
      <Provider store={store}>

      <Outlet/>

      </Provider>
    </div>

  )
}
// export const AppRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [{
//       path: "/",
//       element: <Home />
//     },
//     {
//       path: "/about",
//       element: <About />
//     },
//     {
//       path: "/page",
//       element: <Page />
//     },
//     {
//       path: "/contact",
//       element: <Contact />
//     },
//     {
//       path: "/support",
//       element: <Support />
//     },
//     {
//       path: "/signup",
//       element: <MainSignUp/>
//     },
//     {
//       path: "/login",
//       element: <MainLogin/>
//     },
//     {
//       path: "/signup/student",
//       element: <SignUpStudent/>
//     },
//     {
//       path: "/student",
//       element: <StudentDashboard/>,
//       children : [
//         {
//           path: "/student/profile",
//           element: <StudentProfile/>
//         },
//         {
//           path: "/student/academicDetails",
//           element: <AcademicDetail/>
//         },
//         {
//           path: "/student/resume",
//           element: <Resume/>
//         },
//         {
//           path: "/student/interview",
//           element: <Interview/>
//         },
//         {
//           path: "/student/changePassword",
//           element: <ChangePassword/>
//         },
//       ]
//     },
    
//     ]
//   }
// ])
export default App;


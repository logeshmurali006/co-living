import './App.scss';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Pages
import Login from './pages/login';
import Home from './pages/home';
import Notification from './pages/notification';
import PostDetails from './pages/post-detials';
import Profile from './pages/profile';
import CreatePost from './pages/CreatePost/create-post';
import { createContext, useState } from 'react';


// Import toastify css file
import "react-toastify/dist/ReactToastify.css";


// Importing toastify module
import { toast } from "react-toastify";
import Loader from './components/loader';

toast.configure();
export const ColivingContext = createContext({});

const router = createBrowserRouter([
  {
    path: "/",
    element:  <Login />,
  },
  {
    path: "/home",
    element:  <Home />,
  },
  {
    path: "/notification",
    element:  <Notification />,
  },
  {
    path: "/profile",
    element:  <Profile />,
  },
  {
    path: "/create-post",
    element:  <CreatePost />,
  },
  {
    path: "/post-details/:postId",
    element:  <PostDetails />,
  }, 
]);

function App() {



  const [colivingContext, setColivingContext] = useState({});
  return (
    <ColivingContext.Provider value={{colivingContext, setColivingContext}}>
    <div className="App">
       <RouterProvider router={router} />
    </div>
    </ColivingContext.Provider>
  );
}

export default App;

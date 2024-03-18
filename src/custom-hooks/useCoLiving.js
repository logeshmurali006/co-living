
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

// Importing toastify module
import { toast } from "react-toastify";

const useCoLiving = () => {

const apiUrl = "https://colive-comcast.netlify.app";


const [locationList, setLocationList] = useState([]);
const [myPost, setMyPost] = useState([]);
const [myRequest, setMyRequest] = useState([]);

const [loader, setLoader] = useState(false);

const [currentUserDetail, setCurrentUserDetails] = useState({});  

const [searchResults, setSearchResults] = useState([]);





    const navigate = useNavigate();

    const authenticateUser = (payload) =>  {
       const apiPath = `${apiUrl}/user/login`;
       setLoader(true);
       axios.post(apiPath, payload)
       .then(data => {
           if(data) {
               sessionStorage.setItem('userDetails', JSON.stringify(data));
               toast.success('User Logged in Successfully');
               navigate('/home');
           }
           setLoader(false);
       })
       .catch(error => {
           setLoader(false);
           console.error('Error:', error)
           if(!error.success) {
             toast.error("Please check your Comcast ID (or) Password");
           }
        })
    }

    const getNotifications = () => {
        const {data: {user}} = getUserDetails();
        const apiPath = `${apiUrl}/profile/getNotifications`; 
        return axios.post(apiPath, { comcastId: user.comcastId});
    }
 
    const getUserDetails = () => {
        if(sessionStorage.getItem('userDetails')){
            const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
            const {data: {user}} = userDetails;
            setCurrentUserDetails(user)
            return userDetails;
        }
    }

    const getLocationsList = () => {
        const apiPath = `${apiUrl}/results/getLocations`; 
        axios.get(apiPath)
            .then(response => {
                // console.log(response.data.locations,"-----response------");
                setLocationList(response.data.locations);
                // console.log(response.data.locations.filter(loc => loc.locationName === location),"------------->>>>>>");
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
        });
    }


    const getMyPost = () => {
        setLoader(true);
        const apiPath = `${apiUrl}/profile/getYourPosts`; 
        const {data: {user}} = getUserDetails();
        axios.post(apiPath, { comcastId: user.comcastId })
            .then(response => {
                setMyPost(response.data.posts);
                setLoader(false);
            })
            .catch(error => {
                setLoader(false);
                console.error('Error fetching data: ', error);
        });
    }

    const getMyRequest = () => {
        setLoader(true);
        const apiPath = `${apiUrl}/profile/getYourRequests`; 
        const {data: {user}} = getUserDetails();
        axios.post(apiPath, { comcastId: user.comcastId })
            .then(response => {
                setMyRequest(response.data.posts);
                setLoader(false);
            })
            .catch(error => {
                setLoader(false);
                console.error('Error fetching data: ', error);
        });
    }

    const getSearchResults = (payload) => {
        setLoader(true);
        const apiPath = `${apiUrl}/results/getResults`; 
        const {data: {user}} = getUserDetails();

        const userGender = user.gender;

        const apiPayload = {
            ...user, userGender, ...payload
            // userName: "Keerthi Ashok",
            // comcastId: "222222",
            // userGender: "Female",
            // phoneNumber: "8794567845",
            // location: "Velachery",
            // latitude: "12.9815",
            // longitude: "80.218",
            // genderPreference: "Female",
            // propertyType: "2 BHK",
            // radius: "10"
        
          };

          console.log(apiPayload);

            axios.post(apiPath, apiPayload)
            .then(response => {
                console.log("API Response", response);
                setSearchResults(response.data.posts);
                setLoader(false);
            })
            .catch(error => {
                setLoader(false);
                console.error('Error fetching data: ', error);
        });
    }


    const makeRequest = (postId) => {
        setLoader(true);
        const apiPath = `${apiUrl}/post/addRequest`; 
        const {data: {user}} = getUserDetails();
        const payload = {...user, postId};
        axios.post(apiPath, payload)
       .then(data => {
           if(data) {
               toast.success('Post Request Submitted');
           }
           setLoader(false);
       })
       .catch(error => {
           setLoader(false);
           console.error('Error:', error);
        })
    }


    const getCommonInterest = () => {
        const apiPath = `${apiUrl}/results/getRecommendations`; 
        const {data: {user}} = getUserDetails();
        axios.post(apiPath, user)
       .then(data => {
           console.log(data);
       })
       .catch(error => {
           console.error('Error:', error);
        })
    }
    


    const acceptDecline = (request) => {
        setLoader(true);
        const apiPath = `${apiUrl}/post/modifyRequest`; 
        const {data: {user}} = getUserDetails();

        const payload = {
            ...request,
            comcastId: user.comcastId
        }
        axios.post(apiPath, payload)
       .then(data => {
           console.log(data);
           toast.success('Post Request Submitted');
           setLoader(false);
       })
       .catch(error => {
           setLoader(false);
           console.error('Error:', error);
        })
    }
    



    const logOut = () => {
        sessionStorage.clear();
        navigate('/');
    }




return {
    authenticateUser,
    getNotifications,
    getUserDetails,
    logOut,
    getLocationsList,
    locationList,
    getMyPost,
    myPost,
    getMyRequest,
    myRequest,
    getSearchResults,
    searchResults,
    makeRequest,
    currentUserDetail,
    setSearchResults,
    getCommonInterest,
    acceptDecline,
    loader,
    setLoader

}

}

export default useCoLiving;
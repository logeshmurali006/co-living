import React, { useState, useEffect, useLayoutEffect, useCallback } from "react";
import room from "../assets/images/room-1.jpg";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { Badge, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useCoLiving from "../custom-hooks/useCoLiving";
import Loader from "../components/loader";

const PostDetails = () => {

    const { makeRequest, currentUserDetail, getUserDetails, acceptDecline, loader } = useCoLiving();
    const navigate = useNavigate();
    const maxLength = 100;

    const { postId } = useParams();
    const [showFullText, setShowFullText] = useState(false);
    const [seeFullAmenities, setFullAmenities] = useState(false);
    const [postDetails, setPostDetails] = useState({});

    const [isAlreadyRequested, setIsAlreadyRequested] = useState(false);

    useEffect(() => {
        getUserDetails();
    }, [])
    useEffect(() => {
        console.log("postid useEffect", postId);
        axios
            .get(`https://colive-comcast.netlify.app/results/getDetails/${postId}`)
            .then((response) => {
                console.log("response", response);
                setPostDetails(response.data.post);
                checkUserAlreadyRequestedPost(response.data.post);
            });
    }, [postId]);

    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    const toggleAmenities = () => {
        setFullAmenities(!seeFullAmenities);
    };

    const getInitials = (name) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("");
    };


  
    

    const acceptDeclineCall = (postId, status) => {
        acceptDecline({postId, status});
    }

    const truncatedText = showFullText
        ? postDetails.description
        : `${postDetails.description?.slice(0, maxLength)}...`;

    // Filter out amenities with a value of true
    const activeAmenities =
        postDetails.createdByComcastId &&
        Object.keys(postDetails.amenities).filter(
            (key) => postDetails.amenities[key]
        );
    // Divide active amenities into two sections
    const firstRowAmenities = activeAmenities && activeAmenities.slice(0, 4);
    const secondRowAmenities = activeAmenities && activeAmenities.slice(4, 8);

    const amenityMap = {
        ac: { text: "AC", icon: "fa-snowflake" },
        cook: { text: "Cook", icon: "fa-utensils" },
        fridge: { text: "Refrigerator", icon: "fa-temperature-low" },
        geyser: { text: "Geyser", icon: "fa-shower" },
        maid: { text: "Maid", icon: "fa-person-dress" },
        parking: { text: "Parking", icon: "fa-square-parking" },
        washingMachine: { text: "Washing machine", icon: "fa-soap" },
        wifi: { text: "Wifi", icon: "fa-wifi" }
    };


    console.log("postDetails", postDetails);

    const checkUserAlreadyRequestedPost = (post) => {
        const isRequested = new Promise((resolve) => resolve(post.requests.findIndex((request) => request.comcastId === currentUserDetail.comcastId) !== -1));
        
        isRequested.then((res) => {
            console.log(res);
            setIsAlreadyRequested(res); 
        })
        
    };

    return (
        <>
            {postDetails?.createdByComcastId && (
                <div>
                    <div className="post-details-image-wrapper">
                        <i className="fa-solid fa-chevron-left text-left position-absolute back-icon" onClick={() => navigate(-1)}></i>
                        <img src={room} alt="room" className="post-details-image" />
                        <div className="overlay"></div>
                    </div>
                    <div className="post-details-content-wrapper">
                        <h4>{postDetails.title} </h4>
                        <p>
                            {postDetails.propertyDetails.landmark} ,{" "}
                            {postDetails.propertyDetails.location}
                        </p>
                        <Stack direction="horizontal" gap={3}>
                            <div className="p-2">
                                <i className="fa-solid fa-house-laptop me-2"></i>
                                {postDetails.propertyDetails.propertyType}
                            </div>

                            <div className="p-2">
                                <i className="fa-solid fa-bed  me-2"></i>
                                {postDetails.propertyDetails.vacantSlots}/
                                {postDetails.propertyDetails.totalSlots}
                            </div>
                            <div className="p-2">
                                <i className="fa-solid fa-location-dot  me-1"></i>
                                {" "}
                                {postDetails.propertyDetails.distanceFromCiec} km
                            </div>

                        </Stack>
                        <Stack direction="horizontal" gap={3}>
                            <div className="p-2">
                                <i className="fa-solid fa-indian-rupee-sign me-2">
                                </i>
                                {parseInt(
                                    postDetails.propertyDetails.totalRent
                                ).toLocaleString()}
                                /month*
                            </div>
                        </Stack>
                        <p> *Rent inclusive of all amenities</p>
                        <hr />
                        {/* description */}
                        {
                        postDetails.description && <div>
                            <h2>Description</h2>
                            <p>
                                {truncatedText}
                                {postDetails.description?.length > maxLength && (
                                    <Button variant="link" size="sm" onClick={toggleText}>
                                        {showFullText ? " read Less" : "read More"}
                                    </Button>
                                )}
                            </p>
                        </div>
                        }
                        {/* amenities */}
                        <div className="post-details-amenities">
                            <Stack direction="horizontal" gap={3}>
                                <div className="p-2">
                                    <h3>Amenities</h3>
                                </div>
                                <div className="p-2 ms-auto">
                                    {activeAmenities && activeAmenities.length > 4 && (
                                        <Button variant="link" size="sm" onClick={toggleAmenities}>
                                            {!seeFullAmenities ? "Show all" : "Show less"}
                                        </Button>
                                    )}
                                </div>
                            </Stack>
                            <div style={{ paddingLeft: 5 }}>
                                {/* First row of amenities */}
                                <div >
                                    {firstRowAmenities.map((key) => {
                                        const { text, icon } = amenityMap[key];
                                        return (
                                            <div key={key} className="amenities-items me-3">
                                                <ul>
                                                    <li>
                                                        <div className="chip me-3">
                                                            <i className={`fa-solid ${icon}`}></i>
                                                        </div>
                                                        <p>{text}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Second row of amenities */}
                                {secondRowAmenities.length > 0 && seeFullAmenities && (
                                    <div style={{ marginTop: "8px" }}>
                                        {secondRowAmenities.map((key) => {
                                            const { text, icon } = amenityMap[key];
                                            return (
                                                <div key={key} className="amenities-items">
                                                     <ul>
                                                        <li>
                                                            <div className="chip me-3">
                                                                <i className={`fa-solid ${icon}`}></i>
                                                            </div>
                                                            <p
                                                                
                                                            >
                                                                {text}
                                                            </p>
                                                        </li>
                                                    </ul>
                                                   
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* preferences */}
                        <div className="post-details-preferences">
                            <h3 className="my-3">Preferences</h3>
                            <div>
                                Gender : {postDetails.preferences.gender}
                                <p>Food preference: {postDetails.preferences.foodPreference}</p>
                            </div>
                        </div>
                        {/* Requests */}
                        {
                           
                            (postDetails.requests.length > 0 && postDetails.createdByComcastId === currentUserDetail.comcastId) &&
                            <div className="post-details-preferences">
                                <h3 className="my-3">Requests</h3>

                                {
                                    postDetails.requests.map((request) => (
                                        <Card style={{ width: "18rem" }} className="mb-3">
                                            <Card.Body>
                                                <Card.Title>{request.name}</Card.Title>
                                                <Card.Text>Ph : {request.phoneNumber}</Card.Text>

                                                {
                                                    (
                                                        request.status === 'pending' ?
                                                            <Stack direction="horizontal" gap={1}>
                                                                <Button variant="success" onClick={() => acceptDeclineCall(postDetails._id, 'Accepted')}>Accept</Button>
                                                                <div>
                                                                    <Button variant="danger" onClick={() => acceptDeclineCall(postDetails._id, 'Declined')}>Decline</Button>
                                                                </div>
                                                            </Stack>
                                                            :
                                                            <div className="text-end">
                                                                <Badge bg="theme" className="p-2">
                                                                    {request.status}
                                                                </Badge>
                                                            </div>

                                                    )
                                                }

                                            </Card.Body>
                                        </Card>
                                    ))
                                }


                            </div>
                        }


                        {/* House owner */}
                        <div className="post-details-preferences">
                            <h3 className="my-3">Posted By</h3>
                            <div className="post-details-contact-details my-4">
                                <Badge
                                    pill
                                    style={{
                                        backgroundColor: "#7472E0",
                                        fontSize: "16px",
                                        width: "52px",
                                        height: "52px",
                                        borderRadius: "50%",
                                        display: "flex",
                                        paddingTop: "8px",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    {getInitials(postDetails.contactDetails.contactPerson)}
                                </Badge>
                                <div className="ps-3">
                                    <h6>{postDetails.contactDetails.contactPerson}</h6>
                                    <div>Ph: {postDetails.contactDetails.contactNumber}</div>
                                </div>
                            </div>
                        </div>
                        {/* Location */}
                        <div className="post-details-preferences">
                            <h4>Location</h4>
                            <Stack>
                                <a
                                    href="https://maps.app.goo.gl/uhcqzNao9ksZ8t9y7"
                                    onClick={() => { }}
                                >
                                    Click here to go to google maps
                                </a>
                            </Stack>
                        </div>
                        <div className="post-details-preferences">
                           
                         {
                            !isAlreadyRequested ? 

                                <div className="d-grid gap-2 my-3">
                                    {(postDetails.createdByComcastId !== currentUserDetail.comcastId) ? 
                                        <Button variant="theme" size="lg" onClick={() => makeRequest(postId)}>
                                            Make a Request
                                        </Button>
                                        :
                                        ''
                                    }
                                </div>
                            : 
                            <div className="d-grid gap-2 my-3">
                                <Button variant="theme" size="lg" disabled>
                                    Request Submited
                                </Button>
                            </div>
                         }
                            
                        </div>
                    </div>
                    <Loader loading={loader} />
                </div>
            )}
        </>
    );
};

export default PostDetails;

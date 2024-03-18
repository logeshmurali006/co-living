import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './create-post.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Menu from '../../components/menu';
import Loader from '../../components/loader';
import useCoLiving from '../../custom-hooks/useCoLiving';

import { toast } from "react-toastify";

const CreatePost = () => {
    const [postTitle, setPostTitle] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [location, setLocation] = useState('');
    const [landmark, setLandmark] = useState('');
    const [totalRent, setTotalRent] = useState(0);
    const [totalSlots, setTotalSlots] = useState(0);
    const [vacantSlots, setvacantSlots] = useState(0);
    const [propertyDescription, setPropertyDescription] = useState('');
    const [mapURL, setMapURL] = useState('');
    const [propertyPicture, setPropertyPicture] = useState('');
    const [isParkingAvailable, setIsParkingAvailable] = useState(false);
    const [isWashingMachineAvailable, setIsWashingMachineAvailable] = useState(false);
    const [isFridgeAvailable, setIsFridgeAvailable] = useState(false);
    const [isWifiAvailable, setIsWifiAvailable] = useState(false);
    const [isAcAvailable, setIsAcAvailable] = useState(false);
    const [isGeyserAvailable, setIsGeyserAvailable] = useState(false);
    const [isCookAvailable, setIsCookAvailable] = useState(false);
    const [isMaidAvailable, setIsMaidAvailable] = useState(false);
    const [foodPreference, setFoodPreference] = useState('');
    const [genderPreference, setGenderPreference] = useState('');

    const [locationList, setLocationList] = useState([]);
    const [userDetails, setUserDetails] = useState({})

    const {   
        loader,
        setLoader,
        getUserDetails
     } =  useCoLiving();
    
    useEffect(()=>{
        axios.get('https://colive-comcast.netlify.app/results/getLocations')
            .then(response => {
                // console.log(response.data.locations,"-----response------");
                setLocationList(response.data.locations);
                // console.log(response.data.locations.filter(loc => loc.locationName === location),"------------->>>>>>");
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
        
    },[location]);


    useEffect(() => {
        const {data: {user}} = getUserDetails();
        setUserDetails(user);
    }, [])

    const handlePictureUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setPropertyPicture(e.target.result);
        };
        reader.readAsDataURL(file);
    }
    const navigate = useNavigate();

    const handleCreateNewPost = async () => {
        setLoader(true);
        const latitude = Number(locationList.filter(loc => loc.locationName === location)[0].latitude);
        const longitude = Number(locationList.filter(loc => loc.locationName === location)[0].longitude);
        const distanceFromCiec = Number(locationList.filter(loc => loc.locationName === location)[0].distanceFromCiec);
        // console.log(locationList,"---locationList--->>>")
        // console.log(latitude,longitude,"------lati longi------>>>")

        const convertedBodyData = {
            createdByUserName: userDetails.userName,
            createdByComcastId: userDetails.comcastId,
            title: postTitle,
            propertyDetails: {
              location: location,
              image: "propertyPicture",
              landmark: landmark,
              propertyType: propertyType,
              distanceFromCiec: distanceFromCiec,
              totalRent: totalRent,
              totalSlots: totalSlots,
              vacantSlots: vacantSlots,
              mapUrl: mapURL,
              description: propertyDescription
            },
            amenities: {
              parking:  isParkingAvailable,
              wifi: isWifiAvailable,
              washingMachine: isWashingMachineAvailable,
              fridge: isFridgeAvailable,
              ac: isAcAvailable,
              cook: isCookAvailable,
              maid: isMaidAvailable,
              geyser: isGeyserAvailable
            },
            preferences: {
              gender: genderPreference,
              foodPreference: foodPreference,
            },
            contactDetails: {
              contactPerson: "janani",
              contactNumber: "9382934292"
            },
            locationCoordinates: {
              type: "Point",
              coordinates: [latitude, longitude]
            },
           };
           
        const response = await axios.post('https://colive-comcast.netlify.app/post/submitPost', convertedBodyData);

            if (response.success) {
            // Handle successful submission
                setLoader(false);
                toast.success("Post created successfully");
            } else {
                setLoader(false);
                // Handle error
                toast.error("create post failed--->>>>");
            }
        navigate('/home');
    }

    return (
      <>
        <div>
        <div className="background-color page-background">
                <h1 className='app-logo page-title'> Create a Post</h1>
            </div>
            <Container className='pb-5'>
                <Row>
                    <Col xs={12}>
                        <div className="theme-card post-card mt-3 mb-5">
                            <h1 className='post-sub-section'>Property Details</h1>
                            <Form onSubmit={(event) => event.preventDefault()}>
                                <Form.Group className="my-3" controlId="formLandmark">
                                    <Form.Label>Post Title</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setPostTitle(selectedValue);
                                          }}/>
                                </Form.Group>

                                <Form.Group className="my-3" controlId="formPropertyType">
                                    <Form.Label>Property Type</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        name="Property Type" 
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setPropertyType(selectedValue);
                                          }}>
                                        <option>Choose Property Type</option>
                                        <option>1 BHK</option>
                                        <option>2 BHK</option>
                                        <option>3 BHK</option>
                                        <option>{`>3 BHK`}</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="my-3" controlId="formlocation">
                                    <Form.Label>Location</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setLocation(selectedValue);
                                          }}>
                                            <option>Choose Location</option>
                                            {locationList.map((loc, index) => (
                                                <option key={index} value={loc.locationName}>
                                                {loc.locationName}
                                                </option>
                                            ))}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="my-3" controlId="formLandmark">
                                    <Form.Label>Street Name / Landmark</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setLandmark(selectedValue);
                                          }}/>
                                </Form.Group>

                                <Form.Group className="my-3" controlId="formTotalRent">
                                    <Form.Label>Total Rent</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setTotalRent(selectedValue);
                                          }}/>
                                </Form.Group>

                                <Form.Group className="my-3" controlId="formTotalSlots">
                                    <Form.Label>Total Slots</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setTotalSlots(selectedValue);
                                          }}/>
                                </Form.Group>

                                <Form.Group className="my-3" controlId="formVacantSlots">
                                    <Form.Label>Vacant Slots</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setvacantSlots(selectedValue);
                                          }}/>
                                </Form.Group>

                                <Form.Group controlId="propertyDescription">
                                    <Form.Label>Property Description</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        rows="3" 
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setPropertyDescription(selectedValue);
                                          }}/>
                                </Form.Group>

                                <Form.Group className="my-3" controlId="formLandmark">
                                    <Form.Label>Google Map URL</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setMapURL(selectedValue);
                                          }}/>
                                </Form.Group>

                                <Form.Group controlId="pictureUpload">
                                    <Form.Label>Upload Property Picture</Form.Label>
                                    <Form.Control 
                                        type="file" 
                                        onChange={handlePictureUpload}/>
                                    {/* <Button variant="primary" block type="button" size="sm" onClick={() => document.getElementById('pictureUpload').click()}>
                                        Upload a picture
                                    </Button> */}
                                </Form.Group>
                        
                                <h1 className='post-sub-section mt-5'>Amenities</h1>
                                <Form.Group className="my-3" controlId="formParking">
                                    <Form.Label>Parking Available?</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value === "true"? true : false;
                                            setIsParkingAvailable(selectedValue);
                                          }}>
                                        <option>Choose Option...</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formWashingMachine">
                                    <Form.Label>Washing Machine Available?</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value === "true"? true : false;
                                            setIsWashingMachineAvailable(selectedValue);
                                          }}>
                                        <option>Choose Option...</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formFridge">
                                    <Form.Label>Fridge Available?</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value === "true"? true : false;
                                            setIsFridgeAvailable(selectedValue);
                                          }}>
                                        <option>Choose Option...</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formWifi">
                                    <Form.Label>Wifi Available?</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value === "true"? true : false;
                                            setIsWifiAvailable(selectedValue);
                                          }}>
                                        <option>Choose Option...</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formAC">
                                    <Form.Label>AC Available?</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value === "true"? true : false;
                                            setIsAcAvailable(selectedValue);
                                          }}>
                                        <option>Choose Option...</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formGeyser">
                                    <Form.Label>Geyser Available?</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value === "true"? true : false;
                                            setIsGeyserAvailable(selectedValue);
                                          }}>
                                        <option>Choose Option...</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formCook">
                                    <Form.Label>Cook Available?</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value === "true"? true : false;
                                            setIsCookAvailable(selectedValue);
                                          }}>
                                        <option>Choose Option...</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formMaid">
                                    <Form.Label>Maid Available?</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value === "true"? true : false;
                                            console.log(selectedValue,"----selectedValue---",typeof(selectedValue))
                                            setIsMaidAvailable(selectedValue);
                                          }}>
                                        <option>Choose Option...</option>
                                        <option value={true}>Yes</option>
                                        <option value={false}>No</option>
                                    </Form.Select>
                                </Form.Group>

                                <h1 className='post-sub-section mt-5'>Preferences</h1>
                                <Form.Group className="my-3" controlId="formFoodPreference">
                                    <Form.Label>Food Preference?</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setFoodPreference(selectedValue);
                                          }}>
                                        <option>Choose Option...</option>
                                        <option>Veg</option>
                                        <option>Non-Veg</option>
                                        <option>Any</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="my-3" controlId="formGenderPreference">
                                    <Form.Label>Gender Preference?</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example"
                                        onChange={(event) => {
                                            const selectedValue = event.target.value;
                                            setGenderPreference(selectedValue);
                                          }}>
                                        <option>Choose Option...</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </Form.Select>
                                </Form.Group>
                                

                                <Button 
                                    variant="theme" 
                                    
                                    className='btn-block mt-2' 
                                    type="submit" 
                                    onClick={handleCreateNewPost}>
                                    Create a Post
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        <Menu selected="create-post" />
        <Loader loading={loader} />
      </>
    );
}

export default CreatePost;
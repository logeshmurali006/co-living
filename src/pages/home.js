
import { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import Menu from '../components/menu';
import Filters from './filters';
import CommonInterest from '../components/commonInterest';
import useCoLiving from '../custom-hooks/useCoLiving';
import PostCard from '../components/postCard';
import { ColivingContext } from '../App';
import Loader from '../components/loader';

const Home = () => {

    const coLivingSearch = useContext(ColivingContext);

    const {colivingContext, setColivingContext} = coLivingSearch;

    const [search, setSearch] = useState({
        location: '',
        radius: '',
        propertyType: '',
        genderPreference: '',
        latitude: '',
        longitude: '',
    });

    const {   
        getLocationsList,
        locationList,
        getSearchResults,
        searchResults,
        getCommonInterest,
        loader
    } =  useCoLiving();

    const [show, setShow] = useState(false);

    const handleModelClose = () => {
        setShow(false);
        handleSearchForm();
    };
    const handleModalShow = () => setShow(true);

    const resetSearch = () => {
        setColivingContext({});  
        setSearch({});
        getSearchResults({});
    }

    useEffect(()=>{
        getCommonInterest();
        getLocationsList();
    },[]);

    useEffect(()=>{
        if(colivingContext) {
            setSearch(colivingContext);   
        } else {
            setColivingContext(search);
        }
    },[]);


    const handleSearch = (event) => {
        setSearch((prev) => {
             return {...prev, [event.target.name]: event.target.value}
        });
    }

    const handleSearchForm = () => {
        setColivingContext(search);
        getSearchResults(search);
    }


    const handleLocation = (event) =>{

       const filteredResults = locationList.filter(loc => loc.locationName === event.target.value);
       setSearch((prev) => {
        return {...prev, 
            location: event.target.value, 
            latitude: filteredResults[0].latitude,
            longitude: filteredResults[0].longitude 
        }
        });
       console.log(filteredResults);
         
    }

    return (
        <div>
            <div className="background-color page-background">
                <h1 className='app-logo page-title'>Home</h1>
            </div>
            <Container className='mb-5 pb-5'>
                <Row className="justify-content-center">
                    <Col xs={11}>
                        <div className="theme-card home-card">
                            <h1 className='home-title'>Locations near me</h1>
                            <Form>
                            
                                <Row className="my-3">
                                    <Col xs={8} className='pe-0'>
                                        <Form.Group  controlId="formBasicEmail">
                                        <Form.Select aria-label="Default select example" size='sm' name="location" onChange={handleLocation} value={search.location}>
                                            <option value="">Choose Location</option>
                                            {locationList.map((loc, index) => (
                                                <option key={index} value={loc.locationName}>
                                                {loc.locationName}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Button variant="theme" size="sm" className='btn-block' onClick={handleModalShow} type="button">
                                            Filter
                                        </Button>
                                    </Col>
                                </Row>

                                <Row className="mt-3">
                                    <Col xs={6} >
                                        <Button variant="theme" size="sm" className='btn-block' type="button" onClick={handleSearchForm}>
                                            Search
                                        </Button>
                                     </Col>
                                    <Col xs={6} >
                                        <Button variant="theme" size="sm" className='btn-block' type="button" onClick={resetSearch}>
                                            Reset
                                        </Button>
                                    </Col>
                                </Row>

                              
                            </Form>
                        </div>

                        <div className="my-4">
                          { searchResults.length > 0  && <h2 className="home-title">Results</h2> }  

                            {
                               searchResults.length > 0 ? searchResults.map(results => (
                                    <PostCard key={results._id} results={results}  />
                                ))
                                :
                                <p className='text-center'>No Results Found</p>
                                
                            }
                        </div>
                        <CommonInterest/>
                    </Col>
                </Row>
            </Container>

            <Menu selected="home" />
            <Filters show={show} handleClose={handleModelClose} handleSearch={handleSearch} handleSearchForm={handleSearchForm} search={search}  />
            <Loader loading={loader} />
        </div>
    )
}

export default Home;
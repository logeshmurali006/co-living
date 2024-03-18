

import room from "../assets/images/room-1.jpg"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { useNavigate } from "react-router-dom";

const PostCard = ({results}) => {

    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/post-details/${id}`)
    }

    return (
        <div className="theme-card results-card position-relative bg-white mb-3" >
            <img src={room} alt="house-img" className="results-img" />
            <div className="content-section">
                <h3>{results?.title}</h3>
                <p className="mb-1">Rent <span className="theme-color font-weight-bold"> <i className="fa-solid fa-indian-rupee-sign theme-color font-weight-bold"></i> {results?.propertyDetails?.totalRent} </span> Per Month</p>
                <p className="mb-1">Slots Available <span className="theme-color font-weight-bold"> {results?.propertyDetails?.vacantSlots} /{results?.propertyDetails?.totalSlots} </span> </p>
                <Row className="mt-4">
                    <Col>
                        <p className="mb-0"><i className="fa-solid fa-location-dot theme-color font-weight-bold"></i>  {results?.propertyDetails?.distanceFromCiec} kms</p>
                    </Col>
                    <Col className="text-end">
                        <Button variant="theme" size="sm" type="button"onClick={() => handleNavigate(results._id)}>
                            View Post
                        </Button>
                    </Col>
                </Row>
            </div>    
        </div>
    )
}

export default PostCard;
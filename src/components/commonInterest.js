import React from "react"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const CommonInterest = () => {
  const commonInterestList = [
    {
        location: "Velachery",
        users:[{
            username : "janani",
            comcastId : "222222",
            gender : "female",
            phoneNumber : "8737474827"
        },
        {
            username : "nani",
            comcastId : "111111",
            gender : "male",
            phoneNumber : "9737474827"
        }]
    },
    {
        location: "Pallavaram",
        users:[{
            username : "john",
            comcastId : "555555",
            gender : "male",
            phoneNumber : "9737474827"
        },
        {
            username : "catherine",
            comcastId : "444444",
            gender : "female",
            phoneNumber : "8735674827"
        }]
    }];
  return (
     <div className="my-4">
        <h2 className="home-title">People with common interests</h2>
        {commonInterestList.map((interest, index)=>{
            return(
                <div key={index} className="theme-card results-card position-relative bg-white mb-3">
                    <div className="content-section">
                        <h2>{interest.location}</h2>
                        {interest.users.map((user)=>{
                            return(
                                <div key={user.comcastId}>
                                    <Row>
                                        <Col>
                                            <h3 style={{marginTop:"15px"}}>{user.username}</h3>
                                        </Col>
                                        <Col>
                                            <p style={{marginTop:"15px"}}>[ {user.phoneNumber} ]</p>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })}
                    </div>
                </div>
            );
        })}            
    </div> 
  );
}
export default CommonInterest
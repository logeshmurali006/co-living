import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useCoLiving from '../custom-hooks/useCoLiving';
import { useState } from 'react';
import Loader from '../components/loader';



const Login =  () => {
    const {authenticateUser, loader} = useCoLiving();

    const  [userDetails, setUserDetails] = useState({comcastId: '', password: '' })
   

    const handleSubmit =  async (event) => {
        event.preventDefault();
        authenticateUser(userDetails);
    }

    const handleInput = (Event) => {
        setUserDetails((prev) => {
            return {...prev, [Event.target.name]: Event.target.value}
        });
    }

    return (
      <>
        <div>
            <div className="background-color">
                  <h1 className='app-logo'>Co Living</h1>
            </div>
            <Container>
                <Row>
                    <Col xs={{ span: 10, offset: 1  }}>
                        <div className="theme-card login-card">
                            <h1 className='login-title'>Sign In</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="my-3" controlId="formBasicEmail">
                                    <Form.Label>Comcast ID</Form.Label>
                                    <Form.Control type="text"  name="comcastId" onChange={handleInput} />
                                </Form.Group>

                                <Form.Group className="my-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" onChange={handleInput}  />
                                </Form.Group>
                                <Button variant="theme" size='sm' className='btn-block mt-2' type="submit">
                                    Login
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Loader loading={loader} />
        </div>
        
      </>
    );
}

export default Login;
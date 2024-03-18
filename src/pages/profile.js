
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';


import Nav from 'react-bootstrap/Nav';

import Menu from '../components/menu';
import { useEffect, useState } from 'react';
import useCoLiving from '../custom-hooks/useCoLiving';
import PostCard from '../components/postCard';
import Loader from '../components/loader';

const Profile = () => {

    const {getUserDetails, logOut, getMyPost, myPost, getMyRequest, myRequest, loader} = useCoLiving();

    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        const {data: {user}} = getUserDetails();
        setUserDetails(user);
    }, [])

    useEffect(() => {
      getMyPost();
    }, []);

    return (
        <>
            <div>
                <div className="background-color page-background">
                    <h1 className='app-logo page-title'>My Profile</h1>
                </div>

                    <div className='mt-4 mb-4 px-3'>
                        <div className="theme-card home-card p-3 text-center">
                            <div className="user-icon mt-2"><i className="fa-solid fa-user"></i></div>
                            <h1 className="profile-name my-3">{userDetails.userName}</h1>

                            <p className="text-center"><i className="fa-regular fa-id-badge theme-color mx-1"></i> {userDetails.comcastId} <span className="text-mutted mx-2">|</span> <i className="fa-solid fa-phone theme-color mx-1"></i> {userDetails.phoneNumber}</p>

                            <Button variant="theme" className='my-2' onClick={logOut}>
                               Sign out
                            </Button>    
                        </div>
                    </div>
                    
                    <div className='justify-content-center'>

                        <div className="profile-tabs pb-5 px-3">
                        
                            <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="">

                                <Nav variant="pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first" onClick={getMyPost}>
                                            My Post
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second" onClick={getMyRequest}>
                                            My Requests
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <Tab.Content className='py-4'>
                                    <Tab.Pane eventKey="first">
                                        { myPost.length > 0 ?  
                                         myPost.map(item => (
                                            <PostCard  key={item._id} results={item} /> 
                                         ))
                                        : <p className='text-center'>You dont have any Post</p>}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        {myRequest.length > 0 ?  
                                            myRequest.map(item => (
                                                <PostCard key={item._id} results={item} />
                                            ))
                                         :  <p className='text-center'>You dont have any Requests</p>}

                                    </Tab.Pane>
                                </Tab.Content>

                            </Tab.Container>
                        </div>

                    </div>
                
            </div>

            <Menu selected="profile" />
            <Loader loading={loader} />

        </>
    );
}

export default Profile;

import { useEffect, useState } from 'react';
import Menu from '../components/menu';

import useCoLiving from '../custom-hooks/useCoLiving';
import NotificationCard from '../components/notification-card';
import Loader from '../components/loader';

const Notification = () => {

    const { getNotifications, loader, setLoader } = useCoLiving();
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        setLoader(true);
        getNotifications()
        .then(response => {
            setLoader(false);
            if(response) {
             const { data : { notifications } } = response;
             setNotifications(notifications)
            }
        })
        .catch(error => {
            setLoader(false);
            console.error('Error:', error)
         }); 
    }, [])
    return (
        <div>
            <div className="background-color page-background">
                <h1 className='app-logo page-title'>Notifications</h1>
            </div>

            {
                notifications.length > 0 ? notifications.map((item) => (
                 <NotificationCard notification={item} />
                ))
                :
                <p className="text-center my-5">Oops!!! Sorry, no notifications for you</p>
            }
            

            <Menu selected="notifications" />
            <Loader loader={loader} />
        </div>
    )
}

export default Notification;
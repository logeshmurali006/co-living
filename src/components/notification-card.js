import { useNavigate } from "react-router-dom";

const NotificationCard = (notification) => {

    const navigate = useNavigate();
    const redirectUserToPost = () => {
        navigate(`/post-details/${notification.postId}`);
    }

    return (
        <div className="notification-card" onClick={redirectUserToPost}>
            <div className="notification-icon"><i className="fa-solid fa-bell"></i></div>
            <div className="notification-content">
                <p className="mb-0">
                    {
                        notification.type === 'PostRequest' ? 
                        `${notification.actionUserName} intrested to join with you in your residency` : ''
                    }
                    {
                        notification.type === 'RequestStatus' ? 
                        `${notification.actionUserName} has ${notification.postRequestStatus} your request` : ''
                    }
                    
                </p>
            </div>
        </div>
    );
}

export default NotificationCard;
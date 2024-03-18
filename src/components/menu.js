import { useNavigate } from "react-router-dom";

const Menu = ({selected}) => {
    const navigate = useNavigate();
    
    const pageNavigate = (page) => {
       navigate(page);
    }

    return (
      <>
        <div className="menu-bar">
            <ul>
                <li className={selected === 'home' ? "active" : ""} onClick={() => pageNavigate('/home')}>
                    <i className="fa-solid fa-house"></i>
                </li>
                <li className={selected === 'create-post' ? "active" : ""} onClick={() => pageNavigate('/create-post')}>
                    <i className="fa-solid fa-plus"></i>
                </li>
                <li className={selected === 'notifications' ? "active" : ""} onClick={() => pageNavigate('/notification')}>
                    <i className="fa-solid fa-bell"></i>
                </li>
                <li className={selected === 'profile' ? "active" : ""} onClick={() => pageNavigate('/profile')}>
                    <i className="fa-solid fa-user"></i>
                </li>
            </ul>

        </div>
      </>
    )
}

export default Menu;
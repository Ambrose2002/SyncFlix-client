import React from 'react';
import { useState } from 'react';
import './navbar.css';
import UploadForm from '../VideoUpload/UploadForm'

const Navbar = (prop) => {
    const data = prop.prop
    const handleLogout = data.handleLogout;
    const name = data.userData

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <p className='title'>SyncFlix</p>
            </div>
            <div className="navbar-right">
                <p className='user' >{name}</p>
                <button onClick={openModal}>Upload Video</button>
                <button className="logout_button user" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            {isModalOpen && <UploadForm onClose={closeModal} />}
        </div>
    );
};

export default Navbar;

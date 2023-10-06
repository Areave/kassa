import React, {useState} from 'react'
import {Modal} from 'react-bootstrap';
import './addItemModal.scss';
import apiService from "../../utils/apiService";
import {useNavigate} from "react-router";
import {setIsAuthorizedAction} from "../../utils/store/actionCreators";

export const ItemModalTemplate = ({showModal, closeModal, dataToSend, sid, setIsAuthorized}: any) => {

    const [isLoading, setIsLoading] = useState(false);
    const [modalText, setModalText] = useState('Do you really want to close collection?');
    const navigate = useNavigate();

    const saveAndClose = () => {
        apiService.closeCollection(sid, {objects: dataToSend}).then(res => {
            if (res.status === 'OK') {
                setModalText('Collection closed. Back to login form');
                setTimeout(() => {
                    closeModal();
                    setIsAuthorized(false)
                    navigate('/')
                }, 3000)

            }
        })
    };

    return <div style={{display: 'block', position: 'initial'}}>
        <Modal centered show={showModal} onHide={() => closeModal()}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal_content">
                    <div className="modal_content__text">
                        {modalText}
                    </div>
                    <div className="modal_content__buttons">
                        <button className='button button-close' onClick={closeModal}>Cancel</button>
                        <button className='button button-ok' onClick={saveAndClose}>OK</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
};
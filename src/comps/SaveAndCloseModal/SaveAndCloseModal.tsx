import React, {useState} from 'react'
import {Modal} from 'react-bootstrap';
import './SaveAndCloseModal.scss';
import apiService from "../../utils/apiService";
import {useNavigate} from "react-router";
import Loader from "../loader/loader";

export const SaveAndCloseModal = ({showModal, closeModal, dataToSend, sid, setIsAuthorized, isNoItemsState, apiUrl}: any) => {

    const [isLoading, setIsLoading] = useState(false);
    const [modalText, setModalText] = useState('Do you really want to close collection?');
    const navigate = useNavigate();

    const saveAndClose = async () => {

        const data = isNoItemsState ? [] : dataToSend;
        const res = await apiService.getCollectionStatus(sid, apiUrl);

        if (!res.data.opened) {
            setModalText('Collection already closed. Back to login form without saving');
            setIsLoading(true);
            setTimeout(() => {
                closeModal();
                setIsAuthorized(false);
            }, 2000);
        } else {
            apiService.closeCollection(sid, apiUrl, {objects: data}).then(res => {
                console.log('then after get status before saving');
                if (res.status === 'OK') {
                    setModalText('Saving collection. Back to login form');
                    setIsLoading(true);
                    setTimeout(() => {
                        closeModal();
                        setIsAuthorized(false);
                    }, 1000);
                } else throw new Error('Network problems')
            }).catch(e => {
                setModalText('ERROR: ' + e.message);
            })
        }
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
                    {isLoading && <div className="modal_content__loader-container"><Loader/></div>}
                    {!isLoading && <div className="modal_content__buttons">
                        <button className='button button-close' onClick={closeModal}>Cancel</button>
                        <button className='button button-ok' onClick={saveAndClose}>OK</button>
                    </div>}
                </div>
            </Modal.Body>
        </Modal>
    </div>
};
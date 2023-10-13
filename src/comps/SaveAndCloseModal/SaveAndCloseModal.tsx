import React, {useState} from 'react'
import {Modal} from 'react-bootstrap';
import './SaveAndCloseModal.scss';
import apiService from "../../utils/apiService";
import {useNavigate} from "react-router";
import Loader from "../loader/loader";

export const SaveAndCloseModal = ({showModal, closeModal, dataToSend, sid, setIsAuthorized, isNoItemsState, apiUrl, exit}: any) => {

    const [isLoadingLocal, setIsLoadingLocal] = useState(false);
    const [modalText, setModalText] = useState('Do you really want to close collection?');
    const navigate = useNavigate();

    const goHomeFunc = () => {

        setTimeout(async () => {

            const response = await apiService.goHome(apiUrl, sid);
            // closeModal();
            // setIsAuthorized(false);
            // setIsLoadingLocal(false);

        }, 1000);
    };

    const saveAndClose = async () => {

        setIsLoadingLocal(true);
        setModalText('Save and close');

        const data = isNoItemsState ? [] : dataToSend;
        const res = await apiService.getCollectionStatus(sid, apiUrl);

        if (!res.data.opened) {
            goHomeFunc();
        } else {
            apiService.closeCollection(sid, apiUrl, {objects: data}).then(res => {
                if (res.status === 'OK') {
                    goHomeFunc();
                } else throw new Error('Network problems')
            }).catch(e => {
                setModalText('ERROR: ' + e.message);
            })
        }
    };

    return <div style={{display: 'block', position: 'initial'}}>
        <Modal centered show={showModal} onHide={() => {
            if (isLoadingLocal) {
                return;
            } else {
                closeModal();
            }
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal_content">
                    <div className="modal_content__text">
                        {modalText}
                    </div>
                    {isLoadingLocal && <div className="modal_content__loader-container"><Loader/></div>}
                    {!isLoadingLocal && <div className="modal_content__buttons">
                        <button className='button button-close' onClick={closeModal}>Cancel</button>
                        <button className='button button-ok' onClick={saveAndClose}>OK</button>
                    </div>}
                </div>
            </Modal.Body>
        </Modal>
    </div>
};
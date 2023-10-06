import React, {useState} from 'react'
import {Modal} from 'react-bootstrap';
import './addItemModal.scss';
import apiService from "../../utils/apiService";

export const ItemModalTemplate = ({showModal, closeModal, dataToSend, sid}: any) => {

    const [isLoading, setIsLoading] = useState(false);

    const saveAndClose = () => {
        const data = {

        }
        closeModal();
        apiService.closeCollection(sid, {objects: dataToSend}).then(res => {

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
                        Do you really want to close collection?
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
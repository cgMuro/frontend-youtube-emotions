import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'

export default function Info() {

    // Init modal state
    const [modal, setModal] = useState(false);

    // Open modal function
    const toggle = () => setModal(!modal);

    return (
        <>
            <svg onClick={toggle} style={{ position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer', color: '#17a2b8' }} width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-info-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                <circle cx="8" cy="4.5" r="1" />
            </svg>

            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle} className="text-center">Disclaimer and How to use</ModalHeader>
                <ModalBody>
                    This app gives prediction with accuracy of around 90%, however fake news are way more complex that what currently the model is able to understand and any result should not be taken as pure truth.
                <br />
                    <br />
                How to use:
                <ul>
                        <li>Paste the text and the title of the article inside the form</li>
                        <li>Press the button</li>
                        <li>And wait for a result!</li>
                    </ul>
                    <Button color="danger" block outline onClick={toggle} className="mt-4">Close</Button>
                </ModalBody>
            </Modal>
        </>
    )
}

import { ReactNode, useState } from "react";
import Modal from 'react-bootstrap/Modal';


interface ModalProps {
    children: ReactNode,
    header?: string,
    size?: 'sm' | 'lg' | 'xl',
    buttonText: string
}

export default function CustomModal({children, header, size, buttonText}: ModalProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose= () => setShow(false);

    return (
        <>
            <p role="button" onClick={handleShow}>
                {buttonText}
            </p>
            <Modal size={size} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </>
    )
}
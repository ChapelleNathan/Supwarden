import { ReactNode, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';


interface ModalProps {
    children: ReactNode,
    header?: string,
    size?: 'sm' | 'lg' | 'xl',
}

export default function CustomModal({children, header, size}: ModalProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose= () => setShow(false);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>
            <Modal size={size} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="offset-10" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
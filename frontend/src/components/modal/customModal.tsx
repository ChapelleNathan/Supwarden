import { ReactNode, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';


interface ModalProps {
    children: ReactNode,
    header?: string,
    size?: 'sm' | 'lg' | 'xl',
    buttonText: string,
    isLink?: boolean
}

export default function CustomModal({ children, header, size, buttonText, isLink = false }: ModalProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const displayButton = () => {
        if (isLink) {
            return (
                <p role="button" onClick={handleShow}>
                    {buttonText}
                </p>
            )
        }

        return (
            <Button onClick={handleShow}>
                {buttonText}
            </Button>
        )
    }

    return (
        <>
            {displayButton()}
            <Modal size={size} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{header}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
            </Modal>
        </>
    )
}
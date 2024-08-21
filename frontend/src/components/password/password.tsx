import { Copy, PencilFill, ThreeDots } from "react-bootstrap-icons";
import { PasswordDto } from "../../model/PasswordModels";
import { Dropdown, Offcanvas, OffcanvasBody, OffcanvasHeader } from "react-bootstrap";
import PasswordForm from "./password-form/PasswordForm";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";

interface PasswordProps {
    password: PasswordDto
}

export default function Password({ password }: PasswordProps) {
    const [show, setShow] = useState(false);
    const { addToast } = useToast();

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);


    function copyToClipboard(element: string, message: string) {
        navigator.clipboard.writeText(element).then(() => {
            addToast(
                message, {
                delay: 3000,
                autohide: true
            }
            )
        });
    }

    return (
        <tr>
            <td>
                <h3 className="fs-5">{password.name}</h3>
                <p className="text-body-secondary fs-7">{password.uri}</p>
            </td>
            <td>
                <div className="test">
                    <p className="align-self-center">tags</p>
                </div>
            </td>
            <td>trousseau</td>
            <td>
                <Dropdown>
                    <Dropdown.Toggle variant="outline-primary">
                        <ThreeDots size={20} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            className="d-flex gap-3"
                            onClick={() => copyToClipboard(password.identifier, 'Identifiant copié 😉 !')}>
                            <Copy size={20} />
                            <p >Identifiant</p>
                        </Dropdown.Item>
                        <Dropdown.Item
                            className="d-flex gap-3"
                            onClick={() => copyToClipboard(password.sitePassword, 'Mot de passe copié 😶‍🌫️ !')}>
                            <Copy size={20} />
                            <p>Mot de passe</p>
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleShow} className="d-flex gap-3">
                            <PencilFill size={20} /><p>Détails</p>
                        </Dropdown.Item>
                        <Offcanvas show={show} onHide={handleHide} placement="end">
                            <OffcanvasHeader closeButton>
                                <h2>Modifier l'élément</h2>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <PasswordForm passwordDto={password} isEditiing={true} />
                            </OffcanvasBody>
                        </Offcanvas>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}
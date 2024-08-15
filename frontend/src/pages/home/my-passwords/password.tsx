import { Copy, PencilFill, ThreeDots } from "react-bootstrap-icons";
import { PasswordDto } from "../../../model/PasswordModels";
import { Dropdown, Offcanvas, OffcanvasBody, OffcanvasHeader } from "react-bootstrap";
import PasswordForm from "../../../components/password/PasswordForm";
import { useState } from "react";

interface PasswordProps {
    password: PasswordDto
}

export default function Password({ password }: PasswordProps) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

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
                        <Dropdown.Item><Copy size={20} /> Identifiant</Dropdown.Item>
                        <Dropdown.Item><Copy size={20} /> Mot de passe</Dropdown.Item>
                        <Dropdown.Item onClick={handleShow}>
                            <PencilFill size={20} />Détails
                        </Dropdown.Item>
                        <Offcanvas show={show} onHide={handleHide} placement="end">
                            <OffcanvasHeader closeButton>
                                <h2>Modifier l'élément</h2>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <PasswordForm passwordDto={password} isEditiing={true}/>
                            </OffcanvasBody>
                        </Offcanvas>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}
import { Copy, PencilFill, ThreeDots } from "react-bootstrap-icons";
import { PasswordDto } from "../../model/PasswordModels";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import CreatePasswordTrigger from "./create-password-trigger";

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
                        <CreatePasswordTrigger
                            isEditing={true} 
                            passwordDto={password} 
                            show={show} 
                            header="Modifier un mot de passe" 
                            onClose={handleHide}>
                            <Dropdown.Item onClick={handleShow} className="d-flex gap-3">
                                <PencilFill size={20} /><p>Détails</p>
                            </Dropdown.Item>
                        </CreatePasswordTrigger>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}
import { Copy, PencilFill, ThreeDots, Trash } from "react-bootstrap-icons";
import { PasswordDto } from "../../model/PasswordModels";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { useToast } from "../../context/ToastContext";
import CreatePasswordTrigger from "./create-password-trigger";
import axios from "axios";
import ServiceResponse from "../../model/ServiceResponse";

interface PasswordProps {
    password: PasswordDto,
    onDeletePassword: (password: PasswordDto) => void
}

const config = {
    headers:
        { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

export default function Password({ password, onDeletePassword }: PasswordProps) {
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

    const handleDelete = async (password: PasswordDto) => {
        const response = await axios.delete(`http://localhost:8080/password/${password.id}`, config)
        const serviceResponse = response.data as ServiceResponse;
        onDeletePassword(serviceResponse.data as PasswordDto);
        addToast(
            'Votre mot de passe à bien été supprimé ! 🗑️',
            {
                autohide: true,
                delay: 3000
            }
        )
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
                        <Dropdown.Item
                            className="d-flex gap-3"
                            onClick={()=> handleDelete(password)}
                        >
                            <Trash/>
                            Supprimer
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </td>
        </tr>
    )
}
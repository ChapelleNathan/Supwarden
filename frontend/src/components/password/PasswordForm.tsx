import { Alert, AlertHeading, Button, Form, FormControl, FormGroup, FormLabel, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import PasswordGeneratorForm from "./PasswordGeneratorForm";
import React, { useState } from "react";
import { CreatePasswordDto, PasswordDto } from "../../model/PasswordModels";
import axios from "axios";
import { FieldError, RenderErrors } from "../error";
import verifyPasswordForm from "./verifyPasswordForm";
import { CreatePasswordEnum } from "../../enum/ErrorFieldEnum";
import Required from "../required";
import { useNavigate } from "react-router-dom";
import { Copy, X } from "react-bootstrap-icons";
import { useToast } from "../../context/ToastContext";

interface PasswordFormProps {
    passwordDto?: PasswordDto,
    isEditiing?: boolean,
}

interface Alert {
    show: boolean,
    message: string
}

export default function PasswordForm(props: PasswordFormProps) {
    const [passwordPanel, setPasswordPanel] = useState(false);
    const [password, setPassword] = useState(props.passwordDto?.sitePassword ?? '');
    const [name, setName] = useState(props.passwordDto?.name ?? '');
    const [identifier, setIdentifier] = useState(props.passwordDto?.identifier ?? '');
    const [uri, setUri] = useState(props.passwordDto?.uri ?? '');
    const [note, setNote] = useState(props.passwordDto?.note ?? '');
    const [showAlert, setShowAlert] = useState<Alert>({ show: false, message: '' });
    const [errors, setErrors] = useState<FieldError[]>([]);
    const {addToast} = useToast();

    const navigate = useNavigate();

    const handlePasswordChange = (password: string) => {
        setPassword(password);
    }

    const handleSubmit = (event: React.FormEvent) => {
        const config = {
            headers:
                { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        event.preventDefault();

        const newPassword: CreatePasswordDto = {
            name: name,
            identifier: identifier,
            sitePassword: password,
            uri: uri,
            note: note,
        }

        const verification = verifyPasswordForm(newPassword);
        setErrors(verification);

        if (verification.length == 0) {
            try {
                if (props.isEditiing && props.passwordDto) {
                    const password: PasswordDto = { ...newPassword, id: props.passwordDto.id }
                    axios.put('http://localhost:8080/password', password, config)
                } else {
                    axios.post('http://localhost:8080/password', newPassword, config);
                }
                navigate(0);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setShowAlert({ show: true, message: error.message })
                }
            }
        }
    }

    const passwordPannelButtons = () => {
        if (passwordPanel) {
            return (
                <>
                    <OverlayTrigger
                        key={'copyPassword'}
                        placement={'top'}
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                Copier le mot de passe
                            </Tooltip>
                        }
                    >
                        <Button onClick={() => copyToClipboard('Mot de passe copié 😶‍🌫️ !')}><Copy size={15} /></Button>
                    </OverlayTrigger>
                    <Button variant="danger" onClick={() => setPasswordPanel(false)}><X size={20} /></Button>
                </>
            )
        } else {
            return (
                <OverlayTrigger
                    key={'generatePassword'}
                    placement={'top'}
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Ouvrir l'outil de génération de mot de passe
                        </Tooltip>
                    }
                >
                    <Button onClick={() => setPasswordPanel(true)}>Générer</Button>
                </OverlayTrigger>
            )
        }
    }

    const copyToClipboard = (message: string) => {
        navigator.clipboard.writeText(password).then(() => {
            addToast(
                message, {
                    delay: 3000,
                    autohide: true
                }
            )
        });
    }

    return (
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            {displayAlert(showAlert)}
            <FormGroup>
                <FormLabel>Nom <Required /></FormLabel>
                <FormControl type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <RenderErrors errors={errors} field={CreatePasswordEnum.NAME} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Identifiant <Required /></FormLabel>
                <FormControl type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
                <RenderErrors errors={errors} field={CreatePasswordEnum.IDENTIFIER} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Mot de passe <Required /></FormLabel>
                <InputGroup>
                    <FormControl type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                    {passwordPannelButtons()}
                </InputGroup>
                {passwordPanel ? (<PasswordGeneratorForm onPasswordChange={handlePasswordChange} />) : (<></>)}
                <RenderErrors errors={errors} field={CreatePasswordEnum.PASSWORD} />
            </FormGroup>
            <FormGroup>
                <FormLabel>URI <Required /></FormLabel>
                <FormControl type="text" value={uri} onChange={(e) => setUri(e.target.value)} />
                <RenderErrors errors={errors} field={CreatePasswordEnum.URI} />
            </FormGroup>
            <FormGroup>
                <FormLabel>Note</FormLabel>
                <FormControl
                    as={"textarea"}
                    placeholder="Mettez une note sur vos identifiant de connection"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
            </FormGroup>
            <Button type="submit" className="w-100">{props.isEditiing ? 'Modifier' : 'Créer'}</Button>
        </Form>
    )
}

function displayAlert(showAlert: Alert) {
    if (!showAlert.show) {
        return (<></>)
    }

    return (
        <Alert variant="danger" dismissible>
            <AlertHeading>Erreur</AlertHeading>
            <p>{showAlert.message}</p>
        </Alert>
    )
}

import { Alert, AlertHeading, Button, Form, FormControl, FormGroup, FormLabel, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import PasswordGeneratorForm from "./PasswordGeneratorForm";
import React, { useState } from "react";
import { CreatePasswordDto, PasswordDto } from "../../model/PasswordModels";
import axios from "axios";
import { FieldError, RenderErrors } from "../error";
import verifyPasswordForm from "./verifyPasswordForm";
import { CreatePasswordEnum } from "../../enum/ErrorFieldEnum";
import Required from "../required";

interface PasswordFormProps {
    passwordDto?: PasswordDto,
    isEditiing?: boolean,
}

interface Alert {
    show: boolean,
    message: string
}

export default function PasswordForm(props: PasswordFormProps) {
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState(props.passwordDto?.sitePassword ?? '');
    const [name, setName] = useState(props.passwordDto?.name ?? '');
    const [identifier, setIdentifier] = useState(props.passwordDto?.identifier ?? '');
    const [uri, setUri] = useState(props.passwordDto?.uri ?? '');
    const [note, setNote] = useState(props.passwordDto?.note ?? '');
    const [showAlert, setShowAlert] = useState<Alert>({ show: false, message: '' });
    const [errors, setErrors] = useState<FieldError[]>([]);

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

        if(verification.length == 0) {
            try {
                if(props.isEditiing && props.passwordDto){
                    const password: PasswordDto = {...newPassword, id: props.passwordDto.id}
                    axios.put('http://localhost:8080/password', password, config)
                } else {
                    axios.post('http://localhost:8080/password', newPassword, config);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setShowAlert({ show: true, message: error.message })
                }
            }
        }
    }

    return (
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
            {displayAlert(showAlert)}
            <FormGroup>
                <FormLabel>Nom <Required/></FormLabel>
                <FormControl type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <RenderErrors errors={errors} field={CreatePasswordEnum.NAME}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Identifiant <Required/></FormLabel>
                <FormControl type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
                <RenderErrors errors={errors} field={CreatePasswordEnum.IDENTIFIER}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>Mot de passe <Required /></FormLabel>
                <InputGroup>
                    <FormControl type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <OverlayTrigger
                        key={'generatePassword'}
                        placement={'top'}
                        overlay={
                            <Tooltip id={`tooltip-top`}>
                                Ouvrir l'outil de génération de mot de passe
                            </Tooltip>
                        }
                    >
                        <Button onClick={() => setShow(true)}>Générer</Button>
                    </OverlayTrigger>
                </InputGroup>
                {show ? (<PasswordGeneratorForm onPasswordChange={handlePasswordChange} />) : (<></>)}
                <RenderErrors errors={errors} field={CreatePasswordEnum.PASSWORD}/>
            </FormGroup>
            <FormGroup>
                <FormLabel>URI <Required /></FormLabel>
                <FormControl type="text" value={uri} onChange={(e) => setUri(e.target.value)} />
                <RenderErrors errors={errors} field={CreatePasswordEnum.URI}/>
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

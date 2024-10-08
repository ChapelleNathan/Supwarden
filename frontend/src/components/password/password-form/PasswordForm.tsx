import { Alert, AlertHeading, Button, Form, FormControl, FormGroup, FormLabel, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import PasswordGeneratorForm from "./PasswordGeneratorForm.tsx";
import React, { ReactNode, useState } from "react";
import { CreatePasswordDto, PasswordDto } from "../../../model/PasswordModels.ts";
import axios, { AxiosResponse } from "axios";
import { FieldError, RenderErrors } from "../../error.tsx";
import verifyPasswordForm from "./verifyPasswordForm.tsx";
import { CreatePasswordEnum } from "../../../enum/ErrorFieldEnum.ts";
import Required from "../../required.tsx";
import { Copy, Floppy, PencilSquare, X } from "react-bootstrap-icons";
import { useToast } from "../../../context/ToastContext.tsx";
import ServiceResponse from "../../../model/ServiceResponse.ts";
import { UserGroupDTO } from "../../../model/GroupModels.ts";

interface PasswordFormProps {
    passwordDto?: PasswordDto,
    isEditing?: boolean,
    groupId?: string,
    onPasswordCreate?: (password: PasswordDto) => void,
    userGroup?: UserGroupDTO,
}

interface Alert {
    show: boolean,
    message: string
}

const config = {
    headers:
        { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

export default function PasswordForm({ passwordDto, isEditing, groupId, onPasswordCreate, userGroup }: PasswordFormProps) {
    const [passwordPanel, setPasswordPanel] = useState(false);
    const [password, setPassword] = useState(passwordDto?.sitePassword ?? '');
    const [name, setName] = useState(passwordDto?.name ?? '');
    const [identifier, setIdentifier] = useState(passwordDto?.identifier ?? '');
    const [uri, setUri] = useState(passwordDto?.uri ?? '');
    const [note, setNote] = useState(passwordDto?.note ?? '');
    const [showAlert, setShowAlert] = useState<Alert>({ show: false, message: '' });
    const [errors, setErrors] = useState<FieldError[]>([]);
    const { addToast } = useToast();
    const canEdit: boolean = userGroup?.canEdit || userGroup == null;
    
    const handlePasswordChange = (password: string) => {
        setPassword(password);
    }

    const handleSubmit = async (event: React.FormEvent) => {
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
                var response: AxiosResponse;
                if (isEditing && passwordDto) {
                    const password: PasswordDto = { ...newPassword, id: passwordDto.id, groupId: groupId }
                    response = await axios.put('http://localhost:8080/password', password, config)
                    addToast(
                        'Vous avez bien modifier le mot de passe',
                        {
                            bg: 'success',
                            autohide: true,
                            delay: 3000
                        }
                    )
                } else {
                    response = await axios.post('http://localhost:8080/password', { ...newPassword, groupId: groupId }, config);
                    addToast(
                        'Vous avez bien créer votre mot de passe',
                        {
                            bg: 'success',
                            autohide: true,
                            delay: 3000
                        }
                    )
                }
                const serviceResponse = response.data as ServiceResponse
                if (onPasswordCreate)
                    onPasswordCreate(serviceResponse.data as PasswordDto);
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

    const displaySaveOrModify = (): ReactNode => {
        if (isEditing) {
            return (
                <Button type="submit" className={(canEdit ? '' : 'disabled') + ' col'}>
                    <PencilSquare /> Modifier
                </Button>
            );
        }
        
        return (
            <Button type="submit" className={(canEdit ? '' : 'disabled') + ' col'}>
                <Floppy /> Créer
            </Button>
        )
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
            <div className="actions d-flex gap-2">
            {displaySaveOrModify()}
            </div>
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

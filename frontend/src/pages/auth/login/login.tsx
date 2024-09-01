import { Form, Link, useNavigate } from "react-router-dom";
import { FieldError, RenderErrors } from "../../../components/error";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import React, { useState } from "react";
import { ConnectionErrorEnum } from "../../../enum/ErrorFieldEnum";
import { AuthUserDTO, ConnectedUserDTO, GoogleUserDTO } from "../../../model/UserModels";
import { verifyLoginForm } from "../verifyForm";
import axios from "axios";
import ServiceResponse from "../../../model/ServiceResponse";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { LocalStorageEnum } from "../../../enum/LocalStorageEnum";
import { useToast } from "../../../context/ToastContext";

export default function Login() {
    const [errors, setErrors] = useState<FieldError[]>([]);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const authUser: AuthUserDTO = {
            email: email,
            password: password
        };
        const verification = verifyLoginForm(authUser);
        setErrors(verification);
        if (verification.length == 0) {
            try {
                const response = await axios.post('http://localhost:8080/login', authUser);
                const serviceResponse = response.data as ServiceResponse;
                const connectedUser = serviceResponse.data as ConnectedUserDTO;
                localStorage.setItem(LocalStorageEnum.TOKEN, connectedUser.token);
                localStorage.setItem(LocalStorageEnum.ID, connectedUser.id);
                localStorage.setItem(LocalStorageEnum.EMAIL, connectedUser.email);
                localStorage.setItem(LocalStorageEnum.IDENTIFIED_WITH_GOOGLE, connectedUser.identifiedWithGoogle.toString());
                navigate('/home')
            } catch (e) {
                if (axios.isAxiosError(e)) {
                    const errorMessage = e.response?.data.message;
                    setErrors([{ field: ConnectionErrorEnum.DEFAULT, message: errorMessage }]);
                }
            }
        }
    }

    const onGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            const decoded: any = jwtDecode(credentialResponse.credential);
            const googleUser: GoogleUserDTO = {
                email: decoded.email,
                lastname: decoded.family_name,
                firstname: decoded.given_name
            }
            try {
                const serviceResponse = (await axios.post(`http://localhost:8080/login/google`, googleUser)).data as ServiceResponse;
                const connectedUser = serviceResponse.data as ConnectedUserDTO;
                localStorage.setItem(LocalStorageEnum.TOKEN, connectedUser.token);
                localStorage.setItem(LocalStorageEnum.ID, connectedUser.id);
                localStorage.setItem(LocalStorageEnum.EMAIL, connectedUser.email);
                localStorage.setItem(LocalStorageEnum.IDENTIFIED_WITH_GOOGLE, connectedUser.identifiedWithGoogle.toString());
                navigate('/home');
            } catch (error) {
                if(axios.isAxiosError(error)) {
                    const serviceResponse = error.response?.data as ServiceResponse;
                    addToast(serviceResponse.message, {
                        bg: 'danger',
                    })
                }
            }
        }
    }

    const onGoogleFailure = () => {
        console.log('failure');
    }

    return (
        <section className="w-100 align-self-center">
            <Form className="border col-8 offset-2 rounded p-5 d-flex flex-column gap-3" onSubmit={handleSubmit}>
                <h1 className="text-center">Connection</h1>
                <RenderErrors errors={errors} field={ConnectionErrorEnum.DEFAULT} />
                <FormGroup controlId="email" className="col">
                    <FormLabel>Email</FormLabel>
                    <FormControl type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <RenderErrors errors={errors} field={ConnectionErrorEnum.EMAIL} />
                </FormGroup>
                <FormGroup controlId="password">
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <RenderErrors errors={errors} field={ConnectionErrorEnum.PASSWORD} />
                </FormGroup>
                <div className="buttons d-flex justify-content-center gap-5">
                    <Button className="col-2 align-self-center" type="submit">Connection</Button>
                    <GoogleLogin
                        onSuccess={credentialResponse => onGoogleSuccess(credentialResponse)}
                        onError={onGoogleFailure}
                    />
                </div>
                <p className="align-self-center">Pas de compte ? Créez en un <Link to={'/signin'} className="primary">ici</Link></p>
            </Form>
        </section>
    )
}
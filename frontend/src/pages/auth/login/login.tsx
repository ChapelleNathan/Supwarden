import { Form, Link, useNavigate } from "react-router-dom";
import { FieldError, RenderErrors } from "../../../components/error";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import React, { useState } from "react";
import { ConnectionErrorEnum } from "../../../enum/ErrorFieldEnum";
import { AuthUserDTO, ConnectedUserDTO } from "../../../model/UserModels";
import { verifyLoginForm } from "../verifyForm";
import axios from "axios";
import ServiceResponse from "../../../model/ServiceResponse";

export default function Login() {
    const [errors, setErrors] = useState<FieldError[]>([]);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
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
                localStorage.setItem("token", connectedUser.token);
                localStorage.setItem("id", connectedUser.id);
                localStorage.setItem("email", connectedUser.email);
                navigate('/home')
            } catch (e) {
                if(axios.isAxiosError(e)){
                    const errorMessage = e.response?.data.message;
                    setErrors([{field: ConnectionErrorEnum.DEFAULT, message: errorMessage}]);
                }
            }
        }
    }

    return (
        <section className="w-100 align-self-center">
            <Form className="border col-8 offset-2 rounded p-5 d-flex flex-column gap-3" onSubmit={handleSubmit}>
                <h1 className="text-center">Inscription</h1>
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
                <Button className="col-2 align-self-center" type="submit">Connection</Button>
                <p className="align-self-center">Pas de compte ? Créez en un <Link to={'/signin'} className="primary">ici</Link></p>
            </Form>
        </section>
    )
}
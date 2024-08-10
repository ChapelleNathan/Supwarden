import React, { useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { CreateUserDTO } from "../../../model/UserModels";
import { FieldError, RenderErrors } from "../../../components/error";
import verifySigninForm from "./verifyForm";
import { ConnectionErrorEnum } from "../../../enum/ErrorFieldEnum";
import axios from "axios";

export default function Signin() {
    const [firsname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<FieldError[]>([]);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: CreateUserDTO = {
            firstname: firsname,
            lastname: lastname,
            email: email,
            phoneNumber: phoneNumber,
            password: password
        }
        const validations = verifySigninForm(newUser, confirmPassword)
        setErrors(validations)
        if (validations.length == 0) {
            try {
                await axios.post('http://localhost:8080/signin', newUser);
                navigate('/login');
            } catch (e: any) {
                if (axios.isAxiosError(e)) {
                    const errorMessage = e.response?.data.message;
                    setErrors([...errors, { field: ConnectionErrorEnum.DEFAULT, message: errorMessage }])
                }
            }
        }
    }

    return (
        <section className="w-100 align-self-center">
            <Form className="border col-8 offset-2 rounded p-5 d-flex flex-column gap-3" onSubmit={handleSubmit}>
                <h1 className="text-center">Inscription</h1>
                <RenderErrors errors={errors} field={ConnectionErrorEnum.DEFAULT} />
                <div className="name row">
                    <FormGroup controlId="firstname" className="col">
                        <FormLabel>Prénom</FormLabel>
                        <FormControl type="text" onChange={(e) => setFirstname(e.target.value)} value={firsname} />
                        <RenderErrors errors={errors} field={ConnectionErrorEnum.FIRSNAME} />
                    </FormGroup>
                    <FormGroup controlId="lastname" className="col">
                        <FormLabel>Nom</FormLabel>
                        <FormControl type="text" onChange={(e) => setLastname(e.target.value)} value={lastname} />
                        <RenderErrors errors={errors} field={ConnectionErrorEnum.LASTNAME} />
                    </FormGroup>
                </div>
                <div className="coordinate row">
                    <FormGroup controlId="email" className="col">
                        <FormLabel>Email</FormLabel>
                        <FormControl type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        <RenderErrors errors={errors} field={ConnectionErrorEnum.EMAIL} />
                    </FormGroup>
                    <FormGroup controlId="phoneNumber" className="col">
                        <FormLabel>Numéro de téléphone</FormLabel>
                        <FormControl type="tel" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} />
                        <RenderErrors errors={errors} field={ConnectionErrorEnum.PHONENUMBER} />
                    </FormGroup>
                </div>
                <FormGroup controlId="password">
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    <RenderErrors errors={errors} field={ConnectionErrorEnum.PASSWORD} />
                </FormGroup>
                <FormGroup controlId="confirmPassword">
                    <FormLabel>Confirmez le mot de passe</FormLabel>
                    <FormControl type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
                    <RenderErrors errors={errors} field={ConnectionErrorEnum.CONFIRMPASSWORD} />
                </FormGroup>
                <Button className="col-2 align-self-center" type="submit">Créer un compte</Button>
                <p className="align-self-center">Déjà un compte ? Connectez vous <Link to={'/login'} className="primary">ici</Link></p>
            </Form>
        </section>
    )
}
"use client"

import CreateUserDto from "@/app/DTO/UserDto";
import axios from "axios";
import { redirect } from "next/navigation";
import React, { useState } from "react"
import { navigate } from "./action";

export default function SignInRoute() {

    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<Error[]>([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUser: CreateUserDto = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            phoneNumber: phoneNumber,
            password: password
        };

        const validations = verifySigninForm(newUser, confirmPassword);
        setErrors(validations);
        
        if (validations.length == 0) {
            await axios.post('http://localhost:8080/signin', newUser);
            navigate();
        }
    }


    return (
        <form onSubmit={handleSubmit} className="border border-2 rounded-2 col-5 p-4 d-flex flex-column align-items-center">
            <h1>Création de compte</h1>
            <div className="mb-2 col-7">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <RenderError errors={errors} type="email"/>
            </div>
            <div className="mb-2 col-7">
                <label htmlFor="firstname" className="form-label">Prénom</label>
                <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                <RenderError errors={errors} type="firstname"/>
            </div>
            <div className="mb-2 col-7">
                <label htmlFor="lastname" className="form-label">Nom</label>
                <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
                <RenderError errors={errors} type="lastname"/>
            </div>
            <div className="mb-2 col-7">
                <label htmlFor="tel" className="form-label">Numéro de téléphone</label>
                <input
                    type="tel"
                    className="form-control"
                    id="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <RenderError errors={errors} type="phoneNumber"/>
            </div>
            <div className="mb-2 col-7">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <RenderError errors={errors} type="password"/>
            </div>
            <div className="mb-2 col-7">
                <label htmlFor="confirmPassword" className="form-label">Confirmez le mot de passe</label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <RenderError errors={errors} type="confirmPassword"/>
            </div>
            <button
                type="submit"
                className={"btn btn-primary col-4 mt-3"}
            >Créer mon compte</button>
            <p className="fs-6 m-0 mt-2">Déjà un compte ? connecter vous ici</p>
        </form>
    )
}

interface ErrorProps {
    errors: Error[];
    type: string;
}

const RenderError: React.FC<ErrorProps> = ({errors, type}) => {
    let html = <></>; 
    errors.forEach(error => {
        if (error.field == type) {
            console.log(error);
            html = <p className="text-danger mb-1">{error.message}</p>
        }
    })
    return html;
}



function verifySigninForm(user: CreateUserDto, confirmPassword: string): Error[] {
    let errors: Error[] = [];

    if (user.email == '') {
        errors.push(new Error('email', 'L\'email est obligatoire'))
    }

    if (user.password == '') {
        errors.push(new Error('password', 'Le mot de passe est obligatoire'))
    }

    if (user.firstname == '') {
        errors.push(new Error('firstname', 'Le prénom est obligatoire'))
    }

    if (user.lastname == '') {
        errors.push(new Error('lastname', 'Le nom est obligatoire'))
    }

    if (user.phoneNumber == '') {
        errors.push(new Error('phoneNumber', 'Le numéro de téléphone est obligatoire'))
    }

    if (user.password != confirmPassword) {
        errors.push(new Error('confirmPassword', 'Les mot de passes doivent être les mêmes'))
    }
    return errors;
}

class Error {
    constructor(field: string, message: string) {
        this.field = field;
        this.message = message;
    }
    field: string = '';
    message: string = '';
}


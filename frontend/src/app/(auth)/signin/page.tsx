"use client"

import CreateUserDto from "@/app/DTO/UserDto";
import axios from "axios";
import { useState } from "react"

export default function SignInRoute() {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUser: CreateUserDto = {
            email: email,
            firstname: firstname,
            lastname: lastname,
            phoneNumber: phoneNumber,
            password: password
        };

        if(isValid) {
            const response = await axios.post('http://localhost:8080/signin', newUser);
            console.log(response);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="border border-2 rounded-2 col-5 p-4 d-flex flex-column align-items-center">
            <h1>Création de compte</h1>
            <div className="mb-3 col-7">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3 col-7">
                <label htmlFor="firstname" className="form-label">Prénom</label>
                <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </div>
            <div className="mb-3 col-7">
                <label htmlFor="lastname" className="form-label">Nom</label>
                <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                />
            </div>
            <div className="mb-3 col-7">
                <label htmlFor="tel" className="form-label">Numéro de téléphone</label>
                <input
                    type="tel"
                    className="form-control"
                    id="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div className="mb-3 col-7">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-3 col-7">
                <label htmlFor="confirmPassword" className="form-label">Confirmez le mot de passe</label>
                <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className={(isValid ? "" : "disabled ") + "btn btn-primary col-4 mt-3"}
            >Créer mon compte</button>
            <p className="fs-6 m-0 mt-2">Déjà un compte ? connecter vous ici</p>
        </form>
    )
}


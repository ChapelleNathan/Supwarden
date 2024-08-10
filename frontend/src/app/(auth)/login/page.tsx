'use client'
import ServiceResponse from "@/app/DTO/ServiceResponse";
import { AuthUserDto, ConnectedUserDto } from "@/app/DTO/UserDto";
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";

export default function SignUnRoute() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<Error[]>([]);
    const [alert, setAlert] = useState<AlertProps>({ alert: false, message: '' });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const authUserDto: AuthUserDto = {
            email: email,
            password: password
        };

        const validations = verifyLoginForm(authUserDto)
        setErrors(validations)
        let serviceResponse: ServiceResponse;
        if (validations.length == 0) {
            try {
                const response = await axios.post('http://localhost:8080/login', authUserDto);
                serviceResponse = response.data as ServiceResponse;
                const connectedUserDto = serviceResponse.data as ConnectedUserDto;
                localStorage.setItem("token", connectedUserDto.token);
                localStorage.setItem("email", connectedUserDto.email);
            } catch (e: any) {
                serviceResponse = e.response.data as ServiceResponse;
                if (serviceResponse.httpCode == 400) {
                    setAlert({ alert: true, message: serviceResponse.message });
                }
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="border border-2 rounded-2 col-5 p-4 d-flex flex-column align-items-center">
            <h1>Connection</h1>
            <RenderAlert alert={alert.alert} message={alert.message} />
            <div className="mb-2 col-7">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <RenderError errors={errors} type="email" />
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
                <RenderError errors={errors} type="password" />
            </div>
            <button
                type="submit"
                className={"btn btn-primary col-4 mt-3"}
            >Créer mon compte</button>
            <p className="fs-6 m-0 mt-2">Pas de compte ? Inscrivez vous <span role="button" className="text-primary">ici</span></p>
        </form>
    )
}

interface AlertProps {
    alert: boolean,
    message: string
}

const RenderAlert: React.FC<AlertProps> = ({ alert, message }) => {
    const [display, setDisplay] = useState(alert);
    console.log(display, alert);
    useEffect(() => {
        setDisplay(alert)
    }, [])

    if (display) {
        return (
            <div className="alert alert-danger alert-dismissible w-100" role="alert">
                <div>{message}</div>
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setDisplay(false)}></button>
            </div>
        )
    }
    return (<></>)
}

interface ErrorProps {
    errors: Error[];
    type: string;
}

const RenderError: React.FC<ErrorProps> = ({ errors, type }) => {
    let html = <></>;
    errors.forEach(error => {
        if (error.field == type) {
            console.log(error);
            html = <p className="text-danger mb-1">{error.message}</p>
        }
    })
    return html;
}

function verifyLoginForm(createUserDto: AuthUserDto): Error[] {
    let errors: Error[] = [];
    if (createUserDto.email == '') {
        errors.push(new Error('email', 'L\'email ne peux pas être vide'))
    }

    if (createUserDto.password == '') {
        errors.push(new Error('password', 'Le mot de passe ne peux pas être vide'))
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

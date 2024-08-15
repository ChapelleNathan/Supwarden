import { useEffect, useState } from "react";
import { FormCheck, FormGroup, FormLabel } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";

interface Props {
    onPasswordChange: any
}

export default function PasswordGeneratorForm(props: Props) {
    const [numCaracters, setNumCaracters] = useState('6');
    const [lowercase, setLowercase] = useState(false);
    const [uppercase, setUppercase] = useState(false);
    const [number, setNumber] = useState(false);
    const [areSpecialChars, setAreSpecialChars] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');

    useEffect(() => {
        props.onPasswordChange(generatedPassword)
    }, [generatedPassword])

    const generatePassword = (): void => {
        const lowercaseChars: string = 'abcdefghijklmnopqrstuvwxyz'
        const uppercaseChars: string = lowercaseChars.toUpperCase();
        const numberChars: string = '0123456789';
        const specialChars: string = '!@#$%^&*()_-+=|;"<>.?/';

        const chars: string = (lowercase ? lowercaseChars : '')
            + (uppercase ? uppercaseChars : '')
            + (number ? numberChars : '')
            + (areSpecialChars ? specialChars : '');

            
        if (chars === '') {
            setLowercase(true)
        }
        let password: string = '';


        for (let i = 0; i < parseInt(numCaracters); i++) {
            password += chars[Math.floor(Math.random() * chars.length)]
        }

        setGeneratedPassword(password);
    }

    useEffect(() => {
        generatePassword()
    }, [numCaracters, lowercase, uppercase, number, areSpecialChars])

    return (
        <div className="d-flex flex-column gap-1">
            <div className="d-flex">
                <FormCheck
                    type="switch"
                    id="lowercase"
                    label="Minuscules"
                    className="col-5"
                    checked={lowercase}
                    onChange={(e) => setLowercase(e.target.checked)}
                />
                <FormCheck
                    type="switch"
                    id="uppercase"
                    label="Majuscule"
                    className="offset-1 col-5"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                />
            </div>
            <div className="d-flex justify-content-between">
                <FormCheck
                    type="switch"
                    id="number"
                    label="Chiffres"
                    className="col"
                    checked={number}
                    onChange={(e) => setNumber(e.target.checked)}
                />
                <FormCheck
                    type="switch"
                    id="specialChars"
                    label="Caractères spéciaux"
                    className="col"
                    checked={areSpecialChars}
                    onChange={(e) => setAreSpecialChars(e.target.checked)}
                />
            </div>
            <FormGroup>
                <FormLabel>Nombres de caractères: {numCaracters}</FormLabel>
                <FormRange min={16} max={34} value={numCaracters} onChange={(e) => setNumCaracters(e.target.value)} />
            </FormGroup>
        </div>
    )
}

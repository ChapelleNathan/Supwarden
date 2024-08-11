import { useEffect, useState } from "react";
import { Form, FormCheck, FormGroup, FormLabel, Row } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";


export default function PasswordForm() {
    const [numCaracters, setNumCaracters] = useState('6');
    const [lowercase, setLowercase] = useState(false);
    const [uppercase, setUppercase] = useState(false);
    const [number, setNumber] = useState(false);
    const [areSpecialChars, setAreSpecialChars] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');


    const generatePassword = (): void => {
        const lowercaseChars: string = 'abcdefghijklmnopqrstuvwxyz'
        const uppercaseChars: string = lowercaseChars.toUpperCase();
        const numberChars: string = '0123456789';
        const specialChars: string = '!@#$%^&*()_-+=|;"<>.?/';

        const chars: string = (lowercase ? lowercaseChars : '')
            + (uppercase ? uppercaseChars : '')
            + (number ? numberChars : '')
            + (areSpecialChars ? specialChars : '');

        let password: string = '';

        for (let i = 0; i < parseInt(numCaracters); i++) {
            password += chars[Math.floor(Math.random() * chars.length)]
        }
        setGeneratedPassword(password);
        if (chars === 'false') {
            console.log('test');
            setGeneratedPassword('Veuillez selectionner les options pour générer un mot de passe')
        }
    }

    useEffect(() => {
        generatePassword()
    }, [numCaracters, lowercase, uppercase, number, areSpecialChars])

    return (
        <section className="col-12">
            <Form className="d-flex flex-column" onSubmit={generatePassword}>
                <Row>
                    <FormCheck
                        type="switch"
                        id="lowercase"
                        label="Inclure des minuscules"
                        className="col"
                        checked={lowercase}
                        onChange={(e) => setLowercase(e.target.checked)}
                    />
                    <FormCheck
                        type="switch"
                        id="uppercase"
                        label="Inclure des majuscule"
                        className="col"
                        checked={uppercase}
                        onChange={(e) => setUppercase(e.target.checked)}
                    />
                </Row>
                <Row>
                    <FormCheck
                        type="switch"
                        id="number"
                        label="Inclure des chiffres"
                        className="col"
                        checked={number}
                        onChange={(e) => setNumber(e.target.checked)}
                    />
                    <FormCheck
                        type="switch"
                        id="specialChars"
                        label="Inclure des caractères spéciaux"
                        className="col"
                        checked={areSpecialChars}
                        onChange={(e) => setAreSpecialChars(e.target.checked)}
                    />
                </Row>
                <FormGroup>
                    <FormLabel>Nombres de caractères: {numCaracters}</FormLabel>
                    <FormRange min={16} max={34} value={numCaracters} onChange={(e) => setNumCaracters(e.target.value)} />
                </FormGroup>
                <p>{generatedPassword}</p>
            </Form>
        </section>
    )
}

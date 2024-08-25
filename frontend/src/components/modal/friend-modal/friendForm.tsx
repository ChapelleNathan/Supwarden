import { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";

export default function FriendForm() {
    const [contactEmail, setContactEmail] = useState('');

    useEffect(() => {
        const fetchUsers = () => {
            
        }

        fetchUsers();
    }, [contactEmail])

    return (
        <Form>
            <FormGroup>
                <FormLabel>Email du contact</FormLabel>
                <FormControl value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email"/>
            </FormGroup>
            <Button>Ajouter</Button>
        </Form>
    )
} 
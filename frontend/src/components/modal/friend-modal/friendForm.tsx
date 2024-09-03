import axios from "axios";
import { useEffect, useState } from "react";
import { Form, FormControl, FormGroup, InputGroup } from "react-bootstrap";
import ServiceResponse from "../../../model/ServiceResponse";
import { UserDTO } from "../../../model/UserModels";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { Search } from "react-bootstrap-icons";

interface FriendFormProps {
    onUserSearch: (users: UserDTO[]) => void;
}

export default function FriendForm({ onUserSearch }: FriendFormProps) {
    const [contactEmail, setContactEmail] = useState('');

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const fetchUsers = async () => {
            const response = await axios.get(`http://localhost:8080/user/search?email=${contactEmail}`, config);
            const serviceResponse = response.data as ServiceResponse;
            onUserSearch(serviceResponse.data as UserDTO[])

        }

        contactEmail != '' ? fetchUsers() : onUserSearch([])
    }, [contactEmail])

    return (
        <Form className="border-right">
            <FormGroup>
                <InputGroup>
                    <InputGroupText>
                        <Search />
                    </InputGroupText>
                    <FormControl value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email" placeholder="Rechercher votre nouvel ami !" />
                </InputGroup>
            </FormGroup>
        </Form>
    )
} 
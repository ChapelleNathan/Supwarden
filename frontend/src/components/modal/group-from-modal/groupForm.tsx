import { Button, Form } from "react-bootstrap";
import { GroupDTO } from "../../../model/GroupModels";
import { useState } from "react";
import axios from "axios";
import ServiceResponse from "../../../model/ServiceResponse";

interface GroupFormProps {
    modifiedGroup?: GroupDTO,
    onGroupCreated: (createdGroup: GroupDTO) => void;
}

export default function GroupForm({modifiedGroup, onGroupCreated}: GroupFormProps) {
    const [groupName, setGroupName] = useState(modifiedGroup?.name ?? '');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const config = {
            headers:
                { Authorization: `Bearer ${localStorage.getItem('token')}` }
        };
        
        const response = await axios.post(`http://localhost:8080/group?groupname=${groupName}`, null, config);
        const serviceResponse = response.data as ServiceResponse;
        console.log(serviceResponse.data);
        onGroupCreated(serviceResponse.data as GroupDTO);
        
    }

    return(
        <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Form.Group>
                <Form.Label>Nom du groupe</Form.Label>
                <Form.Control value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
            </Form.Group>
            <Button className="col-4 offset-4" type="submit">Créer le Trousseau</Button>
        </Form>
    )
}
import { useEffect, useState } from "react";
import { LightGroupDTO } from "../../../../model/GroupModels";
import axios from "axios";
import ServiceResponse from "../../../../model/ServiceResponse";
import { UserDTO } from "../../../../model/UserModels";

interface GroupParameterProps {
    lightGroup: LightGroupDTO
}

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export default function GroupParameter({lightGroup}: GroupParameterProps) {
    const [users, setUsers] = useState<UserDTO[]>([]);
    
    useEffect(() => {
        const fetchUsers = async() => {
            if(lightGroup) {
                const serviceResponse = (await (axios.get(`http://localhost:8080/group/${lightGroup.id}/users`, config))).data as ServiceResponse;
                setUsers(serviceResponse.data as UserDTO[])
            }
        }

        fetchUsers();
    }, [])

    const displayUsers = () => {
        return users.map(user => (
            <li>
                {user.email}
            </li>
        ));
    }

    return (
        <ul>
            {displayUsers()}
        </ul>
    )
}
import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import ServiceResponse from "../../../model/ServiceResponse"
import { UserDTO } from "../../../model/UserModels"
import { Button } from "react-bootstrap"
import { Plus } from "react-bootstrap-icons"
import {  LightGroupDTO, UserGroupDTO } from "../../../model/GroupModels"
import { useToast } from "../../../context/ToastContext"

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

interface FriendListModalProps {
    lightGroup: LightGroupDTO
}

export default function FriendListModal({ lightGroup }: FriendListModalProps) {
    const [users, setUsers] = useState<UserDTO[]>([]);
    // const [group, setGroup] = useState<UserDTO[]>([]);
    const { addToast } = useToast();

    useEffect(() => {
        const fetchUserFriend = async () => {
            let serviceResponse = (await axios.get(`http://localhost:8080/user-contact/friends`, config)).data as ServiceResponse;
            const friendList = serviceResponse.data as UserDTO[];

            serviceResponse = (await axios.get(`http://localhost:8080/group/${lightGroup.id}/users`, config)).data as ServiceResponse;
            const userGroups = serviceResponse.data as UserGroupDTO[]
            const usersInGroup = userGroups.map(userGroup => userGroup.user.id);
            const usersNotInGroup: UserDTO[] = []; 
            friendList.forEach(user => {
                if(!usersInGroup.includes(user.id)){
                    usersNotInGroup.push(user);
                }
            })
            setUsers([...usersNotInGroup]);
        }

        if (lightGroup) {
            fetchUserFriend();
        }
    }, [])

    const addToGroup = async (user: UserDTO) => {
        try {
            await axios.post(`http://localhost:8080/group/${lightGroup.id}/add-user/${user.id}`, null, config);
            setUsers([...users.filter(friend => friend.id != user.id)])
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serviceResponse = error.response?.data as ServiceResponse;
                addToast(
                    serviceResponse.message, {
                        bg: 'danger',
                        delay: 3000,
                        autohide: true
                    }
                )
            }
        }
    }

    const displayFriends = (friends: UserDTO[]): ReactNode => {
        if (friends.length == 0) {
            return (<p>Vous n'avez pas d'ami à ajouter 😟</p>)
        }

        return users.map((user, index) => (
            <li className="list-group-item list-group-item-action d-flex justify-content-between" key={index}>
                {user.email}
                <Button onClick={() => addToGroup(user)} size="sm" variant="outline-primary" className="px-1 py-0">
                    <Plus size={25} />
                </Button>
            </li>
        ))

    }

    return (
        <ul className="list-group">
            {displayFriends(users)}
        </ul>
    )
}
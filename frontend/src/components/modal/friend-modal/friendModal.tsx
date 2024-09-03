import { ReactNode, useEffect, useState } from "react";
import FriendForm from "./friendForm";
import { UserContactDTO, UserDTO } from "../../../model/UserModels";
import { Button } from "react-bootstrap";
import { Check, Plus, X } from "react-bootstrap-icons";
import axios from "axios";
import ServiceResponse from "../../../model/ServiceResponse";
import { useToast } from "../../../context/ToastContext";

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export default function FriendModal() {
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [friendRequests, setFriendRequests] = useState<UserContactDTO[]>([]);
    const { addToast } = useToast();

    const friendList = (searchedUsers: UserDTO[]) => {
        setUsers(searchedUsers)
    }

    useEffect(() => {
        const fetchFriendRequest = async () => {
            const response = await axios.get(`http://localhost:8080/user-contact/friend-requests`, config);
            const serviceResponse = response.data as ServiceResponse;
            setFriendRequests(serviceResponse.data as UserContactDTO[]);
        }
        fetchFriendRequest();
    }, [])

    const addFriend = async (user: UserDTO) => {
        try {
            await axios.post(`http://localhost:8080/user-contact/${user.id}`, null, config);
            addToast(`vous avez envoyer une demande d'ami à ${user.email} !`, {
                delay: 3000,
                autohide: true
            })
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serviceResponse = error.response?.data as ServiceResponse;
                addToast(
                    `${serviceResponse.message} ⚠️`,
                    {
                        bg: 'danger',
                        autohide: true,
                        delay: 3000
                    }
                )
            }
        }
    }

    const acceptFriendRequest = async (userContact: UserContactDTO) => {
        const response = await axios.put(`http://localhost:8080/user-contact/accept-request/${userContact.id}`, null, config)
        const serviceResponse = response.data as ServiceResponse;
        const acceptedFriend = serviceResponse.data as UserContactDTO;
        setFriendRequests([...friendRequests.filter(friendRequest => friendRequest.id != acceptedFriend.id)]);
        addToast(`vous êtes maintenant amis avec ${userContact.user1.email} !`, {
            delay: 3000,
            autohide: true,
            bg: 'success'
        })
    }

    const rejectFriendRequest = async (userContact: UserContactDTO) => {
        const response = await axios.put(`http://localhost:8080/user-contact/reject-request/${userContact.id}`, null, config);
        const serviceResponse = response.data as ServiceResponse;
        const rejectedFriend = serviceResponse.data as UserContactDTO;
        setFriendRequests([...friendRequests.filter(friendRequest => friendRequest.id != rejectedFriend.id)]);
        addToast(`Vous avez refuser d'être amis avec ${userContact.user1.email} 😟`, {
            delay: 3000,
            autohide: true
        })
    }


    const displayUsers = (): ReactNode => {
        return users.map((user, index) => (
            <li className="list-group-item list-group-item-action d-flex align-items-center justify-content-between" key={index}>
                {user.email}
                <Button onClick={() => addFriend(user)} size="sm" className="px-1 py-0 d-flex align-items-center" variant="outline-primary">
                    <Plus size={20} /> Ajouter
                </Button>
            </li>
        ))
    }

    const displayFrienRequests = (requests: UserContactDTO[]): ReactNode => {
        if (requests.length == 0) {
            return (<p>vous n'avez pas de demande d'amis 😔</p>)
        }

        return requests.map((friendRequest, index) => (
            <ul key={index} className="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
                {friendRequest.user1.email}
                <div className="actions d-flex gap-2">
                    <Button size="sm" variant="success" className="px-1 py-0 d-flex align-items-center" onClick={() => acceptFriendRequest(friendRequest)}>
                        <Check size={20} />
                    </Button>
                    <Button size="sm" variant="outline-danger" className="px-1 py-0 d-flex align-items-center" onClick={() => rejectFriendRequest(friendRequest)}>
                        <X size={20} />
                    </Button>
                </div>
            </ul>
        ))
    }

    return (
        <div className="friend-modal d-flex justify-content-center">
            <div className="d-flex flex-column col-5">
                <h2 className="mb-2">Recherchez un ami:</h2>
                <FriendForm onUserSearch={friendList} />
                <div className="friend-list">
                    <ul className="list-group">
                        {displayUsers()}
                    </ul>
                </div>
            </div>
            <div className="friend-requests col-5 offset-1">
                <h2 className="mb-2">Demandes d'amis:</h2>
                    <ul className="list-group">
                        {displayFrienRequests(friendRequests)}
                    </ul>
            </div>
        </div>
    )
}
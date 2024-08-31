import { useEffect, useState } from "react";
import { LightGroupDTO, UserGroupDTO } from "../../../../model/GroupModels";
import axios from "axios";
import ServiceResponse from "../../../../model/ServiceResponse";
import { FormCheck, Table } from "react-bootstrap";
import { useToast } from "../../../../context/ToastContext";

interface GroupParameterProps {
    lightGroup: LightGroupDTO
}

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export default function GroupParameter({ lightGroup }: GroupParameterProps) {
    const [userGroups, setUserGroups] = useState<UserGroupDTO[]>([]);
    const { addToast } = useToast();

    const handleCanEditChange = async (index: number, userGroup: UserGroupDTO) => {

        try {
            const serviceResponse = (await axios.put(`http://localhost:8080/group/${lightGroup.id}/changeEditPerm`, userGroup, config)).data as ServiceResponse;
            const userGroupResponse = serviceResponse.data as UserGroupDTO;

            setUserGroups(prevUserGroups =>
                prevUserGroups.map((userGroup, i) => {
                    return i === index ? userGroupResponse : userGroup
                })
            )

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serviceResponse = error.response?.data as ServiceResponse;
                addToast(serviceResponse.message, {
                    bg: 'danger',
                    autohide: true,
                    delay: 3000
                })
            }
        }
    }

    const handleIsCreatorChange = async (index: number, userGroup: UserGroupDTO) => {
        try {
            const serviceResponse = (await axios.put(`http://localhost:8080/group/${lightGroup.id}/changeCreatorPerm`, userGroup, config)).data as ServiceResponse;
            const userGroupResponse = serviceResponse.data as UserGroupDTO;

            const connectedUserGroup = userGroups.find(userGroup => userGroup.user.email === localStorage.getItem('email'));
            if (connectedUserGroup) {
                connectedUserGroup.isCreator = false;
                connectedUserGroup.canEdit = false;
                setUserGroups(prevUserGroups =>
                    prevUserGroups.map(userGroup => {
                        return userGroup.id === connectedUserGroup.id ? connectedUserGroup : userGroup;
                    }
                    )
                )
            }

            setUserGroups(prevUserGroups =>
                prevUserGroups.map((userGroup, i) => {
                    return index === i ? userGroupResponse : userGroup
                })
            )
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const serviceResponse = error.response?.data as ServiceResponse;
                addToast(serviceResponse.message, {
                    bg: "danger",
                    autohide: true,
                    delay: 3000
                })
            }
        }
    }


    useEffect(() => {
        const fetchUsers = async () => {
            if (lightGroup) {
                const serviceResponse = (await (axios.get(`http://localhost:8080/group/${lightGroup.id}/users`, config))).data as ServiceResponse;
                const userGroups = serviceResponse.data as UserGroupDTO[];
                setUserGroups(userGroups)
            }
        }

        fetchUsers();
    }, [])



    const displayUsers = () => {
        return userGroups.map((userGroup, index) => (
            <tr key={index}>
                <td>{userGroup.user.email}</td>
                <td>{userGroup.user.phoneNumber}</td>
                <td>
                    <FormCheck
                        type="switch"
                        id="canEdit"
                        checked={userGroup.canEdit}
                        onChange={() => handleCanEditChange(index, userGroup)}
                    />
                </td>
                <td>
                    <FormCheck
                        type="switch"
                        id="isCreator"
                        checked={userGroup.isCreator}
                        onChange={() => handleIsCreatorChange(index, userGroup)}
                    />
                </td>
            </tr>
        ));
    }

    return (
        <div className="group-details p-3">
            <Table>
                <thead>
                    <tr>
                        <td>Email</td>
                        <td>Numéro de téléphone</td>
                        <td>Modifier</td>
                        <td>Chef de groupe</td>
                    </tr>
                </thead>
                <tbody>
                    {displayUsers()}
                </tbody>
            </Table>
        </div>
    )
}
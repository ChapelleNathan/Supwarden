import { Button } from "react-bootstrap";
import { PasswordDto } from "../../model/PasswordModels";
import CreatePasswordTrigger from "./create-password-trigger";
import Password from "./password";
import { useEffect, useState } from "react";
import { Plus } from "react-bootstrap-icons";
import { UserGroupDTO } from "../../model/GroupModels";
import axios from "axios";
import ServiceResponse from "../../model/ServiceResponse";

interface PasswordListProps {
    passwords: PasswordDto[],
    groupId?: string,
}

const config = {
    headers:
        { Authorization: `Bearer ${localStorage.getItem('token')}` }
};

export default function PasswordList({ passwords, groupId }: PasswordListProps) {
    const [show, setShow] = useState(false);
    const [passwordList, setPasswordList] = useState<PasswordDto[]>(passwords);
    const [userGroup, setUserGroup] = useState<UserGroupDTO>();


    useEffect(() => {
        setPasswordList(passwords)
    }, [passwords])

    const onClose = () => setShow(false);
    const onShow = () => setShow(true);

    const onPasswordCreate = (password: PasswordDto) => {
        setPasswordList([password, ...passwordList])
        onClose();
    }
    const onPasswordDelete = (password: PasswordDto) => {
        setPasswordList([...passwordList.filter(value => value.id != password.id)])
    }

    useEffect(() => {
        const fetchUserGroup = async () => {
            if(groupId) {
                const serviceResponse = (await axios.get(`http://localhost:8080/group/${groupId}/user`, config)).data as ServiceResponse;
                setUserGroup(serviceResponse.data as UserGroupDTO);
            }
        }

        fetchUserGroup();
    }, [])

    return (
        <div className="passwords">
            <div className="d-flex justify-content-between">
                <h2 className="mb-1">Vos mot de passes :</h2>
                <CreatePasswordTrigger
                    groupId={groupId}
                    show={show}
                    onClose={onClose}
                    onPasswordCreate={onPasswordCreate}
                    >
                    <Button variant="outline-primary" size="sm" className="d-flex align-items-center" onClick={onShow}>
                        <Plus size={20} />
                        Ajouter un mot de passe
                    </Button>
                </CreatePasswordTrigger>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="col">Element</th>
                        <th className="col">Tags</th>
                        <th className="col">Trousseau</th>
                        <th className="col">Actions</th>
                    </tr>
                </thead>
                <tbody className="overflow-y-scroll">
                    {displayPassword(passwordList, onPasswordDelete, groupId, userGroup)}
                </tbody>
            </table>
        </div>
    )
}

function displayPassword(passwords: PasswordDto[], onPasswordDelete: (password: PasswordDto) => void, groupId?: string, userGroup?: UserGroupDTO) {
    return passwords.map((password, index) => (
        <Password password={password} key={index} onDeletePassword={onPasswordDelete} groupId={groupId} userGroup={userGroup}/>
    ))
}
import { useEffect, useState } from "react"
import { LightGroupDTO, UserGroupDTO } from "../../../../model/GroupModels"
import axios from "axios";
import ServiceResponse from "../../../../model/ServiceResponse";
import PasswordList from "../../../../components/password/password-list";
import { PasswordDto } from "../../../../model/PasswordModels";
import CustomModal from "../../../../components/modal/customModal";
import FriendListModal from "../../../../components/modal/friend-modal/friendListModal";
import GroupParameter from "./groupParameter";

interface GroupDetailsProps {
    lightGroup?: LightGroupDTO
    userGroup?: UserGroupDTO
}

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export default function GroupDetails({ lightGroup, userGroup }: GroupDetailsProps) {
    const [passwords, setPasswords] = useState<PasswordDto[]>([]);
    
    useEffect(() => {
        const fetchGroupData = async () => {
            if (lightGroup) {
                const response = await axios.get(`http://localhost:8080/password/group/${lightGroup.id}`, config);
                const serviceResponse = response.data as ServiceResponse;
                setPasswords(serviceResponse.data as PasswordDto[])
            }
        }

        fetchGroupData();
    }, [lightGroup])

    if (!lightGroup) {
        return <section className="group-details col-8">Aucun groupe sélectionné</section>
    }
    
    return (
        <section className="group-details col-8 border rounded p-3">
            <div className="group-list-header d-flex justify-content-between mb-3">
                <h1 className="text-capitalize">{lightGroup.name}</h1>
                <div className="buttons d-flex gap-1">
                    <CustomModal buttonText="Paramètre" size="lg" header="Paramètre du groupe">
                        <GroupParameter lightGroup={lightGroup}/>
                    </CustomModal>
                    <CustomModal buttonText="Ajouter un ami" header="Vos Amis">
                        <FriendListModal lightGroup={lightGroup} />
                    </CustomModal>
                </div>
            </div>
            <PasswordList userGroup={userGroup} groupId={lightGroup.id} passwords={passwords} />
        </section>
    )
}
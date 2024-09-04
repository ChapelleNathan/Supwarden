import { ReactNode, useEffect, useState } from "react"
import { LightGroupDTO, UserGroupDTO } from "../../../../model/GroupModels"
import axios from "axios";
import ServiceResponse from "../../../../model/ServiceResponse";
import PasswordList from "../../../../components/password/password-list";
import { PasswordDto } from "../../../../model/PasswordModels";
import CustomModal from "../../../../components/modal/customModal";
import FriendListModal from "../../../../components/modal/friend-modal/friendListModal";
import GroupParameter from "./groupParameter";
import { Button } from "react-bootstrap";
import GroupTchat from "../group-tchat/groupTchat";

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
    const [selectedPage, setSelectedPage] = useState<'tchat' | 'list'>('list');

    useEffect(() => {
        const fetchGroupData = async () => {
            if (lightGroup) {
                const response = await axios.get(`http://localhost:8080/password/group/${lightGroup.id}`, config);
                const serviceResponse = response.data as ServiceResponse;
                setPasswords(serviceResponse.data as PasswordDto[])
            }
        }
        fetchGroupData();
        setSelectedPage('list');
    }, [lightGroup])

    const displaySelectedPage = (lightGroup: LightGroupDTO) : ReactNode => {
        if(selectedPage == 'tchat') {
            return (<GroupTchat selectedGroup={lightGroup}/>)
        }
        
        return (<PasswordList userGroup={userGroup} groupId={lightGroup.id} passwords={passwords} />)
    }

    if (!lightGroup) {
        return <section className="group-details col-8">Aucun trousseau sélectionné</section>
    }
    
    return (
        <section className="group-details border rounded p-3 col-8 d-flex flex-column">
            <div className="group-list-header d-flex justify-content-between mb-3 align-items-center">
                <h1 className="text-capitalize">{lightGroup.name}</h1>
                <div className="buttons d-flex gap-1">
                    <Button className="btn-sm" onClick={() => setSelectedPage('list')}>Trousseau</Button>
                    <Button className="btn-sm" onClick={() => setSelectedPage('tchat')}>Tchat</Button>
                    <CustomModal buttonText="Paramètre" size="lg" header="Paramètre du trousseau" buttonSize="btn-sm">
                        <GroupParameter lightGroup={lightGroup} />
                    </CustomModal>
                    <CustomModal buttonText="Ajouter un ami" header="Vos Amis" buttonSize="btn-sm">
                        <FriendListModal lightGroup={lightGroup} />
                    </CustomModal>
                </div>
            </div>
            {displaySelectedPage(lightGroup)}
        </section>
    )
}
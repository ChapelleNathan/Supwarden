import { useEffect, useState } from "react"
import { LightGroupDTO } from "../../../../model/GroupModels"
import axios from "axios";
import ServiceResponse from "../../../../model/ServiceResponse";
import PasswordList from "../../../../components/password/password-list";
import { PasswordDto } from "../../../../model/PasswordModels";

interface GroupDetailsProps {
    lightGroup?: LightGroupDTO
}

export default function GroupDetails ({lightGroup}: GroupDetailsProps) {
    const [passwords, setPasswords] = useState<PasswordDto[]>([]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }
        const fetchGroupData = async () => {
            if (lightGroup) {
                const response = await axios.get(`http://localhost:8080/password/group/${lightGroup.id}`, config);
                const serviceResponse = response.data as ServiceResponse;
                setPasswords(serviceResponse.data as PasswordDto[])
            }
        }

        fetchGroupData();
    }, [lightGroup])


    
    if (!lightGroup){
        return <section className="group-details col-8">Aucun groupe sélectionné</section>
    }
    return (
        <section className="group-details col-8 border rounded p-3">
            <h1 className="text-capitalize">{lightGroup.name}</h1>
            <PasswordList passwords={passwords}/>
        </section>
    )
}
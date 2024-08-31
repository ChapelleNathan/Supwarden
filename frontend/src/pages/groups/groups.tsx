import { useEffect, useState } from "react";
import GroupList from "./components/group-list/groupList";
import axios from "axios";
import ServiceResponse from "../../model/ServiceResponse";
import { LightGroupDTO, UserGroupDTO } from "../../model/GroupModels";
import GroupDetails from "./components/group-details/groupDetails";

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
}

export default function Groups() {
    const [groups, setGroups] = useState<LightGroupDTO[]>([]);
    const [displayedGroup, setDisplayedGroup] = useState<LightGroupDTO>()
    const [userGroup, setUserGroup] = useState<UserGroupDTO>();

    const handleSelectedGroup = (selectedGroup: LightGroupDTO) => {        
        setDisplayedGroup(selectedGroup);
        fetchUserGroup(selectedGroup);
    }

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await axios.get(`http://localhost:8080/group/user/${localStorage.getItem('id')}`, config);
            const serviceResponse = response.data as ServiceResponse;
            const fecthedGroups = serviceResponse.data as LightGroupDTO[];
            setGroups(fecthedGroups);
            setDisplayedGroup(fecthedGroups[0])
            fetchUserGroup(fecthedGroups[0])
        }
        fetchGroups();
    }, [])

    const fetchUserGroup = async (lightGroup: LightGroupDTO) => {
        const serviceResponse = (await axios.get(`http://localhost:8080/group/${lightGroup.id}/user`, config)).data as ServiceResponse;
        setUserGroup(serviceResponse.data as UserGroupDTO);
    }

    return (
        <div className="d-flex group-page w-100 justify-content-around">
            <GroupList groupList={groups} onSelectGroup={handleSelectedGroup}/>
            <GroupDetails lightGroup={displayedGroup} userGroup={userGroup}/>
        </div>
    )
}
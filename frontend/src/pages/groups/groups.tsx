import { useEffect, useState } from "react";
import GroupList from "./components/group-list/groupList";
import axios from "axios";
import ServiceResponse from "../../model/ServiceResponse";
import { GroupDTO, LightGroupDTO } from "../../model/GroupModels";
import GroupForm from "./components/group-form/groupForm";
import GroupDetails from "./components/group-details/groupDetails";

export default function Groups() {
    const [groups, setGroups] = useState<LightGroupDTO[]>([]);
    const [displayedGroup, setDisplayedGroup] = useState<LightGroupDTO>()

    const handleCreateGroup = (newGroup: GroupDTO) => {
        setGroups([...groups, newGroup])
    }

    const handleSelectedGroup = (selectedGroup: LightGroupDTO) => {        
        setDisplayedGroup(selectedGroup);
    }

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const fetchGroups = async () => {
            const response = await axios.get(`http://localhost:8080/group/user/${localStorage.getItem('id')}`, config);
            const serviceResponse = response.data as ServiceResponse;
            setGroups(serviceResponse.data as LightGroupDTO[]);
        }

        fetchGroups();
    }, [])

    const isSelectedGroup = () => {
        return displayedGroup ? (<GroupDetails lightGroup={displayedGroup} />) : (<p>pas de groupe</p>)
    }

    return (
        <>
            <GroupList groupList={groups} onSelectGroup={handleSelectedGroup}/>
            <GroupForm onGroupCreated={handleCreateGroup} />
            {isSelectedGroup()}
        </>
    )
}
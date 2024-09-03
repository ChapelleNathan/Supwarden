import { useEffect, useState } from "react"
import { GroupDTO, LightGroupDTO } from "../../../../model/GroupModels"
import CustomModal from "../../../../components/modal/customModal";
import GroupForm from "../../../../components/modal/group-from-modal/groupForm";

interface GroupListProps {
    groupList: LightGroupDTO[],
    onSelectGroup: (selectedGroup: LightGroupDTO) => void,
}

export default function GroupList({groupList, onSelectGroup}: GroupListProps) {
    const [groups, setGroups] = useState<LightGroupDTO[]>([]);

    const createGroup = (group: GroupDTO) => {
        setGroups([...groups, group])
    }

    useEffect(() => {
        setGroups(groupList);
    }, [groupList])

    const displayGroups = (groups: LightGroupDTO[]) => {
        return groups.map((group, index) => (
            <li className="list-group-item list-group-item-action" key={index} onClick={() => onSelectGroup(group)} role="button">{group.name}</li>
        ))
    }

    return (
        <section className="list-group col-3 border rounded p-3 d-flex flex-column gap-3">
            <h2>Vos Trousseaux :</h2>
            <CustomModal buttonText="Créer un groupe" header="Créer un groupe">
                <GroupForm onGroupCreated={createGroup}/>
            </CustomModal>
            <ul className="list-group list-group-flush gap-2 overflow-y-scroll">
                {displayGroups(groups)}
            </ul>
        </section>
    )
}
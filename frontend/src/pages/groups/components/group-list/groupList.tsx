import { useEffect, useState } from "react"
import { LightGroupDTO } from "../../../../model/GroupModels"

interface GroupListProps {
    groupList: LightGroupDTO[],
    onSelectGroup: (selectedGroup: LightGroupDTO) => void,
}

export default function GroupList({groupList, onSelectGroup}: GroupListProps) {
    const [groups, setGroups] = useState<LightGroupDTO[]>([]);

    useEffect(() => {
        setGroups(groupList);
    }, [groupList])

    const displayGroups = (groups: LightGroupDTO[]) => {
        return groups.map((group, index) => (
            <li className="list-group-item" key={index} onClick={() => onSelectGroup(group)} role="button">{group.name}</li>
        ))
    }

    return (
        <ul className="list-group list-group-flush col-3">
            {displayGroups(groups)}
        </ul>
    )
}
import { Button } from "react-bootstrap";
import { PasswordDto } from "../../model/PasswordModels";
import CreatePasswordTrigger from "./create-password-trigger";
import Password from "./password";
import { useEffect, useState } from "react";
import { FileEarmarkArrowDownFill, FileEarmarkArrowUpFill, Plus } from "react-bootstrap-icons";
import { UserGroupDTO } from "../../model/GroupModels";
import { jsonToCSV } from "react-papaparse";

interface PasswordListProps {
    passwords: PasswordDto[],
    groupId?: string,
    userGroup?: UserGroupDTO
}

export default function PasswordList({ passwords, groupId, userGroup }: PasswordListProps) {
    const [show, setShow] = useState(false);
    const [passwordList, setPasswordList] = useState<PasswordDto[]>(passwords);

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

    const exportPasswords = () => {
        const jsonString = JSON.stringify(passwordList);
        const json: any[] = JSON.parse(jsonString);
        const csv = jsonToCSV(json);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");

        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `password_exort_${Date.now()}`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }


    return (
        <div className="passwords">
            <div className="d-flex justify-content-between">
                <h2 className="mb-1">Vos mot de passes :</h2>
                <div className="actions d-flex gap-2">
                    <Button size="sm" variant="outline-primary" className="d-flex align-items-center gap-1">
                        <FileEarmarkArrowUpFill size={20} />
                        Importer
                    </Button>
                    <Button size="sm" variant="outline-primary" className="d-flex align-items-center gap-1" onClick={exportPasswords}>
                        <FileEarmarkArrowDownFill size={20} />
                        Exporter
                    </Button>
                    <CreatePasswordTrigger
                        groupId={groupId}
                        show={show}
                        onClose={onClose}
                        onPasswordCreate={onPasswordCreate}
                        userGroup={userGroup}
                    >
                        <Button variant="outline-primary" size="sm" className="d-flex align-items-center" onClick={onShow}>
                            <Plus size={20} />
                            Ajouter un mot de passe
                        </Button>
                    </CreatePasswordTrigger>
                </div>
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
        <Password password={password} key={index} onDeletePassword={onPasswordDelete} groupId={groupId} userGroup={userGroup} />
    ))
}
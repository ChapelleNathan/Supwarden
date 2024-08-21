import { PasswordDto } from "../../model/PasswordModels";
import Password from "./password";

interface PasswordListProps {
    passwords: PasswordDto[]
}

export default function PasswordList({passwords}: PasswordListProps) {
    return(
        <table className="table table-hover">
            <thead>
                <tr>
                    <th className="col">Element</th>
                    <th className="col">Tags</th>
                    <th className="col">Trousseau</th>
                    <th className="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {displayPassword(passwords)}
            </tbody>
        </table>
    )
}

function displayPassword(passwords: PasswordDto[]) {
    return passwords.map((password, index) => (
        <Password password={password} key={index} />
    ))
}
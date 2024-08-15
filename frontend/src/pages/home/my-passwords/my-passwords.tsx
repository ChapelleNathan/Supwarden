import axios from "axios";
import { useEffect, useState } from "react";
import ServiceResponse from "../../../model/ServiceResponse";
import { PasswordDto } from "../../../model/PasswordModels";
import Password from "./password";

export default function MyPasswords() {

    const [passwords, setPasswords] = useState<PasswordDto[]>([]);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }

        const fetchPasswords = async () => {
            try {
                const response = await axios.get('http://localhost:8080/password', config);
                const serviceResponse = response.data as ServiceResponse;
                setPasswords(serviceResponse.data as PasswordDto[]);
            } catch (error) {
                if(axios.isAxiosError(error)){
                    console.log(error);
                }
            }
        }
        fetchPasswords();
    }, [])

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
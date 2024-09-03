import { useEffect, useState } from "react";
import PasswordList from "../../components/password/password-list";
import axios from "axios";
import { PasswordDto } from "../../model/PasswordModels";
import ServiceResponse from "../../model/ServiceResponse";

export default function Home() {
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

    return (
        <section className="my-password w-100">
            <PasswordList passwords={passwords}/>
        </section>
    )
}
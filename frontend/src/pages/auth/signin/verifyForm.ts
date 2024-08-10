import { FieldError } from "../../../components/error";
import { ConnectionErrorEnum } from "../../../enum/ErrorFieldEnum";
import { CreateUserDTO } from "../../../model/UserModels";

export default function verifySigninForm(user: CreateUserDTO, confirmPassword: string): FieldError[] {
    let errors: FieldError[] = [];

    if (user.email == '') {
        errors.push(new FieldError(ConnectionErrorEnum.EMAIL, 'L\'email est obligatoire'))
    }

    if (user.password == '') {
        errors.push(new FieldError(ConnectionErrorEnum.PASSWORD, 'Le mot de passe est obligatoire'))
    }

    if (user.firstname == '') {
        errors.push(new FieldError(ConnectionErrorEnum.FIRSNAME, 'Le prénom est obligatoire'))
    }

    if (user.lastname == '') {
        errors.push(new FieldError(ConnectionErrorEnum.LASTNAME, 'Le nom est obligatoire'))
    }

    if (user.phoneNumber == '') {
        errors.push(new FieldError(ConnectionErrorEnum.PHONENUMBER, 'Le numéro de téléphone est obligatoire'))
    }

    if (user.password != confirmPassword) {
        errors.push(new FieldError(ConnectionErrorEnum.CONFIRMPASSWORD, 'Les mot de passes doivent être les mêmes'))
    }

    const verifEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/;
    
    if(!verifEmailFormat.test(user.email)){
        errors.push(new FieldError(ConnectionErrorEnum.EMAIL, 'L\'email doit se terminer avec un .com .fr etc...'))
    }

    const verifPhoneNumberFormat = /^(?:\+33\s?|0)[1-9](?:[\s.-]?[0-9]{2}){4}$/;
    if(!verifPhoneNumberFormat.test(user.phoneNumber)){
        errors.push(new FieldError(ConnectionErrorEnum.PHONENUMBER, 'Le numéro de téléphone doit être au format français'))
    }

    return errors
}
import { FieldError } from "../../components/error";
import { ConnectionErrorEnum } from "../../enum/ErrorFieldEnum";
import { AuthUserDTO, CreateUserDTO } from "../../model/UserModels";

export function verifySigninForm(user: CreateUserDTO, confirmPassword: string): FieldError[] {
    let errors: FieldError[] = [];

    errors = verifyEmail(user.email);
    errors = [...errors, ...verifyPhoneNumber(user.phoneNumber)];

    if (user.password == '') {
        errors.push(new FieldError(ConnectionErrorEnum.PASSWORD, 'Le mot de passe est obligatoire'))
    }

    if (user.firstname == '') {
        errors.push(new FieldError(ConnectionErrorEnum.FIRSNAME, 'Le prénom est obligatoire'))
    }

    if (user.lastname == '') {
        errors.push(new FieldError(ConnectionErrorEnum.LASTNAME, 'Le nom est obligatoire'))
    }

    if (user.password != confirmPassword) {
        errors.push(new FieldError(ConnectionErrorEnum.CONFIRMPASSWORD, 'Les mot de passes doivent être les mêmes'))
    }

    

    return errors
}

function verifyEmail(email: string ): FieldError[] {
    let errors: FieldError[]= [];
    if (email == '') {
        errors.push(new FieldError(ConnectionErrorEnum.EMAIL, 'L\'email est obligatoire'))
    }

    const verifEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,4}$/;
    
    if(!verifEmailFormat.test(email)){
        errors.push(new FieldError(ConnectionErrorEnum.EMAIL, 'L\'email doit se terminer avec un .com .fr etc...'))
    }
    return errors
}

function verifyPhoneNumber(phoneNumber: string): FieldError[] {
    let errors: FieldError[] = [];

    if (phoneNumber == '') {
        errors.push(new FieldError(ConnectionErrorEnum.PHONENUMBER, 'Le numéro de téléphone est obligatoire'))
    }

    const verifPhoneNumberFormat = /^(?:\+33\s?|0)[1-9](?:[\s.-]?[0-9]{2}){4}$/;
    if(!verifPhoneNumberFormat.test(phoneNumber)){
        errors.push(new FieldError(ConnectionErrorEnum.PHONENUMBER, 'Le numéro de téléphone doit être au format français'))
    }

    return errors;
}
export function verifyLoginForm(user: AuthUserDTO): FieldError[] {
    let errors : FieldError[] = [];

    errors = verifyEmail(user.email);

    if (user.password == '') {
        errors.push(new FieldError(ConnectionErrorEnum.PASSWORD, 'Le mot de passe est obligatoire'));
    }

    return errors;
}
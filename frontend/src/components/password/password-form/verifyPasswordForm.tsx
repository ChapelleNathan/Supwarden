import { CreatePasswordEnum } from "../../../enum/ErrorFieldEnum";
import { CreatePasswordDto, PasswordDto } from "../../../model/PasswordModels";
import { FieldError } from "../../error";

export default function verifyPasswordForm(password: PasswordDto | CreatePasswordDto): FieldError[] {
    const errors: FieldError[] = [];

    if(password.sitePassword == '') {
        errors.push(new FieldError(CreatePasswordEnum.PASSWORD, 'Le mot de passe est obligatoire'));
    }

    if(password.name == '') {
        errors.push(new FieldError(CreatePasswordEnum.NAME, 'Le nom est obligatoire'));
    }

    if(password.identifier == '') {
        errors.push(new FieldError(CreatePasswordEnum.IDENTIFIER, 'L\'identifiant est obligatoire'));
    }

    if(password.uri == '') {
        errors.push(new FieldError(CreatePasswordEnum.URI, 'L\'uri est obligatoire'))
    }

    return errors;
}
import { CreatePasswordEnum } from "../../enum/ErrorFieldEnum";
import { FieldError } from "../error";

export default function VerifyPasswordForm(areLowercase: boolean, areUppercase: boolean, areNumber: boolean, areSpecialChars: boolean): FieldError | null {
    if(!(areLowercase && areUppercase && areNumber && areSpecialChars)){
        return new FieldError(CreatePasswordEnum.PASSWORD, "Il est obligatoire d'avoir au moins")
    }
    return null
}
import { ReactNode } from "react";
import { ConnectionErrorEnum, CreatePasswordEnum } from "../enum/ErrorFieldEnum";

interface ErrorProps {
    errors: FieldError[],
    field: ConnectionErrorEnum | CreatePasswordEnum
}

export class FieldError {
    constructor(field: ConnectionErrorEnum | CreatePasswordEnum, message: string) {
        this.field = field;
        this.message = message;
    }
    field: ConnectionErrorEnum | CreatePasswordEnum;
    message: string;
}

export function RenderErrors({errors, field}: ErrorProps): ReactNode {
    const errorMessages = errors
        .filter(error => error.field === field)
        .map((error, index) => (
            <p key={index} className="text-danger">{error.message}</p>
        ));
        
    return <>{errorMessages}</>;
}
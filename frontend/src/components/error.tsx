import { ReactNode } from "react";
import { ConnectionErrorEnum } from "../enum/ErrorFieldEnum";

interface ErrorProps {
    errors: FieldError[],
    field: ConnectionErrorEnum,
}

export class FieldError {
    constructor(field: ConnectionErrorEnum, message: string) {
        this.field = field;
        this.message = message;
    }
    field: ConnectionErrorEnum;
    message: string;
}

export function RenderErrors({errors, field}: ErrorProps): ReactNode {
    //let html = <></>
    //errors.forEach(error => {
    //    if(error.field == field){
    //        html = <p className="text-danger">{error.message}</p>
    //    }
    //})
    const errorMessages = errors
        .filter(error => error.field === field)
        .map((error, index) => (
            <p key={index} className="text-danger">{error.message}</p>
        ));
        
    return <>{errorMessages}</>;
}

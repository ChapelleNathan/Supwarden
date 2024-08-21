import { Offcanvas, OffcanvasBody, OffcanvasHeader } from "react-bootstrap";
import PasswordForm from "./password-form/PasswordForm";
import { ReactNode, useEffect, useState } from "react";
import { PasswordDto } from "../../model/PasswordModels";

interface PasswordTriggerProps {
    header?: string
    passwordDto?: PasswordDto,
    isEditing?: boolean,
    children: ReactNode,
    show: boolean,
    onClose: (show: boolean) => void
}

export default function CreatePasswordTrigger({header, children, show, onClose, isEditing = false, passwordDto}: PasswordTriggerProps) {
    const [isShow, setIsShow] = useState(show);

    const handleHide = () => {
        setIsShow(false);
        onClose(false);
    }

    useEffect(() => {
        setIsShow(show)
    }, [show])

    return (
        <div className="password-form-button">
            {children}
            <Offcanvas show={isShow} onHide={handleHide} placement="end">
                <OffcanvasHeader closeButton>
                    <h2>{header}</h2>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <PasswordForm isEditing={isEditing} passwordDto={passwordDto}/>
                </OffcanvasBody>
            </Offcanvas>
        </div>
    )
}
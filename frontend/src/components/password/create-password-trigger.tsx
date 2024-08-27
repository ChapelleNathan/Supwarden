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
    onClose: (show: boolean) => void,
    groupId?: string,
    onPasswordCreate?: (password: PasswordDto) => void,
}

export default function CreatePasswordTrigger({ 
    header,
    children,
    show,
    onClose,
    isEditing = false,
    passwordDto,
    groupId,
    onPasswordCreate
}: PasswordTriggerProps) {
    const [isShow, setIsShow] = useState(show);

    const handleHide = () => {
        setIsShow(false);
        onClose(false);
    }

    useEffect(() => {
        setIsShow(show)
    }, [show])

    return (
        <>
            {children}
            <Offcanvas show={isShow} onHide={handleHide} placement="end">
                <OffcanvasHeader closeButton>
                    <h2>{header}</h2>
                </OffcanvasHeader>
                <OffcanvasBody>
                    <PasswordForm
                        groupId={groupId}
                        isEditing={isEditing}
                        passwordDto={passwordDto}
                        onPasswordCreate={onPasswordCreate}
                    />
                </OffcanvasBody>
            </Offcanvas>
        </>
    )
}
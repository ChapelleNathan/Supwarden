import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { Form } from "react-router-dom";

export default function GroupFormModal() {
    return (
        <Form className="d-flex flex-column gap-3">
            <FormGroup>
                <FormLabel>Nom du group</FormLabel>
                <FormControl type="text" placeholder="Nom de votre groupe"/>
            </FormGroup>
            <Button className="col-4 offset-4">Créer le groupe</Button>
        </Form>
    )
}
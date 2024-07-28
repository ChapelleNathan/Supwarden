export default function SignInRoute() {
    return (
        <form className="border border-2 rounded-2 col-5 p-4 d-flex flex-column align-items-center">
            <h1>Création de compte</h1>
            <div className="mb-3 col-7">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email"/>
            </div>
            <div className="mb-3 col-7">
                <label htmlFor="firstname" className="form-label">Prénom</label>
                <input type="text" className="form-control" id="firstname"/>
            </div>
            <div className="mb-3 col-7">
                <label htmlFor="lastname" className="form-label">Nom</label>
                <input type="text" className="form-control" id="lastname"/>
            </div>
            <div className="mb-3 col-7">
                <label htmlFor="tel" className="form-label">Numéro de téléphone</label>
                <input type="tel" className="form-control" id="tel" 
                    pattern="^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$"/>
            </div>
            <div className="mb-3 col-7">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <button type="submit" className="btn btn-primary col-4 mt-3">Créer mon compte</button>
            <p className="fs-6 m-0 mt-2">Déjà un compte ? connecter vous ici</p>
        </form>
    )
}
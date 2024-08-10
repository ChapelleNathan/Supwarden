using System.ComponentModel;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Enum;

public enum ErrorMessages
{
    //GLOBAL
    [Description("Impossible de récupérer la ressource")]
    NotFound404,
    
    [Description("Impossible de créer la ressource")]
    CreationError500,
    
    //CONNECTION
    [Description("Mot de passe ou Email incorrect")]
    ConnectionError400,
    
    //INSCRIPTION
    [Description("Email n'est pas valide")]
    EmailNotValid400,
}
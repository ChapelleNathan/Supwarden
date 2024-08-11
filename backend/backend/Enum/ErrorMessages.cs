using System.ComponentModel;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Enum;

public enum ErrorMessages
{
    //GLOBAL
    [Description("Impossible de récupérer la ressource")]
    SUP404_NotFound,
    
    [Description("Impossible de créer la ressource")]
    Sup500CreationError,
    
    //CONNECTION
    [Description("Mot de passe ou Email incorrect")]
    Sup400ConnectionError,
    
    //INSCRIPTION
    [Description("Email n'est pas valide")]
    Sup400EmailNotValid,
    
    //Password
    [Description("Impossible de créer le mot de passe, veuillez réessayer ultérieurement")]
    Sup500PasswordCreation,
    
}
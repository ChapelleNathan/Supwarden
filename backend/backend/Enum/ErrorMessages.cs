using System.ComponentModel;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Enum;

public enum ErrorMessages
{
    //GLOBAL
    [Description("Impossible de trouver l'utilisateur connecté")]
    Sup400ConnectedUser,
    
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
    
    [Description("Impossible de récupérer les mot de passe. Veuillez réessayer ultérieurement")]
    Sup404PasswordUserNotFound,
    
    [Description("Impossible de trouver le mot de passe")]
    Sup404PasswordNotFound,
    
    //User
    [Description("Impossible de récupérer cet utilisateur")]
    Sup404UserNotFound,
    [Description("Vous êtes déjà amis")]
    Sup400AlreadyFriend
}
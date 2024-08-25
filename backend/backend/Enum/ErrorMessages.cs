using System.ComponentModel;
using Microsoft.AspNetCore.Http.HttpResults;

namespace backend.Enum;

public enum ErrorMessages
{
    //GLOBAL
    [Description("Impossible de trouver l'utilisateur connecté")]
    Sup400ConnectedUser,
    [Description("Vous n'avez pas les droit nécessaire")]
    Sup400Authorization,
    
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
    
    //UserContact
    [Description("Vous êtes déjà amis")]
    Sup400AlreadyFriend,
    [Description("Vous n'êtes pas amis")]
    Sup404NotFriend,
    [Description("Vous n'êtes pas amis")]
    Sup404UserContactNotFound,
    
    //UserGroup
    [Description("Erreur lors de l'ajout de l'utilisateur dans le group, veuillez réessayer ultérieurement")]
    Sup500UserGroupCreationError,
    [Description("Impossible d'ajouter cet utilisateur au groupe. Vous n'avez pas la permission d'ajouter quelqu'un si vous ne faites pas partie du groupe")]
    Sup400NotInGroup,
    [Description("Impossible d'ajouter cet utilisateur au groupe. Il est déjà dedans")]
    Sup400AlreadyInGroup,
    
    //Group
    [Description("Impossible de trouver le groupe, veuillez réessayer avec un autre")]
    Sup404GroupNotFound,
}
namespace backend.Helper;

public class PasswordSaveHelper
{
    public static String EncryptPassword(string password)
    {
        var passwordBytes = System.Text.Encoding.UTF8.GetBytes(password);
        return System.Convert.ToBase64String(passwordBytes);
    }

    public static String DecryptPassword(string encodedPassword)
    {
        var encodedPasswordBytes = System.Convert.FromBase64String(encodedPassword);
        return System.Text.Encoding.UTF8.GetString(encodedPasswordBytes);
    }
    
    //Pas la meilleur solution mais je n'ai pas d'endroit ou stocker une clé de chiffrement donc autant ne pas en mettre
}
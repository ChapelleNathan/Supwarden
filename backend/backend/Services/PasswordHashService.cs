using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace backend.Services;

public static class PasswordHashService
{
    private const int Iterations = 350000;
    private static readonly HashAlgorithmName HashAlgorithm = HashAlgorithmName.SHA256;
    private const int KeySize = 256 / 8;

    public static string HashPassword(string password)
    {
        var salt = RandomNumberGenerator.GetBytes(KeySize);
        var hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
            password: password,
            salt: salt,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: Iterations,
            numBytesRequested: KeySize
        ));

        return hashedPassword;
    }

    public static bool VerifyPassword(string inputPassword, string hashedPassword, byte[] salt)
    {
        var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(inputPassword, salt, Iterations, HashAlgorithm, KeySize);
        return CryptographicOperations.FixedTimeEquals(hashToCompare, Convert.FromHexString(hashedPassword));
    }
}
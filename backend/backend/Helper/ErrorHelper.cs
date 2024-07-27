using System.ComponentModel;
using System.Reflection;
using backend.Enum;

namespace backend.Helper;

public static class ErrorHelper
{
    public static string GetErrorMessage(ErrorMessages errorMessages)
    {
        var fieldInfo = errorMessages.GetType().GetField(errorMessages.ToString());
        DescriptionAttribute attribute = fieldInfo.GetCustomAttribute<DescriptionAttribute>();

        return attribute != null ? attribute.Description : "Code erreur inconnu";
    }
}
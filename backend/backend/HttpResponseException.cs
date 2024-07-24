namespace backend;

public class HttpResponseException(int statusCode, string message, object? value = null) : Exception
{
    public int StatusCode { get; } = statusCode;
    public object? Value { get; } = value;
    public string Message { get; } = message;
}
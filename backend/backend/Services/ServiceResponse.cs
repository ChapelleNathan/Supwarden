namespace backend.Services;

public class ServiceResponse<T>
{
    public T? Data { get; set; }
    public int HttpCode { get; set; } = 200;
    public string Message { get; set; } = "";
}
namespace backend.Services;

public class ServiceResponse<T>
{
    public T? Data { get; set; }
    public int HttpCode { get; set; }
}
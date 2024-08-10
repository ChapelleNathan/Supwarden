using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend;

public class HttpResponseHandler : ControllerBase
{
    public ActionResult<ServiceResponse<T>> Handle<T>(ServiceResponse<T> response)
    {
        ActionResult<ServiceResponse<T>> httpResponse = Ok(response);
        switch (response.HttpCode)
        {
            case 400:
                httpResponse = BadRequest(response);
                break;
            case 404:
                httpResponse = NotFound(response);
                break;
            case 401:
                httpResponse = Unauthorized(response);
                break;
        }

        return httpResponse;
    }
}
package com.mplescano.poc.citizen.component.handler;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.error.ErrorAttributeOptions.Include;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.boot.autoconfigure.web.ErrorProperties.IncludeAttribute;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

@Controller
@RequestMapping("${server.error.path:${error.path:/error}}")
public class ThrowerErrorToExceptionHandler implements ErrorController {

    private final ErrorAttributes errorAttributes;

    private final ErrorProperties errorProperties;

    /**
     * Create a new {@link BasicErrorController} instance.
     * 
     * @param errorAttributes the error attributes
     * @param errorProperties configuration properties
     */
    public ThrowerErrorToExceptionHandler(ErrorAttributes errorAttributes, ErrorProperties errorProperties) {
        Assert.notNull(errorAttributes, "ErrorAttributes must not be null");
        this.errorAttributes = errorAttributes;
        Assert.notNull(errorProperties, "ErrorProperties must not be null");
        this.errorProperties = errorProperties;
    }

    public String getErrorPath() {
        return this.errorProperties.getPath();
    }

    @RequestMapping
    @ResponseBody
    public ResponseEntity<Map<String, Object>> error(HttpServletRequest request) throws Exception {
        WebRequest webRequest = new ServletWebRequest(request);
        Throwable error = this.errorAttributes.getError(webRequest);
        if (error != null) {
            if (error instanceof RuntimeException) {
                // to RestControllerAdvice
                throw (RuntimeException) error;
            }

            if (error instanceof Exception) {
                // to RestControllerAdvice
                throw (Exception) error;
            }
        }
        Map<String, Object> body = getErrorAttributes(request, isIncludeStackTrace(request, MediaType.ALL));
        HttpStatus status = getStatus(request);
        return new ResponseEntity<>(body, status);
    }

    protected HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        try {
            return HttpStatus.valueOf(statusCode);
        } catch (Exception ex) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    protected Map<String, Object> getErrorAttributes(HttpServletRequest request, boolean includeStackTrace) {
        WebRequest webRequest = new ServletWebRequest(request);
        ErrorAttributeOptions options = includeStackTrace ? ErrorAttributeOptions.of(Include.STACK_TRACE)
                : ErrorAttributeOptions.defaults();
        return this.errorAttributes.getErrorAttributes(webRequest, options);
    }

    /**
     * Determine if the stacktrace attribute should be included.
     * 
     * @param request the source request
     * @param produces the media type produced (or {@code MediaType.ALL})
     * @return if the stacktrace attribute should be included
     */
    protected boolean isIncludeStackTrace(HttpServletRequest request, MediaType produces) {
        IncludeAttribute include = errorProperties.getIncludeStacktrace();
        if (include == IncludeAttribute.ALWAYS) {
            return true;
        }
        if (include == IncludeAttribute.ON_PARAM) {
            return getTraceParameter(request);
        }
        return false;
    }

    protected boolean getTraceParameter(HttpServletRequest request) {
        String parameter = request.getParameter("trace");
        if (parameter == null) {
            return false;
        }
        return !"false".equals(parameter.toLowerCase());
    }

}

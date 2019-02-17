package com.mplescano.poc.citizen.component.handler;

import java.util.ArrayList;
import java.util.List;

//import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.core.NestedRuntimeException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.mplescano.poc.citizen.model.dto.DetailErrorMessage;
import com.mplescano.poc.citizen.model.dto.ErrorType;
import com.mplescano.poc.citizen.model.dto.ResponseErrorMessage;

/**
 * 
 * @author mplescano
 * @see http://www.baeldung.com/exception-handling-for-rest-with-spring
 * @see http://springinpractice.com/2013/10/09/generating-json-error-object-responses-with-spring-web-mvc
 * @see https://www.petrikainulainen.net/programming/spring-framework/spring-from-the-trenches-adding-validation-to-a-rest-api/
 * 
 */
public class RestExceptionHandler extends ResponseEntityExceptionHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(RestExceptionHandler.class);

    private static final String VALIDATION_ERRORS_MESSAGE = "validation.error"; 
    
    private final MessageSourceAccessor messageSource;
    
    public RestExceptionHandler(MessageSourceAccessor messageSource) {
        this.messageSource = messageSource;
    }

    @ExceptionHandler({ NullPointerException.class, NestedRuntimeException.class })
    public ResponseEntity<Object> handleInternalException(Exception ex, WebRequest request) {
    	ResponseErrorMessage message = new ResponseErrorMessage(generateCodeFromException(ex), ErrorType.INTERNAL_ERROR, ex.getMessage());
    	return handleExceptionInternal(ex, message, null, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
    
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {
        BindingResult result = ex.getBindingResult();
        List<ObjectError> objectErrors = result.getAllErrors();
        ResponseErrorMessage message = new ResponseErrorMessage(VALIDATION_ERRORS_MESSAGE, ErrorType.DATA_ERROR, messageSource.getMessage(VALIDATION_ERRORS_MESSAGE), 
        		processObjectErrors(objectErrors, ex));
        return handleExceptionInternal(ex, message, headers, status, request);
    }
    
    private List<DetailErrorMessage> processObjectErrors(List<ObjectError> objectErrors, Exception ex) {
        List<DetailErrorMessage> detailFields = new ArrayList<>();

        for (final ObjectError objError: objectErrors) {
            if (objError instanceof FieldError) {
                detailFields.add(new DetailErrorMessage(((FieldError) objError).getField(), resolveLocalizedErrorMessage(objError)));
            }
            else {
                detailFields.add(new DetailErrorMessage(objError.getCode(), resolveLocalizedErrorMessage(objError)));
            }
        }
        
        return detailFields;
    }
    
    private String resolveLocalizedErrorMessage(ObjectError objError) {
        String localizedErrorMessage = messageSource.getMessage(objError);
 
        //If the message was not found, return the most accurate field error code instead.
        //You can remove this check if you prefer to get the default error message.
        if (localizedErrorMessage.equals(objError.getDefaultMessage()) && 
                localizedErrorMessage.startsWith("{") && localizedErrorMessage.endsWith("}")) {
            String[] fieldErrorCodes = objError.getCodes();
            if (logger.isDebugEnabled()) {
                for (String errorCode: fieldErrorCodes) {
                    logger.debug("errorCode available: " + errorCode);
                }
            }
            localizedErrorMessage = fieldErrorCodes[0];
        }
 
        return localizedErrorMessage;
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex,
                                                             Object body,
                                                             HttpHeaders headers,
                                                             HttpStatus status,
                                                             WebRequest request) {
        logger.error("Error", ex);
        return super.handleExceptionInternal(ex, body, headers, status, request);
    }
    
	protected String generateCodeFromException(Exception ex) {
		return ex.getClass().getSimpleName().replaceAll("[^A-Z]", "");
	}

}
package com.mplescano.poc.citizen.component.handler;

import javax.persistence.PersistenceException;

import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.mplescano.poc.citizen.model.dto.ErrorType;
import com.mplescano.poc.citizen.model.dto.ResponseErrorMessage;

public class JpaRestExceptionHandler extends DataRestExceptionHandler {

    public JpaRestExceptionHandler(MessageSourceAccessor messageSource) {
		super(messageSource);
	}

	@ExceptionHandler({ PersistenceException.class })
    public ResponseEntity<Object> handlePersistenceException(Exception ex, WebRequest request) {
    	ResponseErrorMessage message = new ResponseErrorMessage(generateCodeFromException(ex), ErrorType.REPOSITORY_ERROR, ex.getMessage());
    	return handleExceptionInternal(ex, message, null, HttpStatus.INTERNAL_SERVER_ERROR, request);
    }
}

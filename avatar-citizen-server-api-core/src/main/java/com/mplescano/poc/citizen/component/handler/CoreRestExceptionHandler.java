package com.mplescano.poc.citizen.component.handler;

import org.springframework.context.support.MessageSourceAccessor;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CoreRestExceptionHandler extends JpaRestExceptionHandler {

	public CoreRestExceptionHandler(MessageSourceAccessor messageSource) {
		super(messageSource);
	}

}

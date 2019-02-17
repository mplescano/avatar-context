package com.mplescano.poc.citizen.model.dto;

import java.io.Serializable;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ResponseMessage implements Serializable {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    private boolean success;

    private String message;

    private Object data;

    public ResponseMessage(boolean status, String message) {
        this(status, message, null);
    }

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public ResponseMessage(@JsonProperty("status") boolean status, 
    		@JsonProperty("message") String message, @JsonProperty("data") Object data) {
        this.success = status;
        this.message = message;
        if (data != null) {
            this.data = data;
        } else {
            this.data = new ArrayList<>();
        }
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public Object getData() {
        return data;
    }
}

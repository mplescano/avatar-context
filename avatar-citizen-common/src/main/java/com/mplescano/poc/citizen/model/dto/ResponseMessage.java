package com.mplescano.poc.citizen.model.dto;

import java.io.Serializable;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class ResponseMessage implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * Does not make sense, because the success is defined in the status response.      *
     * 200 is success
     * 400 is bad input
     * 500 is internal error 
     */
    // private boolean success;

    private String message;

    private Object data;

    public ResponseMessage(String message) {
        this(message, null);
    }

    @JsonCreator(mode = JsonCreator.Mode.PROPERTIES)
    public ResponseMessage(@JsonProperty("message") String message, @JsonProperty("data") Object data) {
        this.message = message;
        if (data != null) {
            this.data = data;
        } else {
            this.data = new ArrayList<>();
        }
    }

    public String getMessage() {
        return message;
    }

    public Object getData() {
        return data;
    }
}

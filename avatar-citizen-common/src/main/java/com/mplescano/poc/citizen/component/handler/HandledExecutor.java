package com.mplescano.poc.citizen.component.handler;

import java.util.concurrent.Executor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HandledExecutor implements Executor {

    private static final Logger logger = LoggerFactory.getLogger(HandledExecutor.class);

    private final Executor delegate;
    
    private boolean throwException = true;
    
    public HandledExecutor(Executor delegate) {
        this.delegate = delegate;
    }

    public HandledExecutor(Executor delegate, boolean throwException) {
        this(delegate);
        this.throwException = throwException;
    }

    public void execute(Runnable command) {
        this.delegate.execute(createWrappedRunnable(command));
    }

    protected Runnable createWrappedRunnable(final Runnable task) {
    	final boolean localThrowException = throwException;
        return new Runnable() {
            @Override
            public void run() {
                try {
                    task.run();
                } catch (Exception ex) {
                    handleException(ex);
                    if (localThrowException) {
                        throw ex;
                    }
                }
            }
        };
    }

    protected void handleException(Exception ex) {
        logger.error("Error", ex);
    }
}

package com.mplescano.poc.citizen.component.prop;

import java.util.Properties;

import org.springframework.core.io.Resource;
import org.springframework.core.io.support.EncodedResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;

public class PropertyResource {

	private final EncodedResource encodedResource;
	
	private Properties properties;
	
	private long currentTimestamp;
	
	public PropertyResource(Resource resource) {
		this.encodedResource = new EncodedResource(resource);
	}

	protected Properties getProperties() {
		try {
			if (properties == null) {
				currentTimestamp = encodedResource.getResource().lastModified();
				properties = PropertiesLoaderUtils.loadProperties(encodedResource);
			}
			long headLastModified = encodedResource.getResource().lastModified();
			if (headLastModified > currentTimestamp) {
			    currentTimestamp = headLastModified;
				properties = PropertiesLoaderUtils.loadProperties(encodedResource);
			}
		} catch (Exception ex) {
			throw new PropertyResourceServiceException("Error in getProperties", ex);
		}
				
		return properties;
	}
	
	public String getValue(String key) {
		return getProperties().getProperty(key);
	}
	
	public EncodedResource getEncodedResource() {
		return encodedResource;
	}

	public static class PropertyResourceServiceException extends RuntimeException {

		/**
		 * 
		 */
		private static final long serialVersionUID = 1L;

		public PropertyResourceServiceException(String message, Throwable cause) {
			super(message, cause);
		}

		public PropertyResourceServiceException(Throwable cause) {
			super(cause);
		}
	}
}

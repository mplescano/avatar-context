package com.mplescano.poc.citizen.component.prop;

import org.springframework.core.env.EnumerablePropertySource;
import org.springframework.core.io.Resource;
import org.springframework.util.StringUtils;

public class ResourcePropertySource extends EnumerablePropertySource<Resource> {

    private PropertyResource propertyResource;

    public ResourcePropertySource(String name, Resource source) {
        super(name, source);
        this.propertyResource = new PropertyResource(source);
    }
    
    public ResourcePropertySource(PropertyResource propertyResource) {
        super(getNameForResource(propertyResource.getEncodedResource().getResource()), 
        		propertyResource.getEncodedResource().getResource());
        this.propertyResource = propertyResource;
    }
    
    public ResourcePropertySource(Resource source) {
        super(getNameForResource(source), source);
        this.propertyResource = new PropertyResource(source);
    }
    
    @Override
    public Object getProperty(String name) {
        return this.propertyResource.getValue(name);
    }

    @Override
    public boolean containsProperty(String name) {
        return this.propertyResource.getProperties().containsKey(name);
    }

    @Override
    public String[] getPropertyNames() {
        return StringUtils.toStringArray(this.propertyResource.getProperties().stringPropertyNames());
    }
    
    /**
     * Return the description for the given Resource; if the description is
     * empty, return the class name of the resource plus its identity hash code.
     * @see org.springframework.core.io.Resource#getDescription()
     */
    private static String getNameForResource(Resource resource) {
        String name = resource.getDescription();
        if (!StringUtils.hasText(name)) {
            name = resource.getClass().getSimpleName() + "@" + System.identityHashCode(resource);
        }
        return name;
    }
}

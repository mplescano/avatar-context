package com.mplescano.poc.citizen.component.constraint;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Retention(RUNTIME)
@Target({ FIELD })
@Constraint(validatedBy = SwapiPlanetValidator.class)
@Documented
public @interface SwapiPlanet {
    /**
     * @return the error message template
     */
    String message() default "{com.mplescano.poc.citizen.constraint.SwapiPlanet.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    /**
     * Defines several {@link SwapiPlanet} annotations on the same element.
     *
     * @see SwapiPlanet
     */
    @Target({ FIELD })
    @Retention(RUNTIME)
    @Documented
    @interface List {
        SwapiPlanet[] value();
    }
}

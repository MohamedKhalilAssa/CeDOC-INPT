package ma.inpt.cedoc.Annotations.FieldMatcher;

import java.lang.annotation.*;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ ElementType.TYPE }) // Class-level annotation
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = FieldMatchValidator.class)
@Documented
public @interface FieldMatch {

    String message() default "Les champs ne correspondent pas";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    // Custom annotation parameters
    String first(); // name of first field

    String second(); // name of second field

    @Target({ ElementType.TYPE })
    @Retention(RetentionPolicy.RUNTIME)
    @interface List {
        FieldMatch[] value(); // Allows using multiple FieldMatch annotations
    }
}
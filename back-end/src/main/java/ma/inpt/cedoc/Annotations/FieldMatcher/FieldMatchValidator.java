package ma.inpt.cedoc.Annotations.FieldMatcher;

import java.lang.reflect.Field;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class FieldMatchValidator implements ConstraintValidator<FieldMatch, Object> {

    private String firstFieldName;
    private String secondFieldName;

    @Override
    public void initialize(FieldMatch constraintAnnotation) {
        this.firstFieldName = constraintAnnotation.first();
        this.secondFieldName = constraintAnnotation.second();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        try {
            // Use reflection to access fields by name
            Field firstField = value.getClass().getDeclaredField(firstFieldName);
            Field secondField = value.getClass().getDeclaredField(secondFieldName);

            firstField.setAccessible(true);
            secondField.setAccessible(true);

            Object firstVal = firstField.get(value);
            Object secondVal = secondField.get(value);

            // Both null: valid. One null: invalid. Otherwise, check equality.
            return firstVal == null && secondVal == null || (firstVal != null && firstVal.equals(secondVal));
        } catch (Exception e) {
            return false; 
        }
    }
}
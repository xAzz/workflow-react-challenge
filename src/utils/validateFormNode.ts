import type { FormNodeData } from "@/components/nodes/FormNode";
import type { ValidationResult } from "./validateNode";
import type { ValidationError } from "@/components/WorkflowEditor";

export const validateFormNode = (data: FormNodeData): ValidationResult => {
    const errors: ValidationError[] = [];

    // Validate custom name
    if (!data.customName || data.customName.trim().length < 3) {
        errors.push({
            id: "customName",
            type: "error",
            message: "Custom name is required & must be at least 3 characters long",
        });
    }

    // Validate fields array
    for (const field of data.fields || []) {
        // Validate field name
        if (!field.name || field.name.trim() === "") {
            errors.push({
                id: `field-name-${field.id}`,
                type: "error",
                message: "Field name is required",
            });
        } else {
            const trimmedName = field.name.trim();
            const isValidName = /^[a-zA-Z0-9]+$/.test(trimmedName) && trimmedName.length >= 2;
            if (!isValidName) {
                errors.push({
                    id: `field-name-${field.id}`,
                    type: "error",
                    message: "Field name must be alphanumeric, min 2 characters",
                });
            }
        }

        // Validate field label
        if (!field.label || field.label.trim() === "") {
            errors.push({
                id: `field-label-${field.id}`,
                type: "error",
                message: "Field label is required",
            });
        } else if (field.label.trim().length < 2) {
            errors.push({
                id: `field-label-${field.id}`,
                type: "error",
                message: "Field label must be at least 2 characters long",
            });
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

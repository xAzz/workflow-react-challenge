import type { ConditionalNodeData } from "@/components/nodes/ConditionalNode";
import type { ValidationResult } from "./validateNode";
import type { ValidationError } from "@/components/WorkflowEditor";

export const validateConditionalNode = (data: ConditionalNodeData): ValidationResult => {
    const errors: ValidationError[] = [];

    // Validate custom name
    if (!data.customName || data.customName.trim().length < 3) {
        errors.push({
            id: "customName",
            type: "error",
            message: "Custom name is required & must be at least 3 characters long",
        });
    }

    // Validate field to evaluate
    if (!data.fieldToEvaluate || data.fieldToEvaluate.trim() === "") {
        errors.push({
            id: "fieldToEvaluate",
            type: "error",
            message: "Field to evaluate is required",
        });
    }

    // Validate operator
    if (!data.operator) {
        errors.push({
            id: "operator",
            type: "error",
            message: "Operator is required",
        });
    }

    // Validate value (not required for is_empty operator)
    if (data.operator && data.operator !== "is_empty") {
        if (!data.value || data.value.trim() === "") {
            errors.push({
                id: "value",
                type: "error",
                message: "Value is required for this operator",
            });
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

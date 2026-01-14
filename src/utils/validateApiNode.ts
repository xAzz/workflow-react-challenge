import type { ApiNodeData } from "@/components/nodes/ApiNode";
import type { ValidationResult } from "./validateNode";
import type { ValidationError } from "@/components/WorkflowEditor";

export const validateApiNode = (data: ApiNodeData): ValidationResult => {
    const errors: ValidationError[] = [];

    // Validate URL
    if (!data.url || data.url.trim() === "") {
        errors.push({
            id: "url",
            type: "error",
            message: "URL is required",
        });
    } else if (!/^https?:\/\/.+/.test(data.url)) {
        errors.push({
            id: "url",
            type: "error",
            message: "URL must start with http:// or https://",
        });
    }

    // Validate HTTP method
    if (!data.method) {
        errors.push({
            id: "method",
            type: "error",
            message: "HTTP method is required",
        });
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

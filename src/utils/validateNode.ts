import { FormNodeData } from "@/components/nodes/FormNode";
import { ConditionalNodeData } from "@/components/nodes/ConditionalNode";
import { ApiNodeData } from "@/components/nodes/ApiNode";
import { ValidationError } from "@/components/WorkflowEditor";

import { validateApiNode } from "./validateApiNode";
import { validateConditionalNode } from "./validateConditionalNode";
import { validateFormNode } from "./validateFormNode";

export interface ValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}

export const validateNode = (nodeType: string, data: Record<string, unknown>): ValidationResult => {
    switch (nodeType) {
        case "form":
            return validateFormNode(data as unknown as FormNodeData);
        case "conditional":
            return validateConditionalNode(data as unknown as ConditionalNodeData);
        case "api":
            return validateApiNode(data as unknown as ApiNodeData);
        case "start":
        case "end":
            return { isValid: true, errors: [] };
        default:
            return { isValid: true, errors: [] };
    }
};

import { Edge, Node } from "@xyflow/react";
import { ValidationError } from "@/components/WorkflowEditor";
import type { ValidationResult } from "./validateNode";

export const validateWorkflow = (nodes: Node[], edges: Edge[]): ValidationResult => {
    const errors: ValidationError[] = [];

    // fetch Start & End nodes
    const startNodes = nodes.filter((n) => n.type === "start");
    const endNodes = nodes.filter((n) => n.type === "end");

    // throw error if workflow has more than one Start node
    if (startNodes.length !== 1) {
        errors.push({
            id: "workflow-start",
            type: "error",
            message: `Workflow must have exactly one Start node (found ${startNodes.length})`,
        });
    }

    // throw error if workflow has more than one End node
    if (endNodes.length !== 1) {
        errors.push({
            id: "workflow-end",
            type: "error",
            message: `Workflow must have exactly one End node (found ${endNodes.length})`,
        });
    }

    if (nodes.length > 1) {
        // validate node connections
        nodes.forEach((node) => {
            const nodeType = node.type;
            const nodeId = node.id;

            // throw error if node has no incoming connections
            if (nodeType !== "start") {
                const hasIncoming = edges.some((edge) => edge.target === nodeId);
                if (!hasIncoming) {
                    errors.push({
                        id: `connection-in-${nodeId}`,
                        type: "error",
                        message: `Node "${node.data.label || nodeType}" has no incoming connections`,
                        nodeId: nodeId,
                    });
                }
            }

            // throw error if node has no outgoing connections
            if (nodeType !== "end") {
                const hasOutgoing = edges.some((edge) => edge.source === nodeId);
                if (!hasOutgoing) {
                    errors.push({
                        id: `connection-out-${nodeId}`,
                        type: "error",
                        message: `Node "${node.data.label || nodeType}" has no outgoing connections`,
                        nodeId: nodeId,
                    });
                }
            }

            // throw error if conditional node is missing TRUE or FALSE path connection
            if (nodeType === "conditional") {
                const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
                const hasTruePath = outgoingEdges.some((edge) => edge.sourceHandle === "true");
                const hasFalsePath = outgoingEdges.some((edge) => edge.sourceHandle === "false");

                if (!hasTruePath) {
                    errors.push({
                        id: `connection-true-${nodeId}`,
                        type: "error",
                        message: `Conditional node "${
                            node.data.customName || node.data.label
                        }" missing TRUE path connection`,
                        nodeId: nodeId,
                    });
                }

                if (!hasFalsePath) {
                    errors.push({
                        id: `connection-false-${nodeId}`,
                        type: "error",
                        message: `Conditional node "${
                            node.data.customName || node.data.label
                        }" missing FALSE path connection`,
                        nodeId: nodeId,
                    });
                }
            }
        });

        if (startNodes.length === 1) {
            const reachableNodes = new Set<string>();
            const startNodeId = startNodes[0].id;
            const visitedNode = new Set<string>();

            const markReachableFromNode = (nodeId: string) => {
                // check if node has already been visited then return
                if (visitedNode.has(nodeId)) return;
                // mark as visited & add to reachable nodes
                visitedNode.add(nodeId);
                reachableNodes.add(nodeId);

                // recursively mark reachable nodes from outgoing edges
                const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
                outgoingEdges.forEach((edge) => {
                    markReachableFromNode(edge.target);
                });
            };

            markReachableFromNode(startNodeId);

            // throw error if any node is not connected to the workflow (unreachable from Start)
            nodes.forEach((node) => {
                if (!reachableNodes.has(node.id)) {
                    errors.push({
                        id: `unreachable-${node.id}`,
                        type: "error",
                        message: `Node "${
                            node.data.customName || node.data.label || node.type
                        }" is not connected to the workflow (unreachable from Start)`,
                        nodeId: node.id,
                    });
                }
            });
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

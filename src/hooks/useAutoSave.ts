import { useEffect, useRef, useState } from "react";
import type { Node, Edge } from "@xyflow/react";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export interface SavedWorkflowData {
    nodes: Node[];
    edges: Edge[];
    timestamp: string;
    version: number;
}

interface AutoSaveResult {
    saveStatus: SaveStatus;
    lastSavedAt: Date | null;
    restoreSavedWorkflow: () => SavedWorkflowData | null;
    clearSavedWorkflow: () => void;
}

const storageKey = "workflow-autosave";
const debounceDelay = 2000;

export const useAutoSave = (nodes: Node[], edges: Edge[], isValid: boolean): AutoSaveResult => {
    const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
    const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (!isValid || nodes.length === 0) return setSaveStatus("idle");

        setSaveStatus("saving");

        timeoutRef.current = setTimeout(() => {
            try {
                const workflowData: SavedWorkflowData = {
                    nodes,
                    edges,
                    timestamp: new Date().toISOString(),
                    version: 1,
                };

                localStorage.setItem(storageKey, JSON.stringify(workflowData));
                setSaveStatus("saved");
                setLastSavedAt(new Date());

                setTimeout(() => setSaveStatus("idle"), 3000);
            } catch (error) {
                console.error("Failed to save workflow:", error);
                setSaveStatus("error");
            }
        }, debounceDelay);

        return () => timeoutRef.current && clearTimeout(timeoutRef.current);
    }, [nodes, edges, isValid]);

    const restoreSavedWorkflow = (): SavedWorkflowData | null => {
        try {
            const saved = localStorage.getItem(storageKey);
            if (!saved) return null;

            const data = JSON.parse(saved) as SavedWorkflowData;
            return data;
        } catch (error) {
            console.error("Failed to restore workflow:", error);
            return null;
        }
    };

    const clearSavedWorkflow = () => {
        try {
            localStorage.removeItem(storageKey);
        } catch (error) {
            console.error("Failed to clear saved workflow:", error);
        }
    };

    return {
        saveStatus,
        lastSavedAt,
        restoreSavedWorkflow,
        clearSavedWorkflow,
    };
};

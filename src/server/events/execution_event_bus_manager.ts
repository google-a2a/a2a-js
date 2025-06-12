import { ExecutionEventBus, IExecutionEventBus } from "./execution_event_bus.js";

export interface IExecutionEventBusManager {
    createOrGetByTaskId(taskId: string): IExecutionEventBus;
    getByTaskId(taskId: string): IExecutionEventBus | undefined;
    cleanupByTaskId(taskId: string): void;
}

export class ExecutionEventBusManager implements IExecutionEventBusManager {
    private taskIdToBus: Map<string, IExecutionEventBus> = new Map();

    /**
     * Creates or retrieves an existing ExecutionEventBus based on the taskId.
     * @param taskId The ID of the task.
     * @returns An instance of IExecutionEventBus.
     */
    public createOrGetByTaskId(taskId: string): IExecutionEventBus {
        if (!this.taskIdToBus.has(taskId)) {
            this.taskIdToBus.set(taskId, new ExecutionEventBus());
        }
        return this.taskIdToBus.get(taskId)!;
    }

    /**
     * Retrieves an existing ExecutionEventBus based on the taskId.
     * @param taskId The ID of the task.
     * @returns An instance of IExecutionEventBus or undefined if not found.
     */
    public getByTaskId(taskId: string): IExecutionEventBus | undefined {
        return this.taskIdToBus.get(taskId);
    }

    /**
     * Removes the event bus for a given taskId.
     * This should be called when an execution flow is complete to free resources.
     * @param taskId The ID of the task.
     */
    public cleanupByTaskId(taskId: string): void {
        const bus = this.taskIdToBus.get(taskId);
        if (bus) {
            bus.removeAllListeners();
        }
        this.taskIdToBus.delete(taskId);
    }
}

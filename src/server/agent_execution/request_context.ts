import {
    Message,
    Task,
} from "../../types.js";

export class RequestContext {
    public readonly userMessage: Message;
    public readonly task?: Task;
    public readonly referenceTasks?: Task[];
    public readonly taskId: string;
    public readonly contextId: string;

    constructor(
        userMessage: Message,
        taskId: string,
        contextId: string,
        task?: Task,
        referenceTasks?: Task[],
    ) {
        this.userMessage = userMessage;
        this.taskId = taskId;
        this.contextId = contextId;
        this.task = task;
        this.referenceTasks = referenceTasks;
    }
}
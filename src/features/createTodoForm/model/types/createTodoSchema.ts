export interface CreateTodoSchema {
    title: string;
    description: string;
    isLoading: boolean;
    error?: string;
}

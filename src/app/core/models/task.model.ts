export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueTime: string;
  dueDate: string;
  completed: boolean;
  notes?: string;
  tags: string[];
  createdAt: string;
}
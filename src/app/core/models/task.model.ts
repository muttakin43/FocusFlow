export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueTime: string;
  completed: boolean;
  notes?: string;
}
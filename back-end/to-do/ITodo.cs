using System.Collections.Generic;

// rest of your code
interface ITodo {
    void addTask(Task task);
    void updateTask(Task task);
    void getTasks();
    void MarkAsDone(int index);
    void deleteTask(int index);
}
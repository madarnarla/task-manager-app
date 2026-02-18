package com.example.Backend.service;

import com.example.Backend.entity.Task;
import com.example.Backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repo;

    public TaskServiceImpl(TaskRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Task> getAll() {
        return repo.findAll();
    }

    @Override
    public Task getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Override
    public Task create(Task task) {
        return repo.save(task);
    }

    @Override
    public Task update(Long id, Task task) {
        Task existing = getById(id);
        existing.setTitle(task.getTitle());
        existing.setDescription(task.getDescription());
        existing.setCompleted(task.isCompleted());
        existing.setDueDate(task.getDueDate());
        return repo.save(existing);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
    
    @Override
    public Task toggleCompleted(Long id) {
        Task task = getById(id);
        task.setCompleted(!task.isCompleted());
        return repo.save(task);
    }

}

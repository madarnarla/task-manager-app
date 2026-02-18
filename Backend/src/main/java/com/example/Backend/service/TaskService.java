package com.example.Backend.service;

import com.example.Backend.entity.Task;
import java.util.List;

public interface TaskService {

    List<Task> getAll();

    Task getById(Long id);

    Task create(Task task);

    Task update(Long id, Task task);

    void delete(Long id);

    Task toggleCompleted(Long id);   
}

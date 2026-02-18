package com.example.Backend.service;

import com.example.Backend.entity.Task;
import com.example.Backend.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class TaskServiceTest {

    @Test
    void toggleShouldFlipStatus() {

        TaskRepository repo = Mockito.mock(TaskRepository.class);

        Task task = new Task();
        task.setCompleted(false);

        Mockito.when(repo.findById(1L)).thenReturn(Optional.of(task));
        Mockito.when(repo.save(task)).thenReturn(task);

        TaskServiceImpl service = new TaskServiceImpl(repo);

        Task result = service.toggleCompleted(1L);

        assertTrue(result.isCompleted());
    }
}

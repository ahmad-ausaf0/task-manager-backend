import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());


app.use(cors({
  origin: ["http://localhost:4200", "https://task-manager-frontend-pnumk4ml4.vercel.app/", "https://task-manager-frontend-neon-pi.vercel.app/"], 
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));


let tasks = [
    { id: 1, title: "Task1" },
    { id: 2, title: "Task2" },
    { id: 3, title: "Task3" }
];

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Get all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }
    const newTask = { id: tasks.length + 1, title };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Task deleted' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


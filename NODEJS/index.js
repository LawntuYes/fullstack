// this is the beginning of the API course
import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { id: 1, name: 'Alice', age: 30, city: 'Beer Sheva'},
    { id: 2, name: 'Bob', age: 25, city: 'Tel Aviv'},
];

app.get('/', (req, res) => {
    res.send('Hi!');
});
app.get('/users', (req, res) => {
    res.json(users);
});
app.post('/add', express.json(), (req, res) => {
    const { name, age, city } = req.body;
    users.push({ id: users.length + 1, name, age, city });

    return res.status(201).json({message: 'User added' , users});
});
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    // console.log(id);
    if (!users.find(user => user.id === parseInt(id))) {
        return res.status(404).send('User not found');
    }
    users = users.filter(user => user.id !== parseInt(id));
    return res.status(200).json({message: 'User deleted' , users});
});
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, city } = req.body;
    const user = users.find(user => user.id === parseInt(id));
    if (!user) {
        return res.status(404).send('User not found');
    }
    user.name = name;
    user.age = age;
    user.city = city;
    return res.status(200).json({message: 'User updated' , users});
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

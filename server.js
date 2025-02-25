
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = {
    "123456": { balance: 1000, transactions: [] }
};

app.get('/balance/:id', (req, res) => {
    const userId = req.params.id;
    if (users[userId]) {
        res.json({ balance: users[userId].balance });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.post('/deposit', (req, res) => {
    const { id, amount } = req.body;
    if (users[id]) {
        users[id].balance += amount;
        users[id].transactions.push({ type: 'deposit', amount: amount });
        res.json({ message: 'Deposit successful', balance: users[id].balance });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

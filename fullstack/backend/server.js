import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('Server is ready');
});

app.get('/api/jokes', (req, res) => {
	const jokes = [
		{
			id: 1,
			title: '1 joke',
			content: 'This is 1st joke'
		},
		{
			id: 2,
			title: '2 joke',
			content: 'This is 2nd joke'
		},
		{
			id: 3,
			title: '3 joke',
			content: 'This is 3rd joke'
		},
		{
			id: 4,
			title: '4 joke',
			content: 'This is 4th joke'
		},
		{
			id: 5,
			title: '5 joke',
			content: 'This is 5th joke'
		}
	];
	res.send(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server at ${port}`);
});
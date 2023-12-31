const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000;
const repoOwner = 'abdalaabdelatif';
const repoName = 'projectfinal.github.io';
const filePath = 'state.txt';
const accessToken = 'YOUR_ACCESS_TOKEN';

app.get('/toggle', async (req, res) => {
    try {
        const state = req.query.state;

        // Get the current content of the file
        const getFileResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const fileData = await getFileResponse.json();
        const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');

        // Update the content and commit the change
        const updateFileResponse = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: `Update state to ${state}`,
                content: Buffer.from(state).toString('base64'),
                sha: fileData.sha,
            }),
        });

        if (updateFileResponse.ok) {
            console.log(`State set to ${state}`);
            res.status(200).send('OK');
        } else {
            console.error('Failed to set state');
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

import axios from 'axios';
import { spawn } from 'child_process';
// const axios = require('axios');
// const { spawn } = require('child_process');

axios
  .post('http://localhost:3000/build', null, {
    headers: {
      Upgrade: 'npm-run-build-in-progress',
    },
  })
  .then(() => {
    const build = spawn('npm', ['run', 'build']);

    build.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    build.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    build.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });

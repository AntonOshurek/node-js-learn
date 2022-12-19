const { exec } = require('child_process');

const childProcess = exec('dir', (err, stdout, stderr) => {
  if(err) {
    console.error(err.message);
  };
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

childProcess.on('exit', (code) => {
  console.log(`exit code: ${code}`)
});

// const { spawn } = require('child_process');

// const childProcess = spawn('dir');

// childProcess.stdout.on('data', (data) => {
//   console.log(`stdout: ${data}`)
// });

// childProcess.stderr.on('data', (data) => {
//   console.log(`stderr: ${data}`)
// });

// childProcess.on('exit', (code) => {
//   console.log(`exit code: ${code}`)
// });


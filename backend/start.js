const { spawn } = require('child_process');

// Start the server using npm start
const child = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  process.exit(code);
}); 
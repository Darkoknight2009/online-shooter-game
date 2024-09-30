const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5
};

const bullets = [];
const bulletSpeed = 10;

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            player.x -= player.speed;
            break;
        case 'ArrowRight':
            player.x += player.speed;
            break;
        case ' ':
            bullets.push({ x: player.x + 20, y: player.y, width: 10, height: 10 });
            break;
    }
});

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach((bullet, index) => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bulletSpeed; // Move bullet upwards

        // Remove bullet if it goes off-screen
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    requestAnimationFrame(gameLoop);
}

gameLoop();

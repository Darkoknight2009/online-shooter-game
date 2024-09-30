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
const enemies = [];
const enemySpeed = 2;
let score = 0;

// Spawn enemies
function spawnEnemies() {
    const enemy = {
        x: Math.random() * (canvas.width - 50), // Random x position
        y: 0,
        width: 50,
        height: 50,
        color: 'red'
    };
    enemies.push(enemy);
}

// Handle key presses
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

// Draw player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw bullets
function drawBullets() {
    ctx.fillStyle = 'yellow';
    bullets.forEach((bullet, bulletIndex) => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bulletSpeed;

        // Remove bullet if it goes off-screen
        if (bullet.y < 0) {
            bullets.splice(bulletIndex, 1);
        }
    });
}

// Draw enemies
function drawEnemies() {
    ctx.fillStyle = 'red';
    enemies.forEach((enemy, enemyIndex) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        enemy.y += enemySpeed; // Move enemy down

        // Check for collision with bullets
        bullets.forEach((bullet, bulletIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                // Remove bullet and enemy on collision
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                score += 10; // Increase score
            }
        });

        // Remove enemy if it goes off-screen
        if (enemy.y > canvas.height) {
            enemies.splice(enemyIndex, 1);
        }
    });
}

// Draw score
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();
    drawScore();
    requestAnimationFrame(gameLoop);
}

// Spawn enemies every 1 second
setInterval(spawnEnemies, 1000);

gameLoop();

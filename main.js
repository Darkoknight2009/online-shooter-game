const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: 'blue',
    speed: 5,
    health: 100 // Player health
};

const bullets = [];
const bulletSpeed = 10;
const enemies = [];
const enemySpeed = 2;
let score = 0;

// Load sounds
const shootSound = new Audio('assets/retro-laser-1-236669.mp3'); // Shooting sound
const hitSound = new Audio('assets/male_hurt7-48124.mp3'); // Hit sound
const backgroundMusic = new Audio('assets/8-bit-background-music-for-arcade-game-come-on-mario-164702.mp3'); // Background music

backgroundMusic.loop = true; // Loop the background music
backgroundMusic.play(); // Play background music

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
            if (player.x < 0) player.x = 0; // Prevent going off-screen
            break;
        case 'ArrowRight':
            player.x += player.speed;
            if (player.x + player.width > canvas.width) player.x = canvas.width - player.width; // Prevent going off-screen
            break;
        case ' ':
            bullets.push({ x: player.x + 20, y: player.y, width: 10, height: 10 });
            shootSound.play(); // Play shooting sound
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

        // Check if enemy reaches the bottom
        if (enemy.y > canvas.height) {
            player.health -= 10; // Decrease health
            enemies.splice(enemyIndex, 1); // Remove enemy
        }

        // Check for collision with bullets
        bullets.forEach((bullet, bulletIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                bullets.splice(bulletIndex, 1); // Remove bullet
                enemies.splice(enemyIndex, 1); // Remove enemy
                score += 10; // Increase score
                hitSound.play(); // Play hit sound
            }
        });
    });
}

// Draw score
function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Draw health
function drawHealth() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Health: ${player.health}`, canvas.width - 120, 20);
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();
    drawScore();
    drawHealth();

    // Check for game over
    if (player.health <= 0) {
        alert('Game Over! Your score: ' + score);
        document.location.reload(); // Reload the page to restart the game
    }

    requestAnimationFrame(gameLoop);
}

// Spawn enemies every 1 second
setInterval(spawnEnemies, 1000);

gameLoop();

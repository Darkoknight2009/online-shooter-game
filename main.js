const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let bullets;
let lastFired = 0;

function preload() {
    this.load.image('player', 'assets/player.png');  // Player image
    this.load.image('bullet', 'assets/bullet.png');  // Bullet image
}

function create() {
    player = this.physics.add.sprite(400, 300, 'player').setCollideWorldBounds(true);
    bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 10
    });
    cursors = this.input.keyboard.createCursorKeys();
}

function update(time) {
    player.setVelocity(0);

    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    } else if (cursors.right.isDown) {
        player.setVelocityX(200);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-200);
    } else if (cursors.down.isDown) {
        player.setVelocityY(200);
    }

    if (cursors.space.isDown && time > lastFired) {
        let bullet = bullets.get(player.x, player.y);

        if (bullet) {
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.setVelocityY(-300);
            lastFired = time + 500;
        }
    }
}

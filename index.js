// Confetti particle class
class ConfettiParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velocityX = (Math.random() - 0.5) * 4;
        this.velocityY = Math.random() * -8 - 2;
        this.gravity = 0.3;
        this.size = Math.random() * 8 + 4;
        this.color = this.getRandomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 10;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }

    getRandomColor() {
        const colors = [
            '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
            '#ff00ff', '#00ffff', '#ff8800', '#8800ff',
            '#ffd700', '#ff69b4'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.velocityY += this.gravity;
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.rotation += this.rotationSpeed;
        this.life -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }

    isAlive() {
        return this.life > 0 && this.y < window.innerHeight + 100;
    }
}

// Confetti system
class ConfettiSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createBurst(x, y, count = 50) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new ConfettiParticle(x, y));
        }
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];
            particle.update();
            particle.draw(this.ctx);
            
            if (!particle.isAlive()) {
                this.particles.splice(i, 1);
            }
        }
        
        if (this.particles.length > 0) {
            this.animationId = requestAnimationFrame(() => this.update());
        }
    }

    start() {
        if (!this.animationId) {
            this.update();
        }
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

// Initialize confetti system
const canvas = document.getElementById('confettiCanvas');
const confettiSystem = new ConfettiSystem(canvas);

// Celebration button handler
const celebrationBtn = document.getElementById('celebrationBtn');

celebrationBtn.addEventListener('click', () => {
    // Create multiple bursts
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Main burst
    confettiSystem.createBurst(centerX, centerY, 100);
    
    // Additional bursts around the screen
    setTimeout(() => {
        confettiSystem.createBurst(centerX * 0.3, centerY * 0.5, 30);
        confettiSystem.createBurst(centerX * 1.7, centerY * 0.5, 30);
        confettiSystem.createBurst(centerX, centerY * 0.3, 30);
        confettiSystem.createBurst(centerX, centerY * 1.7, 30);
    }, 200);
    
    confettiSystem.start();
    
    // Add visual feedback
    celebrationBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        celebrationBtn.style.transform = '';
    }, 150);
    
    // Play sound effect (if desired, can be added)
    playCelebrationSound();
});

// Optional: Play a celebration sound
function playCelebrationSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
        // Fallback if Web Audio API is not supported
        console.log('Audio not supported');
    }
}

// Add interactive gift boxes
const gifts = document.querySelectorAll('.gift');
gifts.forEach((gift, index) => {
    gift.addEventListener('click', () => {
        const rect = gift.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        confettiSystem.createBurst(x, y, 30);
        confettiSystem.start();
        
        // Animate gift opening
        gift.style.transform = 'scale(1.2) rotate(5deg)';
        setTimeout(() => {
            gift.style.transform = '';
        }, 300);
    });
    
    gift.style.cursor = 'pointer';
    gift.style.transition = 'transform 0.3s ease';
});

// Add snowflake click interaction
const snowflakes = document.querySelectorAll('.snowflake');
snowflakes.forEach(snowflake => {
    snowflake.addEventListener('click', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        confettiSystem.createBurst(x, y, 20);
        confettiSystem.start();
    });
    
    snowflake.style.cursor = 'pointer';
});

// Auto-start confetti on page load (subtle)
window.addEventListener('load', () => {
    setTimeout(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        confettiSystem.createBurst(centerX, centerY, 20);
        confettiSystem.start();
    }, 1000);
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        celebrationBtn.click();
    }
});

console.log('🎄 Merry Christmas 2025! 🎄');


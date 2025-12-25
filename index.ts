// Confetti particle interface
interface Particle {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    gravity: number;
    size: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    life: number;
    decay: number;
}

// Confetti particle class
class ConfettiParticle {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    gravity: number;
    size: number;
    color: string;
    rotation: number;
    rotationSpeed: number;
    life: number;
    decay: number;

    constructor(x: number, y: number) {
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

    private getRandomColor(): string {
        const colors: string[] = [
            '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
            '#ff00ff', '#00ffff', '#ff8800', '#8800ff',
            '#ffd700', '#ff69b4'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update(): void {
        this.velocityY += this.gravity;
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.rotation += this.rotationSpeed;
        this.life -= this.decay;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }

    isAlive(): boolean {
        return this.life > 0 && this.y < window.innerHeight + 100;
    }
}

// Confetti system class
class ConfettiSystem {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: ConfettiParticle[];
    private animationId: number | null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const context = canvas.getContext('2d');
        if (!context) {
            throw new Error('Could not get 2D context from canvas');
        }
        this.ctx = context;
        this.particles = [];
        this.animationId = null;
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    private resize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createBurst(x: number, y: number, count: number = 50): void {
        for (let i = 0; i < count; i++) {
            this.particles.push(new ConfettiParticle(x, y));
        }
    }

    private update(): void {
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
        } else {
            this.animationId = null;
        }
    }

    start(): void {
        if (!this.animationId) {
            this.update();
        }
    }

    stop(): void {
        if (this.animationId !== null) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
}

// Initialize confetti system
const canvas = document.getElementById('confettiCanvas') as HTMLCanvasElement;
if (!canvas) {
    throw new Error('Canvas element not found');
}

const confettiSystem = new ConfettiSystem(canvas);

// Celebration button handler
const celebrationBtn = document.getElementById('celebrationBtn') as HTMLButtonElement;
if (!celebrationBtn) {
    throw new Error('Celebration button not found');
}

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
    
    // Play sound effect
    playCelebrationSound();
});

// Play a celebration sound
function playCelebrationSound(): void {
    // Create a simple beep sound using Web Audio API
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();
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
const gifts = document.querySelectorAll('.gift') as NodeListOf<HTMLElement>;
gifts.forEach((gift: HTMLElement, index: number) => {
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
const snowflakes = document.querySelectorAll('.snowflake') as NodeListOf<HTMLElement>;
snowflakes.forEach((snowflake: HTMLElement) => {
    snowflake.addEventListener('click', (e: MouseEvent) => {
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
document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        celebrationBtn.click();
    }
});

console.log('🎄 Merry Christmas! 🎄');


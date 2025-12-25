# 🎄 Merry Christmas Celebration Template

A beautiful, interactive Merry Christmas celebration template with animated snowflakes, a decorated Christmas tree, twinkling lights, gift boxes, and a confetti system.

## ✨ Features

- **Animated Snowflakes**: Falling snowflakes with smooth animations
- **Interactive Christmas Tree**: Decorated tree with ornaments and a twinkling star
- **Twinkling Lights**: Colorful Christmas lights with blinking animations
- **Gift Boxes**: Interactive gift boxes that burst confetti when clicked
- **Confetti System**: Particle-based confetti system with multiple colors
- **Glowing Text**: Animated "Merry Christmas!" message with glow effects
- **Responsive Design**: Works beautifully on desktop and mobile devices
- **Keyboard Support**: Press Space or Enter to trigger celebrations
- **Audio Feedback**: Celebration sounds when interacting with elements

## 📁 File Structure

```
merry-christmas/
├── index.html    # Main HTML structure
├── index.css     # Styling and animations
├── index.js      # JavaScript interactivity
├── index.ts      # TypeScript version (type-safe)
└── README.md     # This file
```

## 🚀 Getting Started

### Quick Start

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Enjoy the festive celebration!

### Using the JavaScript Version

Simply open `index.html` in your browser - it's ready to use!

### Using the TypeScript Version

If you want to use the TypeScript version:

1. Compile `index.ts` to JavaScript:
   ```bash
   tsc index.ts
   ```

2. Update `index.html` to reference the compiled JavaScript file instead of `index.js`

## 🎮 Interactive Elements

- **Celebration Button**: Click the "🎉 Celebrate! 🎉" button to trigger a confetti burst
- **Gift Boxes**: Click any gift box to see confetti explode from it
- **Snowflakes**: Click falling snowflakes to create mini confetti bursts
- **Keyboard**: Press `Space` or `Enter` to trigger the celebration

## 🎨 Customization

### Colors

You can customize colors by editing the CSS variables and color values in `index.css`:

- Background gradient: Modify the `background` property in the `body` selector
- Text colors: Change the `color` property in `.title` and `.subtitle`
- Light colors: Modify the `background` colors in `.light` selectors
- Gift box colors: Update the gradient colors in `.gift-1`, `.gift-2`, `.gift-3`

### Animations

Adjust animation speeds and effects in `index.css`:

- Snowflake speed: Modify `animation-duration` in `.snowflake` selectors
- Light blinking: Change `animation-duration` in `@keyframes blink`
- Gift bouncing: Adjust `animation-duration` in `@keyframes bounce`

### Confetti

Customize confetti behavior in `index.js` or `index.ts`:

- Particle count: Change the `count` parameter in `createBurst()` calls
- Colors: Modify the `colors` array in the `getRandomColor()` method
- Physics: Adjust `gravity`, `velocityX`, `velocityY` in the `ConfettiParticle` constructor

## 🌐 Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Animations, gradients, and modern styling
- **JavaScript/TypeScript**: Interactive functionality and particle system
- **Canvas API**: Confetti rendering
- **Web Audio API**: Celebration sounds

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎅 Enjoy!

Have a wonderful and Merry Christmas! 🎄✨

---

Made with ❤️ for the holiday season

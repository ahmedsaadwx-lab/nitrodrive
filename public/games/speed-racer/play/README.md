# 🏎️ Speed Racer - Professional Car Racing Game

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen)](https://speed-racer-game.vercel.app)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Canvas-orange)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-blue)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-lightgrey)](LICENSE)

A professional, fully-featured car racing game built with pure JavaScript, HTML5 Canvas, and modern CSS. Experience realistic car physics, multiple vehicle types, and a challenging race track with a complete lap timing system.

## 🎮 **Live Demo**

🔗 **[Play Speed Racer Now!](https://speed-racer-game.vercel.app)**

## 📸 **Screenshots**

![Speed Racer Gameplay](https://via.placeholder.com/800x400/ff6b00/ffffff?text=Speed+Racer+Gameplay)
*Main racing interface with professional track design and real-time statistics*

![Car Selection](https://via.placeholder.com/400x300/333333/ffffff?text=Car+Selection)
*Choose from three different car types with unique characteristics*

## ✨ **Features**

### 🚗 **Multiple Car Types**
- **Sport Car** (Red) - Balanced performance with good acceleration and handling
- **Race Car** (Blue) - High top speed with racing stripes and aerodynamic design
- **Classic Car** (Green) - High acceleration with vintage chrome styling

### 🏁 **Professional Racing Experience**
- **Realistic Physics Engine** - Momentum-based movement, friction, and collision detection
- **Complex Track Design** - Professional circuit with chicanes, corners, and obstacles
- **Checkpoint System** - Complete 3 checkpoints per lap to ensure fair racing
- **Lap Timing** - Precise millisecond timing with best lap records
- **Visual Effects** - Skid marks, exhaust particles, and damage animations

### 🎯 **Advanced Gameplay**
- **3-Lap Championship** - Complete racing experience
- **Collision Physics** - Realistic bounce-back and speed reduction on impact
- **Performance Tracking** - Real-time speed, lap times, and FPS monitoring
- **Progressive Difficulty** - Master the track layout and improve your times

### 💎 **Modern Interface**
- **Professional UI Design** - Racing-themed interface with Orbitron font
- **Real-time Statistics** - Speed, lap count, current time, and best records
- **Responsive Design** - Works on desktop and mobile devices
- **Visual Polish** - Gradient backgrounds, neon effects, and smooth animations

## 🎮 **How to Play**

### **Controls**
| Key | Action |
|-----|--------|
| `W` or `↑` | Accelerate |
| `S` or `↓` | Brake |
| `A` or `←` | Turn Left |
| `D` or `→` | Turn Right |
| `SPACE` | Restart Race |
| `P` | Pause/Resume |

### **Objective**
1. **Navigate the track** avoiding brown boundary walls and obstacles
2. **Pass through checkpoints** in order (green numbered markers: 1→2→3)
3. **Cross the finish line** (checkered pattern) after completing all checkpoints
4. **Complete 3 laps** as fast as possible
5. **Beat your best time** and set new records!

### **Pro Tips**
- 🏎️ **Choose your car wisely** - Each has different speed, acceleration, and handling
- 🛣️ **Follow racing lines** - Use the yellow center lines for optimal cornering
- ⚡ **Smooth inputs** - Gradual acceleration and braking maintain better control
- 🎯 **Learn the track** - Memorize checkpoint locations and optimal racing lines
- 💨 **Master momentum** - Carry speed through corners for faster lap times

## 🛠️ **Technical Implementation**

### **Architecture**
```
Speed Racer/
├── index.html          # Main game interface and layout
├── style.css           # Modern styling and responsive design
├── car.js              # Car class with physics and rendering
├── track.js            # Track class with collision and lap detection
├── game.js             # Main game loop and state management
└── README.md           # Project documentation
```

### **Core Technologies**
- **HTML5 Canvas** - High-performance 2D graphics rendering
- **Vanilla JavaScript** - ES6+ classes and modern syntax
- **CSS3** - Advanced styling with gradients, animations, and responsive design
- **Web APIs** - LocalStorage for record keeping, RequestAnimationFrame for smooth gameplay

### **Key Features Implementation**

#### **Physics Engine**
```javascript
// Realistic car movement with momentum
this.velocityX = Math.sin(this.angle) * this.velocity;
this.velocityY = -Math.cos(this.angle) * this.velocity;
this.velocity *= this.friction; // Realistic deceleration
```

#### **Collision Detection**
```javascript
// Precise corner-based collision detection
getCorners() {
    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);
    // Transform car corners based on rotation
}
```

#### **Visual Effects**
- **Skid Marks** - Dynamic trail effects during hard turns
- **Exhaust Particles** - Animated smoke during acceleration
- **Damage Effects** - Screen shake and transparency on collisions
- **Professional Styling** - Racing-themed UI with modern aesthetics

## 🚀 **Getting Started**

### **Quick Start**
1. **Clone the repository**
   ```bash
   git clone https://github.com/Steve-IX/speed-racer-game.git
   cd speed-racer-game
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your web browser
   # Or use a local server for best performance:
   npx serve .
   ```

3. **Start Racing!**
   - Choose your car type
   - Use WASD or arrow keys to control
   - Complete 3 laps as fast as possible!

### **Development Setup**
No build process required! This is a pure client-side JavaScript application.

For development with live reload:
```bash
# Using Live Server (VS Code extension)
# Or any static file server
python -m http.server 8000
# Then visit http://localhost:8000
```

## 🎯 **Performance & Compatibility**

### **Performance Metrics**
- **60 FPS** - Smooth gameplay on modern browsers
- **Optimized Rendering** - Efficient canvas drawing with minimal overhead
- **Memory Management** - Proper cleanup of visual effects and particles

### **Browser Support**
- ✅ **Chrome** (Latest)
- ✅ **Firefox** (Latest)
- ✅ **Safari** (Latest)
- ✅ **Edge** (Latest)
- ⚠️ **Internet Explorer** (Not supported)

### **Device Compatibility**
- 🖥️ **Desktop** - Full experience with keyboard controls
- 📱 **Mobile** - Responsive design (touch controls planned for future update)
- 📺 **Large Screens** - Scales beautifully on high-resolution displays

## 🔧 **Customization**

### **Car Types**
Easily add new car types by modifying the `carTypes` array in `car.js`:
```javascript
{
    name: "Custom Car",
    color: "#your-color",
    accentColor: "#accent-color",
    maxSpeed: 8,
    acceleration: 0.3,
    turnSpeed: 0.04,
    width: 20,
    height: 40
}
```

### **Track Design**
Modify the track layout in `track.js` by adjusting:
- **Boundaries** - Wall positions and obstacles
- **Checkpoints** - Racing checkpoint locations
- **Decorations** - Visual elements and theming

### **Styling**
Customize the appearance in `style.css`:
- **Color Schemes** - Racing themes and visual styling
- **Fonts** - Typography and text effects
- **Animations** - Transitions and visual effects

## 📊 **Game Statistics**

### **Racing Metrics**
- **Lap Times** - Precise millisecond timing
- **Speed Tracking** - Real-time km/h display
- **Best Records** - Persistent localStorage records
- **Performance** - FPS monitoring and optimization

### **Track Information**
- **Track Length** - Approximately 2.5km per lap
- **Checkpoints** - 3 mandatory checkpoints per lap
- **Obstacles** - Strategic placement for challenge
- **Surface Types** - Grass and asphalt with different friction

## 🤝 **Contributing**

We welcome contributions! Here's how you can help:

### **Areas for Contribution**
- 🎮 **New Car Types** - Additional vehicles with unique characteristics
- 🛣️ **Track Designs** - New racing circuits and layouts
- 🎨 **Visual Effects** - Enhanced graphics and animations
- 📱 **Mobile Controls** - Touch-based control implementation
- 🔊 **Audio System** - Engine sounds and racing audio
- 🏆 **Game Modes** - Time trials, tournaments, multiplayer

### **Development Process**
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Modern Web APIs** - HTML5 Canvas and JavaScript ES6+
- **Racing Game Inspiration** - Classic arcade racing games
- **Open Source Community** - For tools and inspiration
- **Web Development Best Practices** - Modern coding standards

## 📞 **Contact & Support**

- **Developer**: [Steve-IX](https://github.com/Steve-IX)
- **Email**: a.stephenyeboah04@gmail.com
- **Issues**: [GitHub Issues](https://github.com/Steve-IX/speed-racer-game/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Steve-IX/speed-racer-game/discussions)

---

<div align="center">

**🏎️ Start your engines and race to victory! 🏆**

[Play Now](https://speed-racer-game.vercel.app) • [View Source](https://github.com/Steve-IX/speed-racer-game) • [Report Bug](https://github.com/Steve-IX/speed-racer-game/issues)

</div> 
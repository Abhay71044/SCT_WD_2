# SCT_WD_2
An interactive and user-friendly stopwatch web application built using HTML, CSS, and JavaScript. It includes start, pause, and reset functions along with lap time tracking, allowing users to accurately measure, record, and monitor time intervals with ease.
# ⏱️ Precision Stopwatch Web Application

## 📌 Project Overview
The Precision Stopwatch is an interactive and user-friendly web application that allows users to accurately measure time intervals. It supports starting, pausing, resetting, and recording lap times with millisecond precision. The application features a modern dark UI with smooth animations for an engaging user experience.

## ✨ Features
- Start, pause, and reset stopwatch functionality
- Accurate time tracking with minutes, seconds, and milliseconds
- Lap time recording with total time and lap difference
- Highlight fastest and slowest laps
- Save lap times using browser localStorage
- Clear all lap records option
- Keyboard shortcuts for quick control
- Responsive and modern glassmorphism UI

## 🛠️ Technologies Used
- **HTML5** – Structure of the application  
- **CSS3** – Styling, animations, and dark theme UI  
- **JavaScript (Vanilla)** – Stopwatch logic, lap tracking, and interactivity  
- **Font Awesome** – Icons for better UI clarity  

## ⌨️ Keyboard Shortcuts
- **Space** → Start / Pause  
- **L** → Record Lap (while running)  
- **R** → Reset Stopwatch  

## ⚙️ How It Works
- JavaScript uses `Date.now()` to calculate elapsed time accurately.
- The stopwatch updates every 10 milliseconds for precision.
- Lap times are stored in an array and rendered dynamically.
- Lap data is saved to `localStorage` so it persists after page reload.
- Web Audio API is used to generate subtle beep sounds for actions.

## 📂 Project Structure
├── index.html # Main HTML structure
├── style.css # Styling and animations
├── script.js # Stopwatch logic and functionality

## 🚀 How to Run the Project
1. Download or clone the repository  
2. Open `index.html` in any modern web browser  
3. Use the buttons or keyboard shortcuts to control the stopwatch  

## 📈 Learning Outcomes
- Implementing real-time stopwatch logic in JavaScript
- Working with timers, intervals, and time calculations
- Using localStorage for data persistence
- Enhancing UI/UX with animations and sound feedback
- Building a fully interactive web application without frameworks

## 👨‍💻 Author
**Abhay**  
Web Development Project  

---

⭐ Feel free to use, modify, or enhance this project!


        // DOM Elements
        const minutesDisplay = document.getElementById('minutes');
        const secondsDisplay = document.getElementById('seconds');
        const millisecondsDisplay = document.getElementById('milliseconds');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const lapBtn = document.getElementById('lapBtn');
        const clearLapsBtn = document.getElementById('clearLapsBtn');
        const saveLapsBtn = document.getElementById('saveLapsBtn');
        const lapList = document.getElementById('lapList');
        const statusIndicator = document.getElementById('status-indicator');
        const timeDisplay = document.querySelector('.time-display');

        // Stopwatch variables
        let startTime = 0;
        let elapsedTime = 0;
        let timerInterval = null;
        let isRunning = false;
        let lapTimes = [];
        let lastLapTime = 0;

        // Load saved lap times from local storage
        function loadLapsFromStorage() {
            const savedLaps = localStorage.getItem('stopwatchLaps');
            if (savedLaps) {
                lapTimes = JSON.parse(savedLaps);
                renderLaps();
            }
        }

        // Save lap times to local storage
        function saveLapsToStorage() {
            localStorage.setItem('stopwatchLaps', JSON.stringify(lapTimes));
            
            // Visual feedback for save
            saveLapsBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
            setTimeout(() => {
                saveLapsBtn.innerHTML = '<i class="fas fa-save"></i> Save';
            }, 1500);
        }

        // Format time to MM:SS:MS
        function formatTime(time) {
            // Calculate minutes, seconds, and milliseconds
            const minutes = Math.floor(time / 60000);
            const seconds = Math.floor((time % 60000) / 1000);
            const milliseconds = Math.floor((time % 1000) / 10);
            
            // Return formatted string
            return {
                minutes: minutes.toString().padStart(2, '0'),
                seconds: seconds.toString().padStart(2, '0'),
                milliseconds: milliseconds.toString().padStart(2, '0')
            };
        }

        // Update the display with current time
        function updateDisplay() {
            const currentTime = isRunning ? Date.now() - startTime + elapsedTime : elapsedTime;
            const formattedTime = formatTime(currentTime);
            
            minutesDisplay.textContent = formattedTime.minutes;
            secondsDisplay.textContent = formattedTime.seconds;
            millisecondsDisplay.textContent = formattedTime.milliseconds;
        }

        // Start the stopwatch
        function startStopwatch() {
            if (!isRunning) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(updateDisplay, 10);
                isRunning = true;
                
                // Update UI
                startBtn.disabled = true;
                pauseBtn.disabled = false;
                lapBtn.disabled = false;
                statusIndicator.textContent = "Running";
                timeDisplay.classList.add('running');
                
                // Add visual feedback
                startBtn.classList.add('clicked');
                setTimeout(() => startBtn.classList.remove('clicked'), 200);
                
                // Play start sound (simulated with a beep)
                playBeep(800, 0.1, 0.05);
            }
        }

        // Pause the stopwatch
        function pauseStopwatch() {
            if (isRunning) {
                clearInterval(timerInterval);
                elapsedTime = Date.now() - startTime;
                isRunning = false;
                
                // Update UI
                startBtn.disabled = false;
                pauseBtn.disabled = true;
                statusIndicator.textContent = "Paused";
                timeDisplay.classList.remove('running');
                
                // Add visual feedback
                pauseBtn.classList.add('clicked');
                setTimeout(() => pauseBtn.classList.remove('clicked'), 200);
                
                // Play pause sound
                playBeep(600, 0.1, 0.05);
            }
        }

        // Reset the stopwatch
        function resetStopwatch() {
            clearInterval(timerInterval);
            isRunning = false;
            elapsedTime = 0;
            lastLapTime = 0;
            
            // Update display
            updateDisplay();
            
            // Update UI
            startBtn.disabled = false;
            pauseBtn.disabled = true;
            lapBtn.disabled = true;
            statusIndicator.textContent = "Stopped";
            timeDisplay.classList.remove('running');
            
            // Add visual feedback
            resetBtn.classList.add('clicked');
            setTimeout(() => resetBtn.classList.remove('clicked'), 200);
            
            // Play reset sound
            playBeep(400, 0.1, 0.1);
        }

        // Record a lap time
        function recordLap() {
            if (!isRunning && elapsedTime === 0) return;
            
            const currentTime = isRunning ? Date.now() - startTime + elapsedTime : elapsedTime;
            const lapTime = currentTime - lastLapTime;
            
            // Create lap object
            const lap = {
                id: Date.now(),
                totalTime: currentTime,
                lapTime: lapTime,
                formattedTotal: formatTime(currentTime),
                formattedLap: formatTime(lapTime)
            };
            
            // Add to beginning of array (newest first)
            lapTimes.unshift(lap);
            
            // Update last lap time
            lastLapTime = currentTime;
            
            // Update UI
            renderLaps();
            
            // Save to local storage
            saveLapsToStorage();
            
            // Add visual feedback
            lapBtn.classList.add('clicked');
            setTimeout(() => lapBtn.classList.remove('clicked'), 200);
            
            // Play lap sound
            playBeep(1000, 0.1, 0.05);
            
            // Scroll to top of lap list
            lapList.scrollTop = 0;
        }

        // Render lap times to the list
        function renderLaps() {
            if (lapTimes.length === 0) {
                lapList.innerHTML = '<div class="empty-laps">No lap times recorded yet. Click "Lap" to record your first lap time.</div>';
                return;
            }
            
            let lapHTML = '';
            
            lapTimes.forEach((lap, index) => {
                const lapNumber = lapTimes.length - index; // Show descending numbers (newest first)
                const isFastest = lapTimes.length > 1 && lap.lapTime === Math.min(...lapTimes.map(l => l.lapTime));
                const isSlowest = lapTimes.length > 1 && lap.lapTime === Math.max(...lapTimes.map(l => l.lapTime));
                
                lapHTML += `
                    <div class="lap-item ${isFastest ? 'fastest' : ''} ${isSlowest ? 'slowest' : ''}">
                        <div class="lap-number">${lapNumber}</div>
                        <div class="lap-time">
                            ${lap.formattedTotal.minutes}:${lap.formattedTotal.seconds}.<small>${lap.formattedTotal.milliseconds}</small>
                        </div>
                        <div class="lap-difference">
                            +${lap.formattedLap.minutes}:${lap.formattedLap.seconds}.${lap.formattedLap.milliseconds}
                            ${isFastest ? '<i class="fas fa-bolt" style="color:#96c93d; margin-left:5px;"></i>' : ''}
                            ${isSlowest ? '<i class="fas fa-tachometer-alt" style="color:#ff2d00; margin-left:5px;"></i>' : ''}
                        </div>
                    </div>
                `;
            });
            
            lapList.innerHTML = lapHTML;
        }

        // Clear all lap times
        function clearLaps() {
            if (lapTimes.length === 0) return;
            
            // Play sound
            playBeep(300, 0.1, 0.1);
            
            // Confirm before clearing
            if (confirm("Are you sure you want to clear all lap times?")) {
                lapTimes = [];
                lastLapTime = 0;
                renderLaps();
                localStorage.removeItem('stopwatchLaps');
                
                // Visual feedback
                clearLapsBtn.innerHTML = '<i class="fas fa-check"></i> Cleared!';
                setTimeout(() => {
                    clearLapsBtn.innerHTML = '<i class="fas fa-trash"></i> Clear All';
                }, 1500);
            }
        }

        // Play a beep sound (using Web Audio API)
        function playBeep(frequency, duration, volume) {
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + duration);
            } catch (e) {
                console.log("Audio context not supported");
            }
        }

        // Initialize the stopwatch
        function init() {
            // Load saved laps
            loadLapsFromStorage();
            
            // Update display initially
            updateDisplay();
            
            // Event listeners
            startBtn.addEventListener('click', startStopwatch);
            pauseBtn.addEventListener('click', pauseStopwatch);
            resetBtn.addEventListener('click', resetStopwatch);
            lapBtn.addEventListener('click', recordLap);
            clearLapsBtn.addEventListener('click', clearLaps);
            saveLapsBtn.addEventListener('click', saveLapsToStorage);
            
            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // Space to start/pause
                if (e.code === 'Space') {
                    e.preventDefault();
                    if (isRunning) {
                        pauseStopwatch();
                    } else {
                        startStopwatch();
                    }
                }
                
                // 'L' to record lap
                if (e.code === 'KeyL' && isRunning) {
                    recordLap();
                }
                
                // 'R' to reset
                if (e.code === 'KeyR') {
                    resetStopwatch();
                }
            });
            
            // Display keyboard shortcuts in console (for documentation)
            console.log("Keyboard shortcuts:");
            console.log("Space - Start/Pause");
            console.log("L - Record Lap (while running)");
            console.log("R - Reset");
        }

        // Initialize when page loads
        window.addEventListener('load', init);
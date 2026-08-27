// MP3 Player Application
class MP3Player {
    constructor() {
        // DOM Elements
        this.audio = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.pauseBtn = document.getElementById('pauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressSlider = document.getElementById('progressSlider');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.fileInput = document.getElementById('fileInput');
        this.playlist = document.getElementById('playlist');
        this.songTitle = document.getElementById('songTitle');
        this.songArtist = document.getElementById('songArtist');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.volumeValue = document.getElementById('volumeValue');
        this.albumArt = document.getElementById('albumArt');
        this.progressFill = document.querySelector('.progress-fill');

        // State
        this.songs = [];
        this.currentIndex = 0;
        this.isPlaying = false;

        // Initialize
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadPlaylistFromStorage();
        this.audio.volume = 0.7;
    }

    setupEventListeners() {
        // Play/Pause
        this.playBtn.addEventListener('click', () => this.play());
        this.pauseBtn.addEventListener('click', () => this.pause());

        // Previous/Next
        this.prevBtn.addEventListener('click', () => this.previous());
        this.nextBtn.addEventListener('click', () => this.next());

        // File Upload
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));

        // Progress Bar
        this.progressSlider.addEventListener('input', (e) => this.seek(e));
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.playNext());

        // Volume
        this.volumeSlider.addEventListener('input', (e) => this.setVolume(e));

        // Audio Events
        this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audio.addEventListener('play', () => this.onPlay());
        this.audio.addEventListener('pause', () => this.onPause());
    }

    handleFileUpload(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (file.type === 'audio/mpeg' || file.name.endsWith('.mp3')) {
                const url = URL.createObjectURL(file);
                const song = {
                    id: Date.now() + Math.random(),
                    name: file.name.replace('.mp3', ''),
                    url: url,
                    file: file
                };
                this.songs.push(song);
                this.addToPlaylist(song);
            }
        });
        this.savePlaylistToStorage();
        this.fileInput.value = '';
    }

    addToPlaylist(song) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="playlist-item-name">${song.name}</span>
            <button class="delete-btn" data-id="${song.id}">Delete</button>
        `;
        li.addEventListener('click', () => this.playSong(this.songs.indexOf(song)));
        
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeSong(song.id);
        });
        
        this.playlist.appendChild(li);
    }

    removeSong(songId) {
        const index = this.songs.findIndex(s => s.id === songId);
        if (index !== -1) {
            this.songs.splice(index, 1);
            this.renderPlaylist();
            this.savePlaylistToStorage();
            
            if (this.currentIndex === index && this.isPlaying) {
                this.stop();
            }
        }
    }

    renderPlaylist() {
        this.playlist.innerHTML = '';
        this.songs.forEach((song, index) => {
            const li = document.createElement('li');
            if (index === this.currentIndex) {
                li.classList.add('active');
            }
            li.innerHTML = `
                <span class="playlist-item-name">${song.name}</span>
                <button class="delete-btn" data-id="${song.id}">Delete</button>
            `;
            li.addEventListener('click', () => this.playSong(index));
            
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeSong(song.id);
            });
            
            this.playlist.appendChild(li);
        });
    }

    playSong(index) {
        if (index < 0 || index >= this.songs.length) return;

        this.currentIndex = index;
        const song = this.songs[index];
        
        this.audio.src = song.url;
        this.audio.play();
        
        this.songTitle.textContent = song.name;
        this.songArtist.textContent = 'MP3 Player';
        this.albumArt.src = 'https://via.placeholder.com/300?text=' + encodeURIComponent(song.name);
        
        this.renderPlaylist();
        this.isPlaying = true;
    }

    play() {
        if (this.songs.length === 0) {
            alert('Please upload MP3 files first');
            return;
        }
        
        if (this.audio.src) {
            this.audio.play();
        } else {
            this.playSong(0);
        }
    }

    pause() {
        this.audio.pause();
    }

    stop() {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.songs.length;
        this.playSong(nextIndex);
    }

    playNext() {
        this.next();
    }

    previous() {
        const prevIndex = this.currentIndex === 0 ? this.songs.length - 1 : this.currentIndex - 1;
        this.playSong(prevIndex);
    }

    seek(e) {
        const percent = e.target.value / 100;
        this.audio.currentTime = percent * this.audio.duration;
    }

    setVolume(e) {
        const volume = e.target.value / 100;
        this.audio.volume = volume;
        this.volumeValue.textContent = e.target.value + '%';
    }

    updateProgress() {
        if (this.audio.duration) {
            const percent = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressSlider.value = percent;
            this.progressFill.style.width = percent + '%';
            this.currentTimeEl.textContent = this.formatTime(this.audio.currentTime);
        }
    }

    updateDuration() {
        this.durationEl.textContent = this.formatTime(this.audio.duration);
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    onPlay() {
        this.playBtn.style.display = 'none';
        this.pauseBtn.style.display = 'flex';
        this.isPlaying = true;
    }

    onPause() {
        this.playBtn.style.display = 'flex';
        this.pauseBtn.style.display = 'none';
        this.isPlaying = false;
    }

    savePlaylistToStorage() {
        const playlistData = this.songs.map(song => ({
            id: song.id,
            name: song.name
        }));
        localStorage.setItem('mp3_playlist', JSON.stringify(playlistData));
    }

    loadPlaylistFromStorage() {
        const stored = localStorage.getItem('mp3_playlist');
        if (stored) {
            try {
                const playlistData = JSON.parse(stored);
                // Note: URLs won't be preserved, user would need to re-upload
                // This is for reference only
            } catch (e) {
                console.error('Error loading playlist:', e);
            }
        }
    }
}

// Initialize player when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new MP3Player();
});
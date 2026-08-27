# 🎵 MP3 Player

A modern, responsive web-based and mobile-friendly MP3 player built with vanilla HTML, CSS, and JavaScript.

## Features

✨ **Core Features**
- Play, pause, next, and previous controls
- Volume control with visual feedback
- Progress bar with seek functionality
- Current time and duration display
- Responsive design for desktop and mobile
- Playlist management
- Upload multiple MP3 files
- Delete songs from playlist
- Local storage support

🎨 **Design**
- Modern gradient UI with purple/blue theme
- Smooth animations and transitions
- Mobile-optimized layout
- Album art placeholder
- Custom styled scrollbars

📱 **Mobile Support**
- Fully responsive design
- Touch-friendly controls
- Optimized for all screen sizes
- Mobile web app ready

## Installation

1. Clone the repository:
```bash
git clone https://github.com/machorn1/mp3-player.git
cd mp3-player
```

2. Open in browser:
   - Simply open `index.html` in any modern web browser
   - Or serve with a local server:
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

3. Visit `http://localhost:8000` (or your chosen port)

## Usage

1. **Upload Music**: Click the "📁 Upload MP3 Files" button to select MP3 files from your computer
2. **Play Music**: Click on a song in the playlist or use the play button
3. **Control Playback**: Use the play/pause, previous, and next buttons
4. **Seek**: Click or drag the progress bar to jump to a specific time
5. **Volume**: Adjust the volume slider to control playback volume
6. **Remove Songs**: Click the "Delete" button next to a song to remove it from the playlist

## File Structure

```
mp3-player/
├── index.html      # HTML structure
├── styles.css      # Styling and responsive design
├── app.js         # Player logic and functionality
└── README.md      # This file
```

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Technical Details

### HTML (`index.html`)
- Semantic HTML5 structure
- Audio element for MP3 playback
- File input for uploading
- Range sliders for progress and volume

### CSS (`styles.css`)
- Flexbox layout
- CSS Grid for responsive design
- Custom styled input ranges
- Mobile-first responsive approach
- Smooth transitions and animations

### JavaScript (`app.js`)
- ES6 class-based architecture
- Event listener management
- LocalStorage for playlist persistence
- Time formatting utilities
- Play state management

## Features in Development

Future enhancements:
- [ ] Shuffle and repeat modes
- [ ] Keyboard shortcuts
- [ ] Equalizer controls
- [ ] Playlist save/load functionality
- [ ] Dark mode toggle
- [ ] Metadata display (artist, album, duration from ID3 tags)
- [ ] Search functionality
- [ ] Drag and drop file upload
- [ ] Visualization effects

## API Reference

### MP3Player Class

#### Methods

- `play()` - Start playing current song
- `pause()` - Pause current song
- `stop()` - Stop and reset current song
- `next()` - Play next song in playlist
- `previous()` - Play previous song in playlist
- `playSong(index)` - Play specific song by index
- `seek(e)` - Seek to specific time
- `setVolume(e)` - Set volume level
- `formatTime(seconds)` - Format seconds to MM:SS

#### Events

- `play` - Triggered when song starts playing
- `pause` - Triggered when song is paused
- `timeupdate` - Triggered during playback progress
- `ended` - Triggered when song finishes

## Contributing

Feel free to fork this project and submit pull requests for any improvements!

## License

MIT License - feel free to use this project in your own applications.

## Support

If you encounter any issues:
1. Check that your MP3 files are valid and not corrupted
2. Ensure you're using a modern browser
3. Clear browser cache and reload
4. Check browser console for error messages

---

Made with ❤️ by machorn1
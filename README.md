# Centrum: A Progressive Web App for Everything  

**Centrum** is a MERN stack application designed to provide a unified platform for various user needs. Built with modern web technologies, it combines scalability, performance, and accessibility, making it a foundation for the "everything app."

---

## Features  

- **Progressive Web App (PWA):** Offers offline capabilities and mobile-first experiences.  
- **Media Processing:** Supports video thumbnail generation and image processing.  
- **Document Handling:** Converts and previews multiple document formats seamlessly.  
- **Extensibility:** Built with scalability and modularity in mind, supporting future integrations.

---

## Setup  

### Prerequisites  

1. **Node.js:** Version 18.19.1 or later.  
2. **FFmpeg:** Required for video processing.  
3. **ImageMagick:** For image processing tasks.  
4. **LibreOffice:** For handling and converting document formats.

---

### Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/your-repo/centrum.git
   cd centrum
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the development server:  
   ```bash
   npm start
   ```

---

## Dependencies  

### 1. **FFmpeg**  
**Installation:**  
- **Ubuntu:**  
  ```bash
  sudo apt update
  sudo apt install ffmpeg
  ```  
- **macOS (Homebrew):**  
  ```bash
  brew install ffmpeg
  ```  
- **Windows:**  
  - Download from [FFmpeg.org](https://ffmpeg.org/download.html).  
  - Add the `bin` folder to your system's PATH.  

**Configuration in Node.js:**  
```javascript
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath('/path/to/ffmpeg');
ffmpeg.setFfprobePath('/path/to/ffprobe');
```

---

### 2. **ImageMagick**  
**Installation (Ubuntu):**  
```bash
sudo apt-get update
sudo apt-get install imagemagick
```

---

### 3. **LibreOffice**  
**Installation (Ubuntu):**  
```bash
sudo apt update
sudo apt install libreoffice
```

---

## Supported Document Formats  

| **MIME Type** | **Extension** |
|---------------|---------------|
| application/pdf | .pdf |
| application/vnd.openxmlformats-officedocument.wordprocessingml.document | .docx |
| application/vnd.openxmlformats-officedocument.presentationml.presentation | .pptx |
| application/vnd.openxmlformats-officedocument.spreadsheetml.sheet | .xlsx |

---

## Testing  

After installing the dependencies, verify the following:  
1. **FFmpeg Installation:**  
   ```bash
   ffmpeg -version
   ```  
   If the version displays, FFmpeg is correctly installed and added to the PATH.  

2. **ImageMagick Installation:**  
   ```bash
   convert --version
   ```  

3. **LibreOffice Installation:**  
   ```bash
   libreoffice --version
   ```

---

## Future Plans  

- **Enhanced Integrations:** AI-based recommendations, payment systems, and more.  
- **Multi-Platform Support:** Extend functionality for mobile apps.  
- **User-Centric Design:** Incorporate customizable dashboards and advanced analytics.

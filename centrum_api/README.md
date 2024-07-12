## This project is built on node version 18.19.1

If you're encountering an error stating "Cannot find ffmpeg or ffprobe," it means that the `fluent-ffmpeg` module is unable to locate the `ffmpeg` executable on your system. This could be due to several reasons, such as `ffmpeg` not being installed, not being accessible via the system's PATH, or not being set correctly in your Node.js application.

To resolve this issue, follow these steps:

### 1. Install FFmpeg

Ensure that FFmpeg is installed on your system. FFmpeg is required by `fluent-ffmpeg` to perform operations like video thumbnail generation.

#### Installation Steps:

- **On Ubuntu**:

  ```bash
  sudo apt update
  sudo apt install ffmpeg
  ```

- **On macOS**:

  If you use Homebrew, you can install FFmpeg with:

  ```bash
  brew install ffmpeg
  ```

- **On Windows**:

  1. **Download**: Go to the [FFmpeg download page](https://ffmpeg.org/download.html) and download a build for Windows.
  2. **Extract**: Extract the downloaded archive to a folder, for example, `C:\ffmpeg`.
  3. **Set Environment Variables**:
     - Open "System Properties" -> "Advanced" -> "Environment Variables".
     - Add `C:\ffmpeg\bin` (or the appropriate path where you extracted FFmpeg) to the `Path` variable in the system environment variables.

  4. **Verify Installation**: Open a new command prompt and run:

  ```bash
  ffmpeg -version
  ```

  Both `ffmpeg` and `ffprobe` should return version information if the installation was successful.

### 2. Update `fluent-ffmpeg` Configuration

After ensuring that FFmpeg is correctly installed and accessible via the PATH, you need to configure `fluent-ffmpeg` to use it.

#### Example:

```javascript
const ffmpeg = require('fluent-ffmpeg');

// Set the path to ffmpeg executable (if not in PATH)
ffmpeg.setFfmpegPath('/path/to/ffmpeg');
ffmpeg.setFfprobePath('/path/to/ffprobe');

// Ensure ffmpeg executable is found
ffmpeg.getFfmpegPath((err, ffmpegPath) => {
    if (err) {
        console.error('Error finding ffmpeg:', err);
    } else {
        console.log('Found ffmpeg at:', ffmpegPath);
    }
});
```

Replace `/path/to/ffmpeg` and `/path/to/ffprobe` with the actual paths where `ffmpeg` and `ffprobe` are installed on your system, if they are not automatically detected from the PATH.

### 3. Verify and Restart Your Application

Once you have installed FFmpeg, updated the `fluent-ffmpeg` configuration (if necessary), and set the PATH correctly, restart your Node.js application to apply these changes.

### Testing the Setup

- **Upload a Video File**: Try uploading a video file again using your application.
- **Check Logs**: Monitor the server logs for any error messages related to FFmpeg or `fluent-ffmpeg`. Any issues should now be logged and easier to diagnose.

By following these steps, you should be able to resolve the "Cannot find ffmpeg" error and successfully use `fluent-ffmpeg` for operations like video thumbnail generation in your Node.js application.

NB: if the version is shown of the `ffmpeg --version` its added to path already.



### You must install imageMagick on your machine

```
sudo apt-get update
sudo apt-get install imagemagick
```
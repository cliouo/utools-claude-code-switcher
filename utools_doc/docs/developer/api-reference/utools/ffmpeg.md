# FFmpeg

# FFmpeg ​
[FFmpeg](https://ffmpeg.org) 是一款功能强大的开源音视频处理工具，将其以独立扩展的方式集成到 uTools。(首次调用 FFmpeg 会引导用户下载集成)
## `utools.runFFmpeg(args[, onProgress])` ​
运行 FFmpeg (首次调用将引导用户下载集成)
### 类型定义 ​
ts
    
    function runFFmpeg(args: string[], onProgress?: (progress: RunProgress) => void): PromiseLike<void>; // 版本：>=6.1.0
  * `args`: ffmpeg 运行参数(数组)
  * `onProgress`: 处理进度中的回调函数
  * 返回 Promise


`PromiseLike` 类型定义
`PromiseLike` 是 `Promise` 的扩展类型，包含 `kill()` 和 `quit()` 函数
默认情况下，你可以单纯把它当作 `Promise` 来使用，但是扩展了 `kill()` 和 `quit()` 函数，可以让你在运行过程中强制结束 FFmpeg 运行，或者通知 FFmpeg 退出。
ts
    
    interface PromiseLike extends Promise<void> {
      kill(): void;
      quit(): void;
    }
#### PromiseLike 字段说明 ​
  * `kill()`
    * 强制结束 FFmpeg 运行
  * `quit()`
    * 通知 FFmpeg 退出，类似命令行下按 q 键


`RunProgress` 类型定义
ts
    
    interface RunProgress {
      bitrate: string;
      fps: number;
      frame: number;
      percent?: number;
      q: number | string;
      size: string;
      speed: string;
      time: string;
    }
#### RunProgress 字段说明 ​
  * `bitrate`
    * 视频或音频的比特率，表示每秒传输的比特数
  * `fps`
    * 当前处理的视频帧率，每秒处理的帧数
  * `frame`
    * 已处理的帧数
  * `percent`
    * 处理完成百分比
  * `q`
    * 质量指标
  * `size`
    * 已处理输出的文件大小
  * `speed`
    * 当前的处理速度
  * `time`
    * 前已处理的时间


### 示例代码 ​
js
    
    // 视频压缩
    utools.runFFmpeg(
      ["-i", "/path/to/input.mp4", "-c:v", "libx264", "-tag:v", "avc1-movflags", "faststart", "-crf", "30", "-preset", "superfast", "pathto/output.mp4"],
      (progress) => {
        console.log("压缩中 " + progress.percent + "%");
      }
    ).then(() => {
      console.log("压缩完成");
    }).catch((error) => {
      console.log("出错了：" + error.message);
    });
js
    
    // 视频转 GIF
    const run = utools.runFFmpeg(
      [ "-i", "/path/to/input.mp4", "-filter_complex", "[0]fps=15,split[v0][v1];[v0]palettegen=stats_mode=full[p];[v1][p]paletteuse", "/path/to/output.gif" ],
      () => {
        console.log("转换中 " + progress.percent + "%");
      }
    );
    run.then(() => {
      console.log("转换完成");
    }).catch((error) => {
      console.log("出错了：" + error.message);
    });
    
    // 可执行 run.kill() 强制结束转换
js
    
    // 音频提取
    utools.runFFmpeg(["-i", "/path/to/input.mp4", "-q:a", "0", "-map", "a", "/path/to/output.mp3"]).then(() => {
      console.log("提取完成");
    }).catch((error) => {
      console.log("出错了：" + error.message);
    });
js
    
    // Windows 录屏
    const run = utools.runFFmpeg(['-f', 'gdigrab', '-framerate', '30', '-i', 'desktop', '/path/to/output.mp4'])
    
    // macOS 录屏
    const run = utools.runFFmpeg(['-f', 'avfoundation', '-framerate', '30', '-i', 'default', '/path/to/output.mp4'])
    
    // Linux 录屏
    const run = utools.runFFmpeg(['-f', 'x11grab', '-framerate', '30', '-i', ':0.0', '/path/to/output.mp4'])
    
    setTimeout(() => {
      //执行 run.quit() 结束录屏
      run.quit()
    }, 10000)
js
    
    // Windows 截屏
    utools.runFFmpeg(['-f', 'gdigrab', '-i', 'desktop', '-vframes', '1', '/path/to/screenshot.png'])
    
    // macOS 截屏
    utools.runFFmpeg(['-f', 'avfoundation', '-i', 'default', '-vframes', '1', '/path/to/screenshot.png'])
    
    // Linux 截屏
    utools.runFFmpeg(['-f', 'x11grab', '-i', ':0.0', '-vframes', '1', '/path/to/screenshot.png'])

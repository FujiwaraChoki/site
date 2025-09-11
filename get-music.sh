yt_url=$1
yt-dlp -x --audio-format mp3 $yt_url
mv *.mp3 public/music/
rm *.webm

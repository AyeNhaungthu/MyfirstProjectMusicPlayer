const playlistContainer = document.getElementsByClassName("playlistContainer")[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const currentandtotaltime = document.getElementsByClassName("currentandtotaltime")[0];
const currentProgressTag = document.getElementById("currentProgress");
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const prevButtonTag = document.getElementsByClassName("prevButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];
const imageTag = document.getElementsByClassName("imageTag")[0];
const solidHeartTag = document.getElementsByClassName("solidHeart")[0];
const autoCompleteTag = document.getElementsByClassName("autoComplete")[0];

const tracks = [
    {trackId : "music/yt1s.com - DO 디오 Rose MV.mp3" , title : "D.O. Rose" ,imgId :"image/D.O. rose.webp"},
    {trackId : "music/yt1s.com - EXO 엑소 Dont Go LYRICS.mp3" , title : "EXO_Don't Go" , imgId :"image/EXO_Don't Go.jpg" },
    {trackId : "music/yt1s.com - EXO 엑소 Ko Ko Bop MV.mp3" , title : "EXO_Ko Ko Bop" , imgId :"image/EXO_KoKoBop.png" },
    {trackId : "music/yt1s.com - EXO 엑소 Love Shot MV (1).mp3" , title : "EXO_love Shot" , imgId :"image/EXO_LoveShot.jpg"},
    {trackId : "music/yt1s.com - EXO 엑소 으르렁 Growl MV Korean Ver.mp3" , title : "EXO_Growl" , imgId :"image/EXO_Growl.jpg" },
    {trackId : "music/yt1s.com - EXO 엑소 전야 前夜 The Eve Dance Practice.mp3" , title : "EXO_The Eve" , imgId :"image/EXO_TheEVE.jpg" },
    {trackId : "music/yt1s.com - 달의 연인  보보경심 려 OST Part 1 첸 백현 시우민 EXO  너를 위해 MV.mp3", title : "EXO_CBX For You " , imgId :"image/EXO-CBX-01.webp" }
]
for (let i = 0; i < tracks.length;i++) {
    const trackTag = document.createElement("div");
    trackTag.classList.add("trackTag");
    trackTag.addEventListener("click",() => {
    currentPlayingIndex = i;
    playSong();
    changeImage();
        //changeImage();
    })
    trackTag.classList.add("trackItem");
    const title = (i + 1).toString() + "." + tracks[i].title;
    trackTag.textContent = title;
    playlistContainer.append(trackTag);
    
}
let duration = 0;
let durationText = "00:00"
audioTag.addEventListener("loadeddata" , () => {
   duration =Math.floor(audioTag.duration);
   durationText =  CreateMinuteandSecond(duration);

});

audioTag.addEventListener("timeupdate", () => {

    const currentTime = Math.floor(audioTag.currentTime);
    const currentTimeText = CreateMinuteandSecond(currentTime);
    const currentTimeTextandDurationText = currentTimeText + " / " + durationText;
    //console.log(currentTimeTextandDurationText);
    currentandtotaltime.textContent = currentTimeTextandDurationText; 
    currentTimeProgress(currentTime);
    
});
const currentTimeProgress =  (currentTime) => {
    const currentProgresswidth = (500/duration) * currentTime;
    currentProgressTag.style.width = currentProgresswidth.toString() + "px";

};
const CreateMinuteandSecond = (totalSecond) => {
    const minutes =Math.floor(totalSecond/60);
    const seconds = totalSecond%60;
     const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
     const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minuteText + ":" + secondText;
};
let IsPlaying = false;
let currentPlayingIndex = 0;
playButtonTag.addEventListener("click" , () => {
    const currentTime = Math.floor(audioTag.currentTime);
    IsPlaying = true;
    if (currentTime === 0) {
        playSong();
        changeImage();
       
    }
    else {
        audioTag.play();
        updatePlayAndPauseButton();
    }
   
})

pauseButtonTag.addEventListener("click", () => {
    IsPlaying = false;
    audioTag.pause();
    updatePlayAndPauseButton();
})

prevButtonTag.addEventListener("click", () => {
    if(currentPlayingIndex === 0) {
        return;
    }
     else
    {
        currentPlayingIndex -= 1 ;
        playSong();
        changeImage();
    }
})

nextButtonTag.addEventListener("click" , () => {
    if(currentPlayingIndex === tracks.length -1) {
        return;
    }
     else {
        currentPlayingIndex += 1;
        playSong();
        changeImage();
     }
})

const changeImage = () => {
    const changeImageId = tracks[currentPlayingIndex].imgId;
    imageTag.src = changeImageId;

}

const playSong  = () => {
    const songPlayId = tracks[currentPlayingIndex].trackId;
        audioTag.src = songPlayId;
        audioTag.play();
        IsPlaying = true;
       updatePlayAndPauseButton();
        
}

solidHeartTag.addEventListener("click" , () => {
    const heartClassExit = solidHeartTag.classList.contains("favorite");
    if(heartClassExit) {
        solidHeartTag.classList.remove("favorite");
    }
    else {
        solidHeartTag.classList.add("favorite");
    }
})
const updatePlayAndPauseButton = () => {
     if(IsPlaying === true) {
        playButtonTag.style.display = "none";
        pauseButtonTag.style.display = "inline";
     }
     else
      {
        playButtonTag.style.display = "inline";
        pauseButtonTag.style.display = "none";
      }
}

autoCompleteTag.addEventListener("keyup", (event) => {
    const searchText = event.target.value.toLowerCase();
    //console.log("value is: ", searchText);
    const filterTracksList = tracks.filter( (track) => {
    return track.title.toLocaleLowerCase().includes(searchText);
    });
    const hasTrackToShow = filterTracksList.length > 0;
    if(hasTrackToShow) {
       
    }
});


/*
Second Comment 
*/

    


if (typeof window !== "undefined") {

    const record = document.querySelector('.record');
    const stop = document.querySelector('.stop');
    const soundClips = document.querySelector('.sound-clips');

    // navigator is inbuilt function mediaDevices we are fatching from API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia supported.");
        //only audio needed for this app
        navigator.mediaDevices
            .getUserMedia(
                // constraints - only audio needed for this app
                {
                    audio: true,
                }
            )

            //aftre sucess call back
            .then((stream) => {
                //MediaRecorder interface that allow you to control recording of the media stream
                const mediaRecorder = new MediaRecorder(stream);

                //start audio recording 
                //is const that we have delceared above
                record.onclick = () => {
                    mediaRecorder.start();
                    console.log(mediaRecorder.state);
                    console.log("Recorder started");
                };


                //creating new array for storing recording
                let chunks = [];
                mediaRecorder.ondataavailable = (e) => {
                    chunks.push(e.data);
                };


                //stop recording
                stop.onclick = () => {
                    mediaRecorder.stop();
                    console.log(mediaRecorder.state);
                    console.log("Recorder stop");
                };

                //When recording has stopped, the state property returns a value of "inactive", and a stop event is fired
                mediaRecorder.onstop = (e) => {
                    console.log("Recorder Stopped")
                    const clipName = prompt("Enter sound Clip Name.");

                    //creating component for recorded Audio
                    const clipContainer = document.createElement("article");
                    const clipLabel = document.createElement("p");
                    const audio = document.createElement("audio");
                    const deleteButton = document.createElement("button");


                    clipContainer.classList.add("clip");
                    audio.setAttribute("controls", "");
                    deleteButton.innerHTML = "Delete";
                    clipLabel.innerHTML = clipName;


                    //creating child component in recording section
                    console.log("Adding Recording");
                    
                    clipContainer.appendChild(audio);
                    clipContainer.appendChild(clipLabel);
                    clipContainer.appendChild(deleteButton);
                    soundClips.appendChild(clipContainer);


                    const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                    chunks = [];
                    const audioURL = window.URL.createObjectURL(blob);
                    audio.src = audioURL;

                    deleteButton.onclick = (e) => {
                        let evtTgt = e.target;
                        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
                    };
                }

            })

            //error call back
            .catch((err) => {
                console.error(`The following getUserMedia error occurred: ${err}`);
            });
    }
    else {
        console.log("getuserMedia is not supported in your browser");
    }
}
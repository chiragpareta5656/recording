//declearing variable for record start stop and record clip

// because document , navigator ,  windows was not working 
if (typeof window !== "undefined") {

  const record = document.querySelector(".record");
  const stop = document.querySelector(".stop");
  const soundClips = document.querySelector(".sound-clips");

  //chechimg media divices

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    console.log("getUserMedia supported.");
    navigator.mediaDevices
      .getUserMedia(
        // constraints - only audio needed for this app
        {
          audio: true,
        }
      )

      // Success callback

      .then((stream) => {
        //you create a new Media Recorder instance with the MediaRecorder()
        const mediaRecorder = new MediaRecorder(stream);


        //start recording
        record.onclick = () => {
          mediaRecorder.start(); //inbuilt function to start recording
          alert("recording start is working")//CBM
          console.log(mediaRecorder.state);
          console.log("recorder started");
          record.style.background = "red";
          record.style.color = "black";
        };

        let chunks = [];

        

        stop.onclick = () => {
          mediaRecorder.stop();
          console.log(mediaRecorder.state);
          console.log("recorder stopped");
          record.style.background = "";
          record.style.color = "";
        };

        mediaRecorder.onstop = (e) => {
          console.log("recorder stopped");

          const clipName = prompt("Enter a name for your sound clip");

          const clipContainer = document.createElement("article");
          const clipLabel = document.createElement("p");
          const audio = document.createElement("audio");
          const deleteButton = document.createElement("button");

          clipContainer.classList.add("clip");
          audio.setAttribute("controls", "");
          deleteButton.innerHTML = "Delete";
          clipLabel.innerHTML = clipName;

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
        };

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };


      })

      // Error callback
      .catch((err) => {
        console.error(`The following getUserMedia error occurred: ${err}`);
      });
  } else {
    console.log("getUserMedia not supported on your browser!");
  }

}
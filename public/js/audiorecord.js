// let mediaRecorder;
// let audioChunks = [];

// document.getElementById('recordButton').addEventListener('click', async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     mediaRecorder = new MediaRecorder(stream);
//     mediaRecorder.start();

//     mediaRecorder.addEventListener('dataavailable', event => {
//         audioChunks.push(event.data);
//     });

//     mediaRecorder.addEventListener('stop', () => {
//         const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
//         const audioUrl = URL.createObjectURL(audioBlob);
//         const audio = document.getElementById('audioPlayback');
//         audio.src = audioUrl;
//         document.getElementById('uploadButton').disabled = false;

//         document.getElementById('uploadButton').addEventListener('click', async () => {
//             try {
//                 const formData = new FormData();
//                 formData.append('audio', audioBlob, 'recording.mp3');
//                 let { id } = listingId; // Ensure 'listingId' is defined in your context
//                 const response = await fetch(`/listings/${id}/uploads`, {
//                     method: 'POST',
//                     body: formData
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();

//                 // Show the link to the uploaded file
//                 document.getElementById('fileLink').innerHTML = `<a href="${data.link}" target="_blank">View and Edit File</a>`;

//                 // Display the sentiment analysis results in the comment box
//                 const sentimentHtml = data.sentiment.map(item => {
//                     return `<p>Sentence: ${item.Text}<br>Sentiment: ${item.Sentiment}</p>`;
//                 }).join("");
//                 document.getElementById('commentBox').value = sentimentHtml;  // assuming there is a textarea with id 'commentBox'

//                 document.getElementById('submitButton').disabled = false;

//             } catch (error) {
//                 console.error('Error:', error);
//                 document.getElementById('fileLink').innerText = `Error: ${error.message}`;
//             }
//         });
//     });

//     document.getElementById('stopButton').disabled = false;
//     document.getElementById('recordButton').disabled = true;
// });

// document.getElementById('stopButton').addEventListener('click', () => {
//     mediaRecorder.stop();
//     document.getElementById('stopButton').disabled = true;
//     document.getElementById('recordButton').disabled = false;
// });

// // Submit button event listener
// document.getElementById('submitButton').addEventListener('click', async () => {
//     const commentBox = document.getElementById('commentBox').value;

//     if (commentBox.trim() !== "") {
//         // Send the comment box contents to the server or database here
//         console.log("Submitting comments:", commentBox); // Replace with actual submission code
//     }
// });



// let mediaRecorder;
//         let audioChunks = [];

//         document.getElementById('recordButton').addEventListener('click', async () => {
//             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//             mediaRecorder = new MediaRecorder(stream);
//             mediaRecorder.start();

//             mediaRecorder.addEventListener('dataavailable', event => {
//                 audioChunks.push(event.data);
//             });

//             mediaRecorder.addEventListener('stop', () => {
//                 const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
//                 const audioUrl = URL.createObjectURL(audioBlob);
//                 const audio = document.getElementById('audioPlayback');
//                 audio.src = audioUrl;
//                 document.getElementById('uploadButton').disabled = false;

//                 document.getElementById('uploadButton').addEventListener('click', async () => {
//                     try {
//                         const formData = new FormData();
//                         formData.append('audio', audioBlob, 'recording.mp3');
//                         let {id} = listingId;
//                         const response = await fetch(`/listings/${id}/uploads`, {
//                             method: 'POST',
//                             body: formData
//                         });

//                         if (!response.ok) {
//                             throw new Error(`HTTP error! status: ${response.status}`);
//                         }

//                         const data = await response.json();
                    
//                         const sentimentArray = data.sentiment;
                        

//                         const midpoint = Math.floor(sentimentArray.length / 2);

                        
//                         sentimentArray.slice(0, midpoint).forEach(sentiment => {


//                           const commentElement = document.getElementById('comment');
//                           const currentContent = commentElement.innerHTML;

//                           commentElement.innerHTML =`${currentContent}${sentiment.Text}`;
//                         });

//                         sentimentArray.slice(midpoint+1 , sentimentArray.length-1).forEach(sentiment =>{
//                             console.log(sentiment.Sentiment ,`:-` , sentiment.Percentage);
//                         })
//                         console.log("Uploaded")
  

            
//                     } catch (error) {
//                         console.error('Error:', error);
//                         document.getElementById('fileLink').innerText = `Error: ${error.message}`;
//                     }
//                 });
//             });

//             document.getElementById('stopButton').disabled = false;
//             document.getElementById('recordButton').disabled = true;
//         });

//         document.getElementById('stopButton').addEventListener('click', () => {
//             mediaRecorder.stop();
//             document.getElementById('stopButton').disabled = true;
//             document.getElementById('recordButton').disabled = false;
            
//                 });




let mediaRecorder;
let audioChunks = [];

// Event listener for the record button
document.getElementById('recordButton').addEventListener('click', async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    mediaRecorder.addEventListener('dataavailable', event => {
        audioChunks.push(event.data);
        
    });

    mediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = document.getElementById('audioPlayback');
        audio.src = audioUrl;
        document.getElementById('uploadButton').disabled = false;
    });

    document.getElementById('stopButton').disabled = false;
    document.getElementById('recordButton').disabled = true;
});

document.getElementById('stopButton').addEventListener('click', () => {
    mediaRecorder.stop();
    document.getElementById('stopButton').disabled = true;
    document.getElementById('recordButton').disabled = false;
});

// Adding the upload button event listener only once
document.getElementById('uploadButton').addEventListener('click', async () => {
    try {
        const formData = new FormData();
        const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });
        formData.append('audio', audioBlob, 'recording.mp3');
        let { id } = listingId;  // Ensure 'listingId' is defined in your context
        const response = await fetch(`/listings/${id}/uploads`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const sentimentArray = data.sentiment;
        const midpoint = Math.floor(sentimentArray.length / 2);
        // const arrLength = sentimentArray.length();
        // Process the first half of the sentiments
        sentimentArray.forEach(sentiment => {
            console.log(sentiment.SentenceID)
            if (sentiment.SentenceID != null){
                
                const commentElement = document.getElementById('comment');
                const currentContent = commentElement.innerHTML;
                commentElement.innerHTML = `${currentContent} ${sentiment.Text}`;
            }

        });
        console.log(data);

        // Process the second half of the sentiments
        sentimentArray.forEach(sentiment => {
            if (sentiment.SentenceID == null){
                const sentimentElement = document.getElementById('comment');
                const newElement = sentimentElement.innerHTML;
                sentimentElement.innerHTML = `${newElement} ${sentiment.Sentiment} :- ${sentiment.Percentage}`;
            }
            console.log(sentiment.Sentiment, `:-`, sentiment.Percentage);
        });

        console.log("Uploaded");

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('fileLink').innerText = `Error: ${error.message}`;
    }
});

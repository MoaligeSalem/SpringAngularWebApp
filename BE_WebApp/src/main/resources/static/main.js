'use strict'

let uploadForm = document.querySelector("#fileUploadForm");
let uploadFormInput = document.querySelector("#fileUploadInput");
let downloadFile = document.querySelector("#downloadFileUrl");
const singleFileUploadError = document.querySelector('#singleFileUploadError');

function uploadFile(csvFile) {
    let formData = new FormData();
    formData.append("file", csvFile);

    let req = new XMLHttpRequest();
    req.open("POST", "http://localhost:8080/importCSV")

    req.onload = function () {
        console.log(req.responseText);

        let response = req.responseText;

        if (response === "file uploaded successfully") {

            singleFileUploadError.style.display = '<p>Error</p>';

            downloadFile.innerHTML = '<p> File Uploaded Successfully. <p/>';
            downloadFile.style.display = "block";
        } else {
            //alert("Error Occurred! No file returned");
            singleFileUploadError.innerHTML = "<p>"+(response)+"<p>";
            downloadFile.style.display = "none";

        }
    }

    req.send(formData);
}

uploadForm.addEventListener('submit', function (event) {
    const files = uploadFormInput.files;

    if (files.length !== 0 ) {
        uploadFile(files[0]);
        event.preventDefault();
    } else {
        alert('Please select a file')
    }

}, true);
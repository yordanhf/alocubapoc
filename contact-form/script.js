const form = document.querySelector("form"),
statusmessage = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
  e.preventDefault();
  statusmessage.style.color = "#0D6EFD";
  statusmessage.style.display = "block";
  statusmessage.innerText = "Sending your message....";
  form.classList.add("disabled");

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "contact-form/message.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      let response = xhr.response;
      if(response.indexOf("Email and message field is required!") != -1 || response.indexOf("Enter a valid email address!") != -1 || response.indexOf("Sorry, failed to send your message!") != -1){
        statusmessage.style.color = "red";
      }else{
        form.reset();
        setTimeout(()=>{
          statusmessage.style.display = "none";
        }, 3000);
      }
      statusmessage.innerText = response;
      form.classList.remove("disabled");
    }
  }
  let formData = new FormData(form);
  xhr.send(formData);
}

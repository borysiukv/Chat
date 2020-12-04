var messages = document.getElementById('messages');
var sendButton = document.getElementById('send-btn');
sendButton.addEventListener ('click', sendUserMessage);

function start (){
    setInterval(getMessagesFromServer, 500);
}
async function getMessagesFromServer(){
    var responce = await fetch('https://fchatiavi.herokuapp.com/get/arick/?offset=0&limit=1000');
    responce = await responce.json();
    console.log(responce)
var allMessagesHTML = '';
    for (var i=0; i< responce.length; i++){
    var messageData = responce [i];
    var message = `
    <p> </p>
    <div class="massage">
    <span class="massage-author">${messageData.Name}</span>
    <span class="massage-text">${messageData.Message}</span>
    </div>
    <P> </p>
`
 allMessagesHTML = allMessagesHTML + message;

}
messages.innerHTML=allMessagesHTML;

}

async function sendUserMessage(){
var userNickname = document.getElementById('nickname-input').value;
var userMessage = document.getElementById('message-input').value;

if (userNickname.length===0){
    alert("You should write nickname!");
    return;
}
if (userMessage.length===0){
    alert("You should write message!");
    return;
}
await fetch('https://fchatiavi.herokuapp.com/send/arick',{ 
    method:'POST',
    body:JSON.stringify({
     Name:userNickname, 
     Message:userMessage,
    })
    }); 
getMessagesFromServer()
scrollToEnd()
}
function scrollToEnd(){
    messages.scrollTop = messages.scrollHeight;
}

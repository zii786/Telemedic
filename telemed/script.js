const peer = new Peer();
let conn;
let currentCall;

// Show your Peer ID
peer.on("open", (id) => {
  alert("Your ID: " + id);
});

// Handle incoming call
peer.on("call", (call) => {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    call.answer(stream);
    call.on("stream", (remoteStream) => {
      document.getElementById("remote-video").srcObject = remoteStream;
    });
    document.getElementById("local-video").srcObject = stream;
    currentCall = call;
  });
});

// Start video call
function startCall() {
  const peerId = document.getElementById("peer-id-input").value;
  navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
    const call = peer.call(peerId, stream);
    call.on("stream", (remoteStream) => {
      document.getElementById("remote-video").srcObject = remoteStream;
    });
    document.getElementById("local-video").srcObject = stream;
    currentCall = call;
  });

  conn = peer.connect(peerId);
  conn.on("data", (data) => appendChatMessage("Doctor", data));
}


// Health Record Upload
function uploadRecord() {
  const fileInput = document.getElementById("record-input");
  const file = fileInput.files[0];
  if (!file) return alert("Please select a file");

  const listItem = document.createElement("li");
  const link = document.createElement("a");

  link.textContent = file.name;
  link.href = URL.createObjectURL(file);
  link.target = "_blank";

  listItem.appendChild(link);
  document.getElementById("record-list").appendChild(listItem);
  fileInput.value = "";
}

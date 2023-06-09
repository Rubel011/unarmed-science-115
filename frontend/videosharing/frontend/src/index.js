import { navbar, footer } from "../../../components/navbar.js";
// const socket = io('http://localhost:8080/');
let navbarContainer = document.getElementById("navbar");
let footerContainer = document.getElementById("footer");

navbarContainer.innerHTML = navbar();
footerContainer.innerHTML = footer();


const roomID = document.getElementById('roomID');
const joinRoom = document.getElementById('joinRoom');
joinRoom.onclick = (e) => {
    e.preventDefault();  

    const RoomID = roomID.value;

    localStorage.setItem("RoomID" , RoomID)

    window.location.href = "./chat.html"
}


// Home redirect
let logo = document.getElementById("logo");
logo.addEventListener("click", () => {
  window.location.href = "../../index.html";
});



let btn = document.getElementById("redirectBtn");

// setting username
let userDetails = JSON.parse(localStorage.getItem("userDetails")) || null;
let div = document.getElementById("redirectBtn");
if (userDetails) {
  // console.log(userDetails.name)
  document.getElementById("userName").innerText = `👏Hi, ${userDetails?.name}`;
  document.getElementById("loginbtn").innerText = "Logout";
  // div.innerHTML=`<a href="./appointment.html" class="flex"><i class="fa-solid fa-video"></i> Book an online vet now</a>`
} else {
  div.innerHTML = `<a href="#" class="flex" id="chhodyar"><i class="fa-solid fa-video"></i> Book an online vet now</a>`
  let temp = document.getElementById("chhodyar");
  temp.addEventListener("click", () => {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please Login First",
      showConfirmButton: true,
    });
  })
}




// redirect to account/login
let login_icon = document.getElementById("loginbtn");
let navRedirect = document.getElementById("navredirect");
let viewApp = document.getElementById("viewApp");
let adminbtn = document.getElementById("adminbtn");

navRedirect.addEventListener("click", () => {
  if (userDetails) {

    window.location.href = "../../appointment.html";

  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please Login First",
      showConfirmButton: true,
    });
  }
});
viewApp.addEventListener("click", () => {
  if (userDetails) {

    window.location.href = "../../doctor.html";

  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please Login First",
      showConfirmButton: true,
    });
  }
});
adminbtn.addEventListener("click", () => {
  // console.log(userDetails);
  if(!userDetails){
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Please Login First",
      showConfirmButton: true,
    });
    return
  }
  if (userDetails.role=="admin") {

    window.location.href = "../../admin.html";

  }
  else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Your are not Authorize",
      showConfirmButton: true,
    });
  }
});

login_icon.addEventListener("click", () => {
  if (userDetails) {
    fetch(`https://troubled-pig-life-jacket.cyclic.app/user/logout`, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }).then((res) => res.json()).then((res) =>{
      localStorage.removeItem("userDetails");
      localStorage.removeItem("token");
      window.location.href = "../../index.html";
       
    }).catch((err) => console.log(err))


  } else {
    window.location.href = "../../login.html";

  }
});



let experts = {
    "Aza":{
        "AppleScreen":true,
        "AppleBattery":true,
        "Samsung":false,
        "other":false,
    },
    "Sam":{
        "AppleScreen":true,
        "AppleBattery":true,
        "Samsung":true,
        "other":true,
    },
    "Jeff":{
        "AppleScreen":!true,
        "AppleBattery":!true,
        "Samsung":!false,
        "other":!false,
    },
    "Janice":{
        "AppleScreen":!true,
        "AppleBattery":!true,
        "Samsung":!false,
        "other":false,
    }
}

let expertSelect = document.getElementById("repair-expert-select")
let serviceSelect = document.getElementById("repair-service-select")
let bookBtn = document.getElementById("book-btn");
let reviewAlert = document.getElementById("review-alert");
let bookAlert = document.getElementById("book-alert");
let reviewButton = document.getElementById("review-btn");

reviewButton.addEventListener("click",()=>{
    let dummy = document.createElement('div')
    while(reviewAlert.hasChildNodes()){
        reviewAlert.removeChild(reviewAlert.firstChild)
    }
    document.getElementById("review-name").value != "" && document.getElementById("review-text") != "" ? 
    dummy.innerHTML = [
      `<div class="alert alert-success alert-dismissible" role="alert" style="margin-top:1vh;">`,
      `   <div>Thank you for placing your ${document.getElementById("stars").value} star review!</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('') : 
    dummy.innerHTML = [
        `<div class="alert alert-danger alert-dismissible" role="alert" style="margin-top:1vh;">`,
        `   <div>Please enter all required information!</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    reviewAlert.appendChild(dummy)
})

serviceSelect.addEventListener("change",()=>{
    let repair = serviceSelect.value;
    while(expertSelect.options.length > 0){
        expertSelect.remove(0);
    }
    for (expert in experts){
        if(experts[expert][repair]){
            let expertOption = document.createElement('option');
            expertOption.value = expert;
            expertOption.innerHTML = expert;
            expertSelect.appendChild(expertOption);
        }
    }
})

bookBtn.addEventListener("click",()=>{
    if (!(document.getElementById("book-fn").value == "" || document.getElementById("book-ln").value == "" || document.getElementById("book-email-name").value == "" || document.getElementById("book-email-domain") == "")){
        document.getElementById("book-modal-body").innerHTML = `Congratulations! You've been booked at ${document.getElementById("book-time").value} on ${document.getElementById("book-date").value} with ${expertSelect.value} for a ${serviceSelect.selectedOptions[0].innerText}. An Email will shortly arrive to ${document.getElementById("book-email-name").value}@${document.getElementById("book-email-domain").value} to confirm your appointment!`
        $('#success-modal').modal('show')
    }else{
        while(bookAlert.hasChildNodes()){
            bookAlert.removeChild(bookAlert.firstChild)
        }
        let dummy = document.createElement('div')
        dummy.innerHTML = [
          `<div class="alert alert-danger alert-dismissible" role="alert" style="margin-top:1vh;">`,
          `   <div>Please enter all required information!</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('')
        bookAlert.appendChild(dummy)
    }
})
window.addEventListener("scroll", () =>{
    Array.from(document.getElementsByClassName("pseudo-page")).forEach(element => {
        let top = element.offsetTop;
        let height = element.offsetHeight;
        if (window.scrollY < top + height && window.scrollY > top ){
            Array.from(document.getElementById("nav-list").getElementsByTagName("li")).forEach((nav)=> {nav.classList.remove("active")});
            document.getElementById(`${element.id}-link`).classList.add("active");
        }
    });
})
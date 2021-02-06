console.log('project 1')
showNotes();
// if user add a note then note it in localstorage

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {

    let addtxt = document.getElementById("addtxt");
    let  addtitle = document.getElementById("addtitle");
    let Notes = localStorage.getItem("Notes");
    if (Notes == null) {
        NotesObj = [];
    }
    else {
        NotesObj = JSON.parse(Notes)
    }
    let myobj ={
        title:addtitle.value,
        text:addtxt.value
    }
    NotesObj.push(myobj)
    localStorage.setItem("Notes", JSON.stringify(NotesObj));
    addtxt.value = " ";
    addtitle.value = " ";
  //  console.log(NotesObj)
    showNotes();
});
function showNotes() {
    let Notes = localStorage.getItem("Notes");
    if (Notes == null) {
        NotesObj = [];
    }
    else {
        NotesObj = JSON.parse(Notes)
    }
    let html = "";
    NotesObj.forEach(function (element, index) {
        html += `<div class="notecard my-2 mx-2 card" style="width: 18rem;">

       <div class="card-body">
           <h5 class="card-title">  ${element.title}</h5>
           <p class="card-text"> ${element.text}</p>
           <button id="${index}"onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</button>
       </div>
   </div>`;
    });
    let noteselem = document.getElementById('Notes');
    if (NotesObj.length != 0) {
        noteselem.innerHTML = html;
    }
    else {
        noteselem.innerHTML = `nothing to show! "add a note"`
    }
}

//  delete note

function deletenote(index) {
  //  console.log('i am deleting note', index)
    let Notes = localStorage.getItem("Notes");
    if (Notes == null) {
        NotesObj = [];
    }
    else {
        NotesObj = JSON.parse(Notes)
    }
    NotesObj.splice(index ,1)
    localStorage.setItem("Notes", JSON.stringify(NotesObj));
    showNotes();
}


let search = document.getElementById('searchtxt');
search.addEventListener("input",function(){
    let inputval = search.value.toLowerCase();
    console.log('input event fired',inputval)
    let notecards = document.getElementsByClassName('notecard')
    Array.from(notecards).forEach(function(element){
        let cardtxt=element.getElementsByTagName("p")[0].innerText
        if(cardtxt.includes(inputval))
        {
            element.style.display = "block";
        
        }
        else{
            element.style.display =  "none";
        }
     
    })
})
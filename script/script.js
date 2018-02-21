
document.getElementById('add-btn').addEventListener('click', function (event) {
    event.preventDefault();
    let taskValue = document.getElementById('add-new-element').value;
    
   if(taskValue) { 
       createTask(taskValue);
       document.getElementById('add-new-element').value = "";
   }
   
   fetch ('https://isa-sandbox-1ae48.firebaseio.com/todo.json', {
    method: "POST",
    body: JSON.stringify({value: taskValue})
    }).then (function (response) {
    if (response.ok) {
        fetch ('https://isa-sandbox-1ae48.firebaseio.com/todo.json').then(function(response) {
            return response.json();
        }).then(function (json) {
            console.log(json);
            let list = document.getElementById('added-elements');
            list.innerText = '';
            for (let taskId in json) {
                let taskElement = document.createElement('li');
                taskElement.innerText = json[taskId].value;
                list.appendChild(taskElement)
                let deleteBtn = document.createElement('button');
                deleteBtn.classList.add('delete-btn');
                deleteBtn.innerText = "X";
                taskElement.appendChild(deleteBtn)
            }
        });
    }
 });
});

function removeTask () {
    
    return fetch('https://isa-sandbox-1ae48.firebaseio.com/todo.json', {
          method: 'delete'
        }).then(function(response) { 
          response.json();
          console.log(json)
          var liElement = this.parentNode;
        }).then(function(json) {
            console.log(json)
            var liElement = this.parentNode;
            document.getElementById('added-elements').removeChild(liElement);
            // return json;
          })
      }




function createTask (txt) {
    var ulList = document.getElementById('added-elements');

    var liElement = document.createElement('li');
    liElement.innerText = txt;

    var deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = "X";

    deleteBtn.addEventListener('click', removeTask);

    liElement.appendChild(deleteBtn);
    ulList.appendChild(liElement);
};

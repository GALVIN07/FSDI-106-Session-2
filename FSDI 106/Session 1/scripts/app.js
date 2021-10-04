let important=true;

function toggleImportant(){
    console.log("clicked");
    if(important===true){
        $("#iImportant").removeClass("fas").addClass("far");
        important=false;
    }else{
        $("#iImportant").removeClass("far").addClass("fas");
        important=true;
    }
}
let form=false;
function toggleForm(){
    if(form){
        $("form").slideUp(500);
        $("#btnAdd").text("Add Task");
        form=false;
    }else{
        $("form").slideDown(500);
        $("#btnAdd").text("Hide the Form");
        form=true;
    }         
}
function save(){
    console.log("Saving Task");
    let title=$("#txtTitle").val();
    let date=$("#selDate").val();
    let location=$("#txtLocation").val();
    let priority=$("#selPriority").val();
    let color=$("#selColor").val();
    let collaborator=$("#txtCollaborator").val();
    let description=$("#txtDescription").val();
    //create a new task object using the constructor
    let task = new Task(title, important, date, location, priority, color, collaborator, description);
    
    $.ajax({
        type:"POST",
        url:"https://fsdiapi.azurewebsites.net/api/tasks",
        data:JSON.stringify(task),
        contentType:"application/json",
        success:function(res){
            console.log("Server says", res);
            let t=JSON.parse(res);
            displayTask(t);
        },
        error:function(error){
            console.log("Error saving task", error);
        }
    });

    
    clearForm();
    //get information from the inputs

}
function displayTask(task){
    //display obj information
    syntax=`
    <div class=task>
        <h6>${task.title}</h6>
        <div class=task-display>
        <lable>${task.location}</lable>
        <lable>${task.collaborator}</label>
        </div>
    </div>
    `;
    $(".pending-tasks").append(syntax);
}
function clearForm(){
    $("#txtTitle").val("");
    $("#selDate").val("");
    $("#txtLocation").val("");
    $("#selPriority").val("");
    $("#selColor").val("");
    $("#txtCollaborator").val("");
    $("#txtDescription").val("");
}
// $("#txtTitle").keypress(function() {$("#btnSave").keypress(save());});


function init(){
    console.log("Calendar System");
    $("form").hide();
    //hook event
    $("#iImportant").click(toggleImportant);
    $("#btnAdd").click(toggleForm);
    $("#btnSave").click(save);
}

window.onload=init;
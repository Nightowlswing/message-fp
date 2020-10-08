function insertNew(){

  var post_form = document.getElementById("absent_form");
  var div = document.createElement("div");
  var input = document.createElement("input");
  var button = document.createElement("button");
  var text = document.createTextNode("-");

  button.addEventListener('click', e => {
    e.currentTarget.parentNode.remove();
  })

  button.appendChild(text);
  div.appendChild(input);
  div.appendChild(button);
  post_form.appendChild(div);
}

function main(){
  var message_data = collectData();
  var message_text = createMessage(message_data);
  var result_form_text = document.getElementById("result_text");
  var message = document.createTextNode(message_text);
  result_form_text.appendChild(message);
}

function createMessage(message_data){
  var message_text = "Уважаемые родители! На сегодня дела обстоят так:\n\n";

  if(message_data.absent.length>0){
    absent_text = "**На уроке отсутствовали**\n"
    for(let i = 0; i<message_data.absent.length;i++){
      absent_text += "\t-"+message_data.absent[i]+"\n";
    }
    absent_text += "Приглашаю этих учеников в следующий раз на отработку за 30 минут до начала урока\n\n";
  }else{
    absent_text = "**На присутствовали все**\n\n";
  }
  message_text+=absent_text;

  if(message_data.things!=""){
    message_text += "**На уроке мы**\n" + message_data.things + "\n\n";
  }
  if(message_data.homework!=""){
    message_text += "**Домашнее задание**\n" + message_data.homework + "\n\n";
  }
  if(message_data.additional!=""){
    message_text += "**Кроме того**\n" + message_data.additional + "\n\n";
  }

  return message_text;
}

function collectData(){
  var absent_form = document.getElementById("absent_form");
  var things_form_text = document.getElementById("things_text");
  var homework_form_text = document.getElementById("homework_text");
  var additional_form_text = document.getElementById("additional_text");

  //absent students
  var absent_students = []
  var absent_students_forms = absent_form.childNodes
  for(let i=1; i<absent_students_forms.length;i++){
    var student_name = absent_students_forms[i].childNodes[0].value
    if (!ofSpace(student_name)){
      absent_students.push(student_name);
    }
  }
  //things 'we' learned
  var things_text = things_form_text.value
  //homework
  var homework_text = homework_form_text.value
  //additional
  var additional_text = additional_form_text.value

  return {
    absent: absent_students,
    things: ofSpace(things_text)?"":things_text,
    homework: ofSpace(homework_text)?"":homework_text,
    additional: ofSpace(additional_text)?"":additional_text
  }
}

function ofSpace(str){
  return !str.replace(/\s/g, '');
}

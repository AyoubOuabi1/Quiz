const progressDone = document.querySelector('.progress-done');
let ClickedButton = document.querySelectorAll('button');
let arrayNumber=[];
let id_timer;
function changeProgress(maxValue,finalValue){
    progressDone.style.width=`${(maxValue*100)/finalValue}%`;
    if(((maxValue*100)/finalValue)!==0.00){
        progressDone.innerHTML=`${Number((maxValue*100)/finalValue).toFixed(2)}%`;

    }
}

function startQuiz(){
    getData();
    $("#rulesPar").addClass("hidden");
    $("#answerPar").removeClass("hidden");

}
//getData();

function printQuestion(data, arrayNumberCounter) {
    $('#questionTitle').text(`${data[arrayNumber[arrayNumberCounter]].question}`)
    $('#1').text(`${data[arrayNumber[arrayNumberCounter]].choice1}`);
    $('#2').text(`${data[arrayNumber[arrayNumberCounter]].choice2}`);
    $('#3').text(`${data[arrayNumber[arrayNumberCounter]].choice3}`);
    $('#4').text(`${data[arrayNumber[arrayNumberCounter]].choice4}`);
}
function rangeNumber(maxValue){
    let number;
    for (let i=0; i<maxValue;i++){
        number = Math.floor(Math.random() * maxValue);
        while (arrayNumber.includes(number)){
            number = Math.floor(Math.random() * maxValue);
        }
        arrayNumber.push(number);
    }
}
function getData(){

    $.ajax({
        "url": "./assets/questions.json",
        "dataType": "json",
        success: function(data){
            loadQuestion(data)
        }
    })
}
function  loadQuestion(data){
    let dataSize = data.length;
    let index = 0;
    let CorrectAnswer=0;
    let counter = 1;
    rangeNumber(dataSize);
    console.log(arrayNumber);
    printQuestion(data, 0);
    changeProgress(0,data.length);
    for(let i=0; i<5; i++) {
        ClickedButton[i].addEventListener('click',function () {
            progressDone.style.marginLeft =`0px`;

            if(counter<dataSize){
                if(data[arrayNumber[index]].answer==ClickedButton[i].getAttribute("id")){
                    console.log("this is correct")
                    CorrectAnswer+=500;
                    ClickedButton[i].classList.add("answerCorrect");

                }else {
                    ClickedButton[i].classList.add("answerNotCorrect");
                }
                ClickedButton[i].setAttribute("disabled", "disabled");
                setTimeout(function () {
                  
                    ClickedButton[i].removeAttribute("disabled");
                    ClickedButton[i].classList.remove("answerNotCorrect");
                    ClickedButton[i].classList.remove("answerCorrect");
                    ClickedButton[i].classList.add("answerBefor");
                    printQuestion(data, counter);
                    changeProgress(counter,dataSize);
                    counter++;
                    index++;

                },500)

            }else if(counter===dataSize){
                changeProgress(counter,dataSize);
                if(data[arrayNumber[index]].answer==ClickedButton[i].getAttribute("id")){
                    console.log("this is correct")
                    CorrectAnswer+=500;
                    ClickedButton[i].classList.add("answerCorrect");

                }else {
                    ClickedButton[i].classList.add("answerNotCorrect");

                }
                setTimeout(function (){
                    $("#scr").html(`${CorrectAnswer}`);
                    $("#scrPar").removeClass("hidden");
                    $("#answerPar").addClass("hidden");
                },500)



            }

        })
    }
}





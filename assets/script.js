const progressDone = document.querySelector('.progress-done');
let ClickedButton = document.querySelectorAll('button');
let arrayNumber=[];
function changeProgress(maxValue,finalValue){
    progressDone.style.width=`${(maxValue*100)/finalValue}%`;
    progressDone.innerHTML=`${Number((maxValue*100)/finalValue).toFixed(2)}%`;
}
 getData();

function printQuestion(data, arrayNumberCounter) {
    $('#questionTitle').text(`${data[arrayNumber[arrayNumberCounter]].question}`)
    $('#1').text(`${data[arrayNumber[arrayNumberCounter]].choice1}`);
    $('#2').text(`${data[arrayNumber[arrayNumberCounter]].choice2}`);
    $('#3').text(`${data[arrayNumber[arrayNumberCounter]].choice3}`);
    $('#4').text(`${data[arrayNumber[arrayNumberCounter]].choice4}`);
}

function getData(){
    $("#scrPar").css("display","none");
    $.ajax({
        "url": "./assets/questions.json",
        "dataType": "json",
        success: function(data){
            let dataSize = data.length;
            let counter = 1;
            let index = 0;
            let CorrectAnswer=0;
            rangeNumber(dataSize);
            console.log(arrayNumber);
            printQuestion(data, 0);
            changeProgress(0,data.length);

                for(let i=0; i<4; i++) {
                    ClickedButton[i].addEventListener('click',function (qualifiedName, value) {
                        progressDone.style.marginLeft =`0px`;
                        if(counter<dataSize){
                            //arrayNumberCounter++;
                            if(data[[arrayNumber[index]]].answer==ClickedButton[i].getAttribute("id")){
                                console.log("this is correct")
                                CorrectAnswer++;
                                ClickedButton[i].classList.add("answerCorrect");

                            }else {
                                ClickedButton[i].classList.add("answerNotCorrect");

                            }


                            ClickedButton[i].setAttribute("disabled", value);
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
                            if(data[[arrayNumber[index]]].answer==ClickedButton[i].getAttribute("id")){
                                console.log("this is correct")
                                CorrectAnswer++;
                                ClickedButton[i].classList.add("answerCorrect");

                            }else {
                                ClickedButton[i].classList.add("answerNotCorrect");

                            }
                            setTimeout(function (){
                                $("#scr").html(`${CorrectAnswer}`);
                                $("#scrPar").removeAttr("style");
                                $("#answerPar").css("display","none");
                            },500)



                        }

                    })
                }





        }
    })
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

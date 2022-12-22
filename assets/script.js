const progressDone = document.querySelector('.progress-done');
let ClickedButton = document.querySelectorAll('button');
function changeProgress(maxValue,finalValue){
    progressDone.style.width=`${(maxValue*100)/finalValue}%`;
    progressDone.innerHTML=`${Number((maxValue*100)/finalValue).toFixed(2)}%`;
}
 getData();
function getData(){
    $.ajax({
        "url": "./assets/questions.json",
        "dataType": "json",
        success: function(data){

            $('#questionTitle').text(`${data[0].question}`)
            $('#1').text(`${data[0].choice1}`);
            $('#2').text(`${data[0].choice2}`);
            $('#3').text(`${data[0].choice3}`);
            $('#4').text(`${data[0].choice4}`);
            changeProgress(0,data.length);
            let dataSize = data.length;
            let counter = 1;
            let index = 0;

            for(let i=0; i<4; i++) {
                ClickedButton[i].addEventListener('click',function () {
                    progressDone.style.marginLeft =`0px`;
                    if(counter<dataSize){
                        let ans=data[index].answer-1;
                        changeCorrectAnswerBackground(ans,i)
                        setTimeout(function () {
                            for(let j=0;j<4;j++) {
                                ClickedButton[j].classList.remove("answerNotCorrect");
                                ClickedButton[j].classList.remove("answerCorrect");
                                ClickedButton[j].classList.add("answerBefor");
                            }
                            $('#questionTitle').text(`${data[counter].question}`)
                            $('#1').text(`${data[counter].choice1}`);
                            $('#2').text(`${data[counter].choice2}`);
                            $('#3').text(`${data[counter].choice3}`);
                            $('#4').text(`${data[counter].choice4}`);
                            changeProgress(counter,dataSize);
                            counter++;
                            index++;
                        },500)

                    }else if(counter===dataSize){
                        changeProgress(counter,dataSize);
                        let ans=data[index].answer-1;
                        console.log(ans);
                        changeCorrectAnswerBackground(ans,i)
                        alert("thank you its last one")
                    }

                })
            }


        }
    })
}
function changeCorrectAnswerBackground(answer,i){

    ClickedButton[answer].classList.remove("answerBefor");
    ClickedButton[answer].classList.remove("answerNotCorrect");
    ClickedButton[answer].classList.add("answerCorrect");
    for(let j=0;j<4;j++) {
        if(j!==answer){
            ClickedButton[i].classList.remove("answerBefor");
            ClickedButton[j].classList.remove("answerCorrect");
            ClickedButton[j].classList.add("answerNotCorrect");
        }
    }
}
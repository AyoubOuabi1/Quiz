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
            dataSize = data.length;
            counter=1;
            for(let i=0; i<ClickedButton.length; i++) {

                ClickedButton[i].addEventListener('click',function () {
                    progressDone.style.marginLeft =`0px`;
                        if(counter<dataSize){

                            $('#questionTitle').text(`${data[counter].question}`)
                            $('#1').text(`${data[counter].choice1}`);
                            $('#2').text(`${data[counter].choice2}`);
                            $('#3').text(`${data[counter].choice3}`);
                            $('#4').text(`${data[counter].choice4}`);
                            changeProgress(counter,dataSize);
                            counter++;
                        }else if(counter===dataSize){
                            changeProgress(counter,dataSize);
                            alert("thank you its last one")
                        }

                })
            }


        }

    })
 }
 function changeData(id){

}
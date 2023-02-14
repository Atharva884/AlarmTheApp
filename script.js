
// Variables
const time = document.querySelector('.time')
const hours = document.getElementById('hours')
const seconds = document.getElementById('seconds')
const addBtn = document.getElementById('add')
const res = document.querySelector('.results')
let hour;
let minute;
let mils;
let newtime;
let audio1 = new Audio('./twirling-intime-lenovo-k8-note-alarm-tone-41440.mp3')



function getTime(){
    let date = new Date()
    hour = parseInt(date.getHours())
    minute = parseInt(date.getMinutes())
    mils = parseInt(date.getSeconds())
    time.innerHTML = `
        <h4 class="text-danger">Current Time: </h4>
        ${hour} : ${minute} : ${mils}
    `
}
setInterval(getTime, 1000)


function addAlarm(){
    if(hours.value == 00){
        alert("Enter value")
    }else if(hours.value < 0 || seconds.value < 0){
        alert("Enter positive number")
    }else{
        res.innerHTML = `
            <div class="container">
                <div class="d-flex align-items-center justify-content-center gap-2">
                    <h5>
                        ${hours.value.length == 1 ? 0 + hours.value : hours.value} : ${seconds.value.length == 1 ? 0 + seconds.value : seconds.value}
                    </h5>
                    <div class="d-flex align-items-center justify-content-center gap-3">
                        <input class="form-check-input mt-0" data-time="${hours.value} : ${seconds.value}" type="checkbox" id="check" value="${hours.value} : ${seconds.value}" aria-label="Checkbox for following text input">
                        <img src="./trash.ico" alt="" id="delete" width="15">
                    </div>                    
                </div>
            </div>
        `    
        let checkBox = document.getElementById('check')
        let deleteBtn = document.getElementById('delete')
        let interval;

        deleteBtn.addEventListener('click', ()=>{
            res.innerHTML = ""
            clearInterval(interval)
        })

        checkBox.addEventListener('change', ()=>{
            if(checkBox.checked == true){
                let checkBoxValue = checkBox.value

                if(checkBoxValue.split(':')[1] <= (hour + " : " + minute).split(':')[1]){
                    alert("You can't set the alarm")
                    checkBox.checked = false
                    return 1
                }else{
                    function checkBc(){
                        let newtime = hour + " : " + minute 
                        console.log("Called")
                        let splitedCheckBoxMinuteValue =  checkBoxValue.split(':')[1]
                        let splitedCheckBoxTimeValue = newtime.split(':')[1]
                        console.log(splitedCheckBoxMinuteValue)
                        console.log(splitedCheckBoxTimeValue)
    
                        if(splitedCheckBoxTimeValue >= splitedCheckBoxMinuteValue){
                            deleteBtn.style.display = "none"
                            console.log("Same One")
                            audio1.play()
                            audio1.loop = true
                        }
                    }
                    interval = setInterval(checkBc, 1000)  
                }

            }else{
                clearInterval(interval)
                checkBoxValue = ""
                audio1.pause()
                deleteBtn.style.display = "block"
            }
        })

        hours.value = ""
        seconds.value = ""
    }










    // Alag Logic (For not adding same time)

    // let value = document.querySelector('.values').innerText.split(':')[0]
    // console.log(value)
    // console.log(value.substr(1))
    // // console.log(hours.value)
    // // console.log( == hours.value)
    // if(hours.value === value.substr(1)){
    //     alert("We can't add same.")
    // }
}



addBtn.addEventListener('click', ()=>{
    addAlarm()
})





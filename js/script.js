const sound_container=Array.from(document.querySelectorAll('.sound'));
const sound=sound_container.map(each=>each.children[0]);
const feedback_btn=document.querySelector('.feedback-btn');
const feedback_message=document.querySelector('.feedback-message');
const go_back=document.querySelector('.back-btn');
let is_playing=false;
let continue_function;
let meditation_sound_duration=0;
let duration_to_show;
let other_sound_container;

function match_all_input(each){
    let range=each.children[3];
    let hour=each.children[5];
    let minute=each.children[6];
    let second=each.children[7];
    each.children[3].addEventListener('input',event=>{;
        hour.value=Math.floor(range.value/3600);
        minute.value=Math.floor((range.value%3600)/60);
        second.value=range.value%60;
    });
    each.children[5].addEventListener('input',event=>{
        range.value=(hour.value*3600)+(minute.value*60)+(second.value*1);
    });
    each.children[6].addEventListener('input',event=>{
        range.value=(hour.value*3600)+(minute.value*60)+(second.value*1);
    });
    each.children[7].addEventListener('input',event=>{
        range.value=(hour.value*3600)+(minute.value*60)+(second.value*1);
    });
}
function playing_audio(event){
    if(!is_playing){
        other_sound_container=sound_container.filter(each=>each!=event.target.parentNode);
        other_sound_container.forEach((each)=>{
            each.classList.add('no-input');
            each.classList.add('no-input');
        });
        meditation_sound_duration=Math.floor(event.target.parentNode.children[0].duration);
        //meditation_sound_duration=2;
        duration_to_show=Math.floor(event.target.parentNode.children[3].value);
        no_of_recursion=Math.floor(duration_to_show/meditation_sound_duration);
        initial_no_of_recursion=no_of_recursion;
        extra_time_to_play=Math.floor(duration_to_show%meditation_sound_duration);
        let continue_function=setInterval(()=>continue_playing(event,continue_function),100);
    };
    play_pause(event);
}
//this function kepps going till it reaches the total duration and stops the sound 
function continue_playing(event,continue_function){
    //showing time remaining to complete
    range=event.target.parentNode.children[3];
    hour=event.target.parentNode.children[5];
    minute=event.target.parentNode.children[6];
    second=event.target.parentNode.children[7];
    range.value=duration_to_show-(((initial_no_of_recursion-no_of_recursion)*meditation_sound_duration)+Math.floor(event.target.parentNode.children[0].currentTime));
    hour.value=Math.floor(range.value/3600);
    minute.value=Math.floor((range.value%3600)/60);
    second.value=range.value%60;
    //stop btn
    event.target.parentNode.children[10].addEventListener('click',()=>{
        event.target.parentNode.children[0].currentTime=0;
        event.target.parentNode.children[0].pause();
        event.target.innerHTML="Play";
        is_playing=false;
        other_sound_container.forEach((each)=>{
            each.classList.remove('no-input');
            each.classList.remove('no-input');
        });
        clearInterval(continue_function);
    })
    if(Math.floor(event.target.parentNode.children[0].currentTime)===meditation_sound_duration){
        no_of_recursion-=1;
        event.target.parentNode.children[0].currentTime=0;     
    }; 
    if(no_of_recursion===0){
        if(Math.floor(event.target.parentNode.children[0].currentTime)===extra_time_to_play){
            event.target.parentNode.children[0].currentTime=0;
            event.target.parentNode.children[0].pause();
            event.target.innerHTML="Play";
            clearInterval(continue_function);
            is_playing=false;
        };
    };
}
function play_pause(event){
    is_playing=true;
    if(event.target.parentNode.children[0].paused){
        event.target.parentNode.children[0].play();
        event.target.innerHTML="Pause";
    }else{
        event.target.parentNode.children[0].pause();
        event.target.innerHTML="Play";
    }
}

//matching input across range,number and unit
sound_container.forEach(each=>match_all_input(each));

//playing sounds
sound.forEach((each)=>{
    each.onloadedmetadata=function(){
        each.parentNode.children[9].addEventListener('click',event=>playing_audio(event));
    };
});

//feedback buttom
feedback_btn.addEventListener('click',event=>{
    feedback_btn.classList.add('hider');
    feedback_message.classList.remove('hider');
    go_back.classList.remove('hider');
});
go_back.addEventListener('click',event=>{
    feedback_btn.classList.remove('hider');
    feedback_message.classList.add('hider');
    go_back.classList.add('hider');
});
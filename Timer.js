class Timer {
    constructor(durationInput, startButton , pauseButton,callbacks){
        this.durationInput = durationInput; 
        this.startButton = startButton; 
        this.pauseButton = pauseButton; 
        if(callbacks){
            this.onStart= callbacks.onStart; 
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }
        
        this.newDuration = this.timeRemaining; 
        this.backupRemainingTimerCount=this.timeRemaining;
        this.startButton.addEventListener('click',this.start);
        this.pauseButton.addEventListener('click',this.pause); 
        this.durationInput.addEventListener('focus', this.reset);
        this.durationInput.addEventListener('blur',this.cancelTheReset) 

}  
    

    start = ()=> {
        this.totalDuration = this.newDuration; 
        if (this.restart)
            this.timeRemaining= this.newDuration; 
        this.restart = false; 
        
        this.show =true; 
        if(this.onStart){
            this.onStart(this.totalDuration); 
        }
        if(this.intervalId)
        this.pause(); 

        this.tick(); 
        this.intervalId = setInterval(this.tick, 50); 

    }
    pause = (input)=> {
       
        clearInterval(this.intervalId); 
        
    }
    tick = () => {
        if (this.timeRemaining <= 0){
            this.timeRemaining= this.totalDuration; 
            this.pause(); 
           
            if (this.onComplete) 
                this.onComplete(this.totalDuration); 

        }else{
    
       if(this.show){
        this.timeRemaining = this.timeRemaining - .05;
        this.backupRemainingTimerCount = this.timeRemaining - .05; 
        if (this.onTick){
            this.onTick(this.timeRemaining); 
           } 
          
       }else{
       
       
       if (this.onTick){
        this.backupRemainingTimerCount -= .05; 
        this.onTick(this.backupRemainingTimerCount); 
       } 
    }
      
        }
        
    }
    reset = ()=>{
        this.lastFocus = this.timeRemaining; 
        this.show = false; 
    }
    cancelTheReset = () =>{
       if(this.lastFocus === this.timeRemaining)
        this.timeRemaining = this.backupRemainingTimerCount; 
        else {
                this.newDuration = this.timeRemaining; 
                this.timeRemaining = this.backupRemainingTimerCount; 
                this.restart = true; 
                
            
            
        }
        this.show = true; 
    }
    get timeRemaining(){
        return parseFloat(this.durationInput.value); 
    }
    set timeRemaining(time){
        this.durationInput.value = time.toFixed(2); 
    }
   
}
let seg;

function onMessage(e) {
    seg = e.data
    if(seg >= 0) {
        interval = setTimeout(() => {
            self.postMessage(true)
        }, seg * 1000);
    } else if (seg < 0) {
        clearInterval(interval);
    }
    

} 


self.addEventListener("message", onMessage)
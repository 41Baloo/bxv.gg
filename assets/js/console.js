document.addEventListener("DOMContentLoaded", function() {
    var consoleBody = document.getElementById("console-body");
    var consoleInput = document.getElementById("console-input");
    var consoleHasFocus = false;
    var cmdHistory = [];
    var consoleData = [];
    var cmdInput = "";
    var cmdCache = "";
    var executeCMD = function(){};
    var writeConsole = function(){};
    var consoleReady = true;
    var cursor = "_"
    var cmdHistoryPos = -1
    var isConsoleStreaming = false;

    
    console.log("<-- Code publicly available at https://github.com/41Baloo/bxv.gg -->")
	
    document.addEventListener("mousedown", function (e) {
        if(!isConsoleStreaming){
            if (e.target.classList.value.includes("console-target")) {
                consoleHasFocus = true;
    			cursor = "▁"
    			writeConsole();
            } else {
                consoleHasFocus = false;
    			cursor = "_"
    			writeConsole();
            }
        }
    });
    
    document.addEventListener("keydown", function (e) {
        if (consoleHasFocus) {
            var key = e.key;
			//console.log(key);
            var ctlrDown = e.ctrlKey;
            
            if(isConsoleStreaming){
                if(ctlrDown && key == "c"){
                    isConsoleStreaming = false;
                    cmdInput = "";
                    writeConsole();
                }
                return;
            }
            
            if (key == "Enter" && consoleReady) {
                cmdHistory.unshift(cmdInput);
                consoleInput.innerHTML = " ";
                consoleReady = false;
                cmdHistoryPos = -1;
                executeCMD(cmdInput).then(result => {
					consoleData.push("root@baloo:~$ " + cmdInput);
                    result.forEach(line => {
						consoleData.push(line);
					});
                    cmdInput = "";
                    writeConsole();
                    consoleReady = true;
                }).catch(error => {
					cmdInput = "";
                    writeConsole();
                    consoleReady = true;
				});
				writeConsole();
            } else if (key == "Backspace" && cmdInput.length > 0 && consoleReady) {
                cmdInput = cmdInput.split("");
                cmdInput.pop();
                cmdInput = cmdInput.join("");
                writeConsole();
            } else if (key.length == 1 && consoleReady && !ctlrDown) {
                cmdInput = cmdInput+key;
                writeConsole();
            } else if (key == "ArrowUp") {
				if (cmdHistory.length == 0) return;
				if (cmdHistoryPos == -1) {
				    cmdCache = cmdInput.toString();
				}
				if (cmdHistoryPos == cmdHistory.length - 1) {
					cmdInput = cmdHistory[cmdHistoryPos];
				} else if (cmdHistoryPos < cmdHistory.length - 1) {
					cmdHistoryPos++
					cmdInput = cmdHistory[cmdHistoryPos];
				}
				writeConsole();
				e.preventDefault()
			} else if (key == "ArrowDown") {
				if (cmdHistory.length == 0) return;
				if (cmdHistoryPos == 0) {
					cmdHistoryPos = -1;
					cmdInput = cmdCache.toString();
				} else if (cmdHistoryPos == cmdHistory.length - 1) {
					cmdHistoryPos--
					cmdInput = cmdHistory[cmdHistoryPos];
				} else if (cmdHistoryPos > -1) {
					cmdHistoryPos--
					cmdInput = cmdHistory[cmdHistoryPos];
				}
				writeConsole();
				e.preventDefault()
			} else if (e.keyCode === 32) {//Spacebar
				cmdInput = cmdInput+key;
                writeConsole();
			}
        }
		if (e.keyCode === 32) {//Spacebar... preventDefault doesn't seem to work in the above function.
			e.preventDefault()
		}
    });
    
    writeConsole = function() {
        var outputData = [];
		if (consoleData.length > 11) {
			outputData = consoleData.slice(consoleData.length - 11, consoleData.length);
			outputData.push(`root@baloo:~$ ${cmdInput}${cursor}`);
		} else {
			outputData = consoleData.map(function (item) {return item});
			outputData.push(`root@baloo:~$ ${cmdInput}${cursor}`);
		}
		var output = outputData.join("<br>");
		consoleInput.innerHTML = output
    };
    
    executeCMD = function(cmd) {
        return new Promise((resolve, reject) => {
            switch(cmd.toLowerCase()) {
                case "":
                    resolve("");
                    break;
                case "help":
					resolve(["-> help: Display this message.", "-> nload: Network load information for bxv.gg.", "-> rank: Records of biggest mitigated attacks against bxv.", "-> clear: Clear the console."]);
                    break;
                case "nload":
                    nload();
                    reject();
                    break;
                case "login":
                    location.href = 'https://bxv.gg/login';
                    reject();
                case "skiop":
                    resolve(["idk, just kinda cute"]);
                    break;
                case "voltic":
                    resolve(["cutest"]);
                    break;
                case "rank":
                    resolve(["-> rank: Display this message", "-> rank bypassed: Show biggest bypassing attacks (peak).", "-> rank raw: Show biggest raw attacks (peak)."]);
                    break;
                case "rank bypassed":
                    resolve(["Reporting the biggest bypassing attacks bxv has mitigated", "[#1] Unknown (@N/A): 31.586 Requests per second", "[#2] Opilla (@ELFmalware): 19.989 Requests per second", "[#3] Tech.Admin (@stresstechadmin): 9.575 Requests per second"])
                    break;
                case "rank raw":
                    resolve(["Reporting the biggest raw attacks bxv has mitigated", "[#1] Wilford (@WilfordCEO): 9.117.364 Requests per second", "[#2] Brizy (@Oxb16): 6.985.318 Requests per second", "[#3] rasmus (@niqqrohater): 5.402.835 Requests per second"])
                    break;
                case "clear":
					consoleData = [];
                    reject();
                    break;
                default: 
                    resolve([`-bxv: ${cmd}: command not found`]);
                    break;
            }
        });
    };
    
    String.prototype.replaceAt = function(index, key) {
        return(this.substring(0, index) + key + this.substring(index + 1));
    }
    //Replace a character at any point in a string
    
    
    
    //Calculate an ideal scale
    function calcScale (max) {
    	var scale;
    	var range;
    	function calculate(value) {
    	    return (Math.ceil(value / 10) * 10)/10;
        }
        
    	scale = calculate(max);
    	return(scale);
    }
    
    //Read the function name -_-
    function formatNumber(num) {
    	var formatSettings = {
    		notation: "compact",
    	}
    	return new Intl.NumberFormat('en-US', formatSettings).format(num);
    }
    var lines = [
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "],
    	["    ", "", "               "]
    ]
    var timeline = [];
    
    //This fills the lines with empty filler space
    for (let x=0; x < 60; x++) {
    	timeline.push(0);
    }
    function nloadGraph(baloo, avgr) {
    	var avg = avgr;
    	var max = 0;
    	var ttl = 0;
    	var current = baloo;
        
    	//Scale
    	var scale = 0;
    	timeline.shift();
    	timeline.push(baloo);
    	
    	//Calculating the min and max values for the 60 second timeline
    	timeline.forEach(value => {
    		var _scale = calcScale(value);
    		if (scale < _scale) scale = _scale;
    	if (value > max) max = value;
    	ttl = ttl + value;
    	
    	})
    	
    	//Clearing the lines before drawing next bars
    	lines.forEach(line => {
    		line[1] = " ".repeat(60);
    	})
    	
    	//Draw the bars by going up from the bottom
    	for (let y=0; y < 60; y++) {
    		var value = timeline[y];
    		for (let x=0; x < Math.ceil(value/scale); x++) {
    			lines[10-x][1] = lines[10-x][1].replaceAt(y, "#");
    		}
    	}
    	
    	//Drawing the scale numbers
    	lines[9][0] = formatNumber(scale*2) + (" ".repeat(4 - (formatNumber(scale*2)).toString().length));
    	lines[7][0] = formatNumber(scale*4) + (" ".repeat(4 - (formatNumber(scale*4)).toString().length));
    	lines[5][0] = formatNumber(scale*6) + (" ".repeat(4 - (formatNumber(scale*6)).toString().length));
    	lines[3][0] = formatNumber(scale*8) + (" ".repeat(4 - (formatNumber(scale*8)).toString().length));
    	lines[1][0] = formatNumber(scale*10) + (" ".repeat(4 - (formatNumber(scale*10)).toString().length));
    	
    	//Drawing the statistics
    	avg = "Avg: " + formatNumber(avg);
    	max = "Max: " + formatNumber(max);
    	ttl = "Ttl: " + formatNumber(ttl);
    	current = "Curr: " + formatNumber(current);
    	lines[10][2] = "  " + ttl + " ".repeat(16 - (ttl.length));
    	lines[9][2] = "  " + max + " ".repeat(16 - (max.length));
    	lines[8][2] = "  " + avg + " ".repeat(16 - (avg.length));
    	lines[7][2] = "  " + current + " ".repeat(16 - (current.length));
    	
    	//This is to combine each line into one string instead of 3 arrays
    	var output = [];
    	lines.forEach(line => {
    		output.push(line.join(""));
    	})
    	
    	//Combine each line and then set the console thingy
    	consoleInput.innerHTML = output.join("<br>").replaceAll(" ", "&nbsp;")
    }
    
    nload = function(){
        
        consoleInput.innerHTML = "[ Loading Nload ] ...";
        
        isConsoleStreaming = true;
        
        var count = 0;
        var all = 0;
        var total = 0;
        var current = 0;
        var highest = 0;
        var lowest = null;
        var average = null;
        
        var previous = null;
        var prevTime = null;
        
        getRps();
        
        function getRps(){
            fetch('/rps')
            .then(function (response) {
            	return response.text();
            }).then(function (text) {
            	var part = text.split(' ')[9];
                all = parseInt(part);
                
                if(Number.isNaN(all)){
                    consoleInput.innerHTML = "[ Your IP changed. Reloading ] ...";
                    setTimeout(() => {  location.reload(); }, 2000);
                    return;
                }
                
                
                var time = performance.now();
                
                if(prevTime != null){
                    var delay = time - prevTime
                    if(delay > 2000){
                        consoleInput.innerHTML = "[ Your connection is too slow ] !";
                    } else {
                        if(previous != null){
                            current = all - previous
                            
                            if(lowest == null){
                                lowest = current
                            }
                            
                            if(current > highest){
                                highest = current;
                            } else if(current < lowest){
                                lowest = current
                            }
                        }
                        
                        count++;
                        total += current;
                        average = (total/count).toFixed(2);
                        
                        nloadGraph(current, average);
                    }
                } else {
                    consoleInput.innerHTML = "[ Loading Nload ] ...";
                }
                
                previous = all;
                prevTime = performance.now();
                
                if(isConsoleStreaming){
                    setTimeout(getRps, 1000);
                } else {
                    writeConsole();
                }
            }).catch(function (err) {
                console.log(err);
            	consoleInput.innerHTML = "[ Your connection is having issues ("+err+") ] !";
            	setTimeout(getRps, 1000);
            });
        }
    }
});
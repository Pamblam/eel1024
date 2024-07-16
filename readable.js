let 
l,                                                                  // The cherry's position
f=0,                                                                // A flag indicating if snek has moved since last position change
h=[...Array(5)].map((t,e)=>[e+5,5]),                                // An array of [x,y] coodinates which make up the blocks of the snek
r=0,                                                                // The current direction that the snek is moving: 0 = right, 1 = down, 2 = left, 3 = up
d=20,                                                               // The size of the blocks, in pixels
n=250,                                                              // The delay between frames in ms, to control speed
o=0,                                                                // The score or cherry count
i=Math.floor,                                                       // Assign Math.floor to a var to save a few bytes
g=(t,e,i)=>{                                                        // Function to draw a square
    c.fillStyle=i||"#0040ff",                                       //         The color of the square
    c.fillRect(t*d,e*d,d,d)                                         //         Draw the square
},                                                                  // End of function
e=(t,e)=>i(Math.random()*(e-t+1)+t),                                // A function to generate a random number in a given range
s=(i,l)=>h.filter(([t,e])=>t===i&&e===l),                           // A function to check if snek occupies a given [x,y] coord
y=t=>{                                                              // Function to reposition the cherry 
    l=[e(0,i(a.width/d)-1),e(0,i(a.height/d)-1)],                   //         Assign the cherry to a new random position within the bounds of the canvas
    s(...l).length&&y()                                             //         If the cherry happens to be on the snake, rerun the function
},                                                                  // End of function
u=t=>{                                                              // Function to move the snek
    h.shift();                                                      //         Pop the last/tail block off the snek
    let[e,i]=h.at(-1);                                              //        Get the coordinate of the head of the snek
    r||e++,                                                         //        If snek is moving right, increment x
    1==r&&i++,                                                      //        If snek is moving down, increment y
    2==r&&e--,                                                      //        If snek is moving left, decrement x
    3==r&&i--,                                                      //        If snek is moving up, decrement y
    h.push([e,i]),                                                  //        Push the new block onto the front of the snek
    f=1,                                                            //         Toggle the flag to indicate that snek has moved
    c.clearRect(0,0,a.width,a.height),                              //        Clear the canvas
    c.fillStyle="#40ff76",                                          //        Set the fill color to green
    c.fillRect(0,0,a.width,a.height),                               //        Paint the canvas green, for grass, I guess
    g(...l,"red"),                                                  //        Draw the cherry
    h.forEach(t=>g(...t))                                           //        Draw each block of the snek
},                                                                  // End of function
w=t=>{                                                              // Function to check for collision
    var[e,i]=h.at(-1);                                              //         Get the head block of snek
    if(e*d>a.width||i*d>a.height||e<0||i<0)return 1;                //         If the head is out of bounds of the canvas, we're out of bounds
    if(1<s(e,i).length)return 1;                                    //        If the head has run into another part of the snek, out of bounds
    if(e===l[0]&&i===l[1]){                                         //         If the head is on the cherry...
        o++,                                                        //            Increment the score
        y(),                                                        //             Reposition the cherry
        n*=.8;                                                      //            Increase the speed (reduce the delay) by 20%
        let[t,e]=h[0];                                              //             Make a copy of the last/tail block of the snek
        0===r&&t--,                                                 //             If snek is moving right, increment x
        1===r&&e--,                                                 //            If snek is moving down, increment y
        2===r&&t++,                                                 //            If snek is moving left, decrement x
        3===r&&e++,                                                 //            If snek is moving up, decrement y
        h.unshift([t,e])                                            //             Add the new block to the end of snek
    }                                                               //        End of if
},                                                                  // End of function
S=t=>{                                                              // Function to draw a frame of the game
    l||y(),                                                         //         If there's no cherry, add one
    u(),                                                            //         Move the nek and render it
    w()?                                                            //         Check for collision
        (c.fillStyle="#000",c.fillText("Score: "+o,50,50)):         //             If there's collision, render the score on canvas
        setTimeout(S,n)                                             //             If there's no collision, render next frame after appropriate delay
};                                                                  // End of function
c.font="48px serif";                                                // Set the font and font size of the canvas context
addEventListener("keydown",t=>{                                     // Create a keydown listener function
    f&&(                                                            //        If the snek has moved since the last direction change
        f=0,                                                        //             Reset the moved flag
        37===(t=t.keyCode)&&0!==r&&(r=2),                           //             Turn the snek left, if it's not going right
        39===t&&2!==r&&(r=0),                                       //            Turn the snek right, if it's not going left
        38===t&&1!==r&&(r=3),                                       //            Turn the snek up, if it's not going down
        40===t) &&3!==r&&(r=1)                                      //            Turn the snek down, if it's not going up
}),                                                                 // End of listener function
S();                                                                // Start the game
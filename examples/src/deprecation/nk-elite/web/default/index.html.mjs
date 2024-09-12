export default () => {
return  `
<html-template>
    <style>
        canvas {
            /*visibility: hidden;*/
        }
        progress {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            -webkit-appearance: none;
            appearance: none;
        }
        .control {
            display: flex;
            flex-direction: row;
            position: absolute;
            left: 0;
            bottom: 0;
            min-height: 128px;
            /*background: aquamarine;*/
            z-index: 33333333;
            width: 100%;
        }
        
        .control_center {
            /*background: aqua;*/
            position: relative;
            flex-grow: 1;
              display: flex;
            flex-direction: column;
            justify-content: center;
        }
        
        .control_left, .control_right {
            display: flex;
            flex-direction: column;
            /*gap: 4px;*/
            width: 12.4vw;
            /* background: aquamarine; */
            box-sizing: border-box;
            /*padding: 0 0 0 4px;*/
            border: 4px solid #bdbdbd;
        }
        
        .control_left_top {
            min-height: 4.2vw;
            /*background: aquamarine;*/
            width: 100%;
        }
        
        .control_left_center {
            position: relative;
            flex-grow: 1;
            /*background: salmon;*/
        }
        
        hr {
            border: 0.3vw solid #bdbdbd;
            width: auto;
            margin: 0;
        }
        
        .control_left_down {
            min-height: 1.6vw;
            /* background: aquamarine; */
            width: 100%;
        }
        
        .control_right_top {
            min-height: 6.5vw;
            /*background: aquamarine;*/
        }
        
        .control_right_down {
            flex-grow: 1;
        }
        
        .border-radar {
            position: absolute;
            bottom: 7px;
            left: 0;
            right: 0;
            margin: auto;
            border: 0.3vw solid red;
            height: 83%;
            border-radius: 51%;
            width: 92%;
            align-self: center;
            transform: translateY(3px) translateX(-2px) rotatex(33deg);
        }
        
        .radar {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            border: 0.3vw solid green;
            height: 52%;
            border-radius: 60%;
            width: 88%;
            align-self: center;
            transform: translateY(10px) translateX(-2px) rotatex(21deg);
            z-index: 10;
        }
        
        .radar.top {
            position: relative;
            background: black;
            overflow: hidden;
        }
        
        .radar.border {
            transform: translateY(26px);
            width: 75%;
            border: 1.2vw solid green;
            z-index: 5;
            background: rgba(155,203,186,0.81);
        }
        
        .item {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            gap: 2px;
            height: 2vh;
        }
        
        .text {
            font-size: 1.8vw;
            min-width: 2.7vw;
            line-height: 96%;
            color: #ad5200;
            margin-top: 0.3vh;
            box-sizing: border-box;
            padding-left: 0.3vw;
            text-align: center;
        }
        
        .item:first-child progress {
            margin-top: 0.4vh;
        }
       
        .progress, .progress_laser {
            position: relative;
            height: 1vh;
            width: 100%;
            margin-top: 0.2vh;
        }
        
        progress::-webkit-progress-bar {
            background-color: black; width: 100%;
        }
        
       progress::-webkit-progress-value {
            background-color: #ce9c00;
       }
    
        .progress::after {
            content: "";
            position: absolute;
            bottom: -0.7vh;
            left: -0.1vw;
            border-bottom: 4px solid green;
            width: 100%;
        }
        
        .rockets {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 100%;
            height: 100%;
            gap: 0.2vw;
            align-items: center;
        }
        
        .rocket {
            height: 1.3vw;
            width: 1.3vw;
            background: red;      
        }
        
        img {
            width: 100%;
        }
        
        .text.img {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 1.6vw;
        }
        
        .center_x, .center_x_top_1, .center_x_top_2, .center_x_top_3, .center_x_top_4, .center_x_bottom_1, .center_x_bottom_2, .center_x_bottom_3 {
            position: absolute;
            width: 100%;
            height: 0;
            border-bottom: 0.1vw dashed red;
            top: 0;
            bottom: 0;
            margin: auto;
        }
        
        .center_x_top_1 {
            top: -25%;
        }
        
        .center_x_top_2 {
            top: -50%;
        }
        
        .center_x_top_3 {
            top: -75%;
        }
        
        .center_x_top_4 {
            top: -89%;
        }
        
        .center_x_bottom_1 {
              top: 25%;
        } 
        
        .center_x_bottom_2 {
                top: 50%;
        } 
        
        .center_x_bottom_3 {
               top: 75%;
        }
        
        .center_y, .center_y_left_1, .center_y_left_2, .center_y_left_3, .center_y_right_1, .center_y_right_2, .center_y_right_3 {
            position: absolute;
            width: 0;
            height: 100%;
            border-left: 0.1vw solid red;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
        }
        
        .center_y_left_1 {
            left: -25%;
            transform: rotate(32deg);
            height: 120%;
        }
        
        .center_y_left_2 {
            left: -50%;
            transform: rotate(37deg);
            height: 131%;
        }
        
         .center_y_left_3 {
            left: -75%;
            transform: rotate(41deg);
            height: 122%;
        }
        
         .center_y_right_1 {
            left: 25%;
            transform: rotate(-32deg);
            height: 120%;
        }
        
        .center_y_right_2 {
            left: 50%;
            transform: rotate(-37deg);
            height: 131%;
        }
        
         .center_y_right_3 {
            left: 75%;
            transform: rotate(-41deg);
            height: 122%;
        }
        
        .center_left_45 {
            position: absolute;
            width: 0;
            height: 59%;
            border-left: 0.1vw solid red;
            top: -51%;
            bottom: 0;
            left: -13%;
            right: 0;
            margin: auto;
            transform: rotate(-45deg);
        }
        
        .center_right_45 {
            position: absolute;
            width: 0;
            height: 61%;
            border-left: 0.1vw solid red;
            top: 0;
            bottom: 51%;
            left: 0;
            right: -14%;
            margin: auto;
            transform: rotate(45deg)
        }
    </style>
    <slot name="nk-elite">
        <div class="game-newkind">
            <form class="game-newkind__form">
                <span><input type="checkbox" id="showGameConsole" checked>Show console</span>
                <span><input type="checkbox" id="showScreenName">Show greetings</span>
            </form>
            <button class="game-newkind__btn" id="showAndApply">Apply and Show</button>
            <canvas class="game-newkind__canvas" id="nk-elitecanvas" oncontextmenu="event.preventDefault()"></canvas>
            <div class="control">
                <div class="control_left">
                    <div class="control_left_top">
                        <div class="item">
                            <div class="text">FS</div>
                            <progress class="progress" max="100" value="70">70%</progress>
                        </div>
                        <div class="item">
                            <div class="text">AS</div>
                            <progress class="progress" max="100" value="70">70%</progress>
                        </div>
                    </div>
                    <hr>
                     <div class="control_left_center">
                        <div class="item">
                            <div class="text">FU</div>
                            <progress class="progress" max="100" value="70">70%</progress>
                        </div>
                        <div class="item">
                            <div class="text">CT</div>
                            <progress class="progress" max="100" value="70">70%</progress>
                        </div>
                             <div class="item">
                            <div class="text">LT</div>
                            <progress class="progress" max="100" value="70">70%</progress>
                        </div>
                        <div class="item">
                            <div class="text">AL</div>
                            <progress class="progress" max="100" value="70">70%</progress>
                        </div>
                    </div>
                    <hr>
                     <div class="control_left_down">
                        <div class="item">
                            <div class="text img">
                            <img class="image_rocket" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAGCAYAAADdXo4uAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAArElEQVQokZWRMQrCQBRE35q19gB2nsDeW4hg6zG8gGfwFIbgCSzEysLCSlJICCKmUhFhN+RbWJjdJGBeNwN/ZuCrOELMCwCMheEMhccpRPK37zaz3sJ86eboewLnzVfYov4wO8L18H9Rdql6KpwgUiqwBSA/HWgIFEjDiDp6A+iPXE/7Ad2OdyUgQiueCcQ3r6gs8gKmUfVHqzGtqvYpLHZujrO/7fImHqbqfQAfpDbMQIr8MAAAAABJRU5ErkJggg=="/>
                            </div>
                            <div class="rockets">
                                <div class="rocket"></div>
                                <div class="rocket"></div>
                                <div class="rocket"></div>
                                <div class="rocket"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="control_center">
                        <div class="radar top">
                            <div class="center_left_45"></div>
                            <div class="center_right_45"></div>
                            <div class="center_x_top_4"></div>
                            <div class="center_x_top_3"></div>
                            <div class="center_x_top_2"></div>
                            <div class="center_x_top_1"></div>
                            <div class="center_x"></div>
                            <div class="center_x_bottom_1"></div>
                            <div class="center_x_bottom_2"></div>
                            <div class="center_x_bottom_3"></div>
                            <div class="center_y_left_3"></div>
                            <div class="center_y_left_2"></div>
                            <div class="center_y_left_1"></div>
                            <div class="center_y"></div>
                            <div class="center_y_right_1"></div>
                            <div class="center_y_right_2"></div>
                            <div class="center_y_right_3"></div>
                        </div>
                        <div class="border radar">
                            
                        </div>
                </div>
                <div class="control_right">
                   <div class="control_right_top">
                        <div class="item">
                            <progress class="progress" max="100" value="70">70%</progress>
                            <div class="text">SP</div>
                        </div>
                        <div class="item">
                            <progress class="progress" max="100" value="70">70%</progress>
                            <div class="text">RL</div>
                        </div>
                        <div class="item">
                            <progress class="progress" max="100" value="70">70%</progress>
                            <div class="text">DC</div>
                        </div>
                    </div>
                      <hr>
                     <div class="control_right_down">
                        <div class="item">
                            <progress class="progress_laser" max="100" value="70">70%</progress>
                            <div class="text">1</div>
                        </div>
                        <hr>
                        <div class="item">
                            <progress class="progress_laser" max="100" value="70">70%</progress>
                            <div class="text">2</div>
                        </div>
                        <hr>
                         <div class="item">
                            <progress class="progress_laser" max="100" value="70">70%</progress>
                            <div class="text">3</div>
                        </div>
                        <hr>
                        <div class="item">
                            <progress class="progress_laser" max="100" value="70">70%</progress>
                            <div class="text">4</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </slot>
</html-template>

`
}


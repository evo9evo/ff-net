!function t(e,n,a){function r(s,o){if(!n[s]){if(!e[s]){var l="function"==typeof require&&require;if(!o&&l)return l(s,!0);if(i)return i(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var d=n[s]={exports:{}};e[s][0].call(d.exports,function(t){var n=e[s][1][t];return r(n?n:t)},d,d.exports,t,e,n,a)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<a.length;s++)r(a[s]);return r}({1:[function(t,e,n){var a=function(t,e,n,a){null==a&&(a=1),this.r=t,this.g=e,this.b=n,this.a=a};a.WHITE=new a(1,1,1),a.BLACK=new a(0,0,0),a.RED=new a(226/255,86/255,86/255),a.BLUE=new a(135/255,173/255,236/255),a.LIGHT_BLUE=new a(186/255,224/255,251/255),a.LIGHT_RED=new a(252/255,163/255,163/255);var r=a.prototype;r.blend=function(t,e){if(Math.abs(e)>1)throw"t must be a number between -1 and 1";var n,r;return e>=0?(n=this,r=t):(n=t,r=this),new a(n.r*(1-e)+r.r*e,n.g*(1-e)+r.g*e,n.b*(1-e)+r.b*e)},r.toString=function(){return"rgba("+Math.floor(255*this.r)+", "+Math.floor(255*this.g)+", "+Math.floor(255*this.b)+", "+this.a+")"},e.exports=a},{}],2:[function(t,e,n){var a=t("./math"),r=t("./ErrorPlot"),i=function(t,e){var n=this.domElement=document.createElement("div");n.className="control-panel",this.rows=[],this.rowsByLabel={};var a;a=this.addRow("full");var i=document.createElement("div");i.innerHTML="randomize network parameters",i.className="btn",a.cells[0].appendChild(i),i.addEventListener("click",function(){t.randomizeParameters()}),a=this.addRow("slider","learning rate"),a.control.min=1,a.control.max=80,a.control.value=Math.round(100*e.learningRate),a.control.addEventListener("change",function(){e.learningRate=this.value/100}.bind(a.control)),a=this.addRow("slider","regularization"),a.control.min=0,a.control.max=100,a.control.value=Math.round(1e6*e.regularization),a.control.addEventListener("change",function(){e.regularization=this.value/1e6}.bind(a.control)),a=this.addRow("text","error"),a.control.className="formatted-number",a=this.addRow("full");var s=this.errorPlot=new r;a.cells[0].appendChild(s.domElement)},s=i.prototype;s.addCell=function(t){return cell=document.createElement("div"),cell.className="control-cell",t.appendChild(cell),t.cells.push(cell),cell},s.addRow=function(t,e){var n=document.createElement("div");n.cells=[],n.className="control-row",this.domElement.appendChild(n),this.rows.push(n),this.rowsByLabel[e]=n;var a;if("full"==t)a=document.createElement("div"),a.className="control-cell-full",n.appendChild(a),n.cells.push(a);else{a=this.addCell(n),a.innerHTML=e,a=this.addCell(n);var r;switch(t){case"slider":r=document.createElement("input"),r.type="range";break;case"text":r=a}r!=a&&null!=r&&a.appendChild(r),n.control=r}return n},s.update=function(t){this.rowsByLabel.error.control.innerHTML=a.roundToString(t.totalError,10),this.errorPlot.update(t.dataError,t.regularizationError)},e.exports=i},{"./ErrorPlot":5,"./math":12}],3:[function(t,e,n){var a=t("./Color"),r=t("./DataPoint"),i=function(){this.dataPoints=[];var t=this.domElement=document.createElement("canvas");t.width=250,t.height=250,this.ctx=t.getContext("2d"),this.width=50,this.height=50,this.pixelColors=[];for(var e=0;e<this.width;e++){this.pixelColors.push([]);for(var n=0;n<this.height;n++)this.pixelColors[e].push(0)}this.setUpDragBehavior()},s=i.prototype;s.addDataPoint=function(t,e,n){this.dataPoints.push(new r(this,t,e,n))},s.redraw=function(t){for(var e=this.ctx,n=this.domElement,r=n.width,i=n.height,s=this.width,o=this.height,l=0;l<s;l++)for(var h=0;h<o;h++){var d=t(l/s,h/o),u=a.LIGHT_RED.blend(a.LIGHT_BLUE,d);this.pixelColors[l][h]=u}var c=r/s,g=i/o,v=e.getImageData(0,0,r,i);e.clearRect(0,0,r,i);for(var l=0;l<v.data.length/4;l++){var f=Math.floor(l/r),w=l%r,m=Math.floor(w/c),y=Math.floor(f/g),u=this.pixelColors[m][y];v.data[4*l]=Math.round(255*u.r),v.data[4*l+1]=Math.round(255*u.g),v.data[4*l+2]=Math.round(255*u.b),v.data[4*l+3]=255}e.putImageData(v,0,0);for(var l=0;l<this.dataPoints.length;l++){var b=this.dataPoints[l];b.redraw()}},s.computeCursor=function(t){var e,n,a=this.domElement.getBoundingClientRect();null==t.touches?(e=t.clientX,n=t.clientY):(e=t.touches[0].clientX,n=t.touches[0].clientY);var r=e-a.left,i=n-a.top,s={x:r,y:i};t.cursor=s},s.setUpDragBehavior=function(){var t=this.domElement;this.dragState=null,this.handleDragBegin=this.handleDragBegin.bind(this),t.addEventListener("touchstart",this.handleDragBegin),t.addEventListener("mousedown",this.handleDragBegin),this.handleDragProgress=this.handleDragProgress.bind(this),window.addEventListener("mousemove",this.handleDragProgress),window.addEventListener("touchmove",this.handleDragProgress),this.handleDragEnd=this.handleDragEnd.bind(this),window.addEventListener("mouseup",this.handleDragEnd),window.addEventListener("touchend",this.handleDragEnd),window.addEventListener("touchcancel",this.handleDragEnd)},s.handleDragBegin=function(t){this.computeCursor(t);for(var e=0;e<this.dataPoints.length;e++){var n=this.dataPoints[e],a=t.cursor.x-n.x*this.domElement.width,r=t.cursor.y-n.y*this.domElement.height,i=n.radius;if(a*a+r*r<=i*i){this.dragState={dataPoint:n,offset:{x:a,y:r}};break}}},s.handleDragProgress=function(t){if(null!=this.dragState){this.computeCursor(t),t.preventDefault();var e=this.dragState.dataPoint,n=this.dragState.offset;e.x=(t.cursor.x-n.x)/this.domElement.width,e.y=(t.cursor.y-n.y)/this.domElement.height,e.x<0?e.x=0:e.x>1&&(e.x=1),e.y<0?e.y=0:e.y>1&&(e.y=1)}},s.handleDragEnd=function(t){if(null!=this.dragState){this.dragState.dataPoint;this.dragState=null}},i.newFromData=function(t){for(var e=new i,n=0;n<t.length;n++){var a=t[n];e.addDataPoint(a.x,a.y,a.label)}return e},s.toData=function(){for(var t=[],e=0;e<this.dataPoints.length;e++){var n=this.dataPoints[e];t.push({x:n.x,y:n.y,label:n.label})}return t},e.exports=i},{"./Color":1,"./DataPoint":4}],4:[function(t,e,n){var a=t("./Color"),r=function(t,e,n,a){this.canvas=t,this.x=e,this.y=n,this.label=a,this.radius=5},i=r.prototype;i.redraw=function(){var t,e=this.canvas.ctx,n=this.canvas.domElement.width,r=this.canvas.domElement.height;t=0==this.label?a.RED:a.BLUE;var i=t.blend(a.BLACK,.6);e.beginPath(),e.fillStyle=t.toString(),e.strokeStyle=i.toString(),e.arc(this.x*n,this.y*r,this.radius,0,2*Math.PI),e.fill(),e.stroke()},e.exports=r},{"./Color":1}],5:[function(t,e,n){var a=4,r=function(){var t=this.domElement=document.createElement("canvas");t.id="error-canvas",this.ctx=t.getContext("2d"),this.maxDataLength=t.width,this.data=[],this.topError=a},i=r.prototype;i.getMaxTotalError=function(){for(var t=0,e=0;e<this.data.length;e++){var n=this.data[e],a=n.totalError;a>t&&(t=a)}return t},i.update=function(t,e){this.data.length==this.maxDataLength&&this.data.shift();var n=t+e;this.data.push({dataError:t,regularizationError:e,totalError:n});var r=this.getMaxTotalError();r>a?this.topError=r:this.topError=a,this.redraw()},i.redraw=function(){var t=this.ctx,e=this.domElement.width,n=this.domElement.height;t.clearRect(0,0,e,n);for(var a=1;a<this.data.length;a++){var r=this.data[a],i=r.totalError,s=a/(this.maxDataLength-1)*e,o=n*(1-i/this.topError);t.beginPath(),t.strokeStyle="rgb(255, 221, 78)",t.moveTo(s,n),t.lineTo(s,o),t.stroke()}},e.exports=r},{}],6:[function(t,e,n){var a=(t("./svg"),t("./Neuron")),r=function(t){this.neuralNet=t,this.neurons=[]},i=r.prototype;i.redraw=function(){for(var t=0;t<this.neurons.length;t++){var e=this.neurons[t];e.redraw()}},i.reset=function(){for(var t=0;t<this.neurons.length;t++){var e=this.neurons[t];e.reset()}},i.addNeuron=function(t){null==t&&(t=.5);var e=new a(this,t);return this.neurons.push(e),this.neuralNet.neurons.push(e),this.neuralNet.svgNeurons.appendChild(e.svgElement),e},i.getNeuronAt=function(t){return this.neurons[t]},i.getNeuronCount=function(){return this.neurons.length},i.getIndex=function(){return this.neuralNet.layers.indexOf(this)},r.newFromData=function(t,e){for(var n=t.addLayer(),r=0;r<e.neurons.length;r++){e.neurons[r];a.newFromData(n,e)}return n},i.toData=function(){var t={};t.neurons=[];for(var e=0;e<this.neurons.length;e++){var n=this.neurons[e];t.neurons.push(n.toData())}return t},e.exports=r},{"./Neuron":9,"./svg":13}],7:[function(t,e,n){var a=t("./svg"),r=t("./Color"),i=function(t,e,n,r){if(this.neuralNet=t,this.n0=e,this.nf=n,this.n0.layer.getIndex()+1!=this.nf.layer.getIndex())throw"Cannot connect neurons from non-consecutive layers";null==r?this.weight=1:this.weight=r,this.dWeight=0,this.svgElement=a.createElement("path"),this.redraw()},s=i.prototype;s.redraw=function(){var t=this.svgElement,e=this.n0.getPosition(),n=this.nf.getPosition();t.setAttribute("d","M"+e.x+" "+e.y+" L"+n.x+" "+n.y);var a=5,i=9*Math.min(1,Math.abs(this.weight)/a);t.setAttribute("stroke-width",i);var s;s=this.weight<0?r.RED:r.BLUE,t.setAttribute("stroke-opacity",.4),t.setAttribute("stroke",s)},s.backward=function(t){var e=0;return this.dWeight=this.n0.activation*this.nf.dPreActivation,this.dWeight+=t*this.weight,e+=.5*t*this.weight*this.weight},s.applyGradient=function(t){this.weight-=t*this.dWeight},i.newFromData=function(t,e){var n=e.weight,a=t.layers[e.n0[0]].neurons[e.n0[1]],r=t.layers[e.nf[0]].neurons[e.nf[1]],i=t.addLink(a,r,n);return i},s.toData=function(){var t={};return t.n0=[this.n0.layer.getIndex(),this.n0.getIndex()],t.nf=[this.nf.layer.getIndex(),this.nf.getIndex()],t.weight=this.weight,t},e.exports=i},{"./Color":1,"./svg":13}],8:[function(t,e,n){var a=t("./svg"),r=(t("./Neuron"),t("./Link")),i=t("./Layer"),s=function(){this.neurons=[],this.links=[],this.layers=[],this.svgElement=a.createElement("g"),this.svgLinks=a.createElement("g"),this.svgElement.appendChild(this.svgLinks),this.svgNeurons=a.createElement("g"),this.svgElement.appendChild(this.svgNeurons)},o=s.prototype;o.addLayer=function(t){null==t&&(t=0);var e=new i(this);this.layers.push(e);for(var n=0;n<t;n++){e.addNeuron()}return e},o.addFullyConnectedLayer=function(t){var e=this.layers[this.layers.length-1];this.addLayer(t);for(var n=this.layers[this.layers.length-1],a=0;a<e.neurons.length;a++)for(var r=e.neurons[a],i=0;i<n.neurons.length;i++){var s=n.neurons[i];this.addLink(r,s)}},o.addLink=function(t,e,n){var a=new r(this,t,e,n);return t.links.push(a),e.backLinks.push(a),this.links.push(a),this.svgLinks.appendChild(a.svgElement),a},o.redraw=function(){for(var t=0;t<this.layers.length;t++){var e=this.layers[t];e.redraw()}for(var t=0;t<this.links.length;t++){var n=this.links[t];n.redraw()}},o.reset=function(t){for(var e=0;e<this.layers.length;e++){var n=this.layers[e];n.reset()}},o.randomizeParameters=function(){for(var t=0;t<this.links.length;t++){var e=this.links[t],n=2+4*Math.random();Math.random()<=.5&&(n*=-1),e.weight=n}for(var t=0;t<this.neurons.length;t++){var a=this.neurons[t],r=1+2*Math.random();Math.random()<=.5&&(r*=-1),a.bias=r}},o.forward=function(t){for(var e=1;e<this.layers.length;e++)for(var n=this.layers[e],a=0;a<n.neurons.length;a++){var r=n.neurons[a];r.forward()}},o.backward=function(t,e){regularizationError=0;for(var n=this.layers.length-1;n>=0;n--)for(var a=this.layers[n],r=0;r<a.neurons.length;r++){var i=a.neurons[r];regularizationError+=i.backward(e)}return this.applyGradient(t),regularizationError},o.applyGradient=function(t){for(var e=0;e<this.links.length;e++){var n=this.links[e];n.applyGradient(t)}for(var e=1;e<this.layers.length;e++)for(var a=this.layers[e],r=0;r<a.neurons.length;r++){var i=a.neurons[r];i.applyGradient(t)}},s.newFromData=function(t){for(var e=new s,n=0;n<t.layers.length;n++){var a=t.layers[n];i.newFromData(e,a)}for(var n=0;n<t.links.length;n++){var o=t.links[n];r.newFromData(e,o)}return e},o.toData=function(){var t={};t.layers=[];for(var e=0;e<this.layers.length;e++){var n=this.layers[e];t.layers.push(n.toData())}t.links=[];for(var e=0;e<this.links.length;e++){var a=this.links[e];t.links.push(a.toData())}return t},e.exports=s},{"./Layer":6,"./Link":7,"./Neuron":9,"./svg":13}],9:[function(t,e,n){var a=t("./svg"),r=t("./math"),i=t("./Color"),s=12,o=2,l=function(t,e){this.layer=t,this.links=[],this.backLinks=[],this.bias=e,this.preActivation=0,this.activation=r.sigmoid(this.bias),this.dActivation=0,this.dPreActivation=0,this.dBias=0,this.isInput=!1,this.isOutput=!1;var n=this.svgElement=a.createElement("circle");n.setAttribute("r",s)},h=l.prototype;h.redraw=function(){var t=this.svgElement,e=this.getPosition();t.setAttribute("cx",e.x),t.setAttribute("cy",e.y);var n,a=3,r=this.bias;r<-a?r=-a:r>a&&(r=a),n=.5*(r/a+1);var s=i.RED.blend(i.BLUE,n),l=s.blend(i.BLACK,.3);t.setAttribute("fill",s.toString()),t.setAttribute("stroke",l.toString()),t.setAttribute("stroke-width",o)},h.getIndex=function(){return this.layer.neurons.indexOf(this)},h.getPosition=function(){var t=this.layer.neuralNet,e=this.layer.neurons.length,n=t.layers.length,a=5,r=t.svgElement.parentNode;if(null==r)return{x:0,y:0};var i,l=r.getBoundingClientRect(),h=l.width,d=l.height,u=d/2,c=h/2,g=(h-2*(s+o))/(n-1),v=(d-2*(s+o))/(a-1),f=c+(this.layer.getIndex()-(n-1)/2)*g;return i=0==e?u:u+(this.getIndex()-(e-1)/2)*v,{x:f,y:i}},h.forward=function(){this.preActivation=0,this.preActivation+=this.bias;for(var t=0;t<this.backLinks.length;t++){var e=this.backLinks[t];this.preActivation+=e.weight*e.n0.activation}this.activation=r.sigmoid(this.preActivation)},h.backward=function(t){for(var e=0,n=0;n<this.links.length;n++){var a=this.links[n];this.dActivation+=a.weight*a.dWeight}this.dPreActivation=this.dActivation*r.dSigmoid(this.preActivation),this.dBias=this.dPreActivation;for(var n=0;n<this.backLinks.length;n++){var a=this.backLinks[n];e+=a.backward(t)}return e},h.applyGradient=function(t){this.bias-=t*this.dBias},h.reset=function(){this.preActivation=0,this.activation=r.sigmoid(this.bias),this.dActivation=0,this.dPreActivation=0,this.dBias=0},l.newFromData=function(t,e){t.addNeuron(e.bias)},h.toData=function(){var t={};return t.bias=this.bias,t},e.exports=l},{"./Color":1,"./math":12,"./svg":13}],10:[function(t,e,n){e.exports={dataPoints:[{x:.08,y:.24,label:1},{x:.2,y:.27,label:1},{x:.05,y:.3,label:1},{x:.1,y:.1,label:1},{x:.4,y:.4,label:0},{x:.6,y:.4,label:0},{x:.65,y:.7,label:0},{x:.7,y:.3,label:0},{x:.35,y:.65,label:0},{x:.3,y:.5,label:0},{x:.7,y:.5,label:0},{x:.75,y:.55,label:0},{x:.7,y:.6,label:0},{x:.65,y:.34,label:0},{x:.8,y:.65,label:0},{x:.5,y:.7,label:0},{x:.5,y:.66,label:0},{x:.56,y:.66,label:0},{x:.46,y:.36,label:0},{x:.46,y:.26,label:0},{x:.36,y:.26,label:0},{x:.26,y:.36,label:0},{x:.56,y:.28,label:0},{x:.33,y:.54,label:0},{x:.23,y:.52,label:0},{x:.26,y:.16,label:1},{x:.06,y:.46,label:1},{x:.13,y:.66,label:1},{x:.2,y:.8,label:1},{x:.5,y:.5,label:1},{x:.45,y:.5,label:1},{x:.5,y:.45,label:1},{x:.45,y:.45,label:1},{x:.55,y:.55,label:1},{x:.5,y:.55,label:1},{x:.5,y:.2,label:1},{x:.4,y:.1,label:1},{x:.6,y:.1,label:1},{x:.75,y:.15,label:1},{x:.88,y:.22,label:1},{x:.9,y:.35,label:1},{x:.9,y:.49,label:1},{x:.88,y:.62,label:1},{x:.9,y:.9,label:1},{x:.9,y:.8,label:1},{x:.75,y:.85,label:1},{x:.55,y:.92,label:1},{x:.6,y:.95,label:1},{x:.06,y:.57,label:1},{x:.09,y:.8,label:1},{x:.4,y:.9,label:1}],neuralNet:{layers:[{neurons:[{bias:.5},{bias:.5}]},{neurons:[{bias:.5},{bias:.5},{bias:.5},{bias:.5},{bias:.5}]},{neurons:[{bias:.5},{bias:.5},{bias:.5},{bias:.5},{bias:.5}]},{neurons:[{bias:.5},{bias:.5}]},{neurons:[{bias:.5}]}],links:[{n0:[0,0],nf:[1,0],weight:2.2559318523672673},{n0:[0,0],nf:[1,1],weight:3.7705902078344162},{n0:[0,0],nf:[1,2],weight:-5.673868837964195},{n0:[0,0],nf:[1,3],weight:-2.552116396138559},{n0:[0,0],nf:[1,4],weight:-4.765897189158554},{n0:[0,1],nf:[1,0],weight:2.522847383501193},{n0:[0,1],nf:[1,1],weight:-2.9902303588384505},{n0:[0,1],nf:[1,2],weight:2.749623598598969},{n0:[0,1],nf:[1,3],weight:-2.0657459601688077},{n0:[0,1],nf:[1,4],weight:2.311040191441733},{n0:[1,0],nf:[2,0],weight:-2.8083933750840506},{n0:[1,0],nf:[2,1],weight:2.368208438212055},{n0:[1,0],nf:[2,2],weight:2.792010178964303},{n0:[1,0],nf:[2,3],weight:2.1204797088106764},{n0:[1,0],nf:[2,4],weight:3.0855603411983634},{n0:[1,1],nf:[2,0],weight:-2.1619760012233913},{n0:[1,1],nf:[2,1],weight:2.7735676578848043},{n0:[1,1],nf:[2,2],weight:-4.795321974592097},{n0:[1,1],nf:[2,3],weight:-3.1618858651724424},{n0:[1,1],nf:[2,4],weight:2.642537468325151},{n0:[1,2],nf:[2,0],weight:5.111269168104936},{n0:[1,2],nf:[2,1],weight:1.8060793114773712},{n0:[1,2],nf:[2,2],weight:1.2874475479043777},{n0:[1,2],nf:[2,3],weight:3.715659708889894},{n0:[1,2],nf:[2,4],weight:-5.479057778095251},{n0:[1,3],nf:[2,0],weight:4.279970838297447},{n0:[1,3],nf:[2,1],weight:-3.8573191202934085},{n0:[1,3],nf:[2,2],weight:-4.346636276004062},{n0:[1,3],nf:[2,3],weight:1.8026421918582567},{n0:[1,3],nf:[2,4],weight:3.9687935202147346},{n0:[1,4],nf:[2,0],weight:-3.5216391228147197},{n0:[1,4],nf:[2,1],weight:4.599458665307638},{n0:[1,4],nf:[2,2],weight:-4.752572287153145},{n0:[1,4],nf:[2,3],weight:-3.810827524569661},{n0:[1,4],nf:[2,4],weight:3.0650028924296953},{n0:[2,0],nf:[3,0],weight:-4.300364295192499},{n0:[2,0],nf:[3,1],weight:-2.9036061692080217},{n0:[2,1],nf:[3,0],weight:4.132576329093505},{n0:[2,1],nf:[3,1],weight:-3.817976850598705},{n0:[2,2],nf:[3,0],weight:4.606542085589321},{n0:[2,2],nf:[3,1],weight:2.8220313920923323},{n0:[2,3],nf:[3,0],weight:2.3423002019828885},{n0:[2,3],nf:[3,1],weight:2.098573708791525},{n0:[2,4],nf:[3,0],weight:4.4760505444141625},{n0:[2,4],nf:[3,1],weight:3.95752484391276},{n0:[3,0],nf:[4,0],weight:-.7265226578414495},{n0:[3,1],nf:[4,0],weight:-4.316679309853457}]}}},{}],11:[function(t,e,n){function a(){var e=t("./data");controllableParameters={learningRate:.2,regularization:9e-6};var n=document.createElement("div");n.className="content-container",document.body.appendChild(n);var a;a=document.createElement("div"),n.appendChild(a),a.className="content-container-row";var i=h.createElement("svg");i.className="content-container-cell",i.id="neural-net",a.appendChild(i),neuralNet=s.newFromData(e.neuralNet),i.appendChild(neuralNet.svgElement),dataCanvas=o.newFromData(e.dataPoints),dataCanvas.domElement.className+=" content-container-cell",dataCanvas.domElement.id="data-canvas",a.appendChild(dataCanvas.domElement),a=document.createElement("div"),n.appendChild(a),a.className="content-container-row",controlPanel=new l(neuralNet,controllableParameters),controlPanel.domElement.className+=" content-container-cell",a.appendChild(controlPanel.domElement),r()}function r(){for(var t=0;t<10;t++)for(var e,n=0,a=0;a<dataCanvas.dataPoints.length;a++){neuralNet.reset();var i=dataCanvas.dataPoints[a];neuralNet.layers[0].neurons[0].activation=i.x,neuralNet.layers[0].neurons[1].activation=i.y,neuralNet.forward();var s=neuralNet.layers[neuralNet.layers.length-1].neurons[0],o=s.activation,l=i.label-o;n+=.5*l*l,s.dActivation=-l,e=neuralNet.backward(controllableParameters.learningRate,controllableParameters.regularization)}neuralNet.redraw(),dataCanvas.redraw(function(t,e){return neuralNet.layers[0].neurons[0].activation=t,neuralNet.layers[0].neurons[1].activation=e,neuralNet.forward(),neuralNet.layers[neuralNet.layers.length-1].neurons[0].activation}),controlPanel.update({totalError:n+e,dataError:n,regularizationError:e}),requestAnimationFrame(r)}function i(){return{dataPoints:dataCanvas.toData(),neuralNet:neuralNet.toData()}}var s=t("./NeuralNet"),o=t("./DataCanvas"),l=t("./ControlPanel"),h=t("./svg");window.neuralNet,window.dataCanvas,window.controllableParameters,window.controlPanel,window.getData=i,a()},{"./ControlPanel":2,"./DataCanvas":3,"./NeuralNet":8,"./data":10,"./svg":13}],12:[function(t,e,n){var a={};a.roundToString=function(t,e){for(var n=1,a=0;a<e;a++)n*=10;var r=(Math.round(t*n)/n).toString();if(0==e)return r;var i=r.indexOf(".");i===-1&&(i=r.length,r+=".0");for(var a=r.length-i-1;a<e;a++)r+="0";return r},a.sigmoid=function(t){return 1/(1+Math.exp(-t))},a.dSigmoid=function(t){return a.sigmoid(t)*(1-a.sigmoid(t))},e.exports=a},{}],13:[function(t,e,n){var a={};a.createElement=function(t){return document.createElementNS("http://www.w3.org/2000/svg",t)},e.exports=a},{}]},{},[11]);
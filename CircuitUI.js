
var isDragging = false;
var focusElement = -1;
var selectedElement = -1;

function drawShortMap() {
  for (let i = 0; i < shortedLines.length; i++) {
    line(
      Nodes[shortedLines[i][0]][0],
      Nodes[shortedLines[i][0]][1],
      Nodes[shortedLines[i][1]][0],
      Nodes[shortedLines[i][1]][1]
    );
  }
}
function drawNodes() {
  focusNode = -1;

  for (let i = 0; i < Nodes.length; i++) {
    if (
      (mousePos.x - Nodes[i][0]) ** 2 + (mousePos.y - Nodes[i][1]) ** 2 <
      100
    ) {
      focusNode = i;
    } else circle(Nodes[i][0], Nodes[i][1], 5);
  }

  if (focusNode != -1) {
    circle(Nodes[focusNode][0], Nodes[focusNode][1], 10);
    Text(
      reducedNodes[focusNode],
      Nodes[focusNode][0] + 20,
      Nodes[focusNode][1]
    );
  }
  if (selectedNode != -1) {
    noFill();
    circle(Nodes[selectedNode][0], Nodes[selectedNode][1], 17);
    fill(255);
  }
}
function drawVoltageSource(n1, n2) {
  if(n1[0] == n2[0] && n1[1] == n2[1]) return;
  let r = new p5.Vector();
  r.x = n2[0] - n1[0];
  r.y = n2[1] - n1[1];
  let R = r.mag();
  r.x /= R;
  r.y /= R;

  beginShape(LINES);
  vertex(n1[0], n1[1]);
  vertex(n1[0] + r.x * (R / 2 - 12.5), n1[1] + r.y * (R / 2 - 12.5));

  vertex(n1[0] + r.x * (R / 2 + 12.5), n1[1] + r.y * (R / 2 + 12.5));
  vertex(n2[0], n2[1]);
  endShape();

  push();
  translate(n1[0] + (r.x * R) / 2, n1[1] + (r.y * R) / 2);
  noFill();
  circle(0, 0, 25);
  rotate(r.heading());
  
  beginShape(LINES);
  vertex(-7, -3);
  vertex(-7,  3);
  
  vertex(5, -3);
  vertex(5,  3);
  vertex(2, 0);
  vertex(8, 0);
  endShape();
  
  pop();
}
function drawCurrentSource(n1, n2) {
  if(n1[0] == n2[0] && n1[1] == n2[1]) return;
  let r = new p5.Vector();
  r.x = n2[0] - n1[0];
  r.y = n2[1] - n1[1];
  let R = r.mag();
  r.x /= R;
  r.y /= R;

  beginShape(LINES);
  vertex(n1[0], n1[1]);
  vertex(n1[0] + r.x * (R / 2 - 12.5), n1[1] + r.y * (R / 2 - 12.5));

  vertex(n1[0] + r.x * (R / 2 + 12.5), n1[1] + r.y * (R / 2 + 12.5));
  vertex(n2[0], n2[1]);
  endShape();

  push();
  translate(n1[0] + (r.x * R) / 2, n1[1] + (r.y * R) / 2);
  noFill();
  circle(0, 0, 25);
  rotate(r.heading());
  
  beginShape(LINES);
  vertex(-8, 0);
  vertex( 8, 0);
  
  vertex(8, 0);
  vertex(5, 3);
  vertex(8,  0);
  vertex(5, -3);
  endShape();
  
  pop();
}
function drawResistor(n1, n2) {
  if(n1[0] == n2[0] && n1[1] == n2[1]) return;
  let r = new p5.Vector();
  r.x = n2[0] - n1[0];
  r.y = n2[1] - n1[1];
  let R = r.mag();
  r.x /= R;
  r.y /= R;

  if (R >= 48) {
    beginShape(LINES);
    vertex(n1[0], n1[1]);
    vertex(n1[0] + r.x * (R / 2 - 24), n1[1] + r.y * (R / 2 - 24));

    vertex(n1[0] + r.x * (R / 2 + 24), n1[1] + r.y * (R / 2 + 24));
    vertex(n2[0], n2[1]);
    endShape();
  }

  push();
  translate(n1[0] + (r.x * R) / 2, n1[1] + (r.y * R) / 2);
  rotate(r.heading());
  if (R < 48) {
    scale(R / 48);
  }
  beginShape(LINES);
  vertex(-24, 0);
  vertex(-21, 3);

  vertex(-21, 3);
  vertex(-15, -3);

  vertex(-15, -3);
  vertex(-9, 3);

  vertex(-9, 3);
  vertex(-3, -3);

  vertex(-3, -3);
  vertex(3, 3);

  vertex(3, 3);
  vertex(9, -3);

  vertex(9, -3);
  vertex(15, 3);

  vertex(15, 3);
  vertex(21, -3);

  vertex(21, -3);
  vertex(24, 0);

  endShape();
  pop();
}
function drawGround(n) {
  push();
  strokeWeight(1);

  beginShape(LINES);
  vertex(n[0], n[1]);
  vertex(n[0], n[1] - 15);

  vertex(n[0] - 12, n[1] - 15);
  vertex(n[0] + 12, n[1] - 15);

  vertex(n[0] - 8, n[1] - 20);
  vertex(n[0] + 8, n[1] - 20);

  vertex(n[0] - 4, n[1] - 25);
  vertex(n[0] + 4, n[1] - 25);
  endShape();
  pop();
}

function drawDependentVoltageSource(n1, n2) {
  if(n1[0] == n2[0] && n1[1] == n2[1]) return;
  let r = new p5.Vector();
  r.x = n2[0] - n1[0];
  r.y = n2[1] - n1[1];
  let R = r.mag();
  r.x /= R;
  r.y /= R;

  beginShape(LINES);
  vertex(n1[0], n1[1]);
  vertex(n1[0] + r.x * (R / 2 - 12.5), n1[1] + r.y * (R / 2 - 12.5));

  vertex(n1[0] + r.x * (R / 2 + 12.5), n1[1] + r.y * (R / 2 + 12.5));
  vertex(n2[0], n2[1]);
  endShape();

  push();
  translate(n1[0] + (r.x * R) / 2, n1[1] + (r.y * R) / 2);
  noFill();
  rotate(r.heading());
  
  beginShape(LINES);
  
  vertex(-12.5, 0);
  vertex( 0, 12.5);
  
  vertex(12.5, 0);
  vertex(0, 12.5);
  
  vertex(-12.5, 0);
  vertex( 0, -12.5);
  
  vertex(12.5, 0);
  vertex(0, -12.5);
  
  vertex(-7, -3);
  vertex(-7,  3);
  
  vertex(5, -3);
  vertex(5,  3);
  vertex(2, 0);
  vertex(8, 0);
  endShape();
  
  pop();
}
function drawDependentCurrentSource(n1, n2) {
  if(n1[0] == n2[0] && n1[1] == n2[1]) return;
  let r = new p5.Vector();
  r.x = n2[0] - n1[0];
  r.y = n2[1] - n1[1];
  let R = r.mag();
  r.x /= R;
  r.y /= R;

  beginShape(LINES);
  vertex(n1[0], n1[1]);
  vertex(n1[0] + r.x * (R / 2 - 12.5), n1[1] + r.y * (R / 2 - 12.5));

  vertex(n1[0] + r.x * (R / 2 + 12.5), n1[1] + r.y * (R / 2 + 12.5));
  vertex(n2[0], n2[1]);
  endShape();

  push();
  translate(n1[0] + (r.x * R) / 2, n1[1] + (r.y * R) / 2);
  noFill();
  rotate(r.heading());
  
  beginShape(LINES);
  vertex(-12.5, 0);
  vertex( 0, 12.5);
  
  vertex(12.5, 0);
  vertex(0, 12.5);
  
  vertex(-12.5, 0);
  vertex( 0, -12.5);
  
  vertex(12.5, 0);
  vertex(0, -12.5);
  
  vertex(-8, 0);
  vertex( 8, 0);
  
  vertex(8, 0);
  vertex(5, 3);
  vertex(8,  0);
  vertex(5, -3);
  endShape();
  
  pop();
}

function drawElements() {
  if (Nodes.length > 0) drawGround(Nodes[0]);
  for (let i = 0; i < branches.length; i++) {
    n = [0, 0];
    
    n[0] = (Nodes[branches[i][1]][0] + Nodes[branches[i][2]][0])/2;
    n[1] = (Nodes[branches[i][1]][1] + Nodes[branches[i][2]][1])/2;
    
    if (branches[i][0] == "V") {
      drawVoltageSource(Nodes[branches[i][1]], Nodes[branches[i][2]]);
      if(focusElement == i || selectedElement == i) Text(branches[i][3] + ' V', n[0] - 20, n[1] + 20);
    } 
    else if (branches[i][0] == "R"){
      drawResistor(Nodes[branches[i][1]], Nodes[branches[i][2]]);
      if(focusElement == i || selectedElement == i) Text(branches[i][3] + ' Ω', n[0] - 20, n[1] + 20);
    }
    else if(branches[i][0] == 'I'){
      drawCurrentSource(Nodes[branches[i][1]], Nodes[branches[i][2]]);
      if(focusElement == i || selectedElement == i) Text(branches[i][3] + ' A', n[0] - 20, n[1] + 20);
    }
    else if(branches[i][0] == 'DV'){
      drawDependentVoltageSource(Nodes[branches[i][1]], Nodes[branches[i][2]]);
      if(focusElement == i || selectedElement == i) Text(branches[i][3], n[0] - 20, n[1] + 20);
    }
    else if(branches[i][0] == 'DC'){
      drawDependentCurrentSource(Nodes[branches[i][1]], Nodes[branches[i][2]]);
      if(focusElement == i || selectedElement == i) Text(branches[i][3], n[0] - 20, n[1] + 20);
    }
    
    if(focusElement == i || selectedElement == i){
      Text(i+1, n[0] + 8*(branches[i][3]).toString().length + 10, n[1] + 20);
    }
  }
  
  if(isDragging && selectedNode != -1){
    if(tool == 'N'){
      line(Nodes[selectedNode][0], Nodes[selectedNode][1], 
           mousePos.x, mousePos.y);
    }
    else if(tool == 'R'){
      drawResistor(Nodes[selectedNode], [mousePos.x, mousePos.y]);
    }
    else if(tool == 'V'){
      drawVoltageSource(Nodes[selectedNode], [mousePos.x, mousePos.y]);
    }
    else if(tool == 'I'){
      drawCurrentSource(Nodes[selectedNode], [mousePos.x, mousePos.y]);
    }
    else if(tool == 'DV'){
      drawDependentVoltageSource(Nodes[selectedNode], [mousePos.x, mousePos.y]);
    }
    else if(tool == 'DC'){
      drawDependentCurrentSource(Nodes[selectedNode], [mousePos.x, mousePos.y]);
    }
  }
  
  
  if(isDragging && selectedNode == -1){
    if(focusNode != -1){
      selectedNode = focusNode;
    }
  }
}

function mouseInRectCanvas(x, y, a, b){
  p = mouseX - UI.size.x/2;
  q = mouseY;
  return (p > x && p < x+a) && (q < y+b && q > y);
}

function mouseInRect(x, y, a, b, t){
  p = (mousePos.x - x)*cos(t) + (mousePos.y - y)*sin(t); 
  q = -(mousePos.x - x)*sin(t) + (mousePos.y - y)*cos(t); 
  return (p < a/2 && p > -a/2) && (q < b/2 && q > -b/2);
}

function drawToolButtons() {
  focusTool = -1;
  push();
  translate(UI.size.x/2, 0);
  stroke(200, 255, 100);
  circle(-190, 37.5, 5);
  
  drawVoltageSource([-150, 50], [-150, 25]);
  drawCurrentSource([-110, 50], [-110, 25]);
  drawResistor([-80, 37.5], [-20, 37.5]);
  drawDependentVoltageSource([10, 50], [10, 25]);
  drawDependentCurrentSource([50, 50], [50, 25]);
  
  stroke(255);
  if(mouseInRectCanvas(-207.5, 20, 35, 35)){
    noFill();
    rect(-207.5, 20, 35, 35);
    focusTool = 'N';
  }
  else if(mouseInRectCanvas(-167.5, 20, 35, 35)){
    noFill();
    rect(-167.5, 20, 35, 35);
    focusTool = 'V';
  }
  else if(mouseInRectCanvas(-127.5, 20, 35, 35)){
    noFill();
    rect(-127.5, 20, 35, 35);
    focusTool = 'I';
  }
  else if(mouseInRectCanvas(-85, 20, 70, 35)){
    noFill();
    rect(-85, 20, 70, 35);
    focusTool = 'R';
  }
  else if(mouseInRectCanvas(-8, 20, 36, 35)){
    noFill();
    rect(-8, 20, 36, 35);
    focusTool = 'DV';
  }
  else if(mouseInRectCanvas(32, 20, 36, 35)){
    noFill();
    rect(32, 20, 36, 35);
    focusTool = 'DC';
  }
  stroke(200, 255, 100);
  noFill();
  strokeWeight(2);
  if(tool == 'N'){
    rect(-207.5, 20, 35, 35);
  }
  else if(tool == 'V'){
    rect(-167.5, 20, 35, 35);
  }
  else if(tool == 'I'){
    rect(-127.5, 20, 35, 35);
  }
  else if(tool == 'R'){
    rect(-85, 20, 70, 35);
  }
  else if(tool == 'DV'){
    rect(-8, 20, 36, 35);
  }
  else if(tool == 'DC'){
    rect(32, 20, 36, 35);
  }
  
  
  if((mouseX - 200 - UI.size.x/2)**2 + (mouseY - 37.5)**2 < 400){
    Color = [255, 255, 255];
    focusTool = 'Solve';
  } else Color = [200, 255, 100];
  
  stroke(Color[0], Color[1], Color[2]);
  translate(200, 37.5);
  circle(0, 0, 40);
  fill(Color[0], Color[1], Color[2]);
  beginShape(TRIANGLES);
  if(tool == 'Solve'){
    vertex(-6, -8);
    vertex(-6,  8);
    vertex(10, 0);
  }
  else {
    vertex(-8, -10);
    vertex(-8,  10);
    vertex(12, 0);
  }
  endShape();
  
  pop();
}

function drawSelectedElements() {
  focusElement = -1;
  for(let i = 0; i<branches.length; i++){
    n = [0, 0];
    n[0] = (Nodes[branches[i][1]][0] + Nodes[branches[i][2]][0])/2;
    n[1] = (Nodes[branches[i][1]][1] + Nodes[branches[i][2]][1])/2;
    r = new p5.Vector(Nodes[branches[i][2]][0] - Nodes[branches[i][1]][0],
                      Nodes[branches[i][2]][1] - Nodes[branches[i][1]][1]);
    t = r.heading();
    
    if(branches[i][0] == 'V'){
      a = 50; b = 40;
    }
    else if(branches[i][0] == 'I'){
      a = 50; b = 40;
    }
    else if(branches[i][0] == 'R'){
      a = 70; b = 30;
    }
    else if(branches[i][0] == 'DV'){
      a = 50; b = 40;
    }
    else if(branches[i][0] == 'DC'){
      a = 50; b = 40;
    }
    
    
    if(mouseInRect(n[0], n[1], a, b, t)){
      push();
      translate(n[0], n[1]);
      rotate(t);
      noFill();
      rect(-a/2, -b/2, a, b);
      pop();
      focusElement = i;
      break;
    }
    
  }
  if(selectedElement != -1){
    i = selectedElement;
    n = [0, 0];
    n[0] = (Nodes[branches[i][1]][0] + Nodes[branches[i][2]][0])/2;
    n[1] = (Nodes[branches[i][1]][1] + Nodes[branches[i][2]][1])/2;
    r = new p5.Vector(Nodes[branches[i][2]][0] - Nodes[branches[i][1]][0],
                      Nodes[branches[i][2]][1] - Nodes[branches[i][1]][1]);
    t = r.heading();
    
    if(branches[i][0] == 'V'){
      a = 50; b = 40;
    }
    else if(branches[i][0] == 'I'){
      a = 50; b = 40;
    }
    else if(branches[i][0] == 'R'){
      a = 70; b = 30;
    }
    push();
      translate(n[0], n[1]);
      rotate(t);
      noFill();
      rect(-a/2, -b/2, a, b);
    pop();
  }
}

function drawPropertyWindow(branch) {
  push();
  fill(UI.bg_color);
  stroke(255);
  translate(UI.size.x/2, UI.size.y/2);
  rect(-200, -100, 400, 200, 10);
  pop();
}

function drawCurrents() {
  if(Ie == -1) return;
  if(Ie.n != branches.length) return;
  n = [0, 0]
  for(let i = 0; i<branches.length; i++){
    push();
    n[0] = (Nodes[branches[i][1]][0] + Nodes[branches[i][2]][0])/2;
    n[1] = (Nodes[branches[i][1]][1] + Nodes[branches[i][2]][1])/2; 
    r = new p5.Vector(Nodes[branches[i][2]][0] - Nodes[branches[i][1]][0],
                      Nodes[branches[i][2]][1] - Nodes[branches[i][1]][1])
    translate(n[0], n[1]);
    rotate(r.heading());
    N = -sqrt((Nodes[branches[i][2]][0] - Nodes[branches[i][1]][0])**2 + (Nodes[branches[i][2]][1] - Nodes[branches[i][1]][1])**2)/2;
    beginShape(LINES);
      vertex(N - N/6, 0);
      vertex(N - N/6 - 5, 4);
    
      vertex(N - N/6, 0);
      vertex(N - N/6 - 5, -4);
    endShape();
    translate(N - N/6 + 10, 10);
    rotate(-r.heading());
    Text(Ie.mat[i][0] + ' A', 0, 0);
    pop();
  }
  
}
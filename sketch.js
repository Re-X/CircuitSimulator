let X;
var mousePos;
let valueField = "0";

function setup() {
  UI.size.x = windowWidth;
  UI.size.y = windowHeight;
  UI.Setup();
}

function draw() {
  background(40);

  push();

  UI.Update();
  stroke(255);

  mousePos = UI.ScreenToCoordsXY(mouseX, mouseY);
  if (keyIsDown(CONTROL)) {
    UI.isStatic = false;
  } else UI.isStatic = true;

  drawShortMap();
  drawNodes();
  drawSelectedElements();
  drawElements();
  drawCurrents();

  pop();
  drawToolButtons();
}

function keyPressed() {
  if (selectedElement != -1) {
    if (keyCode >= 48 && keyCode <= 57) valueField += (keyCode - 48).toString();
    else if (keyCode == 190) {
      if (!valueField.includes(".")) valueField += ".";
    } 
    else if (keyCode == 8) {
      valueField = valueField.slice(0, valueField.length - 1);
      if(branches[selectedElement][0] == 'DV' || branches[selectedElement][0] == 'DC')
        valueField = '';
    }
    
    if(branches[selectedElement][0] != 'DV' && branches[selectedElement][0] != 'DC')
      branches[selectedElement][3] = Number(valueField);
    else {
      if ((keyCode == 73 || keyCode == 86) && !valueField.includes('*')) {
        valueField += "*"+String.fromCharCode(keyCode);
      }
      branches[selectedElement][3] = valueField.slice();
    }
  }
  if (keyCode == 17) {
    toolPrev = tool;
    tool = "Hand";
  }
  if (keyCode == 78) tool = "N";
  if (keyCode == 82) tool = "R";
  if (keyCode == 86) tool = "V";
  if (keyCode == 73) tool = "I";

  if (keyCode == 13) {
    if (selectedElement != -1) {
      selectedElement = -1;
    }
  }
}

function keyReleased() {
  if (keyCode == 17) {
    tool = toolPrev;
  }
}

function mousePressed() {
  if (!UI.isStatic) return;
  isDragging = true;

  if (focusTool != -1) {
    tool = focusTool;
    return;
  }
  if (focusElement != -1) {
    selectedElement = focusElement;
    valueField = branches[selectedElement][3].toString();
    return;
  }
  if (focusNode != -1) {
    selectedNode = focusNode;
  }

  if (selectedNode == -1) {
    if (focusNode == -1 && tool != "Hand") {
      Nodes.push([mousePos.x, mousePos.y]);
      reducedNodes.push(reducedNodes.length);
      shortMap.push([shortMap.length]);
    }
  }
}

function mouseReleased() {
  if (!UI.isStatic) return;
  isDragging = false;

  if (focusTool == "Solve") {
    selectedNode = -1;
    selectedElement = -1;
    genMatrices(branches);
    
    P = Imat.subtract(Ii).add(Ge.multiply(Vi));
    Q = Ge.subtract(Ge.multiply(Vv)).add(Iv);
    Pinv = P.inverse();
    Vn = Solve(
      A.multiply(Pinv).multiply(Q).multiply(A.transpose()),
      A.multiply(Pinv).multiply(Ge.multiply(Vs).subtract(Is))
    );
    Ve = A.transpose().multiply(Vn);
    Ie = Pinv.multiply(Q.multiply(Ve).subtract(Ge.multiply(Vs)).add(Is));
    Round(Ve);
    Round(Ie);
    Round(Vn);
    tool = "N";
    return;
  }

  if (selectedNode != -1) {
    if (focusNode == -1) {
      Nodes.push([mousePos.x, mousePos.y]);
      shortMap.push([shortMap.length]);

      if (tool != "N") {
        branches.push([tool.slice(), selectedNode, Nodes.length - 1, 10]);
        selectedElement = branches.length - 1;
        let K = 0;
        for (let i = 0; i < reducedNodes.length; i++) {
          if (reducedNodes[i] > K) K = reducedNodes[i];
        }
        reducedNodes.push(K + 1);
      } else {
        shortedLines.push([selectedNode, Nodes.length - 1]);
        reducedNodes.push(reducedNodes[selectedNode]);
        shortMap[shortMap.length - 1].push(selectedNode);
        shortMap[selectedNode].push(shortMap.length - 1);
      }
    } else if (selectedNode != focusNode) {
      if (tool == "N") {
        shortMap[focusNode].push(selectedNode);
        shortMap[selectedNode].push(focusNode);
        shortedLines.push([selectedNode, focusNode]);
        if (reducedNodes[selectedNode] < reducedNodes[focusNode]) {
          for (let i = 0; i < reducedNodes.length; i++) {
            if (i == focusNode) continue;
            if (reducedNodes[i] == reducedNodes[focusNode])
              reducedNodes[i] = reducedNodes[selectedNode];
          }
          for (let i = 0; i < reducedNodes.length; i++) {
            if (reducedNodes[i] > reducedNodes[focusNode]) reducedNodes[i] -= 1;
          }
          reducedNodes[focusNode] = reducedNodes[selectedNode];
        } else {
          for (let i = 0; i < reducedNodes.length; i++) {
            if (i == selectedNode) continue;
            if (reducedNodes[i] == reducedNodes[selectedNode])
              reducedNodes[i] = reducedNodes[focusNode];
          }
          for (let i = 0; i < reducedNodes.length; i++) {
            if (reducedNodes[i] > reducedNodes[selectedNode])
              reducedNodes[i] -= 1;
          }
          reducedNodes[selectedNode] = reducedNodes[focusNode];
        }
      } else {
        branches.push([tool.slice(), selectedNode, focusNode, 10]);
        selectedElement = branches.length - 1;
      }
    }
    if (selectedElement != -1) {
      valueField = "10";
    }
    selectedNode = -1;
  }
}

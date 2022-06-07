
var Nodes = [];
var reducedNodes = [];
var shortMap = [];
var shortedLines = [];
var focusNode = -1;
var selectedNode = -1;
var focusElement = -1;
var selectedElement = -1;
var tool = 'N';
var toolPrev = 'N';

/*
var branches = [['R', 0, 1, 10],
                ['R', 1, 2, 10],
                ['V', 2, 3, 30],
                ['R', 3, 0, 10]]; */

var branches = [];
var reducedBranches = [];

var Ge, Vs, Is, A, nodes = 0, Ie = -1, Ve, Vn, Imat;
var Vv, Vi, Iv, Ii; 
var idealConductance = 10000000000;



function genMatrices(branches){
  nodes = 0;
  reducedBranches = [];
  for(let i = 0; i<branches.length; i++){
    reducedBranches.push([branches[i][0], reducedNodes[branches[i][1]], 
                            reducedNodes[branches[i][2]], branches[i][3]]);
  }
  
  Vv = new Matrix(reducedBranches.length, reducedBranches.length);
  Vi = new Matrix(reducedBranches.length, reducedBranches.length);
  Iv = new Matrix(reducedBranches.length, reducedBranches.length);
  Ii = new Matrix(reducedBranches.length, reducedBranches.length);
  Ge = new Matrix(reducedBranches.length, reducedBranches.length);
  Imat = new Matrix(reducedBranches.length, reducedBranches.length);
  
  Vs = new Matrix(reducedBranches.length, 1);
  Is = new Matrix(reducedBranches.length, 1);
  
  for(let i = 0; i<reducedBranches.length; i++){
    if(reducedBranches[i][1] > nodes) nodes = reducedBranches[i][1];
    if(reducedBranches[i][2] > nodes) nodes = reducedBranches[i][2];
  }
  nodes++;
  
  A = new Matrix(nodes-1, reducedBranches.length);
  
  
  for(let i = 0; i<reducedBranches.length; i++){
    Imat.mat[i][i] = 1;
    if(reducedBranches[i][1] != 0){
      A.mat[reducedBranches[i][1] - 1][i] += 1;
    }
    if(reducedBranches[i][2] != 0){
      A.mat[reducedBranches[i][2] - 1][i] -= 1;
    }
    
    if(reducedBranches[i][0] == 'R'){
      if(reducedBranches[i][3] != 0)
        Ge.mat[i][i] = 1/reducedBranches[i][3];
      else
        Ge.mat[i][i] = idealConductance;
      continue;
    }
    else if(reducedBranches[i][0] == 'V'){
      Ge.mat[i][i] = idealConductance;
      Vs.mat[i][0] = -reducedBranches[i][3];
    }
    else if(reducedBranches[i][0] == 'I'){
      Ge.mat[i][i] = 0;
      Is.mat[i][0] = reducedBranches[i][3];
    }
    else if(reducedBranches[i][0] == 'DV') {
      Ge.mat[i][i] = idealConductance;
      a = 0;
      b = 0;
      let value = (reducedBranches[i][3]).toString();
      if(!value.includes('*')){
        Vs.mat[i][0] = -Number(value);
        continue;
      }
      for(let i = a; i<value.length; i++){
        if(value[i] == '*')
          b = i;
      }
      K = Number(value.slice(a, b));
      X = Number(value.slice(b+2, value.length));
      if(value[b+1] == 'V'){
        Vv.mat[i][X-1] = -K;
      }
      else if(value[b+1] == 'I'){
        Vi.mat[i][X-1] = -K;
      }
    }
    else if(reducedBranches[i][0] == 'DC') {
      a = 0;
      b = 0;
      value = reducedBranches[i][3];
      for(let i = a; i<value.length; i++){
        if(value[i] == '*')
          b = i;
      }
      K = Number(value.slice(a, b));
      X = Number(value.slice(b+2, value.length));
      if(value[b+1] == 'V'){
        Iv.mat[i][X-1] = K;
      }
      else if(value[b+1] == 'I'){
        Ii.mat[i][X-1] = K;
      }
    }
  }
}


class Matrix {
  constructor(n, m){
    this.n = n;
    this.m = m;
    this.mat = [];
    for(let i = 0; i<n; i++){
      this.mat.push([]);
      for(let j = 0; j<m; j++){
        this.mat[i].push(0);
      }
    }
  }
  
  print(){
    for(let i = 0; i<this.n; i++){
      print(this.mat[i]);
    }
  }
  
  add(M) {
    var X = new Matrix(this.n, this.m);
    for(let i = 0; i<this.n; i++){
      for(let j = 0; j<this.m; j++){
        X.mat[i][j] = this.mat[i][j] + M.mat[i][j];
      }
    }
    return X;
  }
  
  subtract(M) {
    var X = new Matrix(this.n, this.m);
    for(let i = 0; i<this.n; i++){
      for(let j = 0; j<this.m; j++){
        X.mat[i][j] = this.mat[i][j] - M.mat[i][j];
      }
    }
    return X;
  }
  
  multiply(M){
    var X = new Matrix(this.n, M.m);
    for(let i = 0; i<this.n; i++){
      for(let j = 0; j<M.m; j++){
        for(let k = 0; k<M.n; k++){
          X.mat[i][j] += this.mat[i][k]*M.mat[k][j];
        }
      }
    }
    return X;
  }
  
  transpose(){
    var X = new Matrix(this.m, this.n);
    for(let i = 0; i<this.n; i++){
      for(let j = 0; j<this.m; j++){
        X.mat[j][i] = this.mat[i][j];
      }
    }
    return X;
  }
  
  inverse(){
    var X = new Matrix(this.n, this.n);
    let v = new Matrix(this.n, 1);
    let x;
    for(let i = 0; i<this.n; i++){ 
      v.mat[i][0] = 1;
      x = Solve(this, v);
      for(let j = 0; j<this.n; j++){
        X.mat[j][i] = x.mat[j][0];
      }
      v.mat[i][0] = 0;
    }
    return X;
  }
}

function Solve(M, v){
  let A = new Matrix(M.n, M.m);
  var x = new Matrix(v.n, 1);
  
  for(let i = 0; i<v.n; i++){
    x.mat[i][0] = v.mat[i][0];
    for(let j = 0; j<M.m; j++){
      A.mat[i][j] = M.mat[i][j];
    }
  }
  
  let N = A.n;
	for(let i = 0; i<N; i++){
		if(A.mat[i][i] == 0)
			for(let j = i+1; j<N; j++)
				if(A.mat[j][i] != 0) {
					[A.mat[i], A.mat[j]] = [A.mat[i], A.mat[j]];
                    [x.mat[i], x.mat[j]] = [x.mat[j], x.mat[i]]; 
                    break;
				}
		for(let j = i+1; j<N; j++) A.mat[i][j] /= A.mat[i][i];
		x.mat[i][0] /= A.mat[i][i];
		A.mat[i][i] = 1;
		for(let j = i+1; j<N; j++){
			for(let k = i+1; k<N; k++){
				A.mat[j][k] -= A.mat[i][k]*A.mat[j][i];
			}
			x.mat[j][0] -= x.mat[i][0]*A.mat[j][i];
			A.mat[j][i] = 0;
		}
	}
	for(let i = N-1; i>=0; i--){
		for(let j = i-1; j>=0; j--){
			x.mat[j][0] -= x.mat[i][0]*A.mat[j][i];
		}
	}
    
	return x;
}

function Round(x){
  for(let i = 0; i<x.n; i++){
    for(let j = 0; j<x.m; j++)
      x.mat[i][j] = round(x.mat[i][j], 3);
  }
}
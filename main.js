function moves(arr) {
  let [x,y] = arr;

  let mv1 = [x + 1, y + 2];
  let mv2 = [x + 1, y - 2];
  let mv3 = [y + 2, x + 1];
  let mv4 = [y - 2, x + 1];
  let mv5 = [x - 1, y + 2];
  let mv6 = [x - 1, y - 2];
  let mv7 = [y + 2, x - 1];
  let mv8 = [y - 2, x - 1];

  let allMvs = [mv1, mv2, mv3, mv4, mv5, mv6, mv7, mv8];
  return allMvs.filter(innerArr => innerArr.every(elem => elem >= 0 && elem <= 7) == true);
  
}

let start = [1,1];
console.log(moves(start))
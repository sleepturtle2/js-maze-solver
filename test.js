function equal(a, b) {
    for (var i = 0; i < b.length; i++)
        a.push(b[i]);
}


let a = [1, 2, 3];
let b = [];
equal(b, a);

b.push(4);
console.log(a);
console.log(b);
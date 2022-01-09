let map = new Map(); 
let impinmap = function() { 

n=1;

   let obj = { 
       age:19, 
       name:"Vlad" 
   

    }


   let obj2 = {
       age:20,
       name:"petya"
   }


   map.set(obj); 
    map.set(obj2);
  // for (let obj of map.keys()) { 
    alert("AGE элемента "+n+"="+obj.age); 
    alert("NAME элемента "+n+"="+obj.name); 
n++;
    alert("AGE элемента "+map.size+"="+obj2.age); 
    alert("NAME элемента "+map.size+"="+obj2.name); 

 // } 
} 


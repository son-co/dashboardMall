var cookies = document.cookie.split(";");

console.log(cookies);

// Lặp qua từng cookie và xóa nó
for (var i = 0; i < cookies.length; i++) {
   var cookie = cookies[i];
   var eqPos = cookie.indexOf("=");

   var namee = eqPos > -1 ? cookie.slice(0, eqPos) : cookie;
   document.cookie = namee + "=; expires=2020-05-01T04:06:51.186Z; path=/";
   console.log(namee);
}

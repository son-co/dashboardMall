// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

import {
   getDatabase,
   ref,
   onValue,
   query,
   limitToLast,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
   apiKey: "AIzaSyC65FMF1JCgCFjIQ96JkDBBx9uSjG9OJKE",
   authDomain: "my-project-ad64c.firebaseapp.com",
   databaseURL: "https://my-project-ad64c-default-rtdb.firebaseio.com",
   projectId: "my-project-ad64c",
   storageBucket: "my-project-ad64c.appspot.com",
   messagingSenderId: "412293666454",
   appId: "1:412293666454:web:a3df6af903662e897394b7",
   measurementId: "G-PLV59X8N8J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

function formaterDate(s) {
   var parts = s.split(":");
   return (
      parts[3] +
      ":" +
      parts[4] +
      " " +
      parts[2] +
      "/" +
      parts[1] +
      "/" +
      parts[0]
   );
}

function formaterDateChart(s) {
   var parts = s.split(":");
   return (
      parts[0] +
      "-" +
      parts[1] +
      "-" +
      parts[2] +
      " " +
      parts[3] +
      ":" +
      parts[4]
   );
}

const dataRef = query(ref(database, "floor1/sensor"), limitToLast(30));
const dataRef2 = query(ref(database, "floor2/sensor"), limitToLast(30));
const dataRef3 = query(ref(database, "floor3/sensor"), limitToLast(30));

onValue(dataRef, (snapshot) => {
   let tableData = "";

   snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      if (childKey != "current" && childKey != "fan") {
         var parts = childKey.split(":");
         childKey = new Date(parts[0], parts[1], parts[2]);
         childKey = childKey.toDateString();

         tableData +=
            "<tr>" +
            "<td>" +
            formaterDate(childSnapshot.key) +
            "</td>" +
            "<td >" +
            childData.temperature +
            " &#186; C</td>" +
            "<td >" +
            childData.humidity +
            " %</td>" +
            "</tr>";
      }
   });

   localStorage.setItem("tableData", tableData);
});

onValue(dataRef2, (snapshot) => {
   // var timeArray = [];
   // var humidityArray = [];
   // var temperatureArray = [];
   let tableData = "";
   // var datachart = [];
   // var dataTemp = [];
   snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      if (childKey != "current" && childKey != "fan") {
         var parts = childKey.split(":");
         childKey = new Date(parts[0], parts[1], parts[2]);
         childKey = childKey.toDateString();

         // timeArray.push(childKey.toString());
         // humidityArray.push(childData.humidity);
         // temperatureArray.push(childData.temperature);
         // datachart.push({
         //    y: formaterDateChart(childSnapshot.key),
         //    humi: childData.humidity,
         // });
         // dataTemp.push({
         //    y: formaterDateChart(childSnapshot.key),
         //    temp: childData.temperature,
         // });

         tableData +=
            "<tr>" +
            "<td>" +
            formaterDate(childSnapshot.key) +
            "</td>" +
            "<td >" +
            childData.temperature +
            " &#186; C</td>" +
            "<td >" +
            childData.humidity +
            " %</td>" +
            "</tr>";
      }
   });

   // if (datachart.length > 10) {
   //    datachart = datachart.slice(datachart.length - 10, datachart.length);
   // }
   // if (dataTemp.length > 10) {
   //    dataTemp = dataTemp.slice(dataTemp.length - 10, dataTemp.length);
   // }

   localStorage.setItem("tableData1", tableData);
});
onValue(dataRef3, (snapshot) => {
   var tableData = "";

   snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      if (childKey != "current" && childKey != "fan") {
         var parts = childKey.split(":");
         childKey = new Date(parts[0], parts[1], parts[2]);
         childKey = childKey.toDateString();
         tableData +=
            "<tr>" +
            "<td>" +
            formaterDate(childSnapshot.key) +
            "</td>" +
            "<td >" +
            childData.temperature +
            " &#186; C</td>" +
            "<td >" +
            childData.humidity +
            " %</td>" +
            "</tr>";
      }
   });

   // if (datachart.length > 10) {
   //    datachart = datachart.slice(datachart.length - 10, datachart.length);
   // }
   // if (dataTemp.length > 10) {
   //    dataTemp = dataTemp.slice(dataTemp.length - 10, dataTemp.length);
   // }

   localStorage.setItem("tableData2", tableData);
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";
//import { getDatabase, ref, onValue, query, limitToLast } from "./firebase/database";
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

function formaterDate(s) {
   var parts = s.split(":");
   return parts[3] + ":" + parts[4] + " " + parts[2] + "/" + parts[1] + "/" + parts[0];
}
const database = getDatabase(app);
const dataRef = query(ref(database, "floor1"), limitToLast(30));

onValue(dataRef, (snapshot) => {
   snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      if (childKey == "current") {
         var parts = childKey.split(":");
         document.getElementById("humi1").innerHTML = childData.humidity;
         document.getElementById("temp1").innerHTML = childData.temperature;
      }
   });
});
const dataRef2 = query(ref(database, "floor2"), limitToLast(30));
onValue(dataRef2, (snapshot) => {
   snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      if (childKey == "current") {
         var parts = childKey.split(":");
         document.getElementById("humi2").innerHTML = childData.humidity;
         document.getElementById("temp2").innerHTML = childData.temperature;
      }
   });
});

const dataRef3 = query(ref(database, "floor3"), limitToLast(30));

onValue(dataRef3, (snapshot) => {
   snapshot.forEach((childSnapshot) => {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      if (childKey == "current") {
         var parts = childKey.split(":");
         document.getElementById("humi3").innerHTML = childData.humidity;
         document.getElementById("temp3").innerHTML = childData.temperature;
      }
   });
});

const showstaff = document.querySelector("#showstaff section.content");

const dataNhanVien = query(ref(database, "NhanVien"), limitToLast(30));

function timeStatus(dif1, dif2) {
   if (dif1 >= 60 && dif2 >= 60) {
      var h = Math.floor(dif1 / 60);
      var m = dif1 % 60;

      var h1 = Math.floor(dif2 / 60);
      var m1 = dif2 % 60;

      if (m != 0 && m1 != 0) {
         return h + " hour " + m + " minutes late <br> Come back " + h1 + " hour " + m1 + " minutes early";
      } else if (m != 0) {
         return h + " hour " + m + " minutes late <br> Come back " + h1 + " hour early";
      } else if (m1 != 0) {
         return h + " hour late <br> Come back " + h1 + " hour " + m1 + " minutes early";
      } else {
         return h + " hour late <br> Come back " + h1 + " hour early";
      }
   } else if (dif1 < 60 && dif2 >= 60) {
      var h = Math.floor(dif2 / 60);
      var m = dif2 % 60;

      if (m != 0 && dif1 != 0) {
         return dif1 + " minutes late <br> " + "Come back " + h + " hour " + m + " minutes early";
      } else if (m != 0 && dif1 == 0) {
         return "Come back " + h + " hour " + m + " minutes early";
      } else if (dif1 != 0 && m == 0) {
         return dif1 + " minutes late <br> " + "Come back " + h + " hour  early";
      } else {
         return "Come back " + h + " hour early";
      }
   } else if (dif1 >= 60 && dif2 < 60) {
      var h = Math.floor(dif1 / 60);
      var m = dif1 % 60;

      if (m != 0 && dif2 != 0) {
         return h + " hour " + m + " minutes late <br> " + "Come back " + dif2 + " minutes early";
      } else if (m != 0 && dif2 == 0) {
         return h + " hour " + m + " minutes late";
      } else if (dif2 != 0 && m == 0) {
         return h + " hour late <br> " + "Come back " + dif2 + " minutes early";
      } else {
         return h + " hour late <br> ";
      }
   } else {
      return dif1 + " minutes late <br> " + "Come back " + dif2 + " minutes early";
   }
}

function timeStatusEarly(diffInMinutes1) {
   if (diffInMinutes1 < 60) {
      return "Come back " + diffInMinutes1 + " minutes early";
   } else {
      var h = Math.floor(diffInMinutes1 / 60);
      var m = diffInMinutes1 % 60;
      if (m != 0) {
         return "Come back " + h + " hour " + m + " minutes early";
      }
      return "Come back " + h + " hour early";
   }
}
function timeStatusLater(diffInMinutes) {
   if (diffInMinutes < 60) {
      return diffInMinutes + " minutes late";
   } else {
      var h = Math.floor(diffInMinutes / 60);
      var m = diffInMinutes % 60;

      if (m != 0) {
         return h + " hour " + m + " minutes late";
      }
      return h + " hour late";
   }
}

var html = "";
function later(a, b, c, d, e, f) {
   var time1 = new Date(a);
   var time2 = new Date(b);
   var time3 = new Date(c);
   var time4 = new Date(d);
   var time5 = new Date(e);
   var time6 = new Date(f);

   //Tính thời gian đi trễ ca sáng
   const timeDiff = Math.abs(time1 - time2); // lấy giá trị tuyệt đối của hiệu của hai đối tượng Date
   const diffInMinutes21 = Math.floor(timeDiff / (1000 * 60)); // tính khoảng cách thời gian trong đơn vị phút

   //Tính thời gian về sớm ca sáng
   const timeDiff1 = Math.abs(time5 - time3); // lấy giá trị tuyệt đối của hiệu của hai đối tượng Date
   const diffInMinutes53 = Math.floor(timeDiff1 / (1000 * 60)); // tính khoảng cách thời gian trong đơn vị phút

   //Tính thời gian về sớm ca chiều
   const timeDiff2 = Math.abs(time4 - time3); // lấy giá trị tuyệt đối của hiệu của hai đối tượng Date
   const diffInMinutes43 = Math.floor(timeDiff2 / (1000 * 60)); // tính khoảng cách thời gian trong đơn vị phút

   const timeDiff3 = Math.abs(time1 - time6); // lấy giá trị tuyệt đối của hiệu của hai đối tượng Date
   const diffInMinutes16 = Math.floor(timeDiff3 / (1000 * 60)); // tính khoảng cách thời gian trong đơn vị phút

   const timeDiff4 = Math.abs(time5 - time1); // lấy giá trị tuyệt đối của hiệu của hai đối tượng Date
   const diffInMinutes15 = Math.floor(timeDiff4 / (1000 * 60)); // tính khoảng cách thời gian trong đơn vị phút

   //Làm cả ngày
   if (diffInMinutes21 <= 60 && diffInMinutes43 <= 60) {
      return "Work all day";
   }

   //checkIn bé hơn 14h
   if (time1 < time5 && diffInMinutes15 >= 10) {
      if (time1 > time2 && time3 < time5) {
         // return "time1 > time2 && time3 < time5";
         return timeStatus(diffInMinutes21, diffInMinutes53);
      } else if (time1 > time2) {
         return timeStatusLater(diffInMinutes21);
      } else if (time3 < time5) {
         return timeStatusEarly(diffInMinutes53);
      } else if ((diffInMinutes21 <= 30 && diffInMinutes53 <= 20) || (time1 < time2 && time3 > time5)) {
         return "Registered";
      }
   }
   if (time1 >= time6 || (time1 < time6 && diffInMinutes16 <= 20)) {
      if (time1 > time6 && time3 < time4) {
         // return "time1 > time6 && time3 < time4";
         return timeStatus(diffInMinutes16, diffInMinutes43);
      } else if (time1 > time6) {
         return timeStatusLater(diffInMinutes16);
      } else if (time3 < time4) {
         return timeStatusEarly(diffInMinutes43);
      } else if (diffInMinutes16 <= 30 && diffInMinutes43 <= 20) {
         return "Registered";
      }
   }
}
function checkNgaycong(a, b, dcheckIn) {
   var time1 = new Date(formatDateTimeAtt(dcheckIn, a));
   var time2 = new Date(formatDateTimeAtt(dcheckIn, "07:00"));
   var time3 = new Date(formatDateTimeAtt(dcheckIn, b));
   var time4 = new Date(formatDateTimeAtt(dcheckIn, "22:00"));
   var time5 = new Date(formatDateTimeAtt(dcheckIn, "14:00"));
   var time6 = new Date(formatDateTimeAtt(dcheckIn, "14:10"));

   if (a != "" && b != "") {
      return later(time1, time2, time3, time4, time5, time6);
   } else {
      return "No attendance";
   }
}

function formatDateAtt(t) {
   var parts = t.split(":");
   return parts[2] + "-" + parts[1] + "-" + parts[0];
}

function formatDateTimeAtt(a, b) {
   var parts = a.split(":");
   var dt = parts[0] + "-" + parts[1] + "-" + parts[2];
   return dt + "T" + b + ":00Z";
}

var id = 3;
onValue(dataNhanVien, (snapshot) => {
   snapshot.forEach((childSnapshot) => {
      var tr = "";
      var count = 0;
      var idd = "example" + id++;
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      var ngaycong = childData.ngaycong;

      for (let item in childData.attendance) {
         count += 1;
         tr +=
            `
            <tr>
              <td width= "10px">` +
            count +
            `</td>
              <td>` +
            formatDateAtt(item) +
            `</td>
              <td>` +
            childData.attendance[item].checkIn +
            `</td>
              <td>` +
            childData.attendance[item].checkOut +
            `</td>
              <td>` +
            checkNgaycong(childData.attendance[item].checkIn, childData.attendance[item].checkOut, item) +
            `</td>
            </tr>`;
      }
      html +=
         `
          <div class="row">
            <div class="col-md-4 col-xs-12">
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">` +
         childKey +
         `</h3>
                </div>
                <div class="box-body">
                  <img src="./avt.png" alt="" width="100%" height="auto">
                </div>
              </div>
              <!-- /.box -->
            </div>
            <div class="col-md-8 col-xs-12">
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">Data Table With Full Features</h3>
                </div>
                <!-- /.box-header -->
                <div class="box-body">
                  <table id="` +
         idd +
         `" id="table_ex" class="table table-bordered table-striped export_excel">
                    <thead>
                      <tr>
                        <th width= "10px">STT</th>
                        <th>Date</th>
                        <th>Check-In time</th>
                        <th>Check-Out time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                     
                     ` +
         tr +
         `
                    </tbody>
                    <tfoot>
                     <tr>
                      <th colspan="5" style=" text-align: right; padding-right: 70px">Total: ` +
         ngaycong +
         `</th>
                      </tr>
                    </tfoot>
                  </table>
                  <center>
                    <button onclick="exportTableToExcel('` +
         idd +
         `', '` +
         childKey +
         `')" type="button" class="btn btn-info" class="d-flex justify-content-center" > Export Excel </button>
                  </center>
                </div>
                <!-- /.box-body -->
              </div>
              <!-- /.box -->
            </div>
            <!-- /.col -->
          </div>
      `;
   });
   localStorage.setItem("htmlTb", html);
});

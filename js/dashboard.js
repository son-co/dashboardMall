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

var html = "";

function later(a, b, c, d) {
   var time1 = new Date(a);
   var time2 = new Date(b);
   var time3 = new Date(c);
   var time4 = new Date(d);

   const timeDiff = Math.abs(time2 - time1); // lấy giá trị tuyệt đối của hiệu của hai đối tượng Date
   const diffInMinutes = Math.floor(timeDiff / (1000 * 60)); // tính khoảng cách thời gian trong đơn vị phút

   const timeDiff1 = Math.abs(time4 - time3); // lấy giá trị tuyệt đối của hiệu của hai đối tượng Date
   const diffInMinutes1 = Math.floor(timeDiff1 / (1000 * 60)); // tính khoảng cách thời gian trong đơn vị phút

   //Nếu giờ checkIn lớn hơn 8h và giwof checkOut bé hơn 17h thì Nhân viên di trễ về sớm
   if (time1 > time2 && time3 < time4) {
      //Nếu khoảng thời gian đi trễ < 60 phút và về sớm hơn 60 phút
      if (diffInMinutes < 60 && diffInMinutes1 < 60) {
         return diffInMinutes + " minutes late <br> " + "Come back" + diffInMinutes1 + " minutes early";
         //Nếu đi trễ < 60 phút và về sớm hơn 60 phút
      } else if (diffInMinutes < 60 && diffInMinutes1 >= 60) {
         var h = Math.floor(diffInMinutes1 / 60);
         var m = diffInMinutes1 % 60;

         if (m != 0) {
            return diffInMinutes + " minutes late <br> " + "Come back " + h + " hour " + m + " minutes early";
         }
         return diffInMinutes + " minutes late <br> " + "Come back " + h + " hour  early";
         //Nếu đi trễ hơn 60 phút và về sớm hơn 60 phút
      } else if (diffInMinutes >= 60 && diffInMinutes1 < 60) {
         var h = Math.floor(diffInMinutes / 60);
         var m = diffInMinutes % 60;
         if (m != 0) {
            return h + " hour " + m + " minutes late <br> " + "Come back " + diffInMinutes1 + " minutes early";
         }
         return h + " hour late <br> " + "Come back " + diffInMinutes1 + " minutes early";
      } else {
         var h = Math.floor(diffInMinutes / 60);
         var m = diffInMinutes % 60;

         var h1 = Math.floor(diffInMinutes1 / 60);
         var m1 = diffInMinutes1 % 60;
         if (m != 0 && m1 != 0) {
            return h + " hour " + m + " minutes late <br> " + "Come back " + h1 + " hour " + m1 + " minutes early";
         } else if (m != 0) {
            return h + " hour " + m + " minutes late <br> " + "Come back " + h1 + " hour early";
         } else if (m1 != 0) {
            return h + " hour late <br> " + "Come back " + h1 + " hour " + m1 + " minutes early";
         } else {
            return h + " hour late <br> " + "Come back " + h1 + " hour early";
         }
      }
      //Nếu giờ checkIn lớn hơn 8h thì nhân viên đi trễ
   } else if (time1 > time2) {
      if (diffInMinutes < 60) {
         return diffInMinutes + " minutes late";
      } else {
         var h = Math.floor(diffInMinutes / 60);
         var m = diffInMinutes % 60;

         if (m != 0) {
            return "Come back " + h + " hour " + m + " minutes early";
         }
         return "Come back " + h + " hour early";
      }
      //Nếu nhân viên checkOut bé hơn 5h thì nhân viên về sớm
   } else if (time3 < time4) {
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
   } else {
      return "Registered";
   }
}
function checkNgaycong(a, b, dcheckIn) {
   var time1 = new Date(formatDateTimeAtt(dcheckIn, a));
   var time2 = new Date(formatDateTimeAtt(dcheckIn, "08:00"));
   var time3 = new Date(formatDateTimeAtt(dcheckIn, b));
   var time4 = new Date(formatDateTimeAtt(dcheckIn, "17:00"));

   if (a != "" && b != "") {
      return later(time1, time2, time3, time4);
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
         // for (let key in childData.attendance[item]) {
         //   console.log(childData.attendance[item])
         // }
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

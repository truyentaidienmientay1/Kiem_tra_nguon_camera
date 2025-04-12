// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDFYfD6yXOI2AXciNgeBtit815IaANvFmc",
    authDomain: "servo-17c83.firebaseapp.com",
    databaseURL: "https://servo-17c83-default-rtdb.firebaseio.com",
    projectId: "servo-17c83",
    storageBucket: "servo-17c83.firebasestorage.app",
    messagingSenderId: "995716808401",
    appId: "1:995716808401:web:3f9babce9b93da0e95cff0",
    measurementId: "G-VKR8YR62BT"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Định nghĩa đường dẫn cơ sở với UID
const BASE_PATH = "/users/h3c149qpGtaU8QjUE363jm1pU1A3/";

// Monitor battery voltage
var batteryVoltageRef = firebase.database().ref(BASE_PATH + "Khoi_pin_001");
batteryVoltageRef.on('value', snap => {
    document.getElementById("batteryVoltage").innerHTML = `${snap.val()} <span class="unit">V</span>`;
});

// Monitor Date from Firebase
var dateRef = firebase.database().ref(BASE_PATH + "Date");
dateRef.on('value', snap => {
    document.querySelector(".date").textContent = snap.val();
}, (error) => {
    console.error("Error fetching Date:", error);
    document.querySelector(".date").textContent = "Lỗi tải ngày";
});

// Monitor Time from Firebase
var timeRef = firebase.database().ref(BASE_PATH + "Time");
timeRef.on('value', snap => {
    document.querySelector(".time").textContent = snap.val();
}, (error) => {
    console.error("Error fetching Time:", error);
    document.querySelector(".time").textContent = "Lỗi tải giờ";
});
// BỔ SUNG: Xử lý đăng nhập
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("errorMessage");

    // Giả lập kiểm tra đăng nhập (có thể thay bằng Firebase Auth)
    if (username === "admin" && password === "2411") {
        // Ẩn giao diện đăng nhập, hiện giao diện chính
        document.getElementById("loginContainer").style.display = "none";
        document.getElementById("mainContent").style.display = "block";
        errorMessage.textContent = "";
        // Khởi tạo Firebase sau khi đăng nhập thành công
        initializeFirebase();
    } else {
        errorMessage.textContent = "Tên người dùng hoặc mật khẩu không đúng!";
    }
});

// BỔ SUNG: Xử lý ẩn/hiện mật khẩu
document.getElementById("togglePassword").addEventListener("click", function() {
    const passwordInput = document.getElementById("password");
    const toggleIcon = this;

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleIcon.textContent = "🙈"; // Biểu tượng khi hiển thị mật khẩu
    } else {
        passwordInput.type = "password";
        toggleIcon.textContent = "👁️"; // Biểu tượng khi ẩn mật khẩu
    }
});

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

// Monitor battery voltage
var batteryVoltageRef2 = firebase.database().ref(BASE_PATH + "Khoi_pin_002");
batteryVoltageRef2.on('value', snap => {
    document.getElementById("batteryVoltage-02").innerHTML = `${snap.val()} <span class="unit">V</span>`;
});


// Monitor Date from Firebase
var dateRef = firebase.database().ref(BASE_PATH + "Date");
dateRef.on('value', snap => {
    document.querySelector(".date").textContent = snap.val();
}, (error) => {
    console.error("Error fetching Date:", error);
    document.querySelector(".date").textContent = "Lỗi tải ngày";
});

// Monitor Date from Firebase
var dateRef2 = firebase.database().ref(BASE_PATH + "Date2");
dateRef2.on('value', snap => {
    document.querySelector(".date2").textContent = snap.val();
}, (error) => {
    console.error("Error fetching Date:", error);
    document.querySelector(".date2").textContent = "Lỗi tải ngày";
});

// Monitor Time from Firebase
var timeRef = firebase.database().ref(BASE_PATH + "Time");
timeRef.on('value', snap => {
    document.querySelector(".time").textContent = snap.val();
}, (error) => {
    console.error("Error fetching Time:", error);
    document.querySelector(".time").textContent = "Lỗi tải giờ";
});
// Monitor Time from Firebase
var timeRef2 = firebase.database().ref(BASE_PATH + "Time2");
timeRef2.on('value', snap => {
    document.querySelector(".time2").textContent = snap.val();
}, (error) => {
    console.error("Error fetching Time:", error);
    document.querySelector(".time2").textContent = "Lỗi tải giờ";
});

    const relayRef = firebase.database().ref(BASE_PATH + "RelayControl");

    const toggleButton = document.getElementById("toggleButton");
    const toggleText = document.getElementById("toggleText");

    // Cập nhật giao diện theo giá trị
    function updateUI(value) {
      if (value == 0) {
        toggleButton.classList.add("active");
        toggleText.textContent = "ON";
      } else {
        toggleButton.classList.remove("active");
        toggleText.textContent = "OFF";
      }
    }

    // Lấy trạng thái hiện tại khi load
    relayRef.once("value").then((snapshot) => {
      updateUI(snapshot.val());
    });

    // Bấm để thay đổi giá trị
    toggleButton.addEventListener("click", () => {
      relayRef.once("value").then((snapshot) => {
        let currentValue = snapshot.val();
        let newValue = currentValue == 0 ? 1 : 0;
        relayRef.set(newValue);
      });
    });

    // Theo dõi cập nhật realtime
    relayRef.on("value", (snapshot) => {
      updateUI(snapshot.val());
    });

// Website ulang tahun Nuvita Khairunisa ♡
const birthday = new Date(2026, 11, 20, 0, 0, 0); // Bulan 10 = November
const $ = (id) => document.getElementById(id);

function updateCountdown() {
  const now = new Date();
  const diff = birthday.getTime() - now.getTime();
  if (diff <= 0) {
    $("days").textContent = "♡";
    $("hours").textContent = "♡";
    $("minutes").textContent = "♡";
    $("seconds").textContent = "♡";
    $("countdownNote").textContent = now.toDateString() === birthday.toDateString()
      ? "Hari ini hari spesialmu! Selamat ulang tahun, Nuvita! 🎂"
      : "Semoga ulang tahunmu penuh kebahagiaan ♡";
    return;
  }
  $("days").textContent = Math.floor(diff / 86400000);
  $("hours").textContent = Math.floor((diff % 86400000) / 3600000);
  $("minutes").textContent = Math.floor((diff % 3600000) / 60000);
  $("seconds").textContent = Math.floor((diff % 60000) / 1000);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Musik: tambahkan file music.mp3 ke folder yang sama.
// Browser biasanya baru mengizinkan musik setelah tombol ditekan.
const music = $("birthdayMusic");
$("musicToggle").addEventListener("click", async () => {
  try {
    if (music.paused) {
      await music.play();
      $("musicLabel").textContent = "Jeda musik";
    } else {
      music.pause();
      $("musicLabel").textContent = "Putar musik";
    }
  } catch (error) {
    showToast("Tambahkan file music.mp3 ke folder website dulu ya 🎵");
  }
});

// Buka surat dan munculkan isi surat perlahan, satu per satu.
$("openLetter").addEventListener("click", () => {
  const paper = $("letterPaper");
  paper.hidden = !paper.hidden;
  $("openLetter").textContent = paper.hidden ? "Buka suratnya ♡" : "Tutup surat ♡";
  if (!paper.hidden) {
    const parts = paper.querySelectorAll("h3, p:not(.letter-date)");
    parts.forEach((part, index) => {
      part.classList.remove("letter-reveal");
      part.style.setProperty("--delay", `${index * 0.55}s`);
      void part.offsetWidth;
      part.classList.add("letter-reveal");
    });
    paper.scrollIntoView({ behavior: "smooth", block: "start" });
    makeHearts(10);
  }
});

// Kue virtual.
$("blowCandle").addEventListener("click", () => {
  const cake = $("miniCake");
  const message = $("wishMessage");
  if (!cake.classList.contains("blown")) {
    cake.classList.add("blown");
    message.textContent = "Semoga semua doa baikmu pelan-pelan jadi nyata. ♡";
    $("blowCandle").textContent = "Nyalakan lagi ♡";
    makeHearts(24);
  } else {
    cake.classList.remove("blown");
    message.textContent = "Lilinnya menyala lagi. Jangan lupa buat permohonan! ✨";
    $("blowCandle").textContent = "Tiup lilin ✨";
  }
});

// Tombol kejutan dan hati.
$("surpriseBtn").addEventListener("click", () => {
  makeHearts(32);
  showToast("Kejutan kecil untuk Nuvita: kamu berharga dan disayang! ♡");
});
$("heartBtn").addEventListener("click", () => {
  makeHearts(45);
  showToast("Mengirim banyak hati buat kamu 💗");
});

function makeHearts(amount = 12) {
  const layer = $("floatingHearts");
  const symbols = ["♡", "♥", "✦", "💗"];
  for (let i = 0; i < amount; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 20) + "px";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";
    layer.appendChild(heart);
    heart.addEventListener("animationend", () => heart.remove());
  }
}

let toastTimer;
function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

// Hati kecil yang bergerak perlahan di latar.
setInterval(() => {
  if (document.hidden) return;
  const layer = $("floatingHearts");
  const heart = document.createElement("span");
  heart.className = "heart-particle";
  heart.textContent = Math.random() > .5 ? "♡" : "♥";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 12) + "px";
  heart.style.animationDuration = (7 + Math.random() * 5) + "s";
  layer.appendChild(heart);
  heart.addEventListener("animationend", () => heart.remove());
}, 1600);
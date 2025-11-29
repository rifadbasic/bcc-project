// const buttons = document.querySelectorAll(".myBtn");
const hero = document.getElementById("hero");

const images = [
  "https://scontent.fjsr12-1.fna.fbcdn.net/v/t1.6435-9/118056641_2760063414208521_4768450248987783033_n.png?_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEliGt4TdviFs6vozOBYeyd66g1AnRpwsHrqDUCdGnCwc0wyVZ_Y30ia5gT7yUU-EYHfra4XvMUktU3tTZywhfL&_nc_ohc=tjj73zK7rp8Q7kNvwH2BVAI&_nc_oc=AdndlQE95sc49qCpLdTQR6ZRV77g3Dpa10ulnLRNClt6Mra7sColFOYWUsraXeOVTGg&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=UF59gAkLB5Yqdoc1saa0vw&oh=00_AfgPUQC1-WbmcsWOnjUmP2Yx6rz8V3Hs58DpSbYhnElsoQ&oe=6949D83F",
  "https://scontent.fjsr12-1.fna.fbcdn.net/v/t1.6435-9/45036592_2224847417730126_6022613771942363136_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHL0O6MuEsCEPAoYGlRhJC2H8hklzKhSCYfyGSXMqFIJgKonAcYNxvfIOIyTf4UC7qordIK9BybFL5o3pysdXCy&_nc_ohc=Hoz6vaNZrtUQ7kNvwHWgiBc&_nc_oc=AdkWozo5_pzY4NeiSag89u832DYe91wIGZzSdv5Du7Jp0UE7wj2YEXvsaHaExCA4QIk&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=Z-NvkiyOd7XjgZc1geycyA&oh=00_Afjs8leiQHYUVGNco4G2fQMipe96TWWsryaxT5Pns-oQSw&oe=6949DBF5",
  "https://scontent.fjsr12-1.fna.fbcdn.net/v/t39.30808-6/486376161_1076452454526513_1217215261466085034_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFHzcb-3EQP6zUtAUfKeP6FyMvZei6eTMHIy9l6Lp5MwQW4Aqh_DY03Ef_NNN7JSZZrxCSAxERBSR2zJseWlqgy&_nc_ohc=Zd7yr9C8MbIQ7kNvwFsQQ93&_nc_oc=Adk59Sm-vb2mVPI5I0WcdyEQ9sTFRqqMS14iLo8TB0l8p7eE3BEwIIa2sy5xBgPCjmc&_nc_zt=23&_nc_ht=scontent.fjsr12-1.fna&_nc_gid=rm9X6oslWL2BM9AhBGFCcw&oh=00_Afieq4EkpsZMcC1_fnrGCuEI9RR4g6sflePQ2txDZ1qDFg&oe=69281C0B",
];

let index = 0;

function changeBackground() {
  if (!hero || !images.length) return;  // prevent errors

  hero.style.backgroundImage = `url('${images[index]}')`;
  index = (index + 1) % images.length;
}
changeBackground();
setInterval(changeBackground, 4000);


// Back to Top Button
 const btn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btn.classList.remove("opacity-0", "pointer-events-none");
      btn.classList.add("opacity-100");
    } else {
      btn.classList.add("opacity-0", "pointer-events-none");
      btn.classList.remove("opacity-100");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });


//  button

const buttons = document.querySelectorAll('.myBtn');

  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active-btn'));

      btn.classList.add('active-btn');

      const sectionID = btn.parentElement.getAttribute("href");
      const target = document.querySelector(sectionID);
      target.scrollIntoView({ behavior: "smooth" });
      e.preventDefault();
    });
  });


let BD = {};

fetch("public/division.json")
  .then(res => res.json())
  .then(data => {
    BD = data;
    console.log(BD);
    initAddressData();
  })
  .catch(err => console.error("JSON Load Error:", err));

function initAddressData() {
  // Present
  const division = document.getElementById("division");
  const district = document.getElementById("district");
  const upazila = document.getElementById("upazila");

  // Permanent
  const permDiv = document.getElementById("perm-division");
  const permDis = document.getElementById("perm-district");
  const permUpa = document.getElementById("perm-thana");

  // Load Division Dropdowns
  Object.keys(BD).forEach(div => {
    division.innerHTML += `<option value="${div}">${div}</option>`;
    permDiv.innerHTML += `<option value="${div}">${div}</option>`;
  });

  // Present Division → District
  division.addEventListener("change", () => {
    const div = division.value;
    district.innerHTML = "";
    upazila.innerHTML = "";

    Object.keys(BD[div]).forEach(dis => {
      district.innerHTML += `<option value="${dis}">${dis}</option>`;
    });
  });

  // Present District → Upazila
  district.addEventListener("change", () => {
    const div = division.value;
    const dis = district.value;

    upazila.innerHTML = "";
    BD[div][dis].forEach(u => {
      upazila.innerHTML += `<option value="${u}">${u}</option>`;
    });
  });

  // Permanent Division
  permDiv.addEventListener("change", () => {
    const div = permDiv.value;
    permDis.innerHTML = "";
    permUpa.innerHTML = "";

    Object.keys(BD[div]).forEach(dis => {
      permDis.innerHTML += `<option value="${dis}">${dis}</option>`;
    });
  });

  // Permanent District
  permDis.addEventListener("change", () => {
    const div = permDiv.value;
    const dis = permDis.value;

    permUpa.innerHTML = "";
    BD[div][dis].forEach(u => {
      permUpa.innerHTML += `<option value="${u}">${u}</option>`;
    });
  });

  // Same Address Checkbox
  document.getElementById("same-address").addEventListener("change", () => {
    if (!document.getElementById("same-address").checked) return;

    permDiv.value = division.value;
    permDiv.dispatchEvent(new Event("change"));

    setTimeout(() => {
      permDis.value = district.value;
      permDis.dispatchEvent(new Event("change"));

      setTimeout(() => {
        permUpa.value = upazila.value;
      }, 50);
    }, 50);

    document.getElementById("perm-post").value =
      document.getElementById("p-post").value;

    document.getElementById("perm-address").value =
      document.getElementById("p-address").value;
  });
}





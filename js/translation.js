const translations = {
    en: {
        About_Us: "About Us",
        Products: "Products",
        Request_for_Quotation: "Request for Quotation",
        Contact_Us: "Contatct Us",
        Company_Title: "KREDE PLAST",
        Compant_Description: "For Plastic Products",
        AboutUs: "About US",
        Products: "Products",
        Work_With_KREDE_PLAST_Now: "Work With KREDE PLAST Now!",
        We_can_give_you_the_best_service: "We can give you the best service",
        Get_free_Quotation: "Get free Quotation!",
        Contact_Us_We_Are_Here_For_You: "Contact Us We Are Here For You",
        Code: "Code:",
        volume: "Volume:",
        Nick: "Nick",
        height: "Height:",
        diameter: "Diameter",
        Redees: "Redees",
        Redees120: "Redees 120",
        Redees500: "Redees 500",
        Cylinder: "Cylinder",
        Cylinder250: "Cylinder 250",
        Cylinder500: "Cylinder 500",
        Redees250: "Redees 250",
        Shoulders: "Shoulders",
        Shoulders120: "Shoulders 120",
        Shoulders200: "Shoulders 200",
        Predicable: "Predicable",
        Oil_Refil: "Oil Refil",
        Jewllerly_Refill: "Jewllerly Refill",
        Jar: "Jar",
        Jar120: "Jar 120",
        Jar150: "Jar 150",
        Jar300: "Jar 300",
        Jar400: "Jar 400",
        ShowAll: "Show All",
        WhatsUp: "What's up: (Click icon)",
        Facebook: "Facebook (Click icon)",
        Email: "Email (Click icon)",
        Useful_Links: "Useful Links",
        impact: "impact",
        Phone: "Phone:",
        Description: "Welcome to KREDE PLAST, where innovation meets excellence."
    },
    ar: {
        About_Us: "عن شركتنا",
        Products: "منتجات",
        Request_for_Quotation: "طلب الاسعار",
        Contact_Us: "ألاتصال بنا",
        Company_Title: "كريدي بلاست",
        Compant_Description: "للمستلزمات البلاستيكيه",
        AboutUs: "ماذا عنا؟",
        Products: "المنتجات",
        Work_With_KREDE_PLAST_Now: "أبدأ العمل مع كريدي الأن",
        We_can_give_you_the_best_service: "يمكننا اعطاءك افضل خدمه",
        Get_free_Quotation: "أحصل علي تحديد الميزانيه مجانا!",
        Client_Name: "الأسم",
        Contact_Us_We_Are_Here_For_You: "تواصل معنا نحن هنا من اجلك",
        Code: "كود:",
        volume: "مقدار:",
        Nick: "رقبه:",
        height: "طول:",
        diameter: "حجم:",
        Redees120: "ريديس 120",
        Cylinder: "سلندر",
        Cylinder250: "سلندر 250",
        Cylinder500: "سلندر 500",
        Redees: "ريديس",
        Redees250: "ريديس 250",
        Redees500: "ريديس 500",
        Shoulders: "أكتاف",
        Shoulders120: "اكتاف 120",
        Shoulders200: "اكتاف 200",
        Predicable: "عبوات",
        Oil_Refil: "عبوة زيت",
        Jewllerly_Refill: "عبوات زيت",
        Jar: "مطربان",
        Jar120: "مطربان 120",
        Jar150: "مطربان 150",
        Jar300: "مطربان 300",
        Jar400: "مطربان 400",
        ShowAll: "اظهار الكل",
        WhatsUp: "واتس اب (اضغط علي الايقونه)",
        Facebook: "فيس بوك (أضغط علي الايقونه)",
        Email: " البريدالالكتروني (أضغط علي الايقونه)",
        Useful_Links: "روابط مفيده",
        impact: "دور الشركه",
        Phone: "رقم الهاتف:",
        Description: "مرحبا بكم في كريدي بلاست حيث يلتقي الابتكار بالتميز"
    },
};

const languageSelector = document.querySelector("select");
languageSelector.addEventListener("change", (event) => {
    setLanguage(event.target.value);
    localStorage.setItem("lang", event.target.value);
    if (event.target.value === "en") {
        localStorage.setItem("selected", "en");
    } else {
        localStorage.setItem("selected", "ar");
        document.querySelector("#header .container a").style.fontSize = "30px";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    setLanguage(localStorage.getItem("lang"));
    selected(localStorage.getItem("selected"));
});

const setLanguage = (language) => {
    const elements = document.querySelectorAll("[data-lang]");
    elements.forEach((element) => {
        const translationkey = element.getAttribute("data-lang");
        element.textContent = translations[language][translationkey];
    });
    document.dir = language === "ar" ? "rtl" : "ltr";
    document.querySelector("#header .container").dir = "ltr";


    if (language === "en") {
        document.getElementById("ar").removeAttribute("selected");
    }
    const Form = `
<form style="height: 100%;row-gap:14px;" class="d-flex flex-column pt-5">
  <img src="Img/Logo.png" style="width: 90px;position: absolute;left: 3%;top: 3%;"/>
  <div class="d-flex justify-content-between align-items-center mt-5" style="margin-top:4rem !important;">
   <div style="width: 47%" class="d-flex flex-column justify-content-start align-items-start">
    <label for="Name" class="form-label" data-lang="Client_Name">${document.dir === "ltr" ? "Name" : "الاسم"}</label>    
    <input type="text" class="form-control formColor" id="Name" required>
   </div>
    <div style="width: 47%" class="d-flex flex-column justify-content-start align-items-start">
    <label data-lang="Company" for="Company" class="form-label">${document.dir === "ltr" ? "Company Name" : "أسم الشركه"}</label>
    <input type="text" class="form-control formColor" id="Company" required>
   </div>
  </div>
    <div style="width: 100%" class="d-flex flex-column justify-content-start align-items-start">
    <label data-lang="Company" for="Company" class="form-label">${document.dir === "ltr" ? "Company Name" : "أسم الشركه"}</label>
    <input type="text" class="form-control formColor" id="Company" required>
   </div>
  <div class="mb-3 d-flex justify-content-between align-items-center">
   <div style="width: 47%" class="d-flex flex-column justify-content-start align-items-start">
    <label for="Telephone" class="form-label">${document.dir === "ltr" ? "Telephone" : "رقم الهاتف"}</label>
    <input type="text" class="form-control formColor" id="Telephone" required>
   </div>
    <div style="width: 47%" class="d-flex flex-column justify-content-start align-items-start">
    <label for="WhatsUp" class="form-label">${document.dir === "ltr" ? "What's App" : "واتس اب"} <i class="fa-brands fa-whatsapp" style="color: #0cc143"></i>
    </label>
    <input type="text" class="form-control formColor" id="WhatsUp">
    </div>
   </div>
   <button class="submiting btn btn-primary mt-3" style="background-color: #cc8805;border: solid #cc8805 1px;">
   ${document.dir === "ltr" ? "Submit" : "ارسال البيانات"}</button>
</form>
`;
    const FromButton = document.querySelector(".Quotation_pt2 button");
    FromButton.addEventListener("click", function () {
        Swal.fire({
            showCancelButton: false,
            showConfirmButton: false,
            customClass: 'FormAppere',
            html: `${Form}`
        })
    })

};


// الاعلام هنا يا هندسه
// const EnglishFlag = new Image();
const EnglishFlag = document.createElement("img");
EnglishFlag.src = './18166.webp';
const ArabicFlag = document.createElement('img');
ArabicFlag.src = './27146.webp';

const selected = (select) => {
    const english = document.getElementById("en");
    const arabic = document.getElementById("ar");
    english.innerHTML = `En`;
    english.appendChild(EnglishFlag);
    // english.innerHTML = `En <img src=${EnglishFlag} alt="Sylinder" />`;
    // arabic.innerHTML = `Ar <img src=${ArabicFlag} alt="Sylinder" />`;
    arabic.innerHTML = "Ar"
    arabic.appendChild(ArabicFlag);

    if (select === "en") {
        english.setAttribute("selected", "");
    } else {
        arabic.setAttribute("selected", "");
    }
};


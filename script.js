/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageId) {

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  const target = document.getElementById(pageId);

  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================
   ROOM DATA
========================= */

const roomData = {

  ordinary: {
    name: "Обычный",
    price: 120
  },

  deluxe: {
    name: "Делюкс",
    price: 220
  },

  president: {
    name: "Для президента",
    price: 750
  }

};


/* =========================
   CALCULATE BOOKING
========================= */

function calculateBooking() {

  const checkinValue =
    document.getElementById("checkin").value;

  const checkoutValue =
    document.getElementById("checkout").value;

  const guests =
    document.getElementById("guests").value;

  const room =
    document.getElementById("room").value;


  if (!checkinValue || !checkoutValue) {

    alert(
      "Пожалуйста, выберите дату заезда и дату выезда."
    );

    return;
  }


  const checkin =
    new Date(checkinValue + "T00:00:00");

  const checkout =
    new Date(checkoutValue + "T00:00:00");


  const difference =
    checkout.getTime() - checkin.getTime();


  const nights =
    Math.ceil(
      difference /
      (1000 * 60 * 60 * 24)
    );


  if (nights <= 0) {

    alert(
      "Дата выезда должна быть позже даты заезда."
    );

    return;
  }


  const selectedRoom =
    roomData[room];


  const totalPrice =
    selectedRoom.price * nights;


  const dateFormatter =
    new Intl.DateTimeFormat(
      "ru-RU",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }
    );


  document.getElementById("summaryRoom")
    .textContent = selectedRoom.name;


  document.getElementById("summaryCheckin")
    .textContent = dateFormatter.format(checkin);


  document.getElementById("summaryCheckout")
    .textContent = dateFormatter.format(checkout);


  document.getElementById("summaryGuests")
    .textContent =
      guests +
      (guests == 1
        ? " гость"
        : " гостя");


  document.getElementById("summaryNights")
    .textContent =
      nights +
      (nights == 1
        ? " ночь"
        : " ночей");


  document.getElementById("summaryPrice")
    .textContent =
      totalPrice.toLocaleString("ru-RU") +
      "  ₽";


  document.getElementById("summaryEmpty")
    .style.display = "none";


  document.getElementById("summaryContent")
    .classList.add("visible");
}


/* =========================
   COMPLETE BOOKING
========================= */

function completeBooking() {

  const summary =
    document.getElementById("summaryContent");


  if (
    !summary.classList.contains("visible")
  ) {
    return;
  }


  document
    .getElementById("successModal")
    .classList.add("active");
}


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

  document
    .getElementById("successModal")
    .classList.remove("active");
}


/* =========================
   CLOSE MODAL ON BACKGROUND
========================= */

document
  .getElementById("successModal")
  .addEventListener(
    "click",
    function(event) {

      if (event.target === this) {
        closeModal();
      }

    }
  );


/* =========================
   DATE RESTRICTIONS
========================= */

const today =
  new Date()
    .toISOString()
    .split("T")[0];


document
  .getElementById("checkin")
  .min = today;


document
  .getElementById("checkin")
  .addEventListener(
    "change",
    function() {

      const checkin =
        this.value;

      const checkout =
        document.getElementById("checkout");


      checkout.min = checkin;


      if (
        checkout.value &&
        checkout.value <= checkin
      ) {

        checkout.value = "";

      }

    }
  );
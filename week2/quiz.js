function checkAnswer(quizName) {
  const options = document.getElementsByName(quizName);
  let selectedValue = null;

  for (const option of options) {
    if (option.checked) {
      selectedValue = option.value;
      break;
    }
  }

  if (selectedValue === "correct") {
    Swal.fire({
      title: "Correct!",
      text: "Great job! 🎉",
      icon: "success",
      confirmButtonText: "Awesome!",
      didClose: function () {
        showFlashcard(quizName);
      },
    });
  } else if (selectedValue === "wrong") {
    Swal.fire({
      title: "Oops!",
      text: "That's not correct. Try again!",
      icon: "error",
      confirmButtonText: "OK",
    });
  } else {
    Swal.fire({
      title: "Hold on!",
      text: "Please select an answer before submitting.",
      icon: "warning",
      confirmButtonText: "Got it",
    });
  }
}

function showFlashcard(quizName) {
  const container = document.querySelector(`[name="${quizName}"]`).closest(".card-body");

  const word = container.getAttribute("data-word");
  const translation = container.getAttribute("data-translation");
  const pronunciation = container.getAttribute("data-pronunciation");
  const imageUrl = container.getAttribute("data-image");

  Swal.fire({
    title: word,
    html: `<strong>${translation}</strong><br><em>Pronunciation: ${pronunciation}</em>`,
    imageUrl: imageUrl,
    imageWidth: 200,
    imageHeight: 200,
    imageAlt: word,
    icon: "info",
    confirmButtonText: "Got it!",
  });
}

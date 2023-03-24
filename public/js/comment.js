const newCommentHandler = async (event) => {
  event.preventDefault();

  // const title = document.querySelector('input[name="comment-title"]').value;
  const comment_text = document.querySelector(
    'textarea[name="comment-content"]'
  ).value;

  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({
      comment_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentHandler);

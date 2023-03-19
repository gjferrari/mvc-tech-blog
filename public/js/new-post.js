//template code from edit-post

const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
  const content = document.querySelector('textarea[name="content"]').value;
  const id = document.querySelector("post_id").getAttribute("id");
  //declaring id to get post by id

  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

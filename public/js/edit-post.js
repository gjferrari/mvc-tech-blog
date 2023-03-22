const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="content"]').value;
  const id = document.querySelector(".post_id").getAttribute("id");
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
    console.log(response);
  }
};

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editFormHandler);

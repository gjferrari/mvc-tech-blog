const deleteFormHandler = async (event) => {
  event.preventDefault();

  // const title = document.querySelector('input[name="post-title"]').value;
  // const content = document.querySelector('textarea[name="content"]').value;
  const id = document.querySelector(".post_id").getAttribute("id");
  //declaring id to get post by id

  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
    // body: JSON.stringify({
    //   id,
    //   title,
    //   content,
    // }),
    // headers: {
    //   "Content-Type": "application/json",
    // },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector(".delete-post-btn")
  .addEventListener("click", deleteFormHandler);

document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("blogModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
  const closeBtn = document.querySelector(".close-btn");

  closeBtn.onclick = () => modal.style.display = "none";

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };

  async function loadBlogs() {
    try {
      const res = await fetch("http://localhost:3000/api/blogs");
      const blogs = await res.json();

      console.log("Blogs:", blogs);

      const container = document.getElementById("blogContainer");

container.innerHTML = blogs.map(blog => `
  <div class="blog-card">

    <img src="${blog.image || 'https://via.placeholder.com/600x300'}" />

    <div class="blog-card-inner">
      <h3>${blog.title}</h3>

      <div class="blog-btns">
        <button class="blog-btn" onclick="openModal('${blog.slug}')">
          Read More
        </button>
      </div>
    </div>

    <div class="card-description">
      <p>${blog.content.slice(0, 120)}...</p>
    </div>

  </div>
`).join("");

    } catch (err) {
      console.error(err);
    }
  }

  window.openModal = async function(slug) {
    const res = await fetch(`http://localhost:3000/api/blogs/${slug}`);
    const blog = await res.json();

    modalTitle.innerText = blog.title;
    modalContent.innerText = blog.content;

    modal.style.display = "block";
  };

  loadBlogs();

});
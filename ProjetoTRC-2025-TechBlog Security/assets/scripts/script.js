// Espera o DOM carregar
document.addEventListener("DOMContentLoaded", () => {
  // Identifica o caminho da URL
  const path = window.location.pathname;

  // Lista de páginas que terão comentários
  const commentPages = ["firewall.html", "criptografia.html", "pentest.html", "ataques.html"];

  // Verifica se a página atual está na lista
  const matchedPage = commentPages.find(p => path.includes(p));

  if (matchedPage) {
    const commentForm = document.getElementById("commentForm");
    const commentText = document.getElementById("commentText");
    const username = document.getElementById("username");
    const commentSection = document.getElementById("commentSection");

    // Usa o nome da página como parte da chave do localStorage
    const storageKey = `comments_${matchedPage}`;

    const loadComments = () => {
      const comments = JSON.parse(localStorage.getItem(storageKey)) || [];
      commentSection.innerHTML = "";
      comments.forEach(({ user, text, timestamp }) => {
        const div = document.createElement("div");
        div.classList.add("mb-3");
        div.innerHTML = `
          <div class="bg-light p-3 rounded shadow-sm">
            <strong>${user || "Anônimo"}</strong> <small class="text-muted">${timestamp}</small>
            <p class="mb-0">${text}</p>
          </div>
        `;
        commentSection.appendChild(div);
      });
    };

    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = commentText.value.trim();
      const user = username.value.trim();
      if (!text) return;

      const comments = JSON.parse(localStorage.getItem(storageKey)) || [];
      comments.unshift({
        user,
        text,
        timestamp: new Date().toLocaleString("pt-BR")
      });

      localStorage.setItem(storageKey, JSON.stringify(comments));
      commentText.value = "";
      username.value = "";
      loadComments();
    });

    loadComments();
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmail = document.getElementById("newsletterEmail");

  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = newsletterEmail.value.trim();

    // Expressão regular para validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    // Se e-mail for válido
    alert("Obrigado, por se inscrever!");
    newsletterEmail.value = ""; // Limpa o campo
  });
});
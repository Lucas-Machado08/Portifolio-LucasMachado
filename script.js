document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('myModal');
  const btn = document.querySelector('.myBtn');
  const closeBtn = modal?.querySelector('.close');
  const form = document.getElementById('container-ctt');

  if (!modal || !btn || !closeBtn || !form) return;

  // quando clicar no botão enviar
  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const nome = document.getElementById("txt-nome").value.trim();
    const email = document.getElementById("txt-email").value.trim();
    const mensagem = document.getElementById("txt-msg").value.trim();

    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|yahoo|hotmail|icloud)\.com$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido (ex: exemplo@gmail.com).");
      return;
    }

    // Monta os dados para envio
    const formData = new FormData();
    formData.append("Nome", nome);
    formData.append("Email", email);
    formData.append("Mensagem", mensagem);
    formData.append("_subject", "Nova mensagem do site");
    formData.append("_captcha", "false");
    formData.append("_template", "table");

    try {
      const response = await fetch("https://formsubmit.co/ajax/lucas.machador1409@gmail.com", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        form.reset();
        abrirModal(modal); // mostra o modal após envio
      } else {
        alert("Erro ao enviar sua mensagem. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão. Verifique sua internet e tente novamente.");
    }
  });

  // botão de fechar modal
  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    fecharModal(modal);
  });

  // fecha modal ao clicar fora do conteúdo
  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal(modal);
  });

  // quando o modal for fechado
  modal.addEventListener('close', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });
});

function abrirModal(modal) {
  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.setAttribute('open', '');
  }
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function fecharModal(modal) {
  if (typeof modal.close === 'function') {
    modal.close();
  }
  modal.style.display = 'none';
  document.body.style.overflow = '';
}












// alternar modo claro/escuro (caso use)
function claro() {
  document.body.classList.toggle("claro");

  let claroAtivo = document.body.classList.contains("claro");
  localStorage.setItem("modo-claro", claroAtivo);
  console.log(localStorage.getItem)
}

document.addEventListener("DOMContentLoaded", () => {
  console.log(localStorage.getItem("modo-claro"))

  if(localStorage.getItem("modo-claro") == "true"){
    document.body.classList.add("claro")
  }
})

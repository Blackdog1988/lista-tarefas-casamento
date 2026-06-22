// =============================================
// CHECKLIST DE CASAMENTO – JavaScript
// Funcionalidades:
//   1. Marca itens como concluídos (riscado)
//   2. Atualiza barra de progresso
//   3. Salva estado no localStorage
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const progressoFill = document.getElementById('progressoFill');
  const progressoTexto = document.getElementById('progressoTexto');
  const STORAGE_KEY = 'checklist_casamento';

  // ── Carrega estado salvo ──
  function carregarEstado() {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (!salvo) return;

    const estado = JSON.parse(salvo);
    checkboxes.forEach((cb, index) => {
      if (estado[index]) {
        cb.checked = true;
      }
    });
  }

  // ── Salva estado atual ──
  function salvarEstado() {
    const estado = {};
    checkboxes.forEach((cb, index) => {
      estado[index] = cb.checked;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(estado));
  }

  // ── Atualiza a barra de progresso ──
  function atualizarProgresso() {
    const total = checkboxes.length;
    const concluidos = [...checkboxes].filter(cb => cb.checked).length;
    const percentual = total > 0 ? (concluidos / total) * 100 : 0;

    progressoFill.style.width = percentual + '%';
    progressoTexto.textContent = `${concluidos} de ${total} itens concluídos`;

    // Mensagem especial ao completar tudo
    if (concluidos === total) {
      progressoTexto.textContent = `🎉 Tudo pronto! Aproveitem o grande dia! ♥`;
    }
  }

  // ── Evento em cada checkbox ──
  checkboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      atualizarProgresso();
      salvarEstado();
    });
  });

  // ── Inicializa ──
  carregarEstado();
  atualizarProgresso();

});

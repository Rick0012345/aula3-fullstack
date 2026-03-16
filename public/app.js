const userList = document.getElementById('userList');
const emptyState = document.getElementById('emptyState');
const totalUsers = document.getElementById('totalUsers');
const lastUpdate = document.getElementById('lastUpdate');
const statusEl = document.getElementById('status');
const createForm = document.getElementById('createForm');
const refreshBtn = document.getElementById('refreshBtn');

function setStatus(message) {
  statusEl.textContent = message;
}

function setLastUpdate() {
  const now = new Date();
  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  lastUpdate.textContent = time;
}

function nameInitial(nome) {
  return (nome || '?').trim().charAt(0).toUpperCase();
}

function renderUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const card = document.createElement('div');
    card.className = 'user-card';
    card.dataset.id = user._id;

    card.innerHTML = `
      <div class="user-main">
        <div class="user-avatar">${nameInitial(user.nome)}</div>
        <div class="user-info">
          <div class="user-name">${user.nome}</div>
          <div class="user-id">ID: ${user._id}</div>
        </div>
      </div>
      <div class="user-actions">
        <button class="btn ghost" data-action="edit">Editar</button>
        <button class="btn danger" data-action="delete">Excluir</button>
      </div>
      <form class="edit-form hidden">
        <input type="text" name="nome" value="${user.nome}" required />
        <div class="user-actions">
          <button class="btn primary" type="submit">Salvar</button>
          <button class="btn ghost" data-action="cancel" type="button">Cancelar</button>
        </div>
      </form>
    `;

    userList.appendChild(card);
  });

  const isEmpty = users.length === 0;
  emptyState.classList.toggle('hidden', !isEmpty);
  totalUsers.textContent = String(users.length);
}

async function fetchUsers() {
  setStatus('Atualizando lista...');
  const response = await fetch('/users');
  if (!response.ok) {
    throw new Error('Falha ao carregar usuarios');
  }
  const users = await response.json();
  renderUsers(users);
  setLastUpdate();
  setStatus('Pronto');
}

async function createUser(nome) {
  setStatus('Criando usuario...');
  const response = await fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.erro || 'Nao foi possivel criar');
  }

  await fetchUsers();
}

async function updateUser(id, nome) {
  setStatus('Salvando alteracoes...');
  const response = await fetch(`/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.erro || 'Nao foi possivel atualizar');
  }

  await fetchUsers();
}

async function deleteUser(id) {
  setStatus('Excluindo usuario...');
  const response = await fetch(`/users/${id}`, { method: 'DELETE' });
  if (!response.ok && response.status !== 204) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.erro || 'Nao foi possivel excluir');
  }
  await fetchUsers();
}

createForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(createForm);
  const nome = String(formData.get('nome') || '').trim();
  if (!nome) return;

  try {
    await createUser(nome);
    createForm.reset();
  } catch (err) {
    setStatus(err.message);
  }
});

refreshBtn.addEventListener('click', () => {
  fetchUsers().catch((err) => setStatus(err.message));
});

userList.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  const card = event.target.closest('.user-card');
  if (!card) return;

  const action = button.dataset.action;
  if (action === 'edit') {
    const form = card.querySelector('.edit-form');
    form.classList.toggle('hidden');
  }

  if (action === 'cancel') {
    const form = card.querySelector('.edit-form');
    form.classList.add('hidden');
  }

  if (action === 'delete') {
    const id = card.dataset.id;
    deleteUser(id).catch((err) => setStatus(err.message));
  }
});

userList.addEventListener('submit', (event) => {
  const form = event.target.closest('.edit-form');
  if (!form) return;

  event.preventDefault();
  const card = event.target.closest('.user-card');
  const id = card.dataset.id;
  const nome = String(form.querySelector('input[name="nome"]').value || '').trim();
  if (!nome) return;

  updateUser(id, nome)
    .then(() => form.classList.add('hidden'))
    .catch((err) => setStatus(err.message));
});

fetchUsers().catch((err) => {
  setStatus(err.message);
});

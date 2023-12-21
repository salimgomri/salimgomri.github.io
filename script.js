const candidatures = [
  { entreprise: 'Nom Entreprise A', poste: 'Poste A', date: '01/01/2023', suivi: 'Relance envoyée', etape: 'En attente de réponse' },
  { entreprise: 'Nom Entreprise B', poste: 'Poste B', date: '05/01/2023', suivi: 'Appel de suivi', etape: 'Entretien programmé' },
  // Ajoute d'autres données si nécessaire
];

function ouvrirFormulaire(candidature) {
  const form = document.createElement('form');
  form.innerHTML = `
    <label for="entreprise">Nom de l'entreprise:</label>
    <input type="text" id="entreprise" name="entreprise" value="${candidature ? candidature.entreprise : ''}"><br><br>
    <label for="poste">Poste:</label>
    <input type="text" id="poste" name="poste" value="${candidature ? candidature.poste : ''}"><br><br>
    <label for="date">Date de candidature:</label>
    <input type="text" id="date" name="date" value="${candidature ? candidature.date : ''}"><br><br>
    <label for="suivi">Suivi:</label>
    <input type="text" id="suivi" name="suivi" value="${candidature ? candidature.suivi : ''}"><br><br>
    <label for="etape">Réponse/Étape suivante:</label>
    <input type="text" id="etape" name="etape" value="${candidature ? candidature.etape : ''}"><br><br>
    <button id="submit-btn" class="btn btn-primary">${candidature ? 'Modifier' : 'Ajouter'}</button>
  `;

  const newWindow = window.open('', 'Candidature', 'width=400,height=400');
  newWindow.document.body.appendChild(form);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const nouvelObjet = {};
    formData.forEach((value, key) => {
      nouvelObjet[key] = value;
    });
    if (candidature) {
      candidatures[candidature.index] = nouvelObjet;
    } else {
      candidatures.push(nouvelObjet);
    }
    newWindow.close();
    afficherCandidatures();
  });
}

function editCandidature(event) {
  const index = event.target.closest('tr').getAttribute('data-index');
  const candidature = candidatures[index];
  candidature.index = index;
  ouvrirFormulaire(candidature);
}

function ajouterNouvelleLigne() {
  ouvrirFormulaire(null);
}

function afficherCandidatures() {
  const tableBody = document.getElementById('table-body');
  let html = '';

  candidatures.forEach((candidature, index) => {
    html += `
      <tr data-index="${index}">
        <td>${candidature.entreprise}</td>
        <td>${candidature.poste}</td>
        <td>${candidature.date}</td>
        <td>${candidature.suivi}</td>
        <td>${candidature.etape}</td>
        <td>
          <button class="btn btn-sm btn-primary btn-edit">Éditer</button>
          <button class="btn btn-sm btn-danger btn-delete">Supprimer</button>
        </td>
      </tr>
    `;
  });

  tableBody.innerHTML = html;

const btnsEdit = document.querySelectorAll('.btn-edit');
  btnsEdit.forEach(btn => {
    btn.addEventListener('click', editCandidature);
  });

const btnsDelete = document.querySelectorAll('.btn-delete');
  btnsDelete.forEach(btn => {
    btn.addEventListener('click', deleteCandidature);
  });
}

function deleteCandidature(event) {
  const index = event.target.closest('tr').getAttribute('data-index');
  candidatures.splice(index, 1);
  afficherCandidatures();
}

window.onload = () => {
  afficherCandidatures();
  const btnAjouterLigne = document.getElementById('ajouter-ligne');
  btnAjouterLigne.addEventListener('click', ajouterNouvelleLigne);
};


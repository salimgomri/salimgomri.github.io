const candidatures = [
  { entreprise: 'Nom Entreprise A', poste: 'Poste A', date: '01/01/2023', suivi: 'Relance envoyée', etape: 'En attente de réponse' },
  { entreprise: 'Nom Entreprise B', poste: 'Poste B', date: '05/01/2023', suivi: 'Appel de suivi', etape: 'Entretien programmé' },
  // Ajoute d'autres données si nécessaire
];


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

function ajouterNouvelleLigne() {
  // Afficher une fenêtre modale (popup) pour saisir les informations
  const nouvelleLigne = prompt('Entrez les informations séparées par des virgules : Nom Entreprise, Poste, Date, Suivi, Étape suivante');
  if (nouvelleLigne) {
    const infos = nouvelleLigne.split(',').map(info => info.trim());
    const nouvelleCandidature = {
      entreprise: infos[0],
      poste: infos[1],
      date: infos[2],
      suivi: infos[3],
      etape: infos[4]
    };
    candidatures.push(nouvelleCandidature);
    afficherCandidatures();
  }
}

function editCandidature(event) {
  const index = event.target.closest('tr').getAttribute('data-index');
  const candidature = candidatures[index];
  const nouvelleLigne = prompt('Entrez les nouvelles informations séparées par des virgules : Nom Entreprise, Poste, Date, Suivi, Étape suivante', `${candidature.entreprise}, ${candidature.poste}, ${candidature.date}, ${candidature.suivi}, ${candidature.etape}`);
  if (nouvelleLigne) {
    const infos = nouvelleLigne.split(',').map(info => info.trim());
    candidatures[index] = {
      entreprise: infos[0],
      poste: infos[1],
      date: infos[2],
      suivi: infos[3],
      etape: infos[4]
    };
    afficherCandidatures();
  }
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

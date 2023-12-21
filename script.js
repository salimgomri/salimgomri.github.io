const candidatures = [
  { entreprise: 'Nom Entreprise A', poste: 'Poste A', date: '01/01/2023', suivi: 'Relance envoyée', etape: 'En attente de réponse' },
  { entreprise: 'Nom Entreprise B', poste: 'Poste B', date: '05/01/2023', suivi: 'Appel de suivi', etape: 'Entretien programmé' },
  // Ajoute d'autres données si nécessaire
];

function afficherCandidatures() {
  const tableBody = document.getElementById('table-body');
  let html = '';

  candidatures.forEach((candidature) => {
    html += `<tr>
      <td>${candidature.entreprise}</td>
      <td>${candidature.poste}</td>
      <td>${candidature.date}</td>
      <td>${candidature.suivi}</td>
      <td>${candidature.etape}</td>
    </tr>`;
  });

  tableBody.innerHTML = html;
}

window.onload = afficherCandidatures;

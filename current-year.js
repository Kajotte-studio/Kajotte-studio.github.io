// Pobieramy element do zmiennej
const yearElement = document.getElementById("current-year");

// Sprawdzamy, czy element istnieje, zanim spróbujemy go edytować
if (yearElement) {
    // Używamy textContent zamiast innerHTML dla bezpieczeństwa i wydajności
    yearElement.textContent = new Date().getFullYear();
}
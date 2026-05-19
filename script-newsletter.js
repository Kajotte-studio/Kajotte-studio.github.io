document.addEventListener("DOMContentLoaded", () => {
    const feedContainer = document.getElementById("newsletter-feed");
    const statusMessage = document.getElementById("status-message");
    const currentLang = document.documentElement.lang || "pl";

    const i18n = {
        pl: {
            loading: "Wczytywanie najświeższych wieści...",
            empty: "Brak nowych wpisów. Zajrzyj do nas niedługo!",
            error: "Wystąpił problem podczas pobierania aktualizacji. Spróbuj odświeżyć stronę.",
            defaultDate: "Aktualizacja"
        },
        en: {
            loading: "Loading latest updates...",
            empty: "No new updates found. Check back soon!",
            error: "A problem occurred while fetching updates. Please refresh the page.",
            defaultDate: "Update"
        }
    };

    const msg = i18n[currentLang] || i18n.pl;
    const txtSource = "news/newsletter.txt";

    fetch(`${txtSource}?t=${Date.now()}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response error");
            }
            return response.text();
        })
        .then(data => {
            while (feedContainer.firstChild) {
                feedContainer.removeChild(feedContainer.firstChild);
            }

            const entries = data.split("---").slice(0, 7);
            let hasValidContent = false;

            entries.forEach(entry => {
                const trimmedEntry = entry.trim();
                if (trimmedEntry.length === 0) return;

                hasValidContent = true;

                const firstColonIndex = trimmedEntry.indexOf(":");
                let dateText = msg.defaultDate;
                let contentText = trimmedEntry;

                if (firstColonIndex !== -1) {
                    dateText = trimmedEntry.substring(0, firstColonIndex).trim();
                    contentText = trimmedEntry.substring(firstColonIndex + 1).trim();
                }

                const card = document.createElement("article");
                card.className = "glass-card";

                const dateDiv = document.createElement("div");
                dateDiv.className = "news-date";
                dateDiv.textContent = dateText;

                const contentDiv = document.createElement("div");
                contentDiv.className = "news-content";

                const lines = contentText.split("\n");

                lines.forEach(line => {
                    const trimmedLine = line.trim();
                    if (trimmedLine.length === 0) return;

                    const lineContainer = document.createElement("div");
                    lineContainer.className = "log-line";

                    if (trimmedLine.startsWith("[NEW]")) {
                        const badge = document.createElement("span");
                        badge.className = "badge badge-new";
                        badge.textContent = "[NEW]";
                        lineContainer.appendChild(badge);
                        lineContainer.appendChild(document.createTextNode(trimmedLine.substring(5)));
                    } else if (trimmedLine.startsWith("[UPD]")) {
                        const badge = document.createElement("span");
                        badge.className = "badge badge-upd";
                        badge.textContent = "[UPD]";
                        lineContainer.appendChild(badge);
                        lineContainer.appendChild(document.createTextNode(trimmedLine.substring(5)));
                    } else if (trimmedLine.startsWith("[FIX]")) {
                        const badge = document.createElement("span");
                        badge.className = "badge badge-fix";
                        badge.textContent = "[FIX]";
                        lineContainer.appendChild(badge);
                        lineContainer.appendChild(document.createTextNode(trimmedLine.substring(5)));
                    } else {
                        lineContainer.textContent = line;
                    }

                    contentDiv.appendChild(lineContainer);
                });

                card.appendChild(dateDiv);
                card.appendChild(contentDiv);
                feedContainer.appendChild(card);
            });

            if (!hasValidContent) {
                statusMessage.textContent = msg.empty;
                feedContainer.appendChild(statusMessage);
            }
        })
        .catch(error => {
            console.error("Kajotte Studio Feed Error:", error);
            if (statusMessage) {
                statusMessage.textContent = msg.error;
                statusMessage.className = "error-state";
            }
        });
});
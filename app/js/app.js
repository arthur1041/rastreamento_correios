function htd(code) {
    const parser = new DOMParser();
    return parser.parseFromString(code, "text/html").querySelector("body").firstChild;
}

let trackingCode = null;
let trackingBtn = null;
let trackingResult = null;
// "PY926788960BR";
// OM263467863BR
DomReady.ready(function () {
    trackingBtn = document.getElementById("btn-track");
    trackingResult = document.querySelector(".tracking-result");

    trackingBtn.onclick = function () {
        trackingCode = document.getElementById("tracking-code").value;

        fetch("https://api.rastrearpedidos.com.br/api/rastreio/v1?codigo=" + trackingCode).then(function (response) {
            return response.json();
        }).then(function (jsonResponse) {
            trackingResult.innerHTML = "";
            try {
                jsonResponse.forEach(function (el) {
                    console.log(el);
                    trackingResult.append(htd(`
                        <div class="tracking-item">${el.dataHora} ${el.descricao} ${el.cidade} ${el.uf}</div>
                    `));
                });
            } catch (error) {
                trackingResult.append(htd(`
                        <div class="tracking-item tracking-warning">Aguardando postagem pelo remetente.</div>
                `));
            }
        });
    }
})


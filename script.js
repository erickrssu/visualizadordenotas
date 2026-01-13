const btn_importar = document.getElementById("importar_xml")
const inputXML = document.getElementById("input_xml")

btn_importar.addEventListener("click",() =>{inputXML.click();});
inputXML.addEventListener("change",() =>{
    const arquivos = inputXML.files;
limparTabela();
    for(const arquivo of arquivos){
        lerXML(arquivo)
    }
});

const links = document.querySelectorAll("#navbar a");

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(l => l.classList.remove("ativo"));
        link.classList.add("ativo");
        
    });
});

const checkboxes = document.querySelectorAll('.imposto');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        // 1. Seleção Única
        if (this.checked) {
            checkboxes.forEach(outra => {
                if (outra !== this) outra.checked = false;
            });
        }

        // 2. Captura todos os elementos que possuem as classes (básicas ou visíveis)
        const todosIcms = document.querySelectorAll('.icms, .icms_visivel');
        const todosPis = document.querySelectorAll('.pis, .pis_visivel');
        const todosCofins = document.querySelectorAll('.cofins, .cofins_visivel');

        // 3. Troca o nome da classe completamente
        // Trata ICMS
        todosIcms.forEach(el => {
            if (this.checked && this.value === 'icms') {
                el.className = 'icms_visivel'; // Substitui tudo por icms_visivel
            } else {
                el.className = 'icms'; // Volta para o nome básico
            }
        });

        // Trata PIS
        todosPis.forEach(el => {
            if (this.checked && this.value === 'pis') {
                el.className = 'pis_visivel';
            } else {
                el.className = 'pis';
            }
        });

        // Trata COFINS
        todosCofins.forEach(el => {
            if (this.checked && this.value === 'cofins') {
                el.className = 'cofins_visivel';
            } else {
                el.className = 'cofins';
            }
        });
    });
});

function lerXML(arquivo) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const xmlTexto = e.target.result;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlTexto, "text/xml");

        extrairDados(xmlDoc, arquivo.name);
    };

    reader.readAsText(arquivo);
}

function extrairDados(xml, nomeArquivo) {
    let dataTratar = xml.querySelector("dhEmi")?.textContent || xml.querySelector("dEmi")?.textContent || "";
    if(dataTratar != ""){
        dataTratar = dataTratar.substring(0,10);
        dataTratar = dataTratar.replace(/-/g,"/");
    }
    
    const dados = {
        arquivo: nomeArquivo,

        // Dados principais
        chave: xml.querySelector("chNFe")?.textContent || "",
        numero: xml.querySelector("nNF")?.textContent || "",
        data: dataTratar,
        emitente: xml.querySelector("emit > xNome")?.textContent || "",
        uf: xml.querySelector("emit > enderEmit > UF")?.textContent || "",
        valor: xml.querySelector("vNF")?.textContent || "0",

        bs_icms: xml.querySelector("vBC")?.textContent || "0",
        v_icms: xml.querySelector("vICMS")?.textContent || "0",

        v_pis: xml.querySelector("vPIS")?.textContent || "0",

        v_cofins: xml.querySelector("vCOFINS")?.textContent || "0",

        desconto: xml.querySelector("vDesc")?.textContent || "0",
        outras: xml.querySelector("vOutro")?.textContent || "0",
        frete: xml.querySelector("vFrete")?.textContent || "0"
    };
    adicionarNaTabela(dados);
}
function limparTabela(){
    const tbody = document.querySelector("#tabela_xml tbody");
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild)
    }
}
function adicionarNaTabela(d) {
    const tbody = document.querySelector("#tabela_xml tbody");

    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="arq">${d.arquivo}</td>
        <td>${d.chave}</td>
        <td>${d.numero}</td>
        <td>${d.data}</td>
        <td>${d.emitente}</td>
        <td>${d.uf}</td>
        <td>R$ ${Number(d.valor).toFixed(2)}</td>
        <td class="icms">R$ ${Number(d.bs_icms).toFixed(2)}</td>
        <td class="icms">R$ ${Number(d.v_icms).toFixed(2)}</td>
        <td class="pis">R$ ${Number(d.v_pis).toFixed(2)}</td>
        <td class="cofins">R$ ${Number(d.v_cofins).toFixed(2)}</td>
        <td>R$ ${Number(d.desconto).toFixed(2)}</td>
        <td>R$ ${Number(d.outras).toFixed(2)}</td>
        <td>R$ ${Number(d.frete).toFixed(2)}</td>
    `;

    tbody.appendChild(tr);
}


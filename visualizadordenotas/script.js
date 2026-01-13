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

const links = document.querySelectorAll('#navbar a');

const notas = document.getElementById('notas');
const itens = document.getElementById('itens');
const desdob = document.getElementById('desdobramentos');

links.forEach(link => {
    link.addEventListener('click', () => {

        // ativa o link
        links.forEach(l => l.classList.remove('ativo'));
        link.classList.add('ativo');

        // volta todos para o id base
        notas.id = 'notas';
        itens.id = 'itens';
        desdob.id = 'desdobramentos';

        // altera o id conforme o clique
        if (link.textContent === 'Notas') {
            notas.id = 'notas_visivel';
        }

        if (link.textContent === 'Itens') {
            itens.id = 'itens_visivel';
        }

        if (link.textContent === 'Desdobramentos') {
            desdob.id = 'desdobramentos_visivel';
        }
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
        bs_icms: xml.querySelector("total > ICMSTot > vBC")?.textContent || "0",
        v_icms: xml.querySelector("total > ICMSTot > vICMS")?.textContent || "0",
        v_pis: xml.querySelector("total > ICMSTot > vPIS")?.textContent || "0",
        v_cofins: xml.querySelector("total > ICMSTot > vCOFINS")?.textContent || "0",
        desconto: xml.querySelector("total > ICMSTot > vDesc")?.textContent || "0",
        outras: xml.querySelector("total > ICMSTot > vOutro")?.textContent || "0",
        frete: xml.querySelector("total > ICMSTot > vFrete")?.textContent || "0"
    };
    const produtos = [];
    xml.querySelectorAll("det").forEach(det =>{
        const produto = {
        arquivo: nomeArquivo,
        codigo: det.querySelector("prod > cProd")?.textContent || "",
        descricao: det.querySelector("prod > xProd")?.textContent || "",
        NCM: det.querySelector("prod > NCM")?.textContent || "",
        vProd: det.querySelector("prod > vProd")?.textContent || "",
        CFOP: det.querySelector("prod > CFOP")?.textContent || "",
        icmscst: det.querySelector("ICMS CST")?.textContent || "",
        aliqicms: det.querySelector("ICMS pICMS")?.textContent || "",
        bsicms: det.querySelector("ICMS vBC")?.textContent || "",
        vicms: det.querySelector("ICMS vICMS")?.textContent || "",
        cstpis: det.querySelector("PIS CST")?.textContent || "",
        aliqpis: det.querySelector("PIS pPIS")?.textContent || "",
        bspis: det.querySelector("PIS vBC")?.textContent || "",
        vpis: det.querySelector("PIS vPIS")?.textContent || "",
        cstcofins: det.querySelector("COFINS CST")?.textContent || "",
        aliqcofins: det.querySelector("COFINS pCOFINS")?.textContent || "",
        bscofins: det.querySelector("COFINS vBC")?.textContent || "",
        vcofins: det.querySelector("COFINS vCOFINS")?.textContent || "",
        pdesconto: det.querySelector("prod > vDesc")?.textContent || "",
        poutras: det.querySelector("prod > vOutro")?.textContent || "",
        pfrete: det.querySelector("prod > vDesc")?.textContent || "",
        };
        produtos.push(produto);
    });

    adicionarNaTabela(dados);
    adicionarItens(produtos);
}
function limparTabela(){
    const tbody = document.querySelector("#tabela_xml tbody");
    while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild)
    }
    const tbodyi = document.querySelector("#tabela_itens tbody");
    while(tbodyi.firstChild){
        tbodyi.removeChild(tbodyi.firstChild)
    }
}
function adicionarItens(produtos){
    const tbody = document.querySelector("#tabela_itens tbody");

    produtos.forEach(i => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="arq">${i.arquivo}</td>
            <td>${i.codigo}</td>
            <td>${i.descricao}</td>
            <td>${i.NCM}</td>
            <td>R$ ${Number(i.vProd).toFixed(2)}</td>
            <td>${i.CFOP}</td>

            <td class="icms">${i.icmscst}</td>
            <td class="icms">${i.aliqicms}</td>
            <td class="icms">R$ ${Number(i.bsicms).toFixed(2)}</td>
            <td class="icms">R$ ${Number(i.vicms).toFixed(2)}</td>

            <td class="pis">${i.cstpis}</td>
            <td class="pis">${i.aliqpis}</td>
            <td class="pis">R$ ${Number(i.bspis).toFixed(2)}</td>
            <td class="pis">R$ ${Number(i.vpis).toFixed(2)}</td>

            <td class="cofins">${i.cstcofins}</td>
            <td class="cofins">${i.aliqcofins}</td>
            <td class="cofins">R$ ${Number(i.bscofins).toFixed(2)}</td>
            <td class="cofins">R$ ${Number(i.vcofins).toFixed(2)}</td>

            <td>R$ ${Number(i.pdesconto).toFixed(2)}</td>
            <td>R$ ${Number(i.poutras).toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
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



const btn_importar = document.getElementById("importar_xml")
const inputXML = document.getElementById("input_xml")

let interestadual = 0;
let invalido = 0;
let valorNF = 0;
let valorInter = 0;
let icmsTotal = 0;
let ipiTotal = 0;
let ibscbsTotal = 0;
let pisTotal = 0;
let cofinsTotal = 0;
btn_importar.addEventListener("click",() =>{inputXML.click();});
inputXML.addEventListener("change", () => {
    const arquivos = inputXML.files;

    limparTabela();
    interestadual = 0;
     invalido = 0;
     valorNF = 0;
     valorInter = 0;
     icmsTotal = 0;
     ipiTotal = 0;
     ibscbsTotal = 0;
     pisTotal = 0;
     cofinsTotal = 0;
    
    let nNotas = arquivos.length;
    let lidos = 0;

    for (const arquivo of arquivos) {
        lerXML(arquivo, () => {
            lidos++;

            if (lidos === arquivos.length) {
                addImportados(nNotas);
                addInterestadual(interestadual);
                addCancelado(invalido);
                adicionarValores(valorNF, valorInter, icmsTotal, ipiTotal, ibscbsTotal, pisTotal, cofinsTotal);
            }
        });
    }
    sessionStorage.clear();
});
function adicionarValores(valorNF, valorInter, icmsTotal, ipiTotal, ibscbsTotal, pisTotal, cofinsTotal){
    let elemento = document.getElementById("vnf");
    elemento.textContent = "Valor Total:" + " R$ " + Number(valorNF).toFixed(2);
    elemento = document.getElementById("vinter");
    elemento.textContent = "Valor Interestadual:" + " R$ " + Number(valorInter).toFixed(2);
    elemento = document.getElementById("vicms");
    elemento.textContent = "ICMS:" + " R$ " + Number(icmsTotal).toFixed(2);
    elemento = document.getElementById("vipi");
    elemento.textContent = "IPI:" + " R$ " + Number(ipiTotal).toFixed(2);
    elemento = document.getElementById("vibscbs");
    elemento.textContent = "IBS / CBS:" + " R$ " + Number(ibscbsTotal).toFixed(2);
    elemento = document.getElementById("vpis");
    elemento.textContent = "PIS:" + " R$ " + Number(pisTotal).toFixed(2);
    elemento = document.getElementById("vcofins");
    elemento.textContent = "COFINS:" + " R$ " + Number(cofinsTotal).toFixed(2);
}
function addImportados(nNotas){
    const divnotas = document.querySelector(".importados");

    const tr = document.createElement("p");
    tr.innerHTML = `${nNotas}`;
    tr.classList.add("numNotas");
    divnotas.querySelector(".numNotas")?.remove();
    divnotas.appendChild(tr)

}
function addInterestadual(interestadual){
    const divnotas = document.querySelector(".interestadual");

    const tr = document.createElement("p");
    tr.innerHTML = `${interestadual}`;
    tr.classList.add("numNotas");
    divnotas.querySelector(".numNotas")?.remove();
    divnotas.appendChild(tr)

}
function addCancelado(invalido){
    const divnotas = document.querySelector(".cancelados");

    const tr = document.createElement("p");
    tr.innerHTML = `${invalido}`;
    tr.classList.add("numNotas");
    divnotas.querySelector(".numNotas")?.remove();
    divnotas.appendChild(tr)
    const log = document.querySelector("div.arq")
    if(log !== null){
        log.className = "log";
    }
    
}

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
const checkbox = document.querySelector('.interestaduais');

checkbox.addEventListener('change', function () {
    const fest = document.querySelectorAll('.est, .est_visivel');

    fest.forEach(el => {
        if (this.checked) {
            el.classList.remove('est_visivel');
            el.classList.add('est');
        } else {
            el.classList.remove('est');
            el.classList.add('est_visivel');
        }
    });
});
const checkboxes_ibs_cbs = document.querySelectorAll('.imposto_ibs_cbs');

checkboxes_ibs_cbs.forEach(checkbox => {
    checkbox.addEventListener('change', function() {

        if (this.checked) {
            checkboxes_ibs_cbs.forEach(outra => {
                if (outra !== this) outra.checked = false;
            });
        }
        const ibs = document.querySelectorAll('.ibs, .ibs_visivel');
        const cbs = document.querySelectorAll('.cbs, .cbs_visivel');
        

        ibs.forEach(el => {
            if (this.checked && this.value === 'ibs') {
                el.className = 'ibs_visivel';
            } else {
                el.className = 'ibs';
            }
        });

        cbs.forEach(el => {
            if (this.checked && this.value === 'cbs') {
                el.className = 'cbs_visivel';
                
            } else {
                el.className = 'cbs';
            }
        });
    });
});

const checkboxes = document.querySelectorAll('.imposto');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {

        if (this.checked) {
            checkboxes.forEach(outra => {
                if (outra !== this) outra.checked = false;
            });
        }
        const ibs = document.querySelectorAll('.ibs, .ibs_visivel');
        const cbs = document.querySelectorAll('.cbs, .cbs_visivel');
        const divIBSCBS = document.querySelector('.div_ibs_cbs, .div_ibs_cbs_visivel');
        const todosIBSCBS = document.querySelectorAll('.ibs_cbs, .ibs_cbs_visivel');
        const todosIcms = document.querySelectorAll('.icms, .icms_visivel');
        const todosPis = document.querySelectorAll('.pis, .pis_visivel');
        const todosCofins = document.querySelectorAll('.cofins, .cofins_visivel');
        const todosIpi = document.querySelectorAll('.ipi, .ipi_visivel');

        todosIcms.forEach(el => {
            if (this.checked && this.value === 'icms') {
                el.className = 'icms_visivel'; 
            } else {
                el.className = 'icms';
            }
        });
        todosIBSCBS.forEach(el => {
            if (this.checked && this.value === 'ibs_cbs') {
                el.className = 'ibs_cbs_visivel';
                
            } else {
                el.className = 'ibs_cbs';
            }
        });

        ibs.forEach(el => {
            if (this.checked && this.value === 'ibs_cbs') {
                el.className = 'ibs_visivel';
                
            } else {
                el.className = 'ibs';
            }
        });

        cbs.forEach(el => {
            if (this.checked && this.value === 'ibs_cbs') {
                el.className = 'cbs_visivel';
                
            } else {
                el.className = 'cbs';
            }
        });


        if (this.checked && this.value === 'ibs_cbs') {
                divIBSCBS.className = 'div_ibs_cbs_visivel';
            } else {
                divIBSCBS.className = 'div_ibs_cbs';
            }

        // Trata PIS
        todosPis.forEach(el => {
            if (this.checked && this.value === 'pis') {
                el.className = 'pis_visivel';
            } else {
                el.className = 'pis';
            }
        });

        todosCofins.forEach(el => {
            if (this.checked && this.value === 'cofins') {
                el.className = 'cofins_visivel';
            } else {
                el.className = 'cofins';
            }
        });
        todosIpi.forEach(el => {
            if (this.checked && this.value === 'ipi') {
                el.className = 'ipi_visivel';
            } else {
                el.className = 'ipi';
            }
        });
    });
});

function lerXML(arquivo, callback) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const xmlTexto = e.target.result;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlTexto, "text/xml");

        extrairDados(xmlDoc, arquivo.name);

        if (callback) callback();
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
        chave: xml.querySelector("chNFe")?.textContent || "",
        numero: xml.querySelector("nNF")?.textContent || "",
        data: dataTratar,
        emitente: xml.querySelector("emit > xNome")?.textContent || "",
        uf: xml.querySelector("emit > enderEmit > UF")?.textContent || "",
        valor: xml.querySelector("vNF")?.textContent || "0",
        bs_icms: xml.querySelector("total > ICMSTot > vBC")?.textContent || "0",
        v_icms: xml.querySelector("total > ICMSTot > vICMS")?.textContent || "0",
        v_ipi: xml.querySelector("total > ICMSTot > vIPI")?.textContent || "0",
        bs_ibs_cbs: xml.querySelector("total > IBSCBSTot > vBCIBSCBS") || "0",
        v_ibs: xml.querySelector("gIBS > vIBS")?.textContent || "0",
        v_ibs_uf: xml.querySelector("gIBSUF > vIBSUF")?.textContent || "0",
        v_ibs_m: xml.querySelector("gIBSMUN > vIBSMUN")?.textContent || "0",
        v_cbs: xml.querySelector("gCBS > vCBS")?.textContent || "0",
        v_pis: xml.querySelector("total > ICMSTot > vPIS")?.textContent || "0",
        v_cofins: xml.querySelector("total > ICMSTot > vCOFINS")?.textContent || "0",
        desconto: xml.querySelector("total > ICMSTot > vDesc")?.textContent || "0",
        outras: xml.querySelector("total > ICMSTot > vOutro")?.textContent || "0",
        frete: xml.querySelector("total > ICMSTot > vFrete")?.textContent || "0"
    };
    if(dados.uf != "BA" && dados.uf != ""){
        interestadual++;
    }
    if(dados.numero === "" && dados.data === "" && dados.emitente === ""){
        invalido++;
    }

    const produtos = [];
    xml.querySelectorAll("det").forEach(det =>{
        const produto = {
        arquivo: nomeArquivo,
        codigo: det.querySelector("prod > cProd")?.textContent || "",
        descricao: det.querySelector("prod > xProd")?.textContent || "",
        NCM: det.querySelector("prod > NCM")?.textContent || "",
        vProd: det.querySelector("prod > vProd")?.textContent || "",
        CFOP: det.querySelector("prod > CFOP")?.textContent || "",
        cst_ibs_cbs: det.querySelector("IBSCBS > CST")?.textContent || "",
        cct: det.querySelector("IBSCBS > cClassTrib")?.textContent || "",

        bsibscbs: det.querySelector("gIBSCBS > vBC")?.textContent || "0",
        aliqibsuf: det.querySelector("gIBSUF > pIBSUF")?.textContent || "0",
        vibsufuf: det.querySelector("gIBSUF > vIBSUF")?.textContent || "0",
        aliqibsm: det.querySelector("gIBSMun > pIBSMun")?.textContent || "0",
        vibsm: det.querySelector("gIBSMun > vIBSMun")?.textContent || "0",
        vibs: det.querySelector("gIBSCBS > vIBS")?.textContent || "0",
        aliqcbs: det.querySelector("gCBS > pCBS")?.textContent || "0",
        vcbs: det.querySelector("gCBS > vCBS")?.textContent || "0",
        
        icmsorig: det.querySelector("ICMS orig")?.textContent || "",
        icmscst: det.querySelector("ICMS CST")?.textContent || "",
        aliqicms: det.querySelector("ICMS pICMS")?.textContent || "0",
        bsicms: det.querySelector("ICMS vBC")?.textContent || "0",
        vicms: det.querySelector("ICMS vICMS")?.textContent || "0",

        ipicst: det.querySelector("IPI CST")?.textContent || "",
        aliqipi: det.querySelector("IPI pIPI")?.textContent || "0",
        bsipi: det.querySelector("IPI vBC")?.textContent || "0",
        vipi: det.querySelector("IPI vIPI")?.textContent || "0",

        cstpis: det.querySelector("PIS CST")?.textContent || "",
        aliqpis: det.querySelector("PIS pPIS")?.textContent || "",
        bspis: det.querySelector("PIS vBC")?.textContent || "0",
        vpis: det.querySelector("PIS vPIS")?.textContent || "0",
        cstcofins: det.querySelector("COFINS CST")?.textContent || "",
        aliqcofins: det.querySelector("COFINS pCOFINS")?.textContent || "0",
        bscofins: det.querySelector("COFINS vBC")?.textContent || "0",
        vcofins: det.querySelector("COFINS vCOFINS")?.textContent || "0",
        pdesconto: det.querySelector("prod > vDesc")?.textContent || "0",
        poutras: det.querySelector("prod > vOutro")?.textContent || "0",
        pfrete: det.querySelector("prod > vFrete")?.textContent || "0",
        };
        produtos.push(produto);
    });
    relatorio(produtos);
    adicionarNaTabela(dados);
    adicionarItens(produtos);
    renderizarTabelaCFOP();
    
}
function relatorio(p) {
    let icmsAgrupado = JSON.parse(sessionStorage.getItem('resumo_icms')) || {};
    let ibscbsAgrupado = JSON.parse(sessionStorage.getItem('resumo_ibscbs')) || {};
    let pisAgrupado = JSON.parse(sessionStorage.getItem('resumo_pis')) || {};
    let cofinsAgrupado = JSON.parse(sessionStorage.getItem('resumo_cofins')) ||{};

    p.forEach(i => {
        let aliqibscbs = parseFloat(i.aliqibsm) + parseFloat(i.aliqibsuf) + parseFloat(i.aliqcbs);
        const chaveICMS = `${i.icmsorig}${i.icmscst}|${i.aliqicms}|${i.CFOP}`;
        const chaveIBSCBS = `${i.cst_ibs_cbs}|${aliqibscbs}|${i.cct}|${i.CFOP}`;
        const chavePIS = `${i.cstpis}|${i.aliqpis}|${i.CFOP}`;
        const chaveCOFINS = `${i.cstcofins}|${i.aliqcofins}|${i.CFOP}`;
        
        if(!ibscbsAgrupado[chaveIBSCBS]){
            ibscbsAgrupado[chaveIBSCBS] = {
                cst: i.cst_ibs_cbs || "N/A",
                aliq: aliqibscbs || "0",
                cfop: i.CFOP || "N/A",
                cct: i.cct || "N/A",
                base: 0,
                valorIBSCBS: 0,
                valorTotal: 0
            };
        }
        valorIC = parseFloat(i.vibs) + parseFloat(i.vcbs);
        ibscbsAgrupado[chaveIBSCBS].base += parseFloat(i.bsibscbs || 0);
        ibscbsAgrupado[chaveIBSCBS].valorIBSCBS += parseFloat(valorIC || 0);

        if (!icmsAgrupado[chaveICMS]) {
            icmsAgrupado[chaveICMS] = {
                cst: i.icmsorig + i.icmscst || "N/A",
                aliq: i.aliqicms || "0",
                cfop: i.CFOP || "N/A",
                base: 0,
                valorICMS: 0,
                valorTotal: 0
            };
        }

        icmsAgrupado[chaveICMS].base += parseFloat(i.bsicms || 0);
        icmsAgrupado[chaveICMS].valorICMS += parseFloat(i.vicms || 0);

        if (!pisAgrupado[chavePIS]) {
            pisAgrupado[chavePIS] = {
                cst: i.cstpis || "N/A",
                aliq: i.aliqpis || "0",
                cfop: i.CFOP || "N/A",
                base: 0,
                valorPIS: 0,
                valorTotal: 0
            };
        }

        pisAgrupado[chavePIS].base += parseFloat(i.bspis || 0);
        pisAgrupado[chavePIS].valorICMS += parseFloat(i.vpis || 0);
        
        if (!cofinsAgrupado[chaveCOFINS]) {
            cofinsAgrupado[chaveCOFINS] = {
                cst: i.cstcofins || "N/A",
                aliq: i.aliqcofins || "0",
                cfop: i.CFOP || "N/A",
                base: 0,
                valorCOFINS: 0,
                valorTotal: 0
            };
        }

        cofinsAgrupado[chaveCOFINS].base += parseFloat(i.bscofins || 0);
        cofinsAgrupado[chaveCOFINS].valorCOFINS += parseFloat(i.vcofins || 0);

        const vProd = parseFloat(i.vProd || 0);
        const desc = parseFloat(i.pdesconto || 0);
        const outro = parseFloat(i.poutras || 0);
        const frete = parseFloat(i.pfrete || 0);
        
        icmsAgrupado[chaveICMS].valorTotal += (vProd - desc + outro + frete);
        ibscbsAgrupado[chaveIBSCBS].valorTotal += (vProd - desc + outro + frete);
        pisAgrupado[chavePIS].valorTotal += (vProd - desc + outro + frete);
        cofinsAgrupado[chaveCOFINS].valorTotal += (vProd - desc + outro + frete);
    });

    sessionStorage.setItem('resumo_icms', JSON.stringify(icmsAgrupado));    
    sessionStorage.setItem('resumo_ibscbs', JSON.stringify(ibscbsAgrupado));
    sessionStorage.setItem('resumo_pis', JSON.stringify(pisAgrupado));
    sessionStorage.setItem('resumo_cofins', JSON.stringify(cofinsAgrupado));
}
function renderizarTabelaCFOP() {
    const tbody = document.querySelector("#tabela_cfop tbody");
    const dadosICMS = JSON.parse(sessionStorage.getItem('resumo_icms')) || {};
    const dadosIC = JSON.parse(sessionStorage.getItem('resumo_ibscbs')) || {};
    const dadosPIS = JSON.parse(sessionStorage.getItem('resumo_pis')) || {};
    const dadosCOFINS = JSON.parse(sessionStorage.getItem('resumo_cofins')) || {};

    tbody.innerHTML = "";

    Object.values(dadosICMS).forEach(item => {
        const tr = document.createElement("tr");
        tr.className = "icms"
        
        tr.innerHTML = `
            <td><strong>${item.cfop}</strong></td>
            <td>${item.cst}</td>
            <td>${Number(item.aliq).toFixed(2)}%</td>
            <td>R$ ${item.valorTotal.toFixed(2)}</td>
            <td>R$ ${item.base.toFixed(2)}</td>
            <td>R$ ${item.valorICMS.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
    Object.values(dadosIC).forEach(item => {
        const tr = document.createElement("tr");
        tr.className = "ibs_cbs"

        tr.innerHTML = `
            <td><strong>${item.cfop}</strong></td>
            <td>${item.cst}</td>
            <td>${item.cct}</td>
            <td>${Number(item.aliq).toFixed(2)}%</td>
            <td>R$ ${item.valorTotal.toFixed(2)}</td>
            <td>R$ ${item.base.toFixed(2)}</td>
            <td>R$ ${item.valorIBSCBS.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
    Object.values(dadosPIS).forEach(item => {
        const tr = document.createElement("tr");
        tr.className = "pis"

        tr.innerHTML = `
            <td><strong>${item.cfop}</strong></td>
            <td>${item.cst}</td>
            <td>${Number(item.aliq).toFixed(2)}%</td>
            <td>R$ ${item.valorTotal.toFixed(2)}</td>
            <td>R$ ${item.base.toFixed(2)}</td>
            <td>R$ ${item.valorPIS.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
    Object.values(dadosCOFINS).forEach(item => {
        const tr = document.createElement("tr");
        tr.className = "cofins"

        tr.innerHTML = `
            <td><strong>${item.cfop}</strong></td>
            <td>${item.cst}</td>
            <td>${Number(item.aliq).toFixed(2)}%</td>
            <td>R$ ${item.valorTotal.toFixed(2)}</td>
            <td>R$ ${item.base.toFixed(2)}</td>
            <td>R$ ${item.valorCOFINS.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
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
         tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="arq">${i.arquivo}</td>
            <td>${i.codigo}</td>
            <td>${i.descricao}</td>
            <td>${i.NCM}</td>
            <td>R$ ${Number(i.vProd).toFixed(2)}</td>
            <td>${i.CFOP}</td>

            <td class="ibs_cbs">${i.cst_ibs_cbs}</td>
            <td class="ibs_cbs">${i.cct}</td>
            <td class="ibs_cbs">${Number(i.bsibscbs).toFixed(2)}</td>
            <td class="ibs">${Number(i.aliqibsuf).toFixed(2)}</td>
            <td class="ibs">R$ ${Number(i.vibsufuf).toFixed(2)}</td>
            <td class="ibs">${Number(i.aliqibsm).toFixed(2)}</td>
            <td class="ibs">R$ ${Number(i.vibsm).toFixed(2)}</td>
            <td class="ibs">R$ ${Number(i.vibs).toFixed(2)}</td>
            <td class="cbs">${Number(i.aliqcbs).toFixed(2)}</td>
            <td class="cbs">R$ ${Number(i.vcbs).toFixed(2)}</td>

            <td class="icms">${i.icmsorig}${i.icmscst}</td>
            <td class="icms">${i.aliqicms}</td>
            <td class="icms">R$ ${Number(i.bsicms).toFixed(2)}</td>
            <td class="icms">R$ ${Number(i.vicms).toFixed(2)}</td>

            <td class="ipi">${i.ipicst}</td>
            <td class="ipi">${i.aliqipi}</td>
            <td class="ipi">R$ ${Number(i.bsipi).toFixed(2)}</td>
            <td class="ipi">R$ ${Number(i.vipi).toFixed(2)}</td>

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
    valorNF = valorNF + parseFloat(d.valor || 0);
    icmsTotal = icmsTotal + parseFloat(d.v_icms || 0);
    ipiTotal = ipiTotal + parseFloat(d.v_ipi || 0);
    let ibscbsJuntos = 0;
    ibscbsJuntos = parseFloat(d.v_ibs || 0) + parseFloat(d.v_cbs || 0)
    ibscbsTotal = ibscbsTotal + parseFloat(ibscbsJuntos || 0);

    pisTotal = pisTotal + parseFloat(d.v_pis || 0);
    cofinsTotal = cofinsTotal + parseFloat(d.v_cofins || 0);
    const tbody = document.querySelector("#tabela_xml tbody");

    tr = document.createElement("tr");
    if(d.uf === "BA" || d.uf === ""){
        tr = document.createElement("tr");
        tr.className = "est_visivel";
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
        <td class="ipi">R$ ${Number(d.v_ipi).toFixed(2)}</td>
        <td class="ibs_cbs">R$ ${Number(d.bs_ibs_cbs).toFixed(2)}</td>
        <td class="ibs">R$ ${Number(d.v_ibs).toFixed(2)}</td>
        <td class="ibs">R$ ${Number(d.v_ibs_uf).toFixed(2)}</td>
        <td class="ibs">R$ ${Number(d.v_ibs_m).toFixed(2)}</td>
        <td class="cbs">R$ ${Number(d.v_cbs).toFixed(2)}</td>
        <td class="pis">R$ ${Number(d.v_pis).toFixed(2)}</td>
        <td class="cofins">R$ ${Number(d.v_cofins).toFixed(2)}</td>
        <td>R$ ${Number(d.desconto).toFixed(2)}</td>
        <td>R$ ${Number(d.outras).toFixed(2)}</td>
        <td>R$ ${Number(d.frete).toFixed(2)}</td>
    `;
    }else{
        valorInter = valorInter + parseFloat(d.valor)
        tr = document.createElement("tr");
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
        <td class="ipi">R$ ${Number(d.v_ipi).toFixed(2)}</td>
        <td class="ibs_cbs">R$ ${Number(d.bs_ibs_cbs).toFixed(2)}</td>
        <td class="ibs">R$ ${Number(d.v_ibs).toFixed(2)}</td>
        <td class="ibs">R$ ${Number(d.v_ibs_uf).toFixed(2)}</td>
        <td class="ibs">R$ ${Number(d.v_ibs_m).toFixed(2)}</td>
        <td class="cbs">R$ ${Number(d.v_cbs).toFixed(2)}</td>
        <td class="pis">R$ ${Number(d.v_pis).toFixed(2)}</td>
        <td class="cofins">R$ ${Number(d.v_cofins).toFixed(2)}</td>
        <td>R$ ${Number(d.desconto).toFixed(2)}</td>
        <td>R$ ${Number(d.outras).toFixed(2)}</td>
        <td>R$ ${Number(d.frete).toFixed(2)}</td>
        `;
    }
    tbody.appendChild(tr);
}


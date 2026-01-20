let interestadual = 0;
let invalido = 0;
const btn_importar = document.getElementById("importar_xml")
const inputXML = document.getElementById("input_xml")

btn_importar.addEventListener("click",() =>{inputXML.click();});
inputXML.addEventListener("change", () => {
    const arquivos = inputXML.files;

    limparTabela();
    interestadual = 0;
    let nNotas = arquivos.length;
    let lidos = 0;

    for (const arquivo of arquivos) {
        lerXML(arquivo, () => {
            lidos++;

            if (lidos === arquivos.length) {
                addImportados(nNotas);
                addInterestadual(interestadual);
                addCancelado(invalido);
            }
        });
    }
});
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
    log.className = "log";
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

        if (callback) callback(); // 🔥 avisa que terminou
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
        v_ibs: xml.querySelector("gIBS > vIBS") || "0",
        v_ibs_uf: xml.querySelector("gIBSUF > vIBSUF") || "0",
        v_ibs_m: xml.querySelector("gIBSMUN > vIBSMUN") || "0",
        v_cbs: xml.querySelector("gCBS > vCBS") || "0",
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

        bsibscbs: det.querySelector("gIBSCBS > vBC")?.textContent || "",
        aliqibsuf: det.querySelector("gIBSUF > pIBSUF")?.textContent || "",
        vibsufuf: det.querySelector("gIBSUF > vIBSUF")?.textContent || "",
        aliqibsm: det.querySelector("gIBSMun > pIBSMun")?.textContent || "",
        vibsm: det.querySelector("gIBSMun > vIBSMun")?.textContent || "",
        vibs: det.querySelector("gIBSCBS > vIBS")?.textContent || "",
        aliqcbs: det.querySelector("gCBS > pCBS")?.textContent || "",
        vcbs: det.querySelector("gCBS > vCBS")?.textContent || "",

        icmscst: det.querySelector("ICMS CST")?.textContent || "",
        aliqicms: det.querySelector("ICMS pICMS")?.textContent || "",
        bsicms: det.querySelector("ICMS vBC")?.textContent || "",
        vicms: det.querySelector("ICMS vICMS")?.textContent || "",

        ipicst: det.querySelector("IPI CST")?.textContent || "",
        aliqipi: det.querySelector("IPI pIPI")?.textContent || "",
        bsipi: det.querySelector("IPI vBC")?.textContent || "",
        vipi: det.querySelector("IPI vIPI")?.textContent || "",

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
    relatorio(produtos);
    adicionarNaTabela(dados);
    adicionarItens(produtos);
    
}
function relatorio(p) {
    let icmsAgrupado = JSON.parse(sessionStorage.getItem('resumo_icms')) || {};

    p.forEach(i => {
        // Criamos a chave composta para agrupar
        const chave = `${i.icmscst}|${i.aliqicms}|${i.CFOP}`;

        // Se a combinação CST/Alíquota/CFOP ainda não existe, inicializamos
        if (!icmsAgrupado[chave]) {
            icmsAgrupado[chave] = {
                cst: i.icmscst || "N/A",
                aliq: i.aliqicms || "0",
                cfop: i.CFOP || "N/A",
                base: 0,
                valorICMS: 0,
                valorTotal: 0
            };
        }

        icmsAgrupado[chave].base += parseFloat(i.bsicms || 0);
        icmsAgrupado[chave].valorICMS += parseFloat(i.vicms || 0);
        
        const vProd = parseFloat(i.vProd || 0);
        const desc = parseFloat(i.pdesconto || 0);
        const outro = parseFloat(i.poutras || 0);
        const frete = parseFloat(i.pfrete || 0);
        
        icmsAgrupado[chave].valorTotal += (vProd - desc + outro + frete);
    });

    sessionStorage.setItem('resumo_icms', JSON.stringify(icmsAgrupado));

    renderizarTabelaCFOP();
}
function renderizarTabelaCFOP() {
    const tbody = document.querySelector("#tabela_cfop tbody");
    const dados = JSON.parse(sessionStorage.getItem('resumo_icms')) || {};

    // Limpa a tabela antes de redesenhar para não duplicar
    tbody.innerHTML = "";

    // Itera sobre as chaves do objeto agrupado
    Object.values(dados).forEach(item => {
        const tr = document.createElement("tr");
        
        tr.innerHTML = `
            <td><strong>${item.cfop}</strong></td>
            <td class="icms">${item.cst}</td>
            <td class="icms">${Number(item.aliq).toFixed(2)}%</td>
            <td>R$ ${item.valorTotal.toFixed(2)}</td>
            <td class="ibs_cbs">-</td> <td class="ibs_cbs">-</td>
            <td class="ibs_cbs">-</td>
            <td class="ibs_cbs">-</td>
            <td class="ibs_cbs">-</td>
            <td class="icms">R$ ${item.base.toFixed(2)}</td>
            <td class="icms">R$ ${item.valorICMS.toFixed(2)}</td>
            <td class="ipi">-</td>
            <td class="ipi">-</td>
            <td class="ipi">-</td>
            <td class="ipi">-</td>
            <td class="pis">-</td>
            <td class="pis">-</td>
            <td class="pis">-</td>
            <td class="pis">-</td>
            <td class="cofins">-</td>
            <td class="cofins">-</td>
            <td class="cofins">-</td>
            <td class="cofins">-</td>
            
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

            <td class="icms">${i.icmscst}</td>
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


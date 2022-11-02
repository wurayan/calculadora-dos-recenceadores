//Coleta dos valores do recenseador
let uv = document.querySelector("#uv")
let db = document.querySelector("#db")
let da = document.querySelector("#da")
let pb = document.querySelector("#pb")
let pa = document.querySelector("#pa")

let tipo_setor = document.querySelector("#tipo_setor")
var urbano = {uv: 0.82, db: 1.94, da: 2.28, pb: 1.46, pa: 2.45}
var rural = {uv: 0.90, db: 2.14, da: 2.51, pb: 1.60, pa: 2.68}
/*rural da taxa6 também atua como urbano da taxa7*/ 
var rural7 = {uv: 1, db: 2.36, da: 2.76, pb: 1.76, pa: 2.94}
var lista_setor = [urbano,rural,rural7]

let dropdown = document.querySelector("#cidades")
let lista_taxa6 = ["Cantagalo","Marquinho",
    "Porto Barreiro","Rio Bonito do Iguaçu",
    "Saudade do Iguaçu","Sulina","Virmond"]
let lista_taxa7 = ["Espigão Alto do Iguaçu",
    "Laranjeiras do Sul","Nova Laranjeiras",
    "Guaraniaçu","Quedas do Iguaçu","Diamante do sul"]
let lista_cidades = [lista_taxa6,lista_taxa7]

lista_cidades.forEach((taxa)=>{
    taxa.forEach((cidade)=>{
        
        let option = document.createElement("option")
        option.textContent = cidade
        option.value = cidade
        dropdown.appendChild(option)
    })
})

//função chamada ao apertar o botão atualizar
//Calcula os valores a serem exibidos
function atualizar(){
    

    if (lista_taxa6.includes(dropdown.value)) {
        var valores = tipo_setor.checked == false ? lista_setor[0] : lista_setor[1]
    } else {
        var valores = tipo_setor.checked == false ? lista_setor[1] : lista_setor[2]
    }

    let uv_total = uv.value * valores.uv
    let d_total = (db.value * valores.db)+(da.value * valores.da)
    let p_total = (pb.value * valores.pb)+(pa.value * valores.pa)

    document.querySelector("#uv_total").innerHTML = uv_total.toFixed(2);
    document.querySelector("#d_total").innerHTML = d_total.toFixed(2);
    document.querySelector("#p_total").innerHTML = p_total.toFixed(2);

    let total = uv_total + d_total + p_total

    document.querySelector("#resultados").innerHTML = total.toFixed(2);

    //aqui ficam as contas envolvendo valores recebidos de outros setores no mesmo mês
    var previo = 0
    let adicional = document.querySelector("#input_vr")
    if (adicional == null || adicional.value == ''){
        previo = 0
        console.log(previo)
    }
    else {
        previo = adicional.valueAsNumber
        console.log(previo)
    }

    //let desconto_previo = Descontos(previo)
    let total_bruto = Descontos(previo)
    let total_liquido = Descontos(total+previo)
    let total_inss = total_liquido.inss-total_bruto.inss
    console.log(total_liquido.inss)
    console.log(total_bruto.inss)
    let total_irrf = total_liquido.irrf-total_bruto.irrf
    document.querySelector("#inssp").innerHTML = total_liquido.inssp + '%'
    document.querySelector("#inss").innerHTML = total_inss.toFixed(2)
    document.querySelector("#irrfp").innerHTML = total_liquido.irrfp + '%'
    document.querySelector("#irrf").innerHTML = total_irrf.toFixed(2)
    console.log(total_inss)
    console.log(total_irrf)
    console.log(total)
    document.querySelector("#liquido").innerHTML = (total - total_inss - total_irrf).toFixed(2)
}

//função descontos chamada dentro da função atualizar
//faz os cálculos referentes aos descontos de inss e irrf
function Descontos(valor){
    

    let faixa_inss = [1212,2427.35,3641.03,7087.22]
    let faixa_inssp = {1212: 0.075, 2427.35:0.09 , 3641.03:0.12 ,7087.22:0.14}
    var desconto = 0

    if (valor>7087.22){
        desconto = 828.38;
        porcento = 14
    } else {
        for (item of faixa_inss){
            if (item<=valor) {
                var x = item*faixa_inssp[item]
                desconto = desconto+x
                
            } else {
                if (faixa_inss.indexOf(item)-1 >= 0){
                    index = faixa_inss.indexOf(item)-1
                    x = valor-faixa_inss[index]
                } else {
                    x = valor
                }

                y = x*faixa_inssp[item]
                desconto = desconto+y
                porcento = faixa_inssp[item]*100
                break
            } 
        }
    }
   
    
    let faixa_irrf = [2826.65,3751.05,4664.68,10000]
    let faixa_irrfp = {2826.65: 0.075 ,3751.05: 0.15 ,4664.68: 0.225 ,10000: 0.275}
    var desconto_irrf = 0
    var porcento_irrf = 0
    var valor_irrf = valor-desconto

    if (valor_irrf >= 1903.98) {
        
        for (item of faixa_irrf){
        if (item<=valor_irrf) {
            var x = item*faixa_irrfp[item]
            desconto_irrf = desconto_irrf+x
            
        } else {
            if (faixa_irrf.indexOf(item)-1 >= 0){
                index = faixa_irrf.indexOf(item)-1
                x = valor_irrf-faixa_irrf[index]
            } else {
                x = valor_irrf-1903.98
            }

            y = x*faixa_irrfp[item]
            desconto_irrf = desconto_irrf+y
            porcento_irrf = faixa_irrfp[item]*100
            break
        } 
    }
    }

    

    return{inss:desconto, inssp:porcento, irrf:desconto_irrf, irrfp:porcento_irrf}
}

{}
function ja_recebeu(){
    let recebeu = document.querySelector("#setor_passado")
    console.log(recebeu)
    if (recebeu.checked == true) {
        let valor_recebido = document.querySelector(".valor_recebido")
        let input_vr = document.createElement("input")
        input_vr.id = 'input_vr'
        input_vr.type = 'number'
        input_vr.placeholder = 'Total recebido'

        valor_recebido.appendChild(input_vr)
    }
    else {
        let input_vr = document.querySelector("#input_vr")
        input_vr.remove()
    }
}
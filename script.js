let uv = document.querySelector("#uv")
let db = document.querySelector("#db")
let da = document.querySelector("#da")
let pb = document.querySelector("#pb")
let pa = document.querySelector("#pa")

let tipo_setor = document.querySelector("#tipo_setor")
var urbano = {uv: 0.82, db: 1.94, da: 2.28, pb: 1.46, pa: 2.45}
var rural = {uv: 0.90, db: 2.14, da: 2.51, pb: 1.60, pa: 2.68}
var lista_setor = [urbano,rural]


function atualizar(){

    var valores = tipo_setor.checked == false ? lista_setor[0] : lista_setor[1]

    console.log(tipo_setor.checked)
    console.log(valores)

    let uv_total = uv.value * valores.uv
    let d_total = (db.value * valores.db)+(da.value * valores.da)
    let p_total = (pb.value * valores.pb)+(pa.value * valores.pa)

    document.querySelector("#uv_total").innerHTML = uv_total.toFixed(2);
    document.querySelector("#d_total").innerHTML = d_total.toFixed(2);
    document.querySelector("#p_total").innerHTML = p_total.toFixed(2);

    let total = uv_total + d_total + p_total

    document.querySelector("#resultados").innerHTML = total.toFixed(2);
}
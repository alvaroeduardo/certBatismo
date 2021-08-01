const pdf = require('html-pdf');
const res = require('ejs');
const form   = document.querySelector('form');

// Função para gerar o pdf
form.addEventListener('submit', (e) => {
    // Valores do formulário
    const name   = document.querySelector('input#name').value;
    const date   = document.querySelector('input#date').value;
    const local  = document.querySelector('input#local').value;
    const book   = document.querySelector('input#book').value;
    const page   = document.querySelector('input#pag').value;
    const term   = document.querySelector('input#term').value;
    const nasc   = document.querySelector('input#nasc').value;
    const father = document.querySelector('input#father').value;
    const mother = document.querySelector('input#mother').value;
    const pad    = document.querySelector('input#godfather').value;
    const mad    = document.querySelector('input#godmother').value;
    const celeb  = document.querySelector('input#celebrant').value;
    const obs    = document.querySelector('input#observations').value;

    const dataBatism = new Date(date);
    const batismFormat = dataBatism.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    const dataNasc = new Date(nasc);
    const nascFormat = dataNasc.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

    let padrinhos = `${pad} e ${mad}`;

    const data = new Date();

    var dia = String(data.getDate()).padStart(2, '0');

    var mouth = String(data.getMonth() + 1).padStart(2, '0');

    var mes = () => {
        if(mouth == "01"){
            return "janeiro";
        } else if (mouth == "02"){
            return "fevereiro";
        } else if (mouth == "03"){
            return "março";
        } else if (mouth == "04"){
            return "abril";
        } else if (mouth == "05"){
            return "maio";
        } else if (mouth == "06"){
            return "junho";
        } else if (mouth == "07"){
            return "julho";
        } else if (mouth == "08"){
            return "agosto";
        } else if (mouth == "09"){
            return "setembro";
        } else if (mouth == "10"){
            return "outubro";
        } else if (mouth == "11"){
            return "novembro";
        } else if (mouth == "12"){
            return "dezembro";
        } else {
            return "error";
        }
    };

    var ano = data.getFullYear();

    const dataatual = dia + ' de ' + mes() + ' de ' + ano;

    res.renderFile('./src/cert.ejs', {
        nome: name,
        data: batismFormat,
        local: local,
        livro: book,
        folha: page,
        termo: term,
        nasc: nascFormat,
        pai: father,
        mae: mother,
        padrinhos: padrinhos,
        celeb: celeb,
        obs: obs,
        nowdata: dataatual
    }, (err, html) => {
        if(err){
            console.log(err);
        }

        const options = {
            format: 'A4'
        };

        pdf.create(html, options).toFile(`./certidao/${name}.pdf`, (err, res) => {
                if(!err){
                    alert('CERTIDÃO GERADA COM SUCESSO!');
                } else {
                    console.log(err);
                }
        })
    })

    e.preventDefault();
});


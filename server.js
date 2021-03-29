const express = require("express"); // require = funcao do js para trazer uma dependência pra dentro da variável
const nunjucks = require('nunjucks');


const server = express() // a variável virou uma função
const videos = require("./data")//chamando arquivo que está na pasta usando o require("*local do arquivo*")

//trazendo o css pelo server
server.use(express.static('public'))// vai observar a pasta public para servir os arquivos estáticos


//Configurando a Template Engine
server.set("view engine", "njk")// tipo de motor de view = motor de view para tudo que for njk


nunjucks.configure("views", { //cofigurando o caminho; de onde ele vai buscar o arquivo
    express: server, // Opção diz que vai usar o express e está usando a variavel server para isso.
    autoescape:false, // para o nunjucks não colocar no texto uma tag que seria colocada no meio do texto, ex: estava colocando p html ao invés de colocar somente o textcontent
    noChache: true // limpar o cache sempre, pra nao manter no navegador informações desatualizadas
})



//ROTASSSSSSS
server.get("/", function(req,res) {
    const about = {
        avatar_url:"https://avatars.githubusercontent.com/u/64269128?v=4",
        name:"Gabriel Fernandez",
        role:" - Front-End Developer & Filmmaker - ",
        description:`"Aways learning today what I'll be grateful to know tomorrow..."`,

        links: [
            { name: "Instagram", url: "https://www.instagram.com/ogabrielfernandez/" },
            { name: "Linked-In", url: "https://www.linkedin.com/in/seufernandez/" },
            { name: "YouTube", url: "https://www.youtube.com/channel/UCblely93wOCb_SvE_HOpOEA" },
            { name: "Cuteness", url: "https://source.unsplash.com/random?puppies" }
        ]
    }

    return res.render('about', { about })// QUANDO A CHAVE FOR IGUAL A VARIÁVEL PODE DEIXAR SOMENTE A PALAVRA SOZINHA NAS CHAVES {about: about} == {about}
    //  Não precisa colocar o .njk pois a configuração do template engine faz isso por nós
})


server.get("/portfolio", function(req,res) {
    
    
    return res.render('portfolio', { items:videos })// {items: videos} = levando a variável "videos" para a página de portfolio onde vai encontar uma estrutura de repetição
})





server.get("/video", function(req,res) {
    const id = req.query.id // tudo que coloquei na url depois de "id=" foi parar na pagina; http://localhost:3000/video?id=askda
    const video = videos.find(function(video){// vai rodar todos elmentos do array "videos", executando essa função um por um
        if (video.id == id) { // se a id do video que ele acaou de pegar for igual ao da variável acima, retornará a função
            return true
        }
    })

    if (!video) {
        return res.send("Video not found")
    }else{
        return res.render("video", { item:video })//renderizando a pagina video.njk e recebendo a variável video e sendo utilizada no html como item
    }
    
    res.send(id)

})


// server vai ficar escutando a porta 5000
server.listen(3000, function(){ // a função vai ser executada assim que escutar o server pelo npm start
    console.log("SERVER TA NAICE");
})


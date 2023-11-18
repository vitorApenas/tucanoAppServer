import {Router} from 'express';
import { customAlphabet } from 'nanoid';
import { Op } from 'sequelize';
import {
    ReferenciaFuncionarios,
    ReferenciaAlunos,
    AlunosAtivos,
    FuncionariosAtivos,
    Cardapio,
    Turmas,
    Materias,
    Professores,
    Horarios,
    Posts,
    PostFixado
} from '../db/models';
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs')

const apiRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assets/postImages');
    },
    filename: function (req, file, cb) {
      const extensao = file.originalname.split('.')[1];
      const newNameFile = file.originalname.split('.')[0];
      cb(null, `${newNameFile}.${extensao}`);
    },
});

/*const aepStorage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'assets/aepImages');
    },
    filename: function (req, file, cb) {
        const extensao = file.originalname.split('.')[1];
        const newNameFile = file.originalname.split('.')[0];
        cb(null, `${newNameFile}.${extensao}`);
    }
})*/
  
  const upload = multer({ storage });
  //const uploadAep = multer({ aepStorage });

async function hashPassword(pass:string){
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(pass, salt);
    return hashedPass;
}

async function checkPassword(pass:string, hashedPass:string){
    const match = await bcrypt.compare(pass, hashedPass);
    return match;
}

//Teste de API
apiRouter.get('/teste', (req, res)=>{
    console.log("Recebido");
    return res.json({
        "message":"API funcionando"
    });
});

//Checar se o aluno está ativo
apiRouter.post("/check/aluno", async(req, res)=>{
    const rm = req.body.rm;
    try{
        const buscaRef = await ReferenciaAlunos.findAll({where:{rm: rm}});
        if(!buscaRef[0]) return res.json({msg: "Não temos registro desse RM"});

        const buscaAtivos = await AlunosAtivos.findAll({where:{rm: rm}});
        if(buscaAtivos[0]) return res.json({msg: "O aluno com esse RM já está cadastrado"});

        return res.json(res.statusCode);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        })
    }
});

//Cadastro de Aluno
apiRouter.post("/cadastro/aluno", async(req, res)=>{
    
    const rm = req.body.rm;
    const senha = req.body.senha;
    const img = req.body.img;

    try{
        const hashedPass = await hashPassword(senha);
        const buscaRef = await ReferenciaAlunos.findAll({where:{rm: rm}});

        const alunoNovo = await AlunosAtivos.create({
            rm: buscaRef[0].rm,
            email: buscaRef[0].email,
            nome: buscaRef[0].nome,
            rg: buscaRef[0].rg,
            turma: buscaRef[0].turma,
            fotoPerfil: img,
            senha: hashedPass
        });
        return res.json({
            criado: alunoNovo
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }

});

//Checar se o funcionário está ativo
apiRouter.post('/check/funcionario', async(req, res)=>{
    const email = req.body.email;

    try{
        const buscaRef = await ReferenciaFuncionarios.findAll({where:{email: email}});
        if(!buscaRef[0]) return res.json({msg: "Esse funcionário não está registrado"});

        const buscaAtivos = await FuncionariosAtivos.findAll({where:{email: email}});
        if(buscaAtivos[0]) return res.json({msg: "Esse funcionário já está cadastrado"});

        return res.json(res.statusCode);
    }
    catch(err){
        console.log(err)
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Cadastro de Funcionário
apiRouter.post('/cadastro/funcionario', async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;
    const img = req.body.img;

    const hashedPass = await hashPassword(senha);

    const buscaRef = await ReferenciaFuncionarios.findAll({where:{email: email}});

    try{
        const funcNovo = await FuncionariosAtivos.create({
            email: buscaRef[0].email,
            nome: buscaRef[0].nome,
            fotoPerfil: img,
            senha: hashedPass
        });

        return res.json({
            criado: funcNovo
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Login de Aluno
apiRouter.post('/login/aluno', async(req, res)=>{
    const rm = req.body.rm;
    const senha = req.body.senha;

    try{
        const buscaAtivos = await AlunosAtivos.findAll({where:{rm: rm}});
        if(!buscaAtivos[0]) return res.json({msg: "Este aluno nao está cadastrado ainda"});
        if(await checkPassword(senha, buscaAtivos[0].senha)) return res.json(buscaAtivos[0]);
        return res.json({msg: "A senha está incorreta"});
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Login de funcionário
apiRouter.post('/login/funcionario', async(req, res)=>{
    const email = req.body.email;
    const senha = req.body.senha;

    try{
        const buscaAtivos = await FuncionariosAtivos.findAll({where:{email:email}});
        if(!buscaAtivos[0]) return res.json({msg: "Este funcionário não está cadastrado ainda"});
        if(await checkPassword(senha, buscaAtivos[0].senha)) return res.json(buscaAtivos[0]);
        return res.json({msg: "A senha está incorreta"})
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Consulta do cardápio
apiRouter.get('/cardapio', async(req, res)=>{
    try{
        const cardapio = await Cardapio.findAll({attributes:['content1', 'content2', 'abertura', 'fechamento', 'cancelado']});
        res.json(cardapio);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Edição do cardápio
apiRouter.post('/cardapio/edit', async(req, res)=>{
    try{
        await Cardapio.update(req.body, {where:{id:req.body.id}});
        return res.json(res.statusCode);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

apiRouter.get('/turmas', async (req, res)=>{
    try{
        const turmas = await Turmas.findAll({order:['turma']});
        return res.json(turmas);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Consulta de horário por funcionário
apiRouter.post('/horarioFunc', async(req, res)=>{
    const idTurma = req.body.turma;
    try {
        const horarios = await Horarios.findAll({where:{idTurma:idTurma}, order:['aula']});
        if(!horarios[0]) return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
        let output:object[] = [];
        
        let i = 0;
        while(i < horarios.length){
            const materia = await Materias.findAll({where:{id:horarios[i].idMateria}, attributes:['sigla']});
            const prof = await Professores.findAll({where:{id:horarios[i].idProf}, attributes:['sigla']});
            output[i] = {
                id: horarios[i].id,
                aula: horarios[i].aula,
                horario: horarios[i].horario,
                materia: materia[0].sigla,
                prof: prof[0].sigla
            };
            i++;
        }
        return res.json(output);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Checar se a matéria existe
apiRouter.post('/check/materia', async (req, res)=>{
    const sigla = req.body.sigla;
    try{
        const buscaMaterias = await Materias.findAll({where: {sigla: sigla}});
        if(!buscaMaterias[0]) return res.json({msg: `Não existe matéria com a sigla ${sigla}`});
        return res.json(buscaMaterias[0]);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Checar se o professor existe
apiRouter.post('/check/professor', async (req, res)=>{
    const sigla = req.body.sigla;
    try{
        const buscaProfs = await Professores.findAll({where: {sigla: sigla}});
        if(!buscaProfs[0]) return res.json({msg: `Não existe professor com a sigla ${sigla}`});
        return res.json(buscaProfs[0]);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Edição de aula no horário
apiRouter.post('/horario/edit', async (req, res)=>{
    const idHorario = req.body.idHorario;
    const idMateria = req.body.idMateria;
    const idProf = req.body.idProf;
    try{
        if(await Horarios.update({idMateria: idMateria, idProf: idProf},{where:{id:idHorario}})){
            return res.json(res.statusCode);
        }
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Consulta de horário por aluno
apiRouter.post('/horarioAluno', async (req, res)=>{
    const turma = req.body.turma;
    try{
        const infoTurma = await Turmas.findAll({where: {turma: turma}});
        if(!infoTurma[0]) return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });

        const horarios = await Horarios.findAll({where: {idTurma: infoTurma[0].id}, order: ['aula']});
        let output:object[] = [];
        
        let i = 0;
        while(i < horarios.length){
            const materia = await Materias.findAll({where:{id:horarios[i].idMateria}, attributes:['sigla', 'nome']});
            const prof = await Professores.findAll({where:{id:horarios[i].idProf}, attributes:['sigla', 'nome', 'sala', 'presente']});
            output[i] = {
                aula: horarios[i].aula,
                horario: horarios[i].horario,
                nomeMateria: materia[0].nome,
                materia: materia[0].sigla,
                nomeProf: prof[0].nome,
                sala: prof[0].sala,
                presente: prof[0].presente,
                prof: prof[0].sigla
            };
            i++;
        }
        return res.json(output);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Consulta da aula atual e próxima
apiRouter.post('/aulaAtual', async (req, res)=>{
    const siglaTurma = req.body.turma;
    const dia = req.body.dia;
    const hora = req.body.hora;
    const minuto = req.body.minuto;

    try{
        if(dia===0 || dia===6) return res.json({
            aulaAtual: "-",
            profAtual: "-",
            salaAtual: "-",
            presenteAtual: "#CC3535",
            proxAula: "-",
            proxProf: "-",
            proxSala: "-",
            proxPresente: "#CC3535",
        });
        const infoTurma = await Turmas.findAll({where: {turma: siglaTurma}});

        if(!infoTurma[0]) return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });

        const aula = await Horarios.count({where: {idTurma: infoTurma[0].id}});

        if(aula > 30){
            const horarios = await Horarios.findAll({where: {aula: {[Op.between]: [(dia-1)*9, dia*9-1]}, idTurma: infoTurma[0].id}, order: ['aula']});

            let output:any[] = [];
            
            let i = 0;
            while(i < horarios.length){
                const materia = await Materias.findAll({where:{id:horarios[i].idMateria}, attributes:['sigla']});
                const prof = await Professores.findAll({where:{id:horarios[i].idProf}, attributes:['sigla', 'nome', 'sala', 'presente']});
                
                output[i] = {
                    siglaMateria: materia[0].sigla,
                    prof: prof[0].nome,
                    siglaProf: prof[0].sigla,
                    salaProf: prof[0].sala,
                    presente: prof[0].presente
                }

                i++;
            }
            
            if(hora < 7 || (hora == 7 && minuto < 20)){ 
                let nomeProxProf;
                
                if(output[0].prof != "Aula vaga"){
                    if(output[0].prof.split(' ')[0].length > 9){
                        nomeProxProf = output[0].siglaProf;
                    }
                    else{
                        nomeProxProf = output[0].prof.split(' ')[0];
                    }
                }
                
                return res.json({
                    aulaAtual: "-",
                    profAtual: "-",
                    salaAtual: "-",
                    presenteAtual: "#CC3535",
                    proxAula: output[0].siglaMateria,
                    proxProf: nomeProxProf == undefined ? output[0].prof : nomeProxProf,
                    proxSala: output[0].salaProf,
                    proxPresente: output[0].presente,
                });
            }

            if(hora >= 17) return res.json({
                aulaAtual: "-",
                profAtual: "-",
                salaAtual: "-",
                presenteAtual: "#CC3535",
                proxAula: "-",
                proxProf: "-",
                proxSala: "-",
                proxPresente: "#CC3535",
            });

            let index;

            if((hora == 7 && minuto >= 20) || (hora == 8 && minuto < 10)) index = 0;
            if((hora == 8 && minuto >= 10) && hora < 9) index = 1;
            if(hora == 9 && minuto < 50) index = 2;
            if((hora == 10 && minuto >= 10) && hora < 11) index = 3;
            if(hora == 11 && minuto < 50) index = 4;
            if((hora == 13 && minuto >= 20) || (hora == 14 && minuto < 10)) index = 5;
            if((hora == 14 && minuto >= 10) && hora < 15) index = 6;
            if((hora == 15 && minuto >= 20) || (hora == 16 && minuto < 10)) index = 7;
            if((hora == 16 && minuto >= 10) && hora < 17) index = 8;
            if(index == undefined){

                let proxAula, nomeProxProf, proxSala, proxPresente;
                
                if((hora == 9 && minuto >= 50) || (hora == 10 && minuto < 10)){
                    if(output[3].prof != "Aula vaga"){
                        if(output[3].prof.split(' ')[0].length > 9){
                            nomeProxProf = output[3].siglaProf;
                        }
                        else{
                            nomeProxProf = output[3].prof.split(' ')[0];
                        }
                    }

                    proxAula = output[3].siglaMateria;
                    proxSala = output[3].salaProf;
                    proxPresente = output[3].presente;
                }
                else if((hora >=  11 && minuto >= 50) || (hora == 12) || (hora == 13 && minuto < 20)){
                    if(output[5].prof != "Aula vaga"){
                        if(output[5].prof.split(' ')[0].length > 9){
                            nomeProxProf = output[5].siglaProf;
                        }
                        else{
                            nomeProxProf = output[5].prof.split(' ')[0];
                        }
                    }

                    proxAula = output[5].siglaMateria;
                    proxSala = output[5].salaProf;
                    proxPresente = output[5].presente;
                }
                else if(hora == 15 && minuto < 20){
                    if(output[7].prof != "Aula vaga"){
                        if(output[7].prof.split(' ')[0].length > 9){
                            nomeProxProf = output[7].siglaProf;
                        }
                        else{
                            nomeProxProf = output[7].prof.split(' ')[0];
                        }
                    }

                    proxAula = output[7].siglaMateria;
                    proxSala = output[7].salaProf;
                    proxPresente = output[7].presente;
                }
                else return res.json({msg: "Houve um erro no servidor, tente novamente mais tarde"});
                if(proxAula && proxSala && proxPresente){
                    return res.json({
                        aulaAtual: "Intervalo",
                        profAtual: "-",
                        salaAtual: "-",
                        presenteAtual: "#CC3535",
                        proxAula: proxAula,
                        proxProf: nomeProxProf == undefined ? "Aula vaga" : nomeProxProf,
                        proxSala: proxSala,
                        proxPresente: proxPresente,
                    });
                }
                else return res.json({msg: "Houve um erro no servidor, tente novamente mais tarde"});
            }

            let nomeProfAtual, nomeProxProf;
            
            if(output[index].prof != "Aula vaga"){
                if(output[index].prof.split(' ')[0].length > 9){
                    nomeProfAtual = output[index].siglaProf;
                }
                else{
                    nomeProfAtual = output[index].prof.split(' ')[0];
                }
            }

            if(!output[index+1]){
                return res.json({
                    aulaAtual: output[index].siglaMateria,
                    profAtual: nomeProfAtual == undefined ? output[index].prof : nomeProfAtual,
                    salaAtual: output[index].salaProf,
                    presenteAtual: output[index].presente,
                    proxAula: "-",
                    proxProf: "-",
                    proxSala: "-",
                    proxPresente: "#CC3535",
                });    
            }

            if(output[index+1].prof != "Aula vaga"){
                if(output[index+1].prof.split(' ')[0].length > 9){
                    nomeProxProf = output[index+1].siglaProf;
                }
                else{
                    nomeProxProf = output[index+1].prof.split(' ')[0];
                }
            }
            
            return res.json({
                aulaAtual: output[index].siglaMateria,
                profAtual: nomeProfAtual == undefined ? output[index].prof : nomeProfAtual,
                salaAtual: output[index].salaProf,
                presenteAtual: output[index].presente,
                proxAula: output[index+1].siglaMateria,
                proxProf: nomeProxProf == undefined ? output[index+1].prof : nomeProxProf,
                proxSala: output[index+1].salaProf,
                proxPresente: output[index+1].presente,
            });
            
        }
        else{
            return res.json({msg: "Em desenvolvimento..."});
        }
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

apiRouter.post('/getMateria', async (req, res) => {
    const sigla = req.body.sigla;
    const dia = req.body.dia;
    const hora = req.body.hora;
    const minuto = req.body.minuto;
    try{
        if(dia===0 || dia===6) return res.json("Sem aula")
        
        if(hora < 7 || (hora == 7 && minuto < 20) || hora >= 17) return res.json("Sem aula");

        if(sigla === "Intervalo") return res.json(sigla);

        const materia = await Materias.findAll({where: {sigla: sigla}, attributes: ['nome']});

        if(materia[0].nome.length > 16) return res.json(sigla);
        return res.json(materia[0].nome);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Upload de foto de post (se tiver)
apiRouter.post('/postFoto', upload.single('file'), async (req, res)=>{
    try{
        res.json(res.statusCode);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Upload do post
apiRouter.post('/uploadPost', async (req, res)=>{
    const id = req.body.id;
    const txt = req.body.txt;
    const foto = req.body.foto;
    const ext = req.body.ext;
    const email = req.body.email;
    try{
        const uploadPost = await Posts.create({
            id: id,
            txt: txt,
            foto: foto,
            extensao: ext,
            email: email
        });
        if(uploadPost) return res.json(res.statusCode);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Recebe os posts que estão armazenados
apiRouter.get('/posts', async (req, res)=>{
    try{
        let i = 0;
        const posts = await Posts.findAll({order:[['createdAt', 'DESC']]});
        const output:object[] = []
        while(i < posts.length){
            const func = await FuncionariosAtivos.findAll({where: {email: posts[i].email}, attributes: ['nome', 'fotoPerfil']});

            const meses = ['jan', 'fev', 'mar', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
            
            const createdAt = {
                dia: posts[i].createdAt.getDate(),
                mes: meses[posts[i].createdAt.getMonth()],
                ano: posts[i].createdAt.getFullYear(),
            }

            output[i] = {
                id: posts[i].id,
                txt: posts[i].txt,
                foto: posts[i].foto,
                extensao: posts[i].extensao,
                funcNome: func[0].nome,
                funcFoto: func[0].fotoPerfil,
                createdAt: createdAt
            }
            i++;
        }

        res.json(output);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Fixar post
apiRouter.post('/fixarPost', async (req, res)=>{
    const id = req.body.id;
    try{
        const postId = await Posts.count({where: {id: id}});

        if(postId === 0) return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
        
        const nanoId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-");
        const countFixado = await PostFixado.count();
        if (countFixado !== 0){
            await PostFixado.destroy({
                truncate: true
            });
        }
        const postFixado = await PostFixado.create({
            id: nanoId(),
            postId: id
        });
        if(postFixado) return res.json(res.statusCode);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Excluir post
apiRouter.post('/deletarPost', async (req, res)=>{
    const id = req.body.id;
    try{
        const postId = await Posts.count({where: {id: id}});

        if(postId === 0) return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });

        const post = await Posts.findAll({where: {id: id}});
        if(post[0].foto){
            const extensao = post[0].extensao;
            fs.unlinkSync(`assets/postImages/${id}.${extensao}`);
        }

        await Posts.destroy({where: {id: id}});

        const countFixado = await PostFixado.count({where: {postId: id}});
        if(countFixado === 1) await PostFixado.destroy({where: {postId: id}});

        return res.json(res.statusCode);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Recebe o post fixado
apiRouter.get('/postFixado', async (req, res)=>{
    try{
        const countFixado = await PostFixado.count();
        if(countFixado === 0) return res.json(res.statusCode)
        
        const idPost = await PostFixado.findAll({attributes: ['postId']});
        const post = await Posts.findAll({where: {id: idPost[0].postId}});
        const func = await FuncionariosAtivos.findAll({where: {email: post[0].email}, attributes: ['nome', 'fotoPerfil']});
        
        const meses = ['jan', 'fev', 'mar', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
            
        const createdAt = {
            dia: post[0].createdAt.getDate(),
            mes: meses[post[0].createdAt.getMonth()],
            ano: post[0].createdAt.getFullYear(),
        }

        const output = {
            id: post[0].id,
            txt: post[0].txt,
            foto: post[0].foto,
            extensao: post[0].extensao,
            funcNome: func[0].nome,
            funcFoto: func[0].fotoPerfil,
            createdAt: createdAt
        }
        
        return res.json(output);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Desafixa o post
apiRouter.post('/desafixarPost', async (req, res)=>{
    try{
        await PostFixado.destroy({
            truncate: true
        });
        res.json(res.statusCode)
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Checa se o usuário é um professor
apiRouter.post('/isProfessor', async (req, res)=>{
    const nome = req.body.nome;
    try{
        const reqProfs = await Professores.findAll({where: {nome: nome}, attributes: ['id', 'sigla', 'nome', 'presente']});
        if(!reqProfs[0]) return res.json(res.statusCode);

        res.json(reqProfs[0]);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Consulta a presença de todos os professores
apiRouter.get('/getPresencaProfs', async (req, res)=>{
    try{
        const profs = await Professores.findAll({attributes: ['id', 'sigla', 'nome', 'presente'], order: [['sigla', 'ASC']]});
        return res.json(profs);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Edita a presença de um professor específico
apiRouter.post('/editarPresencaProf', async (req, res)=>{
    const id = req.body.id;
    const presenca = req.body.presenca;
    try{
        const count = await Professores.count({where: {id:id}});
        if(count == 0) return res.json({msg: "Houve um erro no servidor, tente novamente mais tarde"});

        if(presenca !== "#00B489" && presenca !== "#CC3535") return res.json({msg: "Houve um erro no servidor, tente novamente mais tarde"});

        if(await Professores.update({presente: presenca}, {where: {id:id}})) return res.json(res.statusCode);
        
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//Consulta a presença de um único professor (o próprio usuário)
apiRouter.post('/getPresencaProfUnico', async (req, res)=>{
    const id = req.body.id;
    try{
        const count = await Professores.count({where: {id:id}});
        if(count == 0) return res.json({msg: "Houve um erro no servidor, tente novamente mais tarde"});

        const presenca = await Professores.findAll({where: {id:id}, attributes: ['presente']});
        return res.json(presenca[0].presente);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

/*
//upload da foto dos achados e perdidos
apiRouter.post('/aepFoto', uploadAep.single('file'), async (req, res)=>{
    try{
        res.json(res.statusCode);
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//upload do item de achados e perdidos (para a tabela de não confirmados)
apiRouter.post('/uploadAep', async (req, res)=>{
    try{
        
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
})

//recebe os itens de achados e perdidos (confirmados)
apiRouter.get('/achadosPerdidos', async (req, res)=>{
    try{
        let i = 0;
        const aep = AchadosPerdidos.findAll({order:[['createdAt', 'DESC']]});
        while(i < aep.length){
            i++;
        }
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});

//recebe as tags de achados e perdidos
apiRouter.get('/tagsAep', async (req, res)=>{
    try{
        const tags = await TagsAeP.findAll();
        res.json(tags)
    }
    catch(err){
        console.log(err);
        return res.json({
            msg: "Houve um erro no servidor, tente novamente mais tarde"
        });
    }
});
*/

export default apiRouter;
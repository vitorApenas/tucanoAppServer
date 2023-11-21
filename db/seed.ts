import sequelize from "./db";
import {
    AlunosAtivos,
    FuncionariosAtivos,
    ReferenciaAlunos,
    ReferenciaFuncionarios,
    Cardapio,
    Turmas,
    Materias,
    Professores,
    Horarios,
    Posts
} from './models';

interface typeReferenciaAlunos {
    rm: Number,
    email: String,
    turma: String,
    nome: String,
    rg: String
}

interface typeReferenciaFuncionarios {
    id: String,
    email: String,
    nome: String
}

interface typeAlunosAtivos {
    rm: Number,
    email: String,
    nome: String,
    rg: String,
    turma: String,
    fotoPerfil: String, 
    senha: String
}

interface typeFuncionariosAtivos {
    email: String,
    nome: String,
    fotoPerfil: String,
    senha: String
}

interface typeCardapio{
    id: number,
    content1: string,
    content2?: string,
    abertura: string,
    fechamento: string,
    cancelado: boolean
}

interface typeTurma{
    id: string,
    turma: string
    ano: number,
    curso: string
}

interface typeMateria{
    id: string,
    sigla: string,
    nome: string
}

interface typeProf{
    id: string,
    sigla: string,
    nome: string,
    sala: string,
    presente: string
}

interface typeHorario{
    id: string,
    aula: number
    horario: string,
    idTurma: string,
    idMateria: string,
    idProf: string
}

interface typePost{
    id: string,
    txt: string,
    foto: boolean,
    extensao?: string,
    email: string
}

interface typeTags{
    id: string,
    txt: string
}

//Arquivo para RESETAR e POPULAR o database com dados para teste
(async()=>{
    const alunosReferencia:typeReferenciaAlunos[] = [
        {
            rm: 210083,
            email: 'vitor.estevanin@etec.sp.gov.br',
            turma: '3E - Desenvolvimento de Sistemas',
            nome: 'Vitor Mendes Estevanin',
            rg: '11.111.111-1'
        },
        {
            rm: 210057,
            email:'vinicius.roberto2@etec.sp.gov.br',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'Vinicius da Silva Roberto',
            rg:'22.222.222-2'
        },
        {
            rm: 210066,
            email:'rodrigo.lucena01@etec.sp.gov.br',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'Rodrigo Fernandes de Lucena',
            rg:'33.333.333-3'
        },
        {
            rm: 210967,
            email:'luiz.silva1437@etec.sp.gov.br',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'Luiz Gustavo Silva',
            rg:'44 .444.444-4'
        },
        {
            rm: 210964,
            email:'alexander.acras@etec.sp.gov.br',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'Alexander Lysandre dos Santos Acras',
            rg:'55.555.555-5'
        },
        {
            rm: 210972,
            email:'mateus.santos411@etec.sp.gov.br',
            turma:'3E - Desenvolvimento de Sistemas',
            nome:'Mateus André Silva Santos',
            rg:'66.666.666-6'
        }
    ];

    const funcionariosReferencia:typeReferenciaFuncionarios[] = [
        {
            id: 'Jco10xWw6n2WicfyrkitR',
            email: 'rosa.shimizu@etec.sp.gov.br',
            nome: 'Rosa Mitiko Shimizu'
        },
        {
            id: 'E_M4nW-7ij3OSLNpcaLVm',
            email: 'paula.simas@etec.sp.gov.br',
            nome: 'Paula da Silva Simas'
        },
        {
            id: '1nF3Vq2rM-3FwM26Kitjx',
            email: 'nilson.anjos@etec.sp.gov.br',
            nome: 'Nilson dos Anjos'
        }
    ];

    const alunosAtivos:typeAlunosAtivos[] = [
        {
            rm: 210083,
            email: 'vitor.estevanin@etec.sp.gov.br',
            nome: 'Vitor Mendes Estevanin',
            rg: '11.111.111-1',
            turma: '3E - Desenvolvimento de Sistemas',
            fotoPerfil: 'tuca04.png', 
            senha: '$2b$10$z5NYOo.e2.b0ejxEqgGFseLl15fKpDO/H4rnYI0PqLF1HchGhByR2'
        }
    ];

    const funcionariosAtivos:typeFuncionariosAtivos[] = [
        {
            email: 'rosa.shimizu@etec.sp.gov.br',
            nome: 'Rosa Mitiko Shimizu',
            fotoPerfil: 'tuca06.png',
            senha: '$2b$10$z5NYOo.e2.b0ejxEqgGFseLl15fKpDO/H4rnYI0PqLF1HchGhByR2'
        }
    ];

    const cardapio:typeCardapio[] = [
        {
            id: 0,
            content1: "Bolacha de água e sal",
            content2: "Leite achocolatado",
            abertura: "09:50",
            fechamento: "10:10",
            cancelado: false
        },
        {
            id: 1,
            content1: "Arroz, feijão e salada",
            content2: "Carne de porco",
            abertura: "11:50",
            fechamento: "13:20",
            cancelado: false
        },
        {
            id: 2,
            content1: "Bolacha de chocolate",
            content2: "Suco de laranja",
            abertura: "15:00",
            fechamento: "15:20",
            cancelado: false
        },
        {
            id: 3,
            content1: "Arroz, feijão e salada",
            content2: "Carne de porco",
            abertura: "17:30",
            fechamento: "19:00",
            cancelado: false
        }
    ]

    const turmas:typeTurma[] = [
        {
            id: 'Rgf8kJDwnsJ1u2VxDk4DV',
            turma: '3A',
            ano: 3,
            curso: 'Mecatrônica'
        },
        {
            id: 'GqN4TrXjMQ8S1i0FeT849',
            turma: '3E',
            ano: 3,
            curso: 'Desenvolvimento de Sistemas'
        }
    ];

    const materias:typeMateria[] = [
        {
            id: 'cQUEmNGqDpCeYJYkVDD0J',
            sigla: '-',
            nome: 'Aula vaga'
        },
        {
            id: 'TNU-YA4eKCEcL1rLKcD-v',
            sigla: 'FI',
            nome: 'Física'
        },
        {
            id: 'xrAqq3a4m6auZcatCVHPR',
            sigla: 'HI',
            nome: 'História'
        },
        {
            id: '7hJvljgYrg_KehuColFAa',
            sigla: 'ICP',
            nome: 'Língua Estrangeira Moderna – Inglês e Comunicação Profissional'
        },
        {
            id: 'AV0WBNxJrGYtH5eV_6NeG',
            sigla: 'BI',
            nome: 'Biologia'
        },
        {
            id: '4KL0R4fQlmUfXRG0fpayC',
            sigla: 'GE',
            nome: 'Geografia'
        },
        {
            id: '11fetAQ-4d2RtwvRjnZ4L',
            sigla: 'PDD',
            nome: 'Planejamento e Desenvolvimento do Trabalho de Conclusão de Curso (TCC) em Desenvolvimento de Sistemas'
        },
        {
            id: '9pmijf-_osmX_u6uZ83xH',
            sigla: 'QTS',
            nome: 'Qualidade e Teste de Software'
        },
        {
            id: 'gm0nlC_emR_QzQN10fa2f',
            sigla: 'MA',
            nome: 'Matemática'
        },
        {
            id: 'B6XgHYN2ZIDxsqeH8JHF4',
            sigla: 'QU',
            nome: 'Química'
        },
        {
            id: 'FSbqIic87yzikQduYnXUz',
            sigla: 'PWE',
            nome: 'Programação Web'
        },
        {
            id: 'moW1uXdr7nxhKszVC3tRd',
            sigla: 'IPS',
            nome: 'Internet, Protocolos e Segurança de Sistemas da Informação'
        },
        {
            id: 'ZXd9qURzwzhQrwO96V0Fl',
            sigla: 'EF',
            nome: 'Educação Física'
        },
        {
            id: 'vksGugJVymmP1w5ptyknz',
            sigla: 'FIL',
            nome: 'Filosofia'
        },
        {
            id: 'Ua4WUoKYnDZz-dQ-PJQgX',
            sigla: 'SOC',
            nome: 'Sociologia'
        },
        {
            id: 'MaOxiGGjAwA297Z9O_KgQ',
            sigla: 'LPC',
            nome: 'Língua Portuguesa, Literatura e Comunicação Profissional'
        },
        {
            id: '6YkuImcTYK3vGtBWhstUJ',
            sigla: 'PRM',
            nome: 'Programação de Aplicativos Mobile'
        },
        {
            id: 'fPt8P-0Scw3hcBeHojQa-',
            sigla: 'LPMM',
            nome: 'Linguagens de Programação e Microcontroladores para Mecatrônica'
        },
        {
            id: 'DNQZzIn0G1YZwf-aSO3Me',
            sigla: 'MCN',
            nome: 'Máquinas com Controle Numérico'
        },
        {
            id: 'W9-mnvyfNEWyKdwI8gT6K',
            sigla: 'ECO',
            nome: 'Ética e Cidadania Organizacional'
        },
        {
            id: '4JTjxi37t98WtCj-QVTIh',
            sigla: 'ARF',
            nome: 'Automação III: Robótica e Manufatura Flexível'
        },
        {
            id: 'LsUt1wCMK_3kLG4h1bbgJ',
            sigla: 'PME',
            nome: 'Planejamento e Desenvolvimento do Trabalho de Conclusão de Curso (TCC) em Mecatrônica'
        },
        {
            id: '8DU7l7hk-zepxrCrZpIGq',
            sigla: 'SAE',
            nome: 'Sistemas de Acionamento Eletrônico'
        },
        {
            id: 'noftZ0tWc6rzC8OlqnzZF',
            sigla: 'OIT',
            nome: 'Organização Industrial e Tecnologia da Manutenção'
        },
    ];

    const professores:typeProf[] = [
        {
            id: '4oyXJ6aQZ4X7e0QrIwROp',
            sigla: '-',
            nome: 'Aula vaga',
            sala: '-',
            presente: '#CC3535'
        },
        {
            id: '7-XptxMDwryuaQPaVe65N',
            sigla: 'MPS',
            nome: 'Marcelo Aparecido dos Santos',
            sala: '555',
            presente: '#FFCC18'
        },
        {
            id: 'Au1ZeDAsLjA0iVyto-I54',
            sigla: 'MNS',
            nome: 'Manacés Angelo dos Santos',
            sala: '459',
            presente: '#FFCC18'
        },
        {
            id: 'P_crRNZzvWqudb21RoHlC',
            sigla: 'CSM',
            nome: 'Cleonice Salete Molon Meucci',
            sala: '453',
            presente: '#FFCC18'
        },
        {
            id: 'B0sctz-aAW9Xfpwvy0JlP',
            sigla: 'VSM',
            nome: 'Viviane Silva da Mata',
            sala: '470',
            presente: '#FFCC18'
        },
        {
            id: '9bghQ9r1v4Vol4JbZ3MkL',
            sigla: 'ADL',
            nome: 'Adilson Lopes',
            sala: '552',
            presente: '#FFCC18'
        },
        {
            id: 'EVwKrllFWFSDuFiiaOFOH',
            sigla: 'RMS',
            nome: 'Rosa Mitiko Shimizu',
            sala: '265.6',
            presente: '#FFCC18'
        },
        {
            id: 'rDFYj-hcjkbPAhDt22fyg',
            sigla: 'RRZ',
            nome: 'Rafael Russi Zamboni',
            sala: '265.1',
            presente: '#FFCC18'
        },
        {
            id: 'cAWMusqyQh7JmCHiMAlgH',
            sigla: 'GMF',
            nome: 'Gerson Martins Fontalva',
            sala: '203',
            presente: '#FFCC18'
        },
        {
            id: 'f5sifqHztOaWy9jzQCfn1',
            sigla: 'MIM',
            nome: 'Miriam Angélica Morini',
            sala: '468',
            presente: '#FFCC18'
        },
        {
            id: 'Zw6sW5RBbq0I15tlpzPUU',
            sigla: 'MPB',
            nome: 'Marcelo Pereira Barbosa',
            sala: '265.1',
            presente: '#FFCC18'
        },
        {
            id: 'TU4ykygmGp8DjEcb8iWNM',
            sigla: 'ARL',
            nome: 'Aparecida Romera Loures',
            sala: '-',
            presente: '#FFCC18'
        },
        {
            id: 'sMiDRPJWeeAjLYOKGDLBJ',
            sigla: 'HAS',
            nome: 'Herminio Alves Silva',
            sala: '465',
            presente: '#FFCC18'
        },
        {
            id: 'IWY5DMEiM9ylb3-H5kD_3',
            sigla: 'EDA',
            nome: 'Edno Afonso',
            sala: '460',
            presente: '#FFCC18'
        },
        {
            id: '7Ha6-54lnq4jFGeRULInJ',
            sigla: 'ICO',
            nome: 'Íris Cristine Odizio',
            sala: '460',
            presente: '#FFCC18'
        },
        {
            id: '5_7yI-GonhdiKL6U8ovh-',
            sigla: 'ECK',
            nome: 'Elisabete da Cunha Kubilius',
            sala: '353',
            presente: '#FFCC18'
        },
        {
            id: 'y0IuOQsPd0yHMslo7w6QC',
            sigla: 'PCD',
            nome: 'Paulo Cuesta Acuna Diaz',
            sala: '509',
            presente: '#FFCC18'
        },
        {
            id: 'VkyPSI189N7wEDbRqIoiL',
            sigla: 'NBJ',
            nome: 'Nivaldo Bertozzo Júnior',
            sala: '511',
            presente: '#FFCC18'
        },
        {
            id: 'tkGDjQPDorrk1GYC4A1MJ',
            sigla: 'BGF',
            nome: 'Batista Gibba Filho',
            sala: '213',
            presente: '#FFCC18'
        },
        {
            id: 'QjpVPu4k9I2_wyWKYCsNm',
            sigla: 'JTD',
            nome: 'Jefferson Thadeus Dias de Oliveira',
            sala: '352',
            presente: '#FFCC18'
        },
        {
            id: 'wFJGYnx2FrUs7_fGL7crg',
            sigla: 'JLR',
            nome: 'João Lázaro Masini Rossi',
            sala: '405',
            presente: '#FFCC18'
        },
        {
            id: 'aJ9NILV6jTcGF2ChkZUem',
            sigla: 'VAO',
            nome: 'Valter de Oliveira',
            sala: '405',
            presente: '#FFCC18'
        },
        {
            id: 'wfJzDP_zOyLjCQSdJgDCA',
            sigla: 'MRQ',
            nome: 'Marcia Romaquel',
            sala: '454',
            presente: '#FFCC18'
        },
        {
            id: 'tz2JU7NMc6dRHj2O19MK5',
            sigla: 'CRZ',
            nome: 'Carlos Rodolfo Zoboli',
            sala: '405',
            presente: '#FFCC18'
        },
        {
            id: 'sfNfvItcyp-MlGI5P9Epm',
            sigla: 'AAJ',
            nome: 'Américo Antonio Saia Junior',
            sala: 'OFI',
            presente: '#FFCC18'
        },
        {
            id: '3R8sveblKP1JZ_TNU4sWY',
            sigla: 'LCA',
            nome: 'Luis Carlos da Silva',
            sala: '458',
            presente: '#FFCC18'
        },
        {
            id: 'rcU2D3IUW_ufTNcoBZ1L0',
            sigla: 'WAH',
            nome: 'Wanderlei Aguilera Hidalga',
            sala: '517',
            presente: '#FFCC18'
        },
        {
            id: 'MGVVYj46EB9ydL4AnUehH',
            sigla: 'WAS',
            nome: 'Walter Antonio Sciani',
            sala: '210',
            presente: '#FFCC18'
        },
        {
            id: 'Zh-byfV-BoHlyo3mMxGx1',
            sigla: 'JOM',
            nome: 'José Antonio Meire',
            sala: '474',
            presente: '#FFCC18'
        },
        {
            id: 'YkJihhVwGH4Onj1zTf9Pi',
            sigla: 'NAO',
            nome: 'Nilton Amancio de Oliveira',
            sala: '-',
            presente: '#FFCC18'
        },
        {
            id: 'PFIq6QJgIxBuAAMt5nStw',
            sigla: 'MMA',
            nome: 'Mercedes Morte Abad',
            sala: '465',
            presente: '#FFCC18'
        },

    ];

    const horarios:typeHorario[] = [
        {
            id: '6MXCbqUN2EQsO0opZJWKi',
            aula: 0,
            horario: '07:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'TNU-YA4eKCEcL1rLKcD-v',
            idProf: '7-XptxMDwryuaQPaVe65N'
        },
        {
            id: 'DM281CEYYVyImpEzSIOno',
            aula: 1,
            horario: '08:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'xrAqq3a4m6auZcatCVHPR',
            idProf: 'Au1ZeDAsLjA0iVyto-I54'
        },
        {
            id: 'l9-1nFDedSyOOi1iUq-kF',
            aula: 2,
            horario: '09:00',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: '7hJvljgYrg_KehuColFAa',
            idProf: 'P_crRNZzvWqudb21RoHlC'
        },
        {
            id: 'B90Bwb46Vh8kWQHn4zDZq',
            aula: 3,
            horario: '10:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'AV0WBNxJrGYtH5eV_6NeG',
            idProf: 'B0sctz-aAW9Xfpwvy0JlP'
        },
        {
            id: 'A1o3qLCEcu5_cTi2-glyU',
            aula: 4,
            horario: '11:00',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'AV0WBNxJrGYtH5eV_6NeG',
            idProf: 'B0sctz-aAW9Xfpwvy0JlP'
        },
        {
            id: '1XMHGoesDCDzlBdoaBrBc',
            aula: 5,
            horario: '13:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: '4KL0R4fQlmUfXRG0fpayC',
            idProf: '9bghQ9r1v4Vol4JbZ3MkL'
        },
        {
            id: 'hKDxwA1rZGj-QWkwZYOAm',
            aula: 6,
            horario: '14:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: '4KL0R4fQlmUfXRG0fpayC',
            idProf: '9bghQ9r1v4Vol4JbZ3MkL'
        },
        {
            id: 'cyGiLy2Ya5eTiZRAnrjYw',
            aula: 7,
            horario: '15:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'C1cRXSKlAIm6N7wWE6yGd',
            aula: 8,
            horario: '16:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'lOVe1ETpHQQhfi3kDdb4g',
            aula: 9,
            horario: '07:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: '11fetAQ-4d2RtwvRjnZ4L',
            idProf: 'EVwKrllFWFSDuFiiaOFOH'
        },
        {
            id: '5kLH554CKJMWJ1tmmi-vi',
            aula: 10,
            horario: '08:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: '11fetAQ-4d2RtwvRjnZ4L',
            idProf: 'EVwKrllFWFSDuFiiaOFOH'
        },
        {
            id: 'jkxvBLcC7jCPdmk86lJ-g',
            aula: 11,
            horario: '09:00',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: '11fetAQ-4d2RtwvRjnZ4L',
            idProf: 'EVwKrllFWFSDuFiiaOFOH'
        },
        {
            id: 'WecsxFOzlHAeqseOJIzze',
            aula: 12,
            horario: '10:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: '9pmijf-_osmX_u6uZ83xH',
            idProf: 'rDFYj-hcjkbPAhDt22fyg'
        },
        {
            id: '-ZfylzgzXRVQdHrIz_73I',
            aula: 13,
            horario: '11:00',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: '9pmijf-_osmX_u6uZ83xH',
            idProf: 'rDFYj-hcjkbPAhDt22fyg'
        },
        {
            id: '74ep62IGABIaVkzWGsxzX',
            aula: 14,
            horario: '13:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'gm0nlC_emR_QzQN10fa2f',
            idProf: 'cAWMusqyQh7JmCHiMAlgH'
        },
        {
            id: 'DfYYVRy82qSLRhBjIvMS_',
            aula: 15,
            horario: '14:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'gm0nlC_emR_QzQN10fa2f',
            idProf: 'cAWMusqyQh7JmCHiMAlgH'
        },
        {
            id: '6dXfHfEcUzbD3R0ofugeU',
            aula: 16,
            horario: '15:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'B6XgHYN2ZIDxsqeH8JHF4',
            idProf: 'f5sifqHztOaWy9jzQCfn1'
        },
        {
            id: '_l8AISIZOy-KYcgO13Bev',
            aula: 17,
            horario: '16:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'B6XgHYN2ZIDxsqeH8JHF4',
            idProf: 'f5sifqHztOaWy9jzQCfn1'
        },
        {
            id: 'EDoxD6UJPi9FTtjG7lJNf',
            aula: 18,
            horario: '07:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'FSbqIic87yzikQduYnXUz',
            idProf: 'EVwKrllFWFSDuFiiaOFOH'
        },
        {
            id: '6r15TT4-WJ2DtVRETxSZb',
            aula: 19,
            horario: '08:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'FSbqIic87yzikQduYnXUz',
            idProf: 'EVwKrllFWFSDuFiiaOFOH'
        },
        {
            id: 'hjawYqge4Cv-KT_liQtrT',
            aula: 20,
            horario: '09:00',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'moW1uXdr7nxhKszVC3tRd',
            idProf: 'Zw6sW5RBbq0I15tlpzPUU'
        },
        {
            id: 'mCgHfrlZuGSxXEBFJ0Y0M',
            aula: 21,
            horario: '10:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'gm0nlC_emR_QzQN10fa2f',
            idProf: 'cAWMusqyQh7JmCHiMAlgH'
        },
        {
            id: '1aT1QTi7ToDgRxZuFml3G',
            aula: 22,
            horario: '11:00',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'ZXd9qURzwzhQrwO96V0Fl',
            idProf: 'TU4ykygmGp8DjEcb8iWNM'
        },
        {
            id: 'uxWIZUmUfszgDlBteeDPh',
            aula: 23,
            horario: '13:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'vksGugJVymmP1w5ptyknz',
            idProf: 'PFIq6QJgIxBuAAMt5nStw'
        },
        {
            id: 'SjKW1R-MJYYl8AECKU79E',
            aula: 24,
            horario: '14:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'ZXd9qURzwzhQrwO96V0Fl',
            idProf: 'TU4ykygmGp8DjEcb8iWNM'
        },
        {
            id: 'jCo7vt8GBV18KJNaYYbAh',
            aula: 25,
            horario: '15:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'ujJLegqi0C4i2cfFMlC8V',
            aula: 26,
            horario: '16:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'wDt4P6mn8NAJCLDLcRJ5l',
            aula: 27,
            horario: '07:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'Ua4WUoKYnDZz-dQ-PJQgX',
            idProf: 'IWY5DMEiM9ylb3-H5kD_3'
        },
        {
            id: 'pVbr7KeczWUteZn5QJYPh',
            aula: 28,
            horario: '08:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'gm0nlC_emR_QzQN10fa2f',
            idProf: 'cAWMusqyQh7JmCHiMAlgH'
        },
        {
            id: 'zSw2H3HoUSQ6KzdbcOpJa',
            aula: 29,
            horario: '09:00',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: '7hJvljgYrg_KehuColFAa',
            idProf: 'P_crRNZzvWqudb21RoHlC'
        },
        {
            id: 'DOuwszLBtgq9kvuH_pv8F',
            aula: 30,
            horario: '10:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'xrAqq3a4m6auZcatCVHPR',
            idProf: 'Au1ZeDAsLjA0iVyto-I54'
        },
        {
            id: 'Pyy_MWsr16E1m_KSBi2Tm',
            aula: 31,
            horario: '11:00',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'moW1uXdr7nxhKszVC3tRd',
            idProf: 'Zw6sW5RBbq0I15tlpzPUU'
        },
        {
            id: 'lAIQl390tEgf-axvJKKWi',
            aula: 32,
            horario: '13:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'TNU-YA4eKCEcL1rLKcD-v',
            idProf: '7-XptxMDwryuaQPaVe65N'
        },
        {
            id: 'tEmrozZD-CFPdfhfBT4Tr',
            aula: 33,
            horario: '14:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'MaOxiGGjAwA297Z9O_KgQ',
            idProf: '7Ha6-54lnq4jFGeRULInJ'
        },
        {
            id: '2Q5QMdai8XDekyaKTvhRF',
            aula: 34,
            horario: '15:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'V74ZdoKmAj5HdhFIVk74s',
            aula: 35,
            horario: '16:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'j6E2Vb2iGdwGbFurdj_Ab',
            aula: 36,
            horario: '07:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'NfxMfSIU0Zz9sHPiSkEhL',
            aula: 37,
            horario: '08:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: '3qb05z9QgKuIPNSDUyiHV',
            aula: 38,
            horario: '09:00',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'qEPq4yfdDvlMiPne817bE',
            aula: 39,
            horario: '10:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: '6YkuImcTYK3vGtBWhstUJ',
            idProf: 'EVwKrllFWFSDuFiiaOFOH'
        },
        {
            id: 'UQ8KSd6-00JpZYU2Ro-AF',
            aula: 40,
            horario: '11:00',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: '6YkuImcTYK3vGtBWhstUJ',
            idProf: 'EVwKrllFWFSDuFiiaOFOH'
        },
        {
            id: 'zw9EaSaCqLXIeQwZQM-Ou',
            aula: 41,
            horario: '13:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'ShgiqlSN-uMKsMYPYY0vI',
            aula: 42,
            horario: '14:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'MaOxiGGjAwA297Z9O_KgQ',
            idProf: '7Ha6-54lnq4jFGeRULInJ'
        },
        {
            id: 'bCI8MLPy_q36kfX8aTpRg',
            aula: 43,
            horario: '15:20',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'MaOxiGGjAwA297Z9O_KgQ',
            idProf: '7Ha6-54lnq4jFGeRULInJ'
        },
        {
            id: 'eC4oX2fzhb9CYU9sOebHQ',
            aula: 44,
            horario: '16:10',
            idTurma: 'GqN4TrXjMQ8S1i0FeT849',
            idMateria: 'MaOxiGGjAwA297Z9O_KgQ',
            idProf: '7Ha6-54lnq4jFGeRULInJ'
        },
        {
            id: '7LlnRvB2YglmgoSns1-78',
            aula: 0,
            horario: '07:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'MaOxiGGjAwA297Z9O_KgQ',
            idProf: '5_7yI-GonhdiKL6U8ovh-'
        },
        {
            id: 'IGoAZK6zoGSZ0k27YbcYb',
            aula: 1,
            horario: '08:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'fPt8P-0Scw3hcBeHojQa-',
            idProf: 'y0IuOQsPd0yHMslo7w6QC'
        },
        {
            id: 'MxY1HLt9vtNLoDiXdIeRQ',
            aula: 2,
            horario: '09:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'fPt8P-0Scw3hcBeHojQa-',
            idProf: 'y0IuOQsPd0yHMslo7w6QC'
        },
        {
            id: 'O5xDfTE5gBjrGWkeZwbmH',
            aula: 3,
            horario: '10:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'TNU-YA4eKCEcL1rLKcD-v',
            idProf: 'tkGDjQPDorrk1GYC4A1MJ'
        },
        {
            id: 'N7CdxYHS2HAm-UDDYHjOA',
            aula: 4,
            horario: '11:00',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'B6XgHYN2ZIDxsqeH8JHF4',
            idProf: 'QjpVPu4k9I2_wyWKYCsNm'
        },
        {
            id: 'd5q4vwirLisxd3h97Dm_S',
            aula: 5,
            horario: '13:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'DNQZzIn0G1YZwf-aSO3Me',
            idProf: 'wFJGYnx2FrUs7_fGL7crg'
        },
        {
            id: 'fcpjf0-k36hWVazMqqTgz',
            aula: 6,
            horario: '14:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'W9-mnvyfNEWyKdwI8gT6K',
            idProf: 'wfJzDP_zOyLjCQSdJgDCA'
        },
        {
            id: 'p6b14H7DzNmBYb_72ah6S',
            aula: 7,
            horario: '15:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: '4JTjxi37t98WtCj-QVTIh',
            idProf: 'tz2JU7NMc6dRHj2O19MK5'
        },
        {
            id: 'ycvffau74fOsJP0_6DpUI',
            aula: 8,
            horario: '16:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: '4JTjxi37t98WtCj-QVTIh',
            idProf: 'tz2JU7NMc6dRHj2O19MK5'
        },
        {
            id: 'A5NKbLf0TIDfkcMj9Zftl',
            aula: 9,
            horario: '07:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: '7hJvljgYrg_KehuColFAa',
            idProf: 'P_crRNZzvWqudb21RoHlC'
        },
        {
            id: '-fCA5eOkEyu5TzsfwfZW6',
            aula: 10,
            horario: '08:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: '4KL0R4fQlmUfXRG0fpayC',
            idProf: '9bghQ9r1v4Vol4JbZ3MkL'
        },
        {
            id: '5Kl9xvLa2iuvsXfZkbehy',
            aula: 11,
            horario: '09:00',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'B6XgHYN2ZIDxsqeH8JHF4',
            idProf: 'QjpVPu4k9I2_wyWKYCsNm'
        },
        {
            id: 'La1WYwes9vnloZy0el0WQ',
            aula: 12,
            horario: '10:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'AV0WBNxJrGYtH5eV_6NeG',
            idProf: 'B0sctz-aAW9Xfpwvy0JlP'
        },
        {
            id: '5q9mLmmjhOBJyy5suyTuH',
            aula: 13,
            horario: '11:00',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: '4JTjxi37t98WtCj-QVTIh',
            idProf: 'tz2JU7NMc6dRHj2O19MK5'
        },
        {
            id: 'dVVfz4gSD6Ok6apf3Kq04',
            aula: 14,
            horario: '13:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'LsUt1wCMK_3kLG4h1bbgJ',
            idProf: 'sfNfvItcyp-MlGI5P9Epm'
        },
        {
            id: 'MCK9rwzl4ORXkR3lmyHb9',
            aula: 15,
            horario: '14:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'LsUt1wCMK_3kLG4h1bbgJ',
            idProf: 'sfNfvItcyp-MlGI5P9Epm'
        },
        {
            id: '4lVgraIoweLCCnTgiGwmZ',
            aula: 16,
            horario: '15:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'DNQZzIn0G1YZwf-aSO3Me',
            idProf: 'wFJGYnx2FrUs7_fGL7crg'
        },
        {
            id: 'liCJCy2tcfz5vBH1pXdoy',
            aula: 17,
            horario: '16:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'DNQZzIn0G1YZwf-aSO3Me',
            idProf: 'wFJGYnx2FrUs7_fGL7crg'
        },
        {
            id: 'TANDU9tKUsp4fQpPoSKNP',
            aula: 18,
            horario: '07:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'xrAqq3a4m6auZcatCVHPR',
            idProf: 'Au1ZeDAsLjA0iVyto-I54'
        },
        {
            id: 'RFLSbDjnbFWvDPsA17WeP',
            aula: 19,
            horario: '08:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: '8DU7l7hk-zepxrCrZpIGq',
            idProf: 'rcU2D3IUW_ufTNcoBZ1L0'
        },
        {
            id: '-y6FbYTeSseXasiypBr0e',
            aula: 20,
            horario: '09:00',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: '8DU7l7hk-zepxrCrZpIGq',
            idProf: 'rcU2D3IUW_ufTNcoBZ1L0'
        },
        {
            id: '7QND9YkA5dzzrDiJVnr-l',
            aula: 21,
            horario: '10:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'gm0nlC_emR_QzQN10fa2f',
            idProf: 'MGVVYj46EB9ydL4AnUehH'
        },
        {
            id: 'CsW3MaLyrQeVjLB_wPVPh',
            aula: 22,
            horario: '11:00',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'MaOxiGGjAwA297Z9O_KgQ',
            idProf: '5_7yI-GonhdiKL6U8ovh-'
        },
        {
            id: '3TLuOhgx_yizcfCk_54Ww',
            aula: 23,
            horario: '13:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'noftZ0tWc6rzC8OlqnzZF',
            idProf: 'Zh-byfV-BoHlyo3mMxGx1'
        },
        {
            id: '_elWBrojUxn65meL3U_Sd',
            aula: 24,
            horario: '14:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'noftZ0tWc6rzC8OlqnzZF',
            idProf: 'Zh-byfV-BoHlyo3mMxGx1'
        },
        {
            id: 'WaQ8fZWnfHO_DCsvH7iTc',
            aula: 25,
            horario: '15:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'ZXd9qURzwzhQrwO96V0Fl',
            idProf: 'YkJihhVwGH4Onj1zTf9Pi'
        },
        {
            id: '_vakz2NCnKy2vdahj9SMQ',
            aula: 26,
            horario: '16:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'ZNfgRRyS7VU1Y5HaCaVf6',
            aula: 27,
            horario: '07:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'AV0WBNxJrGYtH5eV_6NeG',
            idProf: 'B0sctz-aAW9Xfpwvy0JlP'
        },
        {
            id: 'iUYx1dG0u1jGMy2Dek0jR',
            aula: 28,
            horario: '08:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'TNU-YA4eKCEcL1rLKcD-v',
            idProf: 'tkGDjQPDorrk1GYC4A1MJ'
        },
        {
            id: '2GA_ZjaC9AKDUqqBuxeXJ',
            aula: 29,
            horario: '09:00',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'LGENLlGDCgk_4RTwPl3co',
            aula: 30,
            horario: '10:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'MaOxiGGjAwA297Z9O_KgQ',
            idProf: '5_7yI-GonhdiKL6U8ovh-'
        },
        {
            id: 'g1jzST4K2mKflpAN0yl5e',
            aula: 31,
            horario: '11:00',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'xrAqq3a4m6auZcatCVHPR',
            idProf: 'Au1ZeDAsLjA0iVyto-I54'
        },
        {
            id: 'ia2RN0rRlCLJ28k6z2DJx',
            aula: 32,
            horario: '13:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'MaOxiGGjAwA297Z9O_KgQ',
            idProf: '5_7yI-GonhdiKL6U8ovh-'
        },
        {
            id: 'cnvEsTst8yGPwLV_EvETE',
            aula: 33,
            horario: '14:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'fPt8P-0Scw3hcBeHojQa-',
            idProf: 'y0IuOQsPd0yHMslo7w6QC'
        },
        {
            id: 'WjElSf0DCaI6Q9EN2FqEN',
            aula: 34,
            horario: '15:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: '4KL0R4fQlmUfXRG0fpayC',
            idProf: '9bghQ9r1v4Vol4JbZ3MkL'
        },
        {
            id: '5yGJ88ArnMG7KV_MVJJ8I',
            aula: 35,
            horario: '16:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'tqrRB4W7vLr191ZbVjMjH',
            aula: 36,
            horario: '07:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'gm0nlC_emR_QzQN10fa2f',
            idProf: 'MGVVYj46EB9ydL4AnUehH'
        },
        {
            id: '9J_9na_o_DudMop6McKJ2',
            aula: 37,
            horario: '08:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'ZXd9qURzwzhQrwO96V0Fl',
            idProf: 'YkJihhVwGH4Onj1zTf9Pi'
        },
        {
            id: 'mjd15EuFtzZjVbBIYkAZl',
            aula: 38,
            horario: '09:00',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: '7hJvljgYrg_KehuColFAa',
            idProf: 'P_crRNZzvWqudb21RoHlC'
        },
        {
            id: '41B0Qwr97rpVNwXRejBeY',
            aula: 39,
            horario: '10:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'gm0nlC_emR_QzQN10fa2f',
            idProf: 'MGVVYj46EB9ydL4AnUehH'
        },
        {
            id: 'WWGzxEAshM0N4xWWNlFWk',
            aula: 40,
            horario: '11:00',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'gm0nlC_emR_QzQN10fa2f',
            idProf: 'MGVVYj46EB9ydL4AnUehH'
        },
        {
            id: 'PIZGnxzXnjbXbognokZyG',
            aula: 41,
            horario: '13:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'qzxgOGrM7QkmJdWJnshP5',
            aula: 42,
            horario: '14:10',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'YfC-cFeoyd4_cib2Rrmu8',
            aula: 43,
            horario: '15:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        },
        {
            id: 'rNXeq3RaHd07-afM62UTj',
            aula: 44,
            horario: '15:20',
            idTurma: 'Rgf8kJDwnsJ1u2VxDk4DV',
            idMateria: 'cQUEmNGqDpCeYJYkVDD0J',
            idProf: '4oyXJ6aQZ4X7e0QrIwROp'
        }
    ];

    const posts:typePost[] = [
        {
            id: 'JyKHKFilW6I6JiWOt3TvO',
            txt: 'Hoje serão apresentados os TCCs dos terceiros anos do ETIM de Desenvolvimento de Sistemas.',
            foto: false,
            email: 'rosa.shimizu@etec.sp.gov.br'
        },
        {
            id: 'I_vBRWsz7zQthFEIcQ3nW',
            txt: 'Devido à greve dos professores, algumas aulas podem ser suspensas por tempo indeterminado.',
            foto: true,
            extensao: 'jpeg',
            email: 'rosa.shimizu@etec.sp.gov.br'
        }
    ]

    /*const tagsAep:typeTags[] = [
        {
            id: '8VgkzukV7L17aA1pTiXiw',
            txt: 'Celulares'
        },
        {
            id: 'UdG7DsGRIMpkJqNG2qUDs',
            txt: 'Eletrônicos'
        },
        {
            id: 'wfnjiItFpyueujT-_h0Cf',
            txt: 'Jogos'
        },
        {
            id: 'Z9QL3GLycV_a5ZoJkHI1o',
            txt: 'Pessoal'
        },
        {
            id: 'm2--5xO2AvcYoRm5-iy2X',
            txt: 'Higiene'
        },
        {
            id: 'AbQo16XFE1Rgw8bomsxiD',
            txt: 'Vestimentas'
        },
        {
            id: 'KCsoW-gddly9-8N9UNKYY',
            txt: 'Acessórios'
        },
        {
            id: 'WJkJ1fjpg6TJDDBCvwRRy',
            txt: 'Materiais'
        },
        {
            id: 'A1l_p18B6MF-5QP1FgFfx',
            txt: 'Outros'
        }
    ]*/

    await sequelize.sync({force: true});

    await ReferenciaAlunos.bulkCreate(alunosReferencia);
    await ReferenciaFuncionarios.bulkCreate(funcionariosReferencia);
    await AlunosAtivos.bulkCreate(alunosAtivos);
    await FuncionariosAtivos.bulkCreate(funcionariosAtivos);
    await Cardapio.bulkCreate(cardapio);
    await Turmas.bulkCreate(turmas);
    await Materias.bulkCreate(materias);
    await Professores.bulkCreate(professores);
    await Horarios.bulkCreate(horarios);
    await Posts.bulkCreate(posts);
    //await TagsAeP.bulkCreate(tagsAep);
})();
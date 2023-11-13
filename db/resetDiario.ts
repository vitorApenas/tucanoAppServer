import {
    Professores
} from './models'

export async function resetDiario(){
    await Professores.update({presente: "#FFCC18"}, {where: {}});
}
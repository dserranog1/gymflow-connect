import { Difficulty, EmployeeRol } from "@/types"
export const difficultyTranslator = {
    [Difficulty.low]: 'Baja',
    [Difficulty.medium]: 'Media',
    [Difficulty.high]: 'Alta',
}

export const roleTranslator = {
    [EmployeeRol.class_trainer]: 'Entrenador de clases',
    [EmployeeRol.personal_trainer]: 'Entrenador personal',
    [EmployeeRol.support]: 'Soporte',
    [EmployeeRol.trainer]: 'Entrenador de planta',
}